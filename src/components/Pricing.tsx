import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PricingToggle } from "@/components/ui/pricing-toggle";

export function Pricing() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const plans = [
    {
      name: "Plano Básico",
      installmentPrice: 14.9,
      totalPrice: 178.8,
      period: "x12",
      features: [
        { text: "Registro de despesas/receitas via WhatsApp", included: true },
        { text: "Categorização inteligente de gastos", included: true },
        { text: "Compromissos automáticos", included: true },
        { text: "Controle de orçamentos", included: true },
        { text: "Lembretes automáticos de vencimento", included: true },
        { text: "Acesso ao Dashboard", included: true },
        { text: "Suporte padrão", included: true },
      ],
      description: "Ideal para começar a organizar suas finanças.",
      buttonText: "Assinar Básico",
      href: "#",
      isPopular: false,
      badge: "Mais flexível",
      badgeStyle: "outline" as const,
      buttonStyle: "outline" as const,
    },
    {
      name: "Plano Pro",
      installmentPrice: 19.9,
      totalPrice: 238.8,
      period: "x12",
      includesFrom: "Tudo do plano Básico, e mais:",
      features: [
        { text: "Integração com Google Agenda", included: true },
        { text: "Gráficos visuais no Dashboard", included: true },
        { text: "Relatórios financeiros mensais detalhados", included: true },
        { text: "Exportação de dados (PDF/Excel)", included: true },
        { text: "Criação de metas e limites de gastos", included: true },
        { text: "Alertas preventivos de orçamento", included: true },
        { text: "Compromissos recorrentes", included: true },
        { text: "Contas a pagar/receber", included: true },
        { text: "Suporte prioritário humanizado", included: true },
      ],
      description: "O plano mais completo para quem quer resultados.",
      buttonText: "Assinar Pro",
      href: "#",
      isPopular: true,
      badge: "MAIS RECOMENDADO",
      badgeStyle: "solid" as const,
      buttonStyle: "primary" as const,
    },
    {
      name: "Plano Premium",
      installmentPrice: 24.9,
      totalPrice: 298.8,
      period: "x12",
      includesFrom: "Tudo do plano Pro, e mais:",
      features: [
        { text: "Análise de gastos com Inteligência Artificial", included: true },
        { text: "Gestão de múltiplos cartões de crédito", included: true },
        { text: "Gestão de múltiplas contas bancárias", included: true },
        { text: "Leitura automatizada de comprovantes", included: true },
        { text: "Modo Áudio", included: true },
        { text: "Conversão de moedas automático", included: true },
        { text: "Open Finance (em breve)", included: true },
        { text: "Atendimento VIP exclusivo", included: true },
      ],
      description: "Maior economia no longo prazo",
      buttonText: "Assinar Premium",
      href: "#",
      isPopular: false,
      badge: "Maior economia no longo prazo",
      badgeStyle: "outline" as const,
      buttonStyle: "outline" as const,
    },
  ];

  return (
    <section id="pricing-section" className="py-20 bg-muted/30">
      <div ref={elementRef}>
        <PricingToggle
          plans={plans}
          title="Escolha seu plano e comece agora"
          description="Controle financeiro direto no WhatsApp, 24h por dia."
        />
      </div>
    </section>
  );
}
