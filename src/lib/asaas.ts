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
  creditCardBrand?: string;
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

export const tokenizeCard = (input: {
  customerName: string;
  customerEmail: string;
  customerCpfCnpj: string;
  customerPhone: string;
  number: string;
  mes: string;
  anoCompleto: string;
  ccv: string;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Verifica se o SDK do Asaas foi carregado no index.html ou via script
    if (typeof window === "undefined" || !(window as any).asaas) {
      return reject(
        new Error("Erro de conexão com o gateway de pagamento. Tente recarregar a página."),
      );
    }

    const creditCard = {
      customerName: input.customerName.trim(),
      customerEmail: input.customerEmail.trim(),
      customerCpfCnpj: input.customerCpfCnpj.replace(/\D/g, ""),
      customerPhone: input.customerPhone.replace(/\D/g, ""),
      creditCardNumber: input.number.replace(/\D/g, ""),
      creditCardMonth: input.mes.trim().padStart(2, "0"),
      creditCardYear: input.anoCompleto.trim(),
      creditCardCcv: input.ccv.trim(),
    };

    (window as any).asaas.creditCard.tokenize(creditCard, {
      onSuccess: (data: any) => {
        if (data && data.creditCardToken) {
          resolve(data.creditCardToken);
        } else {
          reject(new Error("Falha ao gerar token de segurança do cartão."));
        }
      },
      onError: (error: any) => {
        reject(new Error(error?.description || error?.message || "Dados do cartão inválidos."));
      },
    });
  });
};
