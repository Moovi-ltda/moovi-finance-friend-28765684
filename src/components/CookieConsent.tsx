import { useEffect, useState } from "react";

const STORAGE_KEY = "moovi_cookie_consent";

const injectTrackingScripts = () => {
  try {
    if ((window as any).__moovi_tracking_injected) return;
    (window as any).__moovi_tracking_injected = true;

    // Meta Pixel
    try {
      const metaPixel = document.createElement("script");
      metaPixel.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1508120273749046');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(metaPixel);
    } catch (e) {
      console.warn("Meta Pixel injection failed", e);
    }

    // UTMify
    try {
      const utmify = document.createElement("script");
      utmify.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
      utmify.async = true;
      utmify.defer = true;
      utmify.setAttribute("data-utmify-prevent-xcod-sck", "");
      utmify.setAttribute("data-utmify-prevent-subids", "");
      document.head.appendChild(utmify);
    } catch (e) {
      console.warn("UTMify injection failed", e);
    }

    // Promotekit
    try {
      const promotekit = document.createElement("script");
      promotekit.src = "https://cdn.promotekit.com/promotekit.js";
      promotekit.async = true;
      promotekit.setAttribute("data-promotekit", "560dec5e-0938-422d-bee3-2e6c985c5a21");
      document.head.appendChild(promotekit);
    } catch (e) {
      console.warn("Promotekit injection failed", e);
    }
  } catch (e) {
    console.warn("Tracking injection failed", e);
  }
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
        // pequeno delay para animar a entrada
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
      } else if (stored === "accepted") {
        setAccepted(true);
      }
    } catch {
      // localStorage indisponível — não bloqueia o site
    }
  }, []);

  useEffect(() => {
    if (accepted) injectTrackingScripts();
  }, [accepted]);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setAccepted(true);
    setMounted(false);
    setTimeout(() => setVisible(false), 300);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setMounted(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className={`fixed z-[9999] bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md
        transition-all duration-300 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="rounded-2xl backdrop-blur-xl bg-background/85 dark:bg-background/80 border border-border/60 shadow-2xl p-5">
        <p className="text-sm text-foreground/90 leading-relaxed">
          Usamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo.
          Ao continuar, você concorda com nossa{" "}
          <a
            href="/privacidade"
            className="underline underline-offset-2 text-primary hover:opacity-80"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 shadow-sm hover:opacity-95 active:scale-[0.98] transition"
          >
            Aceitar todos
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center rounded-xl border border-border bg-transparent text-foreground text-sm font-medium px-4 py-2.5 hover:bg-muted/50 active:scale-[0.98] transition"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
