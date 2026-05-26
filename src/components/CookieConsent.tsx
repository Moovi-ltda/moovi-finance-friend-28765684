import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "moovi_cookie_consent";

function safe(fn: () => void, label: string) {
  try {
    fn();
  } catch (err) {
    console.warn(`[CookieConsent] Falha ao injetar ${label}:`, err);
  }
}

function injectMetaPixel() {
  if (typeof window === "undefined" || (window as any).fbq) return;
  (function (f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  (window as any).fbq("init", "1508120273749046");
  (window as any).fbq("track", "PageView");

  if (!document.getElementById("fb-pixel-noscript")) {
    const noscript = document.createElement("noscript");
    noscript.id = "fb-pixel-noscript";
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = "https://www.facebook.com/tr?id=1508120273749046&ev=PageView&noscript=1";
    noscript.appendChild(img);
    document.body.appendChild(noscript);
  }
}

function injectUTMify() {
  if (document.getElementById("utmify-script")) return;
  const script = document.createElement("script");
  script.id = "utmify-script";
  script.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
  script.async = true;
  script.defer = true;
  script.setAttribute("data-utmify-prevent-xcod-sck", "");
  script.setAttribute("data-utmify-prevent-subids", "");
  script.onerror = () => console.warn("[CookieConsent] UTMify falhou ao carregar");
  document.head.appendChild(script);
}

function injectPromotekit() {
  if (document.getElementById("promotekit-script")) return;
  const script = document.createElement("script");
  script.id = "promotekit-script";
  script.async = true;
  script.src = "https://cdn.promotekit.com/promotekit.js";
  script.setAttribute("data-promotekit", "560dec5e-0938-422d-bee3-2e6c985c5a21");
  script.onerror = () => console.warn("[CookieConsent] Promotekit falhou ao carregar");
  document.body.appendChild(script);

  const interval = window.setInterval(() => {
    try {
      const referralId = (window as any).promotekit_referral;
      if (!referralId) return;
      document.querySelectorAll('a[href^="https://buy.stripe.com/"]').forEach((link) => {
        const oldUrl = link.getAttribute("href");
        if (oldUrl && !oldUrl.includes("client_reference_id")) {
          const sep = oldUrl.includes("?") ? "&" : "?";
          link.setAttribute("href", oldUrl + sep + "client_reference_id=" + referralId);
        }
      });
    } catch (e) {
      /* noop */
    }
  }, 2000);
  (window as any).__promotekit_interval = interval;
}

export function activateThirdPartyScripts() {
  if (typeof window === "undefined") return;
  // Defer to next tick so it never blocks render
  setTimeout(() => {
    safe(injectMetaPixel, "Meta Pixel");
    safe(injectUTMify, "UTMify");
    safe(injectPromotekit, "Promotekit");
  }, 0);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      } else if (stored === "accepted") {
        activateThirdPartyScripts();
      }
    } catch (err) {
      console.warn("[CookieConsent] localStorage indisponível:", err);
    }
  }, []);

  const handleAccept = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}
    setVisible(false);
    activateThirdPartyScripts();
  }, []);

  const handleReject = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "rejected");
    } catch {}
    setVisible(false);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4 pointer-events-none transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto w-full max-w-[28rem] rounded-2xl border border-border/50 bg-white/95 dark:bg-[#0A1A10]/95 backdrop-blur-md shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <div className="w-9 h-9 rounded-full bg-moovi-green/10 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-moovi-green" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                Sua privacidade importa
              </h3>
              <button
                onClick={handleReject}
                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Fechar aviso de cookies"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">
              Usamos cookies e tecnologias semelhantes para melhorar sua experiência, entender como você usa nosso site e personalizar conteúdo. Ao aceitar, você permite o uso de analytics e pixels de rastreamento.
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Button
                size="sm"
                variant="mooviPrimary"
                className="rounded-full text-xs h-9 px-5 font-bold"
                onClick={handleAccept}
              >
                Aceitar Todos
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full text-xs h-9 px-4 font-semibold border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleReject}
              >
                Recusar
              </Button>
              <a
                href="/privacidade"
                className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-moovi-green underline underline-offset-2 transition-colors ml-auto sm:ml-0"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
