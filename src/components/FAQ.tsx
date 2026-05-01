import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FAQ() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const faqs = [
    {
      question: "É seguro? Meus dados estão protegidos?",
      answer: "100% seguro. Utilizamos a mesma criptografia de ponta a ponta que os grandes bancos usam. O Moovi não movimenta seu dinheiro e não tem acesso às suas contas bancárias. Seus dados são seus e de mais ninguém."
    },
    {
      question: "Preciso baixar algum aplicativo?",
      answer: "Não! Essa é a mágica. O Moovi funciona direto no seu WhatsApp, o app que você já usa todo dia. Nada de apps pesados ocupando memória do seu celular."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Você escolhe o plano ideal para você, realiza o pagamento de forma segura e recebe acesso imediato no WhatsApp. Sem espera, sem burocracia. É pagar e começar a usar."
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim! Sem multa, sem taxa, sem burocracia. Você pode cancelar a qualquer momento pelo próprio WhatsApp ou entrando em contato com nosso suporte."
    },
    {
      question: "Serve para quem ganha pouco?",
      answer: "Serve principalmente para quem quer fazer o dinheiro sobrar. O Moovi te ajuda a encontrar os 'gastos invisíveis' que comem seu salário, independente de quanto você ganha. Na verdade, quem ganha menos é quem mais precisa de controle."
    },
    {
      question: "O que é o Dashboard?",
      answer: "É o seu painel profissional de finanças. Nele você visualiza gráficos interativos, relatórios detalhados, histórico de gastos por categoria e pode exportar tudo em PDF ou Excel. É como ter uma assessoria financeira na palma da mão."
    },
  ];

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="container px-4 mx-auto max-w-3xl" ref={elementRef}>
        <div className={`text-center mb-10 md:mb-14 fade-in-scroll ${isVisible ? 'visible' : ''}`}>
          <span className="inline-block text-sm font-semibold text-moovi-mint uppercase tracking-wider mb-3">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Ainda com dúvida?</h2>
          <p className="text-white/70">
            Respondemos as dúvidas de mais de 5.240 membros.
          </p>
        </div>

        <div className={`fade-in-scroll fade-in-scroll-delay-200 ${isVisible ? 'visible' : ''}`}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left font-semibold text-white hover:text-moovi-mint hover:no-underline py-5 text-sm md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed pb-5 text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA after FAQ */}
        <div className="text-center mt-10">
          <p className="text-sm text-white/50 mb-4">Não encontrou sua dúvida? Fale com nosso suporte.</p>
          <Button
            variant="outline"
            className="rounded-xl border-moovi-mint/30 text-moovi-mint hover:bg-moovi-mint hover:text-moovi-green-deep transition-all bg-transparent"
            onClick={() => scrollToSection("pricing-section")}
          >
            Ver planos disponíveis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}