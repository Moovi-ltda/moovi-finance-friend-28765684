import { X, Check, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";

const ComparisonSection = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const comparisons = [
    { feature: "Registrar gastos", moovi: "Mensagem no WhatsApp", others: "Abrir app, preencher campos" },
    { feature: "Categorização", moovi: "Automática com IA", others: "Manual, uma por uma" },
    { feature: "Alertas de orçamento", moovi: "Automáticos no WhatsApp", others: "Não tem ou por e-mail" },
    { feature: "Dashboard profissional", moovi: "Completo com gráficos", others: "Básico ou inexistente" },
    { feature: "Exportar relatórios", moovi: "PDF e Excel", others: "Limitado" },
    { feature: "Lembretes de contas", moovi: "No WhatsApp", others: "Notificação genérica" },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F6B3A1c_1px,transparent_1px),linear-gradient(to_bottom,#0F6B3A11_1px,transparent_1px)] bg-[size:70px_80px] pointer-events-none"></div>

      {/* Subtle Glow Behind the Table */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #0F6B3A 0%, transparent 60%)`,
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10" ref={elementRef}>
        <div className={`text-center mb-12 md:mb-16 fade-in-scroll ${isVisible ? "visible" : ""}`}>
          <span className="inline-block px-3 py-1 bg-[#25D366]/10 text-[#25D366] text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-[#25D366]/20">
            Comparativo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Moovi vs. métodos tradicionais
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Veja por que milhares de brasileiros estão trocando planilhas e apps complicados pelo Moovi.
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-[#0A0F0C] overflow-hidden shadow-[0_0_80px_rgba(15,107,58,0.15)]"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#0D1510] border-b border-white/10 relative overflow-hidden">
            <div className="p-4 md:p-6 text-sm font-semibold text-gray-500"></div>
            <div className="p-4 md:p-6 text-center relative">
              <div className="absolute inset-0 bg-[#25D366]/5 blur-xl pointer-events-none" />
              <span className="text-sm md:text-base font-bold text-white bg-gradient-to-r from-[#0F6B3A] to-[#25D366] px-4 md:px-6 py-1.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.3)] relative z-10">
                Moovi
              </span>
            </div>
            <div className="p-4 md:p-6 text-center flex items-center justify-center">
              <span className="text-sm font-medium text-white/40">
                Outros métodos
              </span>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((item, i) => {
            const hasCheck = item.moovi.includes("✅") || ["Completo com gráficos", "PDF e Excel", "No WhatsApp", "Automática com IA"].includes(item.moovi);
            const cleanMoovi = item.moovi.replace("✅ ", "");
            const hasCross = item.others.includes("❌");
            const cleanOthers = item.others.replace("❌ ", "");

            return (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "bg-transparent" : "bg-[#070B09]"}`}
              >
                <div className="p-4 md:p-5 flex items-center">
                  <span className="text-xs md:text-sm font-medium text-white/80">{item.feature}</span>
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center text-center gap-2 border-x border-white/[0.02] bg-[#0F6B3A]/[0.02]">
                  {hasCheck && <Check className="w-4 h-4 text-[#25D366] flex-shrink-0 hidden md:block" />}
                  <span className="text-xs md:text-sm text-[#25D366] font-semibold">{cleanMoovi}</span>
                </div>
                <div className="p-4 md:p-5 flex items-center justify-center text-center gap-2">
                  {hasCross && <X className="w-4 h-4 text-red-400/60 flex-shrink-0 hidden md:block" />}
                  <span className="text-xs md:text-sm text-white/40 line-through decoration-white/20">{cleanOthers}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <AnimatedButton
            size="xl"
            variant="mooviWhite"
            text="Quero usar o Moovi"
            onClick={() => scrollToSection("pricing-section")}
          />
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
