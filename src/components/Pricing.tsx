import { useRef } from "react";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
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
      className="min-h-screen mx-auto relative bg-[#05150C] overflow-hidden py-24"
      ref={pricingRef}
    >
      {/* Background Grid & Sparkles */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="absolute top-0 h-[600px] w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F6B3A1c_1px,transparent_1px),linear-gradient(to_bottom,#0F6B3A11_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={1200}
          direction="bottom"
          speed={1}
          color="#25D366"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </motion.div>

      {/* Decorative Ellipses (Top Massive Glow) */}
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-start content-start overflow-hidden p-0 z-0 pointer-events-none"
      >
        <div
          className="absolute top-[-500px] w-[1800px] h-[1200px] rounded-[100%] flex-none"
          style={{
            border: "250px solid #25D366", // Vibrant WhatsApp/Neon Green
            filter: "blur(140px)",
            WebkitFilter: "blur(140px)",
            opacity: 0.15,
            transform: "scale(1.2)"
          }}
        ></div>
        <div
          className="absolute top-[-400px] w-[1200px] h-[800px] rounded-[100%] flex-none"
          style={{
            border: "150px solid #0F6B3A", // Moovi Green Deep
            filter: "blur(100px)",
            WebkitFilter: "blur(100px)",
            opacity: 0.25,
          }}
        ></div>
      </motion.div>

      {/* Header */}
      <article className="text-center mb-16 pt-10 max-w-3xl mx-auto space-y-4 relative z-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
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
          className="text-white/80 text-lg"
        >
          Controle financeiro direto no WhatsApp, 24h por dia.
        </motion.p>
      </article>

      {/* Center Radial Glow Behind Cards */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #0F6B3A 0%, transparent 60%)`,
          opacity: 0.35,
          mixBlendMode: "screen",
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
              className={`relative h-full flex flex-col border ${
                plan.isPopular
                  ? "bg-gradient-to-b from-[#0A120D] to-[#050A07] shadow-[0px_-15px_150px_0px_rgba(37,211,102,0.25)] border-[#0F6B3A]/50 z-20 md:-mt-4 md:mb-4"
                  : "bg-gradient-to-b from-[#070D09] to-[#030604] shadow-xl border-white/5 z-10"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-xl ${
                    plan.badgeStyle === "solid" 
                      ? "bg-gradient-to-r from-[#0F6B3A] to-[#169C55] text-white border border-[#25D366]/40 shadow-[0_0_20px_rgba(37,211,102,0.3)]" 
                      : "bg-[#1A251E] text-white/80 border border-white/10"
                  }`}>
                    {plan.badgeStyle === "solid" && <Star className="w-3.5 h-3.5 fill-current text-[#25D366]" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              <CardHeader className="text-left pt-10 pb-6 border-b border-white/5 relative overflow-hidden">
                {/* Subtle inner glow for the header */}
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#25D366]/10 blur-[50px] pointer-events-none" />
                )}
                
                <h3 className="text-3xl font-semibold mb-4 text-white relative z-10">{plan.name}</h3>
                
                <div className="flex flex-col mb-2 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl text-white/60 font-medium">R$</span>
                    <NumberFlow
                      format={{ style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                      value={plan.installmentPrice}
                      className="text-[3.5rem] leading-none font-bold text-white tracking-tight"
                    />
                    <span className="text-lg text-white/60 font-medium ml-1">/mês</span>
                  </div>
                  <p className="text-sm text-white/40 mt-3 font-medium">
                    R$ {plan.totalPrice.toFixed(2).replace(".", ",")} à vista ou em 12x
                  </p>
                </div>
                
                <p className="text-sm text-white/60 mt-4 leading-relaxed relative z-10">{plan.description}</p>
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
                  className={`w-full mb-8 p-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-t from-[#0F6B3A] to-[#25D366] text-white shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] border border-[#25D366]/50 hover:scale-[1.02]"
                      : "bg-gradient-to-t from-[#0A100C] to-[#1A251E] hover:from-[#111A13] hover:to-[#223027] text-white border border-white/10 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-5">
                  {plan.includesFrom && (
                    <h4 className="font-semibold text-sm text-[#25D366] flex items-center gap-2">
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
                        <Check className="h-4.5 w-4.5 text-[#25D366] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/80 leading-relaxed">{feature.text}</span>
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
