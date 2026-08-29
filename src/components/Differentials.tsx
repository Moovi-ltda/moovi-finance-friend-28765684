import { Smartphone, Zap, MessageCircle, Clock, X, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TextAnimate } from "@/components/ui/text-animate";
const Differentials = () => {
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.15
  });
  return <section className="py-16 md:py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          <TextAnimate animation="slideUp" by="word">
            Não é só mais um app de finanças
          </TextAnimate>
        </h2>
        <p className={`text-xl sm:text-2xl text-center text-muted-foreground mb-12 fade-in-scroll fade-in-scroll-delay-100 ${isVisible ? 'visible' : ''}`}>
          É o seu Assessor Pessoal de Bolso
        </p>
        
        {/* Trust Badges - Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 mb-16">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[{
              icon: Smartphone,
              text: "Sem instalar nada novo",
              subtitle: "Tudo acontece no Dashboard"
            }, {
              icon: Zap,
              text: "Sem complicação",
              subtitle: "Simples como uma mensagem"
            }, {
              icon: MessageCircle,
              text: "Navegação intuitiva",
              subtitle: "Como falar com um amigo"
            }, {
              icon: Clock,
              text: "Disponível 24h",
              subtitle: "Seu assessor nunca tira folga"
            }].map((badge, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-[200px] bg-card rounded-xl p-5 text-center shadow-lg border border-border snap-start"
              >
                <badge.icon className="w-10 h-10 text-primary mx-auto mb-2" />
                <p className="font-semibold text-sm mb-1">{badge.text}</p>
                <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges - Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[{
            icon: Smartphone,
            text: "Sem instalar nada novo",
            subtitle: "Tudo acontece no Dashboard"
          }, {
            icon: Zap,
            text: "Sem complicação",
            subtitle: "Simples como uma mensagem"
          }, {
            icon: MessageCircle,
            text: "Navegação intuitiva",
            subtitle: "Como falar com um amigo"
          }, {
            icon: Clock,
            text: "Disponível 24h",
            subtitle: "Seu assessor nunca tira folga"
          }].map((badge, i) => (
            <div 
              key={i} 
              className={`bg-card rounded-xl p-6 text-center shadow-lg border border-border card-hover fade-in-scroll fade-in-scroll-delay-${i * 100} ${isVisible ? 'visible' : ''}`}
            >
              <badge.icon className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-semibold mb-1">{badge.text}</p>
              <p className="text-sm text-muted-foreground">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default Differentials;
