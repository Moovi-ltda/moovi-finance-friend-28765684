import { motion } from "framer-motion";
import { CreditCard, MessageSquare, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: CreditCard,
    number: "01",
    title: "Escolha seu plano",
    description: "Selecione o plano ideal para você. Pagamento rápido e seguro.",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "Receba acesso imediato",
    description: "Após o pagamento, você recebe o acesso direto no WhatsApp. Sem espera.",
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "A Moovi faz o resto",
    description: "Registre gastos por texto ou áudio. A IA organiza, categoriza e te alerta.",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
];

export default function HowItWorks() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl" ref={elementRef}>
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 fade-in-scroll ${isVisible ? "visible" : ""}`}>
          <span className="inline-block text-sm font-semibold text-moovi-green uppercase tracking-wider mb-3">
            Como funciona
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pagou? Pronto. A Moovi faz o resto.
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Em menos de 2 minutos você já está organizando suas finanças pelo WhatsApp.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative bg-white rounded-2xl border-2 ${step.borderColor} p-6 md:p-8 text-center group hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                  Passo {step.number}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 md:-right-5 w-8 md:w-10 h-px bg-gray-200 -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}