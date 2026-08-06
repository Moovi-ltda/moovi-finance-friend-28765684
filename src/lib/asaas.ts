/**
 * Tokenização client-side via Asaas.js.
 * Os dados sensíveis existem apenas no navegador e nunca integram o payload do webhook.
 */

const ASAAS_JS_URL = "https://www.asaas.com/v3/asaas.js";
const PUBLISHABLE_KEY = (import.meta.env.VITE_ASAAS_PUBLIC_KEY as string | undefined) || "";

type AsaasCreditCard = {
  customerName: string;
  customerEmail: string;
  customerCpfCnpj: string;
  customerPhone: string;
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardMonth: string;
  creditCardYear: string;
  creditCardCcv: string;
};

type AsaasTokenResult = {
  creditCardToken?: string;
};

type AsaasTokenError = {
  description?: string;
  message?: string;
};

type AsaasGlobal = {
  setPublishableKey?: (key: string) => void;
  creditCard?: {
    tokenize?: (
      creditCard: AsaasCreditCard,
      callbacks: {
        onSuccess: (data: AsaasTokenResult) => void;
        onError: (error: AsaasTokenError) => void;
      },
    ) => void;
  };
};

declare global {
  interface Window {
    asaas?: AsaasGlobal;
  }
}

let loader: Promise<AsaasGlobal> | null = null;

const configureAsaas = (asaas: AsaasGlobal) => {
  if (PUBLISHABLE_KEY && asaas.setPublishableKey) {
    asaas.setPublishableKey(PUBLISHABLE_KEY);
  }
  return asaas;
};

export const loadAsaasJs = (): Promise<AsaasGlobal> => {
  if (typeof window === "undefined") return Promise.reject(new Error("Ambiente inválido."));
  if (window.asaas) return Promise.resolve(configureAsaas(window.asaas));
  if (loader) return loader;

  loader = new Promise<AsaasGlobal>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${ASAAS_JS_URL}"]`);
    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      if (!window.asaas) {
        reject(new Error("Não foi possível iniciar o serviço de pagamento seguro."));
        return;
      }
      resolve(configureAsaas(window.asaas));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Não foi possível carregar o serviço de pagamento seguro.")),
      { once: true },
    );

    if (!existing) {
      script.src = ASAAS_JS_URL;
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch((error) => {
    loader = null;
    throw error;
  });

  return loader;
};

export const tokenizeCard = async (input: {
  customerName: string;
  customerEmail: string;
  customerCpfCnpj: string;
  customerPhone: string;
  number: string;
  mes: string;
  anoCompleto: string;
  ccv: string;
}): Promise<string> => {
  const asaas = await loadAsaasJs();
  const tokenize = asaas.creditCard?.tokenize;
  if (!tokenize) {
    throw new Error("Serviço de tokenização indisponível. Tente novamente em instantes.");
  }

  const creditCard: AsaasCreditCard = {
    customerName: input.customerName.trim(),
    customerEmail: input.customerEmail.trim(),
    customerCpfCnpj: input.customerCpfCnpj.replace(/\D/g, ""),
    customerPhone: input.customerPhone.replace(/\D/g, ""),
    creditCardNumber: input.number.replace(/\D/g, ""),
    creditCardMonth: String(input.mes || "").padStart(2, "0"),
    creditCardYear: String(input.anoCompleto || ""),
    creditCardCcv: input.ccv.replace(/\D/g, ""),
  };

  return new Promise<string>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error("Tempo esgotado ao validar o cartão. Tente novamente."));
    }, 20000);

    try {
      tokenize(creditCard, {
        onSuccess: (data) => {
          window.clearTimeout(timeout);
          if (!data?.creditCardToken) {
            reject(new Error("Token do cartão não retornado pelo serviço de pagamento."));
            return;
          }
          resolve(data.creditCardToken);
        },
        onError: (error) => {
          window.clearTimeout(timeout);
          reject(new Error(error?.description || error?.message || "Não foi possível validar os dados do cartão."));
        },
      });
    } catch (err) {
      window.clearTimeout(timeout);
      reject(err instanceof Error ? err : new Error("Falha ao validar os dados do cartão."));
    }
  });
};
