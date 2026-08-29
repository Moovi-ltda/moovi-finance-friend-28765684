import { X, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const Transformation = () => {
  const {
    elementRef,
    isVisible
  } = useScrollAnimation({
    threshold: 0.15
  });
  const pains = ["Tentando lembrar tudo de cabeça e esquecendo boletos importantes", "Sem saber para onde foi o dinheiro no final do mês", "Gastando tempo com planilhas que você nunca abre de novo", "Sentindo aquela angústia de não ter controle sobre suas finanças", "Adiando decisões financeiras porque tudo parece complicado demais"];
  const benefits = ["Suas contas ficam organizadas e os lembretes que você agenda chegam na hora certa", "Você sabe exatamente quanto gastou, quanto tem e quanto pode usar", "Tudo acontece na plataforma web, direto no seu navegador", "O Assistente Moovi ajuda você dentro do Dashboard 24 horas por dia", "Você finalmente tem clareza, controle e paz de espírito com seu dinheiro"];
  return <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
        {/* Dores */}
        <div className="mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center fade-in-scroll ${isVisible ? 'visible' : ''}`}>
            Você ainda vive assim?
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {pains.map((pain, i) => <div key={i} className={`flex items-start gap-4 bg-red-50 rounded-xl p-4 border border-red-200 fade-in-scroll fade-in-scroll-delay-${i * 100} ${isVisible ? 'visible' : ''}`}>
                <X className="text-red-500 w-6 h-6 shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-gray-700">{pain}</p>
              </div>)}
          </div>
        </div>
        
        {/* Benefícios */}
        <div className="mb-12 text-xl">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center fade-in-scroll ${isVisible ? 'visible' : ''}`}>Experimente a vida com Moovi💚</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => <div key={i} className={`flex items-start gap-4 bg-green-50 rounded-xl p-4 border border-green-200 fade-in-scroll fade-in-scroll-delay-${i * 100} ${isVisible ? 'visible' : ''}`}>
                <Check className="text-primary w-6 h-6 shrink-0 mt-1" />
                <p className="text-base sm:text-lg text-gray-700">{benefit}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Transformation;
