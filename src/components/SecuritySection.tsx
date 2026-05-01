import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";

const VerifiedBadge = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g filter="url(#drop-shadow)">
      <path d="M24 3.5C25.797 3.5 27.42 4.417 28.318 5.865L29.351 7.534C29.832 8.31 30.638 8.8 31.536 8.875L33.535 9.043C35.253 9.186 36.657 10.428 37.034 12.13L37.468 14.093C37.67 14.996 38.257 15.767 39.066 16.202L40.866 17.172C42.41 18.003 43.149 19.82 42.709 21.503L42.203 23.435C41.968 24.333 42.131 25.303 42.646 26.074L43.792 27.787C44.776 29.258 44.428 31.282 42.981 32.378L41.314 33.64C40.539 34.227 40.106 35.152 40.134 36.142L40.168 37.28C40.196 39.034 38.831 40.505 37.078 40.56L35.064 40.622C34.129 40.651 33.279 41.139 32.748 41.942L31.554 43.754C30.528 45.311 28.435 45.811 26.837 44.91L25.106 43.935C24.303 43.483 23.332 43.483 22.529 43.935L20.798 44.91C19.2 45.811 17.107 45.311 16.081 43.754L14.887 41.942C14.356 41.139 13.506 40.651 12.571 40.622L10.557 40.56C8.804 40.505 7.439 39.034 7.467 37.28L7.501 36.142C7.529 35.152 7.096 34.227 6.321 33.64L4.654 32.378C3.207 31.282 2.859 29.258 3.843 27.787L4.989 26.074C5.504 25.303 5.667 24.333 5.432 23.435L4.926 21.503C4.486 19.82 5.225 18.003 6.769 17.172L8.569 16.202C9.378 15.767 9.965 14.996 10.167 14.093L10.601 12.13C10.978 10.428 12.382 9.186 14.1 9.043L16.099 8.875C16.997 8.8 17.803 8.31 18.284 7.534L19.317 5.865C20.215 4.417 21.838 3.5 23.635 3.5H24Z" fill="#0088FF"/>
    </g>
    <path d="M20 31.5L14 25.5L16.12 23.38L20 27.26L31.88 15.38L34 17.5L20 31.5Z" fill="white"/>
    <defs>
      <filter id="drop-shadow" x="-2" y="-2" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3" />
      </filter>
    </defs>
  </svg>
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

          {/* Bottom Tabs/Buttons */}
          <div className="flex flex-row flex-nowrap gap-3 md:gap-4 w-full max-w-[340px] md:max-w-[380px] mx-auto justify-center px-0">
            <button 
              onClick={() => scrollToSection('testimonials-section')}
              className="flex-1 px-2 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-[#2A2B2E] border border-white/5 hover:bg-white/10 text-white text-[13px] sm:text-[14px] md:text-[15px] font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              Depoimentos
            </button>
            <button 
              className="flex-1 px-2 py-3.5 md:py-4 rounded-xl md:rounded-2xl bg-[#2A2B2E] border border-white/5 hover:bg-white/10 text-white text-[13px] sm:text-[14px] md:text-[15px] font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              Segurança
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
