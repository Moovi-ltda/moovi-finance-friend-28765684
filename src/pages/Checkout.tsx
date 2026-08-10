import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  ChevronLeft,
  ChevronDown,
  CreditCard,
  QrCode,
  Copy,
  Check,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import logoMoovi from "@/assets/moovi-logo.png";

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
}

type PaymentMethod = "PIX" | "CREDIT_CARD";
type Status = "form" | "loading" | "pix-success" | "card-success" | "error";

// ---------- Masks ----------
const onlyDigits = (v: string) => v.replace(/\D/g, "");
const maskPhone = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCPF = (v: string) =>
  onlyDigits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskCNPJ = (v: string) =>
  onlyDigits(v)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
const maskCpfCnpj = (v: string) => (onlyDigits(v).length <= 11 ? maskCPF(v) : maskCNPJ(v));
const maskCEP = (v: string) => {
  const d = onlyDigits(v).slice(0, 8);
  return d.length <= 5 ? d : `${d.slice(0, 5)}-${d.slice(5)}`;
};
const maskCardNumber = (v: string) => onlyDigits(v).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
const maskExpiry = (v: string) => {
  const d = onlyDigits(v).slice(0, 4);
  return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
};
const maskCVV = (v: string) => onlyDigits(v).slice(0, 4);

