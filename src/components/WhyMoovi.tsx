import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Zap, 
  GraduationCap,
  Trophy,
  Shield,
  ArrowRight
} from "lucide-react";
import mooviMascot from "@/assets/moovi-mascot.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reasons = [
  {
    icon: Smartphone,
    title: "Tudo no seu navegador",
    description: "Sem precisar baixar mais um app. Funciona onde você já passa o dia.",
  },
  {
    icon: Zap,
    title: "Rápido e prático",
    description: "Registre uma despesa em 10 segundos. Menos tempo do que abrir uma planilha.",
  },
  {
    icon: GraduationCap,
    title: "Educativo",
    description: "Aprenda sobre suas finanças com dicas e insights personalizados.",
  },
  {
    icon: Trophy,
    title: "Gamificação",
    description: "Conquiste metas, desbloqueie conquistas e torne o controle financeiro divertido.",
  },
  {
    icon: Shield,
    title: "Seguro e privado",
    description: "Seus dados financeiros protegidos com criptografia de ponta a ponta.",
  },
];

const WhyMoovi = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  
  const scrollToCTA = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511989269937&text=Quero+testar+o+MOOVI&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16" ref={elementRef}>
          {/* Left column - Content */}
          <div className="space-y-6">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 fade-in-scroll ${isVisible ? 'visible' : ''}`}>
              Por que escolher o MOOVI?
            </h2>
            <p className={`text-lg text-gray-600 leading-relaxed fade-in-scroll fade-in-scroll-delay-100 ${isVisible ? 'visible' : ''}`}>
              Porque cuidar do seu dinheiro não deveria ser uma tarefa chata e complicada.
            </p>

            {/* Reasons list */}
            <div className="space-y-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                const delay = 200 + (index * 100);
                const delayClass = `fade-in-scroll-delay-${Math.min(delay, 600)}`;
                return (
                  <div key={index} className={`flex gap-4 items-start fade-in-scroll ${delayClass} ${isVisible ? 'visible' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                      <p className="text-sm text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              size="xl" 
              className={`bg-primary hover:bg-primary-hover text-white shadow-lg group fade-in-scroll fade-in-scroll-delay-700 ${isVisible ? 'visible' : ''}`}
              onClick={scrollToCTA}
            >
              Começar teste gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right column - Mascot with floating cards */}
          <div className={`relative fade-in-scroll fade-in-scroll-delay-300 ${isVisible ? 'visible' : ''}`}>
            <div className="relative z-10 flex justify-center">
              <img 
                src={mooviMascot} 
                alt="MOOVI Mascot" 
                className="w-full max-w-md object-contain"
              />
            </div>
            
            {/* Floating card - Meta atingida */}
            <div className={`absolute top-8 right-8 bg-white rounded-xl shadow-xl p-4 animate-float max-w-[200px] fade-in-scroll fade-in-scroll-delay-500 ${isVisible ? 'visible' : ''}`}>
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <div className="text-xs text-gray-500">Meta atingida</div>
                  <div className="text-2xl font-bold text-gray-900">4/5</div>
                </div>
              </div>
            </div>

            {/* Floating card - Economia */}
            <div className={`absolute bottom-16 left-8 bg-white rounded-xl shadow-xl p-4 animate-float-delayed max-w-[240px] fade-in-scroll fade-in-scroll-delay-600 ${isVisible ? 'visible' : ''}`}>
              <div className="text-sm text-gray-600 mb-1">Economizando</div>
              <div className="text-3xl font-bold text-primary mb-1">+23%</div>
              <div className="text-xs text-gray-500">vs mês anterior</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMoovi;
