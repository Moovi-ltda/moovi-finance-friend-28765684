import { AnimatedButton } from "@/components/ui/animated-button";
import { scrollToSection } from "@/utils/scroll";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Junte-se a{" "}
            <span className="text-moovi-mint">+5.240 brasileiros</span> que já
            transformaram suas finanças
          </h2>

          <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Pare de perder dinheiro por falta de organização. Tenha controle real da sua vida financeira direto no seu Dashboard.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/80 text-sm ml-2 font-medium">4.9/5 de avaliação</span>
          </div>

          <AnimatedButton
            size="xl"
            variant="mooviWhite"
            text="Escolher meu plano"
            onClick={() => scrollToSection("pricing-section")}
          />

          <p className="text-white/50 text-xs mt-4 font-medium">
            Cancele quando quiser · Sem burocracia
          </p>
        </motion.div>
      </div>
    </section>
  );
}