const STEPS = [
  { id: 1, label: "Identificação" },
  { id: 2, label: "Pagamento" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = (location.state as { plan?: CheckoutPlan } | null)?.plan ?? null;

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("form");
  const [method, setMethod] = useState<PaymentMethod>("CREDIT_CARD");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Step 1
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [cepLoading, setCepLoading] = useState(false);

  // Step 2
  const [cpf, setCpf] = useState("");

  // Step 2 - card
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState(12);

  // Result
  const [pixData, setPixData] = useState<{ copyPaste: string; qrCodeBase64: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!plan) navigate("/#pricing-section", { replace: true });
  }, [plan, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [step]);

  const totalValue = plan?.totalPrice ?? plan?.yearlyTotal ?? 0;
  const monthlyValue = plan?.installmentPrice ?? totalValue / 12;

  const installmentOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ n: i + 1, value: totalValue / (i + 1) })),
    [totalValue],
  );

  if (!plan) return null;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (nome.trim().length < 3) errors.nome = "Informe seu nome completo.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) errors.email = "Informe seu e-mail.";
    else if (!emailRegex.test(email.trim())) errors.email = "Informe um e-mail válido.";
    if (onlyDigits(telefone).length < 10) errors.telefone = "Informe um telefone válido.";
    if (onlyDigits(cep).length !== 8) errors.cep = "Informe um CEP válido.";
    if (endereco.trim().length < 3) errors.endereco = "Informe seu endereço.";
    if (!numero.trim()) errors.numero = "Informe o número.";
    return errors;
  };

  const handleCepChange = async (value: string) => {
    const masked = maskCEP(value);
    setCep(masked);
    const digits = onlyDigits(masked);
    if (digits.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setEndereco([data.logradouro, data.bairro, data.localidade && `${data.localidade}/${data.uf}`].filter(Boolean).join(", "));
        }
      } catch {
        /* preenchimento manual */
      } finally {
        setCepLoading(false);
      }
    }
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    const docDigits = onlyDigits(cpf).length;
    if (docDigits !== 11 && docDigits !== 14) errors.cpf = "Informe um CPF ou CNPJ válido.";
    if (method === "PIX") return errors;
    if (onlyDigits(cardNumber).length < 13) errors.cardNumber = "Número do cartão inválido.";
    if (!cardHolder.trim()) errors.cardHolder = "Informe o nome impresso no cartão.";
    if (cardExpiry.length !== 5) errors.cardExpiry = "Validade inválida (MM/AA).";
    if (cardCvv.length < 3) errors.cardCvv = "CVV inválido.";
    return errors;
  };

  const next = () => {
    if (step === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
    }
    setStep((s) => Math.min(2, s + 1));
    setHasAttemptedSubmit(false);
  };
  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    setHasAttemptedSubmit(false);
    setFieldErrors({});
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    const errors = validateStep2();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setStatus("loading");
    setErrorMsg("");

    const docDigits = onlyDigits(cpf);
    const payload: Record<string, unknown> = {
      plano: plan.name,
      valor: totalValue,
      forma_pagamento: method,
      nome: nome.trim(),
      email: email.trim(),
      telefone: `+${selectedCountry.ddi}${onlyDigits(telefone)}`,
      cep: onlyDigits(cep),
      endereco: endereco.trim(),
      numero: numero.trim(),
      cpf_cnpj: docDigits,
      tipo_documento: docDigits.length === 14 ? "CNPJ" : "CPF",
      afiliado_id: localStorage.getItem("moovi_afiliado_id") || "",
    };

    if (method === "CREDIT_CARD") {
      Object.assign(payload, {
        parcelas: installments,
        valor_parcela: Number((totalValue / installments).toFixed(2)),
        cartao: {
          numero: onlyDigits(cardNumber),
          titular: cardHolder.trim(),
          validade: cardExpiry,
          cvv: cardCvv,
        },
      });
    }

    const fallbackError =
      "Falha ao processar o pagamento. Verifique seus dados e tente novamente.";

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      const backendStatus = (data.status || "").toString().toLowerCase();
      const backendMessage =
        (data as { mensagem?: string; message?: string }).mensagem ||
        (data as { mensagem?: string; message?: string }).message ||
        "";

      if (!res.ok || backendStatus === "erro") {
        throw new Error(backendMessage || fallbackError);
      }

      if (method === "PIX") {
        const copyPaste = data.copyPaste || data.payload || data.pix_copia_cola || "";
        const qrCodeBase64 = data.qrCodeBase64 || data.qrCode || data.encodedImage || "";
        if (!copyPaste && !qrCodeBase64) throw new Error("PIX não retornado pelo servidor");
        setPixData({ copyPaste, qrCodeBase64 });
        setStatus("pix-success");
      } else {
        const st = (data.status || "").toString().toUpperCase();
        const approved = ["SUCESSO", "SUCCESS", "CONFIRMED", "RECEIVED", "APPROVED", "OK"];
        if (!approved.includes(st)) {
          throw new Error(backendMessage || fallbackError);
        }
        setStatus("card-success");
      }
    } catch (err: unknown) {
      const displayError = err instanceof Error ? err.message : fallbackError;
      setErrorMsg(displayError);
      // Mantém o usuário no formulário para corrigir os dados
      setStatus("form");
      const cleanMessage = displayError.startsWith("=")
        ? displayError.substring(1)
        : displayError;
      toast.error(cleanMessage, { duration: 6000 });
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
    <div className="lg:h-screen lg:overflow-hidden min-h-screen bg-slate-50 text-slate-900 flex flex-col pb-[88px] lg:pb-0">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoMoovi} alt="Moovi" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
            <Lock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Pagamento 100% seguro</span>
            <span className="sm:hidden">Seguro</span>
          </div>
        </div>
      </header>

      {/* Mobile compact collapsible summary */}
      <div className="lg:hidden bg-white border-b border-slate-200 flex-shrink-0">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen((v) => !v)}
          className="w-full px-4 py-3 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pedido:</span>
            <span className="text-sm font-bold text-slate-900 truncate">{plan.name}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm font-bold text-emerald-600">
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${mobileSummaryOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>
        {mobileSummaryOpen && (
          <div className="px-4 pb-3 -mt-1 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Equivalente a</span>
              <span className="font-semibold text-slate-900">
                R$ {monthlyValue.toFixed(2).replace(".", ",")}/mês
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Assinatura anual</span>
              <span className="text-slate-700">{plan.name}</span>
            </div>
            <Link to="/#pricing-section" className="text-emerald-600 font-medium inline-flex items-center gap-1">
              <ChevronLeft className="h-3 w-3" /> Trocar de plano
            </Link>
          </div>
        )}
      </div>

      <main className="flex-1 lg:overflow-hidden lg:min-h-0">
        <div className="max-w-6xl mx-auto h-full px-4 py-4 lg:py-6">
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_1fr] gap-6 lg:gap-8 lg:h-full lg:min-h-0">
            {/* LEFT: Form */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm lg:overflow-y-auto lg:min-h-0">
            {status === "form" && (
              <>
                <Stepper current={step} />

                <form noValidate className="mt-8 space-y-4">
                  {step === 1 && (
                    <>
                      <h3 className="text-xl font-bold text-slate-900">Quem é você?</h3>
                      <p className="text-sm text-slate-500 -mt-2">
                        Crie sua conta para acessar o seu painel financeiro.
                      </p>
                      <Field
                        label="Nome completo"
                        value={nome}
                        onChange={setNome}
                        placeholder="João da Silva"
                        error={fieldErrors.nome}
                      />
                      <Field
                        label="E-mail"
                        value={email}
                        onChange={setEmail}
                        placeholder="seu.email@exemplo.com"
                        type="email"
                        inputMode="email"
                        error={fieldErrors.email}
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-700">Telefone de Contato</span>
                        <div className="mt-1 flex gap-2">
                          <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                className="flex items-center gap-1.5 px-2.5 h-[44px] shrink-0 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <span className="text-base">{selectedCountry.flag}</span>
                                <span className="font-medium">+{selectedCountry.ddi}</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[240px] p-0 max-h-[280px] overflow-y-auto" align="start">
                              {COUNTRIES.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 text-left"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setCountryOpen(false);
                                  }}
                                >
                                  <span className="text-base">{c.flag}</span>
                                  <span className="flex-1">{c.name}</span>
                                  <span className="text-slate-500">+{c.ddi}</span>
                                </button>
                              ))}
                            </PopoverContent>
                          </Popover>
                          <input
                            type="tel"
                            value={telefone}
                            onChange={(e) => setTelefone(maskPhone(e.target.value))}
                            placeholder="(99) 99999-9999"
                            inputMode="numeric"
                            className={`flex-1 bg-white border rounded-lg px-3 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              fieldErrors.telefone ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-200"
                            }`}
                          />
                        </div>
                        {fieldErrors.telefone && <p className="mt-1 text-xs text-red-500">{fieldErrors.telefone}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field
                          label={cepLoading ? "CEP (buscando...)" : "CEP"}
                          value={cep}
                          onChange={handleCepChange}
                          placeholder="00000-000"
                          inputMode="numeric"
                          error={fieldErrors.cep}
                        />
                        <Field
                          label="Número"
                          value={numero}
                          onChange={setNumero}
                          placeholder="123"
                          inputMode="numeric"
                          error={fieldErrors.numero}
                        />
                      </div>
                      <Field
                        label="Endereço / Rua"
                        value={endereco}
                        onChange={setEndereco}
                        placeholder="Rua das Flores, Centro, São Paulo/SP"
                        error={fieldErrors.endereco}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h3 className="text-xl font-bold text-slate-900">Forma de pagamento</h3>
                      <Field
                        label="CPF / CNPJ"
                        value={cpf}
                        onChange={(v) => setCpf(maskCpfCnpj(v))}
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        error={hasAttemptedSubmit ? fieldErrors.cpf : undefined}
                      />
                      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setMethod("CREDIT_CARD")}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-all ${
                            method === "CREDIT_CARD"
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          <CreditCard className="h-4 w-4" /> Cartão
                        </button>
                        <button
                          type="button"
                          onClick={() => setMethod("PIX")}
                          className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-all ${
                            method === "PIX"
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          <QrCode className="h-4 w-4" /> PIX
                        </button>
                      </div>

                      {method === "CREDIT_CARD" ? (
                        <div className="space-y-3 pt-2">
                          <Field
                            label="Número do cartão"
                            value={cardNumber}
                            onChange={(v) => setCardNumber(maskCardNumber(v))}
                            placeholder="0000 0000 0000 0000"
                            inputMode="numeric"
                            error={hasAttemptedSubmit ? fieldErrors.cardNumber : undefined}
                          />
                          <Field
                            label="Nome impresso"
                            value={cardHolder}
                            onChange={(v) => setCardHolder(v.toUpperCase())}
                            placeholder="JOAO DA SILVA"
                            error={hasAttemptedSubmit ? fieldErrors.cardHolder : undefined}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Validade"
                              value={cardExpiry}
                              onChange={(v) => setCardExpiry(maskExpiry(v))}
                              placeholder="MM/AA"
                              inputMode="numeric"
                              error={hasAttemptedSubmit ? fieldErrors.cardExpiry : undefined}
                            />
                            <Field
                              label="CVV"
                              value={cardCvv}
                              onChange={(v) => setCardCvv(maskCVV(v))}
                              placeholder="123"
                              inputMode="numeric"
                              error={hasAttemptedSubmit ? fieldErrors.cardCvv : undefined}
                            />
                          </div>
                          <label className="block">
                            <span className="text-sm font-medium text-slate-700">Parcelamento</span>
                            <select
                              value={installments}
                              onChange={(e) => setInstallments(Number(e.target.value))}
                              className="mt-1 w-full bg-white border border-slate-200 rounded-lg px-3 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              {installmentOptions.map((o) => (
                                <option key={o.n} value={o.n}>
                                  {o.n}x de R$ {o.value.toFixed(2).replace(".", ",")} sem juros
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      ) : (
                        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center bg-slate-50">
                          <div className="mx-auto w-40 h-40 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                            <QrCode className="h-24 w-24 text-slate-300" strokeWidth={1} />
                          </div>
                          <p className="mt-4 text-sm font-semibold text-slate-700">
                            QR Code será gerado ao confirmar
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Após clicar em "Finalizar Assinatura", você verá o QR Code e o código copia e cola.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {errorMsg && step === 2 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      Pagamento não autorizado. Verifique os dados do cartão e tente novamente.
                    </div>
                  )}



                  {/* Desktop nav buttons */}
                  <div className="hidden lg:flex items-center justify-between pt-4">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={back}
                        className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" /> Voltar
                      </button>
                    ) : (
                      <span />
                    )}
                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={next}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2"
                      >
                        Continuar <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck className="h-4 w-4" /> Finalizar Assinatura
                    </button>
                    )}
                  </div>
                </form>
              </>
            )}

            {status === "loading" && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
                <p className="mt-4 text-slate-900 font-semibold text-lg">Processando pagamento...</p>
                <p className="text-sm text-slate-500 mt-1">Não feche esta janela.</p>
              </div>
            )}

            {status === "pix-success" && pixData && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                  <Sparkles className="h-3.5 w-3.5" /> PIX gerado com sucesso
                </div>
                <h3 className="mt-3 text-2xl font-bold text-slate-900">Escaneie o QR Code</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Abra o app do seu banco e finalize o pagamento.
                </p>
                {pixData.qrCodeBase64 && (
                  <div className="mt-5 bg-white p-3 rounded-lg inline-block border border-slate-200 shadow-sm">
                    <img
                      src={
                        pixData.qrCodeBase64.startsWith("data:")
                          ? pixData.qrCodeBase64
                          : `data:image/png;base64,${pixData.qrCodeBase64}`
                      }
                      alt="QR Code PIX"
                      className="w-56 h-56"
                    />
                  </div>
                )}
                {pixData.copyPaste && (
                  <div className="mt-5 text-left max-w-md mx-auto">
                    <label className="text-sm font-medium text-slate-700">PIX Copia e Cola</label>
                    <div className="mt-1 flex gap-2">
                      <input
                        readOnly
                        value={pixData.copyPaste}
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 truncate"
                      />
                      <button
                        type="button"
                        onClick={copyPix}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                  </div>
                )}
                <p className="mt-6 text-xs text-slate-500">
                  Após o pagamento, seu acesso será enviado para o e-mail informado.
                </p>
              </div>
            )}

            {status === "card-success" && (
              <div className="py-12 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <Check className="h-10 w-10 text-emerald-600" strokeWidth={3} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">Pagamento Aprovado!</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
                  Acabamos de enviar seu acesso para o e-mail:{" "}
                  <span className="text-[#1AAD55] font-semibold">{email}</span>.
                </p>
                <Link
                  to="/"
                  className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-md"
                >
                  Voltar ao site
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="py-10 text-center">
                <h3 className="text-xl font-bold text-slate-900">Não conseguimos processar</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {errorMsg || "Verifique seus dados e tente novamente."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("form")}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </section>

          {/* RIGHT: Order summary (desktop only) */}
          <aside className="hidden lg:flex flex-col gap-4 lg:overflow-y-auto lg:min-h-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Resumo do pedido
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{plan.name}</h2>
              <p className="text-sm text-slate-600 mt-0.5">Assinatura anual</p>

              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Equivalente a</span>
                  <span className="font-semibold text-slate-900">
                    R$ {monthlyValue.toFixed(2).replace(".", ",")}/mês
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total hoje</span>
                  <span className="font-bold text-emerald-600 text-base">
                    R$ {totalValue.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-semibold text-sm">Checkout Seguro</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  Criptografia SSL 256 bits
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  Garantia de 7 dias ou seu dinheiro de volta
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  Acesso liberado imediatamente no seu e-mail
                </li>
              </ul>
            </div>

            <Link
              to="/#pricing-section"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> Trocar de plano
            </Link>
          </aside>
          </div>
        </div>
      </main>

      {/* Mobile sticky bottom bar */}
      {status === "form" && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 flex items-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
          {step > 1 && (
            <button
              type="button"
              onClick={back}
              className="h-12 px-4 rounded-lg border border-slate-200 text-slate-700 font-medium flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-md"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
              className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-md"
            >
              <ShieldCheck className="h-4 w-4" /> Finalizar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Subcomponents ----------
function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((s, i) => {
        const active = current === s.id;
        const done = current > s.id;
        return (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  done
                    ? "bg-emerald-600 text-white"
                    : active
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <span
                className={`mt-1.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
                  active || done ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 rounded transition-colors ${
                  done ? "bg-emerald-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  error?: string;
}
function Field({ label, value, onChange, placeholder, type = "text", inputMode = "text", error }: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`mt-1 w-full bg-white border rounded-lg px-3 h-[44px] text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
          error ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}
function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{label}</p>
      <p className="text-sm text-slate-700 truncate">{value || <span className="text-slate-300">—</span>}</p>
    </div>
  );
}
