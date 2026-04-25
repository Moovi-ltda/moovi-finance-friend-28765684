import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2, QrCode, CreditCard, Copy, Check, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const WEBHOOK_URL = "https://n8n.fisherai.shop/webhook/checkout-transparente";

const COUNTRIES = [
  { code: "BR", ddi: "55", flag: "🇧🇷", name: "Brasil" },
  { code: "US", ddi: "1", flag: "🇺🇸", name: "EUA" },
  { code: "PT", ddi: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "AR", ddi: "54", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", ddi: "56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", ddi: "57", flag: "🇨🇴", name: "Colômbia" },
  { code: "MX", ddi: "52", flag: "🇲🇽", name: "México" },
  { code: "UY", ddi: "598", flag: "🇺🇾", name: "Uruguai" },
  { code: "PY", ddi: "595", flag: "🇵🇾", name: "Paraguai" },
  { code: "PE", ddi: "51", flag: "🇵🇪", name: "Peru" },
  { code: "ES", ddi: "34", flag: "🇪🇸", name: "Espanha" },
  { code: "FR", ddi: "33", flag: "🇫🇷", name: "França" },
  { code: "DE", ddi: "49", flag: "🇩🇪", name: "Alemanha" },
  { code: "IT", ddi: "39", flag: "🇮🇹", name: "Itália" },
  { code: "GB", ddi: "44", flag: "🇬🇧", name: "Reino Unido" },
  { code: "JP", ddi: "81", flag: "🇯🇵", name: "Japão" },
  { code: "CA", ddi: "1", flag: "🇨🇦", name: "Canadá" },
  { code: "AU", ddi: "61", flag: "🇦🇺", name: "Austrália" },
  { code: "AO", ddi: "244", flag: "🇦🇴", name: "Angola" },
  { code: "MZ", ddi: "258", flag: "🇲🇿", name: "Moçambique" },
];

interface CheckoutPlan {
  name: string;
  installmentPrice?: number;
  totalPrice?: number;
  yearlyTotal?: number;
  href: string;
}

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: CheckoutPlan | null;
}

type PaymentMethod = "PIX" | "CREDIT_CARD";
type Screen = "form" | "loading" | "pix-success" | "card-success" | "error";

// ---------- Masks ----------
const onlyDigits = (v: string) => v.replace(/\D/g, "");

function maskPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCPF(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCEP(v: string) {
  const d = onlyDigits(v).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

function maskCardNumber(v: string) {
  return onlyDigits(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function maskExpiry(v: string) {
  const d = onlyDigits(v).slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function maskCVV(v: string) {
  return onlyDigits(v).slice(0, 4);
}

// ---------- Component ----------
export function CheckoutModal({ open, onOpenChange, plan }: CheckoutModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("PIX");
  const [screen, setScreen] = useState<Screen>("form");

  // common fields
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");

  // card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(12);

  // success state
  const [pixData, setPixData] = useState<{ copyPaste: string; qrCodeBase64: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalValue = plan?.totalPrice ?? plan?.yearlyTotal ?? 0;

  const installmentOptions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const n = i + 1;
      const value = totalValue / n;
      return { n, value };
    });
  }, [totalValue]);

  useEffect(() => {
    if (!open) {
      // small delay to allow close animation
      const t = setTimeout(() => {
        setMethod("PIX");
        setScreen("form");
        setNome("");
        setTelefone("");
        setEmail("");
        setCpf("");
        setCep("");
        setNumero("");
        setCardNumber("");
        setCardHolder("");
        setCardExpiry("");
        setCardCvv("");
        setInstallments(12);
        setPixData(null);
        setCopied(false);
        setErrorMsg("");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!plan) return null;

  const validatePix = () => {
    if (!nome.trim() || nome.trim().length < 3) return "Informe seu nome completo.";
    if (onlyDigits(telefone).length < 10) return "Informe um WhatsApp válido.";
    return null;
  };

  const validateCard = () => {
    const pixErr = validatePix();
    if (pixErr) return pixErr;
    if (!email.includes("@")) return "Informe um e-mail válido.";
    if (onlyDigits(cpf).length !== 11) return "CPF inválido.";
    if (onlyDigits(cep).length !== 8) return "CEP inválido.";
    if (!numero.trim()) return "Informe o número do endereço.";
    if (onlyDigits(cardNumber).length < 13) return "Número do cartão inválido.";
    if (!cardHolder.trim()) return "Informe o nome impresso no cartão.";
    if (cardExpiry.length !== 5) return "Validade inválida (MM/AA).";
    if (cardCvv.length < 3) return "CVV inválido.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = method === "PIX" ? validatePix() : validateCard();
    if (err) {
      toast.error(err);
      return;
    }

    setScreen("loading");
    setErrorMsg("");

    const payload: Record<string, unknown> = {
      plano: plan.name,
      valor: totalValue,
      forma_pagamento: method,
      nome: nome.trim(),
      telefone: `+55${onlyDigits(telefone)}`,
      afiliado_id: localStorage.getItem("moovi_afiliado_id") || "",
    };

    if (method === "CREDIT_CARD") {
      Object.assign(payload, {
        email: email.trim(),
        cpf: onlyDigits(cpf),
        cep: onlyDigits(cep),
        numero_endereco: numero.trim(),
        parcelas: installments,
        valor_parcela: Number((totalValue / installments).toFixed(2)),
        cartao: {
          numero: onlyDigits(cardNumber),
          titular: cardHolder.trim(),
          validade: cardExpiry, // MM/AA
          cvv: cardCvv,
        },
      });
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Falha no processamento");

      const data = await res.json().catch(() => ({}));

      if (method === "PIX") {
        const copyPaste = data.copyPaste || data.payload || data.pix_copia_cola || "";
        const qrCodeBase64 = data.qrCodeBase64 || data.qrCode || data.encodedImage || "";
        if (!copyPaste && !qrCodeBase64) {
          throw new Error("PIX não retornado pelo servidor");
        }
        setPixData({ copyPaste, qrCodeBase64 });
        setScreen("pix-success");
      } else {
        const status = (data.status || "").toString().toUpperCase();
        if (status && !["CONFIRMED", "RECEIVED", "APPROVED", "OK"].includes(status)) {
          throw new Error(data.message || "Pagamento recusado pela operadora");
        }
        setScreen("card-success");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      setErrorMsg(message);
      setScreen("error");
    }
  };

  const copyPix = async () => {
    if (!pixData?.copyPaste) return;
    try {
      await navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg p-0 gap-0 overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">Checkout {plan.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Finalize sua assinatura do {plan.name} com PIX ou Cartão de Crédito.
        </DialogDescription>

        {/* Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            Checkout seguro
          </div>
          <h2 className="mt-1.5 text-xl font-bold text-slate-900">{plan.name}</h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Total: <span className="text-emerald-600 font-semibold">R$ {totalValue.toFixed(2).replace(".", ",")}</span>
          </p>
        </div>

        <div className="px-6 py-5">
          {screen === "form" && (
            <>
              {/* Method tabs */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-5">
                <button
                  type="button"
                  onClick={() => setMethod("PIX")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    method === "PIX"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  PIX
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("CREDIT_CARD")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    method === "CREDIT_CARD"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Cartão
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Field label="Nome Completo" value={nome} onChange={setNome} placeholder="João da Silva" />
                <Field
                  label="WhatsApp"
                  value={telefone}
                  onChange={(v) => setTelefone(maskPhone(v))}
                  placeholder="(99) 99999-9999"
                  inputMode="numeric"
                />

                {method === "CREDIT_CARD" && (
                  <>
                    <Field
                      label="E-mail"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="voce@email.com"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="CPF"
                        value={cpf}
                        onChange={(v) => setCpf(maskCPF(v))}
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                      />
                      <Field
                        label="CEP"
                        value={cep}
                        onChange={(v) => setCep(maskCEP(v))}
                        placeholder="00000-000"
                        inputMode="numeric"
                      />
                    </div>
                    <Field label="Número" value={numero} onChange={setNumero} placeholder="123" inputMode="numeric" />

                    <div className="pt-2 mt-2 border-t border-slate-200">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                        Dados do cartão
                      </p>
                      <Field
                        label="Número do Cartão"
                        value={cardNumber}
                        onChange={(v) => setCardNumber(maskCardNumber(v))}
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                      />
                      <div className="mt-3">
                        <Field
                          label="Nome impresso no cartão"
                          value={cardHolder}
                          onChange={(v) => setCardHolder(v.toUpperCase())}
                          placeholder="JOAO DA SILVA"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <Field
                          label="Validade"
                          value={cardExpiry}
                          onChange={(v) => setCardExpiry(maskExpiry(v))}
                          placeholder="MM/AA"
                          inputMode="numeric"
                        />
                        <Field
                          label="CVV"
                          value={cardCvv}
                          onChange={(v) => setCardCvv(maskCVV(v))}
                          placeholder="123"
                          inputMode="numeric"
                        />
                      </div>

                      <label className="block mt-3">
                        <span className="text-sm font-medium text-slate-700">Parcelamento</span>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          className="mt-1 w-full bg-white border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {installmentOptions.map((opt) => (
                            <option key={opt.n} value={opt.n}>
                              {opt.n}x de R$ {opt.value.toFixed(2).replace(".", ",")} sem juros
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {method === "PIX" ? (
                    <>
                      <QrCode className="h-4 w-4" /> Gerar PIX
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" /> Confirmar Pagamento
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-1">
                  🔒 Ambiente seguro. Seus dados são criptografados.
                </p>
              </form>
            </>
          )}

          {screen === "loading" && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" />
              <p className="mt-4 text-slate-900 font-semibold">Processando pagamento...</p>
              <p className="text-sm text-slate-500 mt-1">Não feche esta janela.</p>
            </div>
          )}

          {screen === "pix-success" && pixData && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                <Sparkles className="h-3.5 w-3.5" /> PIX gerado com sucesso
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Escaneie o QR Code</h3>
              <p className="text-sm text-slate-600">
                Abra o app do seu banco e finalize o pagamento. Liberação automática.
              </p>

              {pixData.qrCodeBase64 && (
                <div className="mt-4 bg-white p-3 rounded-lg inline-block border border-slate-200">
                  <img
                    src={
                      pixData.qrCodeBase64.startsWith("data:")
                        ? pixData.qrCodeBase64
                        : `data:image/png;base64,${pixData.qrCodeBase64}`
                    }
                    alt="QR Code PIX"
                    className="w-48 h-48"
                  />
                </div>
              )}

              {pixData.copyPaste && (
                <div className="mt-4 text-left">
                  <label className="text-sm font-medium text-slate-700">PIX Copia e Cola</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      readOnly
                      value={pixData.copyPaste}
                      className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-700 truncate"
                    />
                    <button
                      type="button"
                      onClick={copyPix}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copiado" : "Copiar"}
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-5 text-xs text-slate-500">
                Após o pagamento, seu acesso será enviado no WhatsApp informado.
              </p>
            </div>
          )}

          {screen === "card-success" && (
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center animate-in zoom-in duration-500 border border-emerald-100">
                <Check className="h-8 w-8 text-emerald-600" strokeWidth={3} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Pagamento Aprovado! 🎉</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-xs mx-auto">
                Tudo certo! Acabamos de enviar seu acesso no WhatsApp <span className="text-emerald-600 font-semibold">{telefone}</span>.
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-md"
              >
                Fechar
              </button>
            </div>
          )}

          {screen === "error" && (
            <div className="py-6 text-center">
              <h3 className="text-lg font-bold text-slate-900">Não conseguimos processar 😕</h3>
              <p className="mt-2 text-sm text-slate-600">
                {errorMsg || "Verifique seus dados e tente novamente."}
              </p>
              <button
                type="button"
                onClick={() => setScreen("form")}
                className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-md"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Internal Field ----------
interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
}

function Field({ label, value, onChange, placeholder, type = "text", inputMode = "text" }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 w-full bg-white border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        required
      />
    </label>
  );
}
