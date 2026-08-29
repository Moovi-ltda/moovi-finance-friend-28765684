import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import mooviLogo from "@/assets/moovi-logo.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FinalCTA = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const scrollToCTA = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511989269937&text=Quero+testar+o+MOOVI&type=phone_number&app_absent=0', '_blank');
  };

  const currentYear = new Date().getFullYear();

  return (
    <section id="cta-section" className="bg-primary">
      {/* Main CTA content */}
      <div className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
          <div className="text-center space-y-8">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white fade-in-scroll ${isVisible ? 'visible' : ''}`}>
              Comece agora mesmo seu teste gratuito de 3 dias
            </h2>
            
            <p className={`text-lg text-white/90 max-w-2xl mx-auto fade-in-scroll fade-in-scroll-delay-100 ${isVisible ? 'visible' : ''}`}>
              Simplifique suas finanças com o MOOVI. Sem complicação, sem cartão de crédito.
            </p>

            <Button 
              size="xl" 
              className={`bg-white hover:bg-gray-50 text-primary shadow-xl group text-base px-12 fade-in-scroll fade-in-scroll-delay-200 ${isVisible ? 'visible' : ''}`}
              onClick={scrollToCTA}
            >
              Testar grátis agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Trust indicators */}
            <div className={`flex flex-wrap items-center justify-center gap-6 text-white/90 pt-4 fade-in-scroll fade-in-scroll-delay-300 ${isVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>3 dias grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer integrated */}
      <div className={`bg-primary/90 border-t border-white/10 py-12 fade-in-scroll fade-in-scroll-delay-400 ${isVisible ? 'visible' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6">
            <img 
              src={mooviLogo} 
              alt="MOOVI Logo" 
              className="h-10 brightness-0 invert"
            />
            <p className="text-white/70 text-sm text-center">
              © {currentYear} MOOVI. Todos os direitos reservados. Controle financeiro inteligente no seu Dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
