/**
 * Tokenização de cartão no frontend via Asaas.js
 * Nenhum dado sensível do cartão (número, validade, CVV) trafega para nossa API:
 * apenas o token gerado pelo Asaas é enviado.
 */

const ASAAS_JS_URL = "https://cdn.asaas.com/asaas.js";
const PUBLISHABLE_KEY = (import.meta.env.VITE_ASAAS_PUBLIC_KEY as string | undefined) || "";

type AsaasCardPayload = {
  number: string;
  holderName: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
};

type AsaasGlobal = {
  setPublishableKey?: (key: string) => void;
  card?: {
    createToken: (
      data: AsaasCardPayload,
      callback: (status: number, response: Record<string, unknown>) => void
    ) => void;
  };
};

declare global {
  interface Window {
    Asaas?: AsaasGlobal;
  }
}

let loader: Promise<AsaasGlobal> | null = null;

export const loadAsaasJs = (): Promise<AsaasGlobal> => {
  if (typeof window === "undefined") return Promise.reject(new Error("Ambiente inválido."));
  if (window.Asaas) return Promise.resolve(window.Asaas);
  if (loader) return loader;

  loader = new Promise<AsaasGlobal>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${ASAAS_JS_URL}"]`);
    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      if (window.Asaas) {
        if (PUBLISHABLE_KEY && window.Asaas.setPublishableKey) {
          window.Asaas.setPublishableKey(PUBLISHABLE_KEY);
        }
        resolve(window.Asaas);
      } else {
        reject(new Error("Não foi possível iniciar o serviço de pagamento seguro."));
      }
    };
    script.addEventListener("load", onLoad);
    script.addEventListener("error", () =>
      reject(new Error("Não foi possível carregar o serviço de pagamento seguro."))
    );
    if (!existing) {
      script.src = ASAAS_JS_URL;
      script.async = true;
      document.head.appendChild(script);
    } else if (window.Asaas) {
      onLoad();
    }
  }).catch((err) => {
    loader = null;
    throw err;
  });

  return loader;
};

/** Gera o token do cartão. Retorna somente a string do token. */
export const tokenizeCard = async (input: {
  number: string;
  holderName: string;
  /** MM/AA */
  expiry: string;
  ccv: string;
}): Promise<string> => {
  const asaas = await loadAsaasJs();
  if (!asaas.card?.createToken) {
    throw new Error("Serviço de tokenização indisponível. Tente novamente em instantes.");
  }

  const [mm, yy] = input.expiry.split("/");
  const data: AsaasCardPayload = {
    number: input.number.replace(/\D/g, ""),
    holderName: input.holderName.trim(),
    expiryMonth: (mm || "").padStart(2, "0"),
    expiryYear: (yy || "").length === 2 ? `20${yy}` : yy || "",
    ccv: input.ccv.replace(/\D/g, ""),
  };

  return new Promise<string>((resolve, reject) => {
    try {
      asaas.card!.createToken(data, (status, response) => {
        const token =
          (response?.creditCardToken as string) ||
          (response?.token as string) ||
          (response?.id as string) ||
          "";
        if (status >= 200 && status < 300 && token) {
          resolve(token);
          return;
        }
        const message =
          (response?.message as string) ||
          ((response?.errors as { description?: string }[] | undefined)?.[0]?.description ?? "");
        reject(new Error(message || "Não foi possível validar os dados do cartão."));
      });
    } catch {
      reject(new Error("Não foi possível validar os dados do cartão."));
    }
  });
};
