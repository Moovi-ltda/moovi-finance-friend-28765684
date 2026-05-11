import { useRef } from "react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Pricing() {
  const navigate = useNavigate();
  const pricingRef = useRef<HTMLDivElement>(null);

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

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <section
      id="pricing-section"
      className="min-h-screen mx-auto relative overflow-hidden py-24 bg-white"
      ref={pricingRef}
    >
      {/* Background — subtle green glow on white */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <article className="text-center mb-16 pt-10 max-w-3xl mx-auto space-y-4 relative z-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.1}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Escolha seu plano e comece agora
          </VerticalCutReveal>
        </h2>

        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="text-gray-500 text-lg"
        >
          Controle financeiro direto no WhatsApp, 24h por dia.
        </motion.p>
      </article>

      {/* Center Radial Glow Behind Cards */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(34,197,94,0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 max-w-6xl gap-6 px-4 mx-auto relative z-20">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            custom={3 + index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="h-full"
          >
            <Card
              className={`relative h-full flex flex-col border rounded-3xl ${
                plan.isPopular
                  ? "bg-white shadow-[0px_-10px_80px_0px_rgba(34,197,94,0.12)] border-moovi-green/30 ring-2 ring-moovi-green/20 z-20 md:-mt-4 md:mb-4"
                  : "bg-white shadow-lg border-gray-200 z-10 hover:shadow-xl transition-shadow"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-md ${
                    plan.badgeStyle === "solid"
                      ? "bg-moovi-green text-white"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}>
                    {plan.badgeStyle === "solid" && <Star className="w-3.5 h-3.5 fill-current" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              <CardHeader className="text-left pt-10 pb-6 border-b border-gray-100 relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 relative z-10">{plan.name}</h3>

                <div className="flex flex-col mb-2 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-gray-400 font-medium">R$</span>
                    <NumberFlow
                      format={{ style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      value={plan.installmentPrice}
                      className="text-[3.5rem] leading-none font-bold text-gray-900 tracking-tight"
                    />
                    <span className="text-lg text-gray-400 font-medium ml-1">/mês</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 font-medium">
                    R$ {plan.totalPrice.toFixed(2).replace(".", ",")} à vista ou em 12x
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-4 leading-relaxed relative z-10">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-8 flex flex-col flex-1 relative z-10">
                <button
                  onClick={() => {
                    const afiliadoId = localStorage.getItem("moovi_afiliado_id");
                    if (afiliadoId) {
                      fetch("https://n8n.fisherai.shop/webhook/rastrear-clique", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ afiliado_id: afiliadoId, plano: plan.name.replace("Plano ", "").toUpperCase() }),
                      }).catch(() => {});
                    }
                    navigate("/checkout", { state: { plan } });
                  }}
                  className={`w-full mb-8 p-4 text-base font-bold rounded-2xl transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-moovi-green hover:bg-moovi-green-dark text-white shadow-lg shadow-moovi-green/20 hover:shadow-xl hover:shadow-moovi-green/30 hover:-translate-y-0.5"
                      : "bg-moovi-green hover:bg-moovi-green-dark text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-5">
                  {plan.includesFrom && (
                    <h4 className="font-semibold text-sm text-moovi-green flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      {plan.includesFrom}
                    </h4>
                  )}
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <Check className="h-4.5 w-4.5 text-moovi-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
