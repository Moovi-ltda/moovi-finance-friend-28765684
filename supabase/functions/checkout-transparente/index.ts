import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const BodySchema = z.object({
  plano: z.string().min(1).max(255),
  valor: z.number().positive(),
  forma_pagamento: z.enum(["CREDIT_CARD", "PIX"]),
  nome: z.string().min(1).max(255),
  email: z.string().email().max(255),
  telefone: z.string().min(1).max(50),
  cep: z.string().min(8).max(9),
  endereco: z.string().min(1).max(500).optional(),
  numero: z.string().min(1).max(50),
  cpf_cnpj: z.string().min(11).max(14),
  afiliado_id: z.string().max(255).optional(),
  externalReference: z.string().min(1).max(500),
  parcelas: z.number().int().min(1).max(21).optional(),
  valor_parcela: z.number().positive().optional(),
  cartao: z
    .object({
      numero: z.string().min(13).max(19),
      titular: z.string().min(1).max(255),
      mes_validade: z.string().min(1).max(2),
      ano_validade: z.string().min(2).max(4),
      cvv: z.string().min(3).max(4),
    })
    .optional(),
});

const onlyDigits = (v: string) => v.replace(/\D/g, "");

function addDaysSaoPaulo(days = 1): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const spDate = new Date(`${get("year")}-${get("month")}-${get("day")}T00:00:00-03:00`);
  spDate.setDate(spDate.getDate() + days);
  return spDate.toISOString().slice(0, 10);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function extractErrorMessage(data: Record<string, unknown>): string | null {
  if (Array.isArray(data.errors)) {
    const descriptions = (data.errors as { description?: string }[])
      .map((e) => e.description)
      .filter(Boolean);
    if (descriptions.length > 0) return descriptions.join(" | ");
  }
  if (typeof data.message === "string" && data.message) return data.message;
  if (typeof data.error === "string" && data.error) return data.error;
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("ASAAS_API_KEY");
  if (!apiKey) {
    return json({ status: "erro", mensagem: "Configuração de gateway indisponível." }, 500);
  }

  const apiBase = Deno.env.get("ASAAS_API_URL") || "https://api.asaas.com";

  async function asaas(path: string, method: "GET" | "POST" = "GET", body?: unknown) {
    const res = await fetch(`${apiBase}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Moovi/1.0.0",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) {
      const msg = extractErrorMessage(data) || `Erro ${res.status} no gateway.`;
      throw new Error(msg);
    }
    return data as Record<string, unknown>;
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return json(
        {
          status: "erro",
          mensagem: "Dados do checkout inválidos.",
          detalhes: parsed.error.flatten().fieldErrors,
        },
        400,
      );
    }

    const body = parsed.data;

    // --- Garante que o externalReference enviado pelo front é preservado exatamente ---
    const externalReference = body.externalReference?.trim();
    if (!externalReference) {
      return json({ status: "erro", mensagem: "externalReference é obrigatório." }, 400);
    }

    // --- Cliente no Asaas ---
    const cpfCnpj = onlyDigits(body.cpf_cnpj);
    let customerId: string | undefined;

    try {
      const list = (await asaas(`/v3/customers?cpfCnpj=${encodeURIComponent(cpfCnpj)}&limit=1`)) as {
        data?: { id: string }[];
      };
      customerId = list.data?.[0]?.id;
    } catch {
      customerId = undefined;
    }

    if (!customerId) {
      const created = (await asaas("/v3/customers", "POST", {
        name: body.nome,
        email: body.email,
        cpfCnpj,
        mobilePhone: body.telefone,
      })) as { id: string };
      customerId = created.id;
    }

    // --- Monta cobrança ---
    const remoteIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const paymentPayload: Record<string, unknown> = {
      customer: customerId,
      billingType: body.forma_pagamento,
      value: body.valor,
      dueDate: addDaysSaoPaulo(1),
      description: `Assinatura Moovi - ${body.plano}`,
      externalReference,
    };

    if (body.forma_pagamento === "CREDIT_CARD") {
      const card = body.cartao;
      if (!card) {
        return json({ status: "erro", mensagem: "Dados do cartão incompletos." }, 400);
      }

      paymentPayload.creditCard = {
        holderName: card.titular,
        number: onlyDigits(card.numero),
        expiryMonth: card.mes_validade,
        expiryYear: card.ano_validade,
        ccv: card.cvv,
      };

      paymentPayload.creditCardHolderInfo = {
        name: body.nome,
        email: body.email,
        cpfCnpj,
        postalCode: onlyDigits(body.cep),
        addressNumber: body.numero,
        phone: body.telefone,
      };

      paymentPayload.remoteIp = remoteIp;

      const installments = body.parcelas ?? 1;
      if (installments > 1) {
        paymentPayload.installmentCount = installments;
        paymentPayload.installmentValue = body.valor_parcela ?? Number((body.valor / installments).toFixed(2));
      }
    }

    // Log estruturado do payload (dados sensíveis mascarados)
    console.log("[checkout-transparente] externalReference:", body.externalReference);
    console.log("[checkout-transparente] payment payload keys:", Object.keys(paymentPayload));

    // --- Cria cobrança no Asaas ---
    const payment = (await asaas("/v3/payments", "POST", paymentPayload)) as Record<string, unknown>;

    // --- PIX: busca QR Code ---
    if (body.forma_pagamento === "PIX") {
      const pixId = payment.id as string;
      if (!pixId) {
        return json({ status: "erro", mensagem: "Cobrança PIX criada sem identificador." }, 500);
      }
      const qr = (await asaas(`/v3/payments/${pixId}/pixQrCode`)) as {
        payload?: string;
        encodedImage?: string;
      };
      return json({
        status: "sucesso",
        copyPaste: qr.payload ?? "",
        qrCodeBase64: qr.encodedImage ?? "",
        ...payment,
      });
    }

    // --- Cartão: retorna objeto da cobrança (já inclui status) ---
    return json(payment);
  } catch (err: unknown) {
    const mensagem = err instanceof Error ? err.message : "Falha ao processar o pagamento.";
    console.error("[checkout-transparente] error:", mensagem);
    return json({ status: "erro", mensagem }, 502);
  }
});
