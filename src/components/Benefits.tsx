import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  Mic, 
  Camera,
  Bell, 
  BarChart3, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  {
    icon: MessageCircle,
    title: "Registre em segundos",
    description: "Lance receitas e despesas direto no Dashboard e mantenha tudo organizado automaticamente.",
  },
  {
    icon: Mic,
    title: "Categorias inteligentes",
    description: "Organize cada lançamento com categorias e filtros que facilitam sua rotina.",
  },
  {
    icon: Camera,
    title: "Anexe comprovantes",
    description: "Guarde notas e comprovantes junto dos lançamentos no Dashboard.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Acompanhe alertas de orçamento no Dashboard e agende lembretes de vencimentos.",
  },
  {
    icon: BarChart3,
    title: "Relatórios visuais",
    description: "Veja gráficos claros sobre onde seu dinheiro está indo, direto no Dashboard.",
  },
  {
    icon: Calendar,
    title: "Lembrete de contas",
    description: "Agende boletos e compromissos na plataforma. O lembrete chega no seu WhatsApp na hora certa.",
  },
];

const Benefits = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });
  
  const scrollToCTA = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511989269937&text=Quero+testar+o+MOOVI&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 fade-in-scroll ${isVisible ? 'visible' : ''}`}>
            Transforme finanças complicadas em algo simples e automático
          </h2>
          <p className={`text-lg text-gray-600 fade-in-scroll fade-in-scroll-delay-100 ${isVisible ? 'visible' : ''}`}>
            O MOOVI funciona do jeito que você já vive. Sem apps novos, sem curva de aprendizado.
          </p>
        </div>

        {/* Benefits - Mobile: horizontal scroll, Desktop: grid */}
        <div className="md:hidden mb-12 -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="flex-shrink-0 w-[280px] border-0 shadow-md snap-start"
                  style={{ backgroundColor: 'hsl(42, 100%, 95%)' }}
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits grid - Desktop only */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const delay = 200 + (index * 100);
            const delayClass = `fade-in-scroll-delay-${Math.min(delay, 800)}`;
            return (
              <Card 
                key={index}
                className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 fade-in-scroll ${delayClass} ${isVisible ? 'visible' : ''}`}
                style={{ backgroundColor: 'hsl(42, 100%, 95%)' }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="xl" 
            className={`bg-primary hover:bg-primary-hover text-white shadow-lg group fade-in-scroll fade-in-scroll-delay-800 ${isVisible ? 'visible' : ''}`}
            onClick={scrollToCTA}
          >
            Teste grátis por 3 dias
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
