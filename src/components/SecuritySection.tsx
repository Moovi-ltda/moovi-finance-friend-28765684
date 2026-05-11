import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";

const VerifiedBadge = ({ className }: { className?: string }) => (
  <img src="/verified-badge.png" alt="Verificado pela Meta" className={className} />
);

export default function SecuritySection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-32 text-white flex justify-center px-4 relative overflow-hidden" id="seguranca-section">
      {/* Decorative blobs para dar profundidade ao fundo sem criar bordas */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-moovi-mint/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="container max-w-3xl relative z-10" ref={elementRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative px-5 pt-14 pb-10 md:px-12 md:pt-16 md:pb-12 text-center mx-auto w-full bg-[#0A0B0E] border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-2xl"
        >
          {/* Floating Verified Badge */}
          <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2">
            <VerifiedBadge className="w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(0,136,255,0.4)]" />
          </div>

          {/* Meta Logo */}
          <div className="flex justify-center mb-6 mt-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" 
              alt="Meta" 
              className="h-5 md:h-6 invert brightness-0 opacity-90"
            />
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight text-white leading-tight">
            Somos verificados <br className="hidden sm:block" /> pela <span className="text-[#0088FF] drop-shadow-sm">Meta</span>
          </h2>

          {/* Description */}
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-medium px-2 md:px-0 mb-10 md:mb-12">
            O selo exibido no nosso perfil garante que você tenha mais segurança ao conversar com a Moovi no WhatsApp. Esse selo indica que a Meta verificou nossa conta com base nas atividades no WhatsApp e documentos fornecidos.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
