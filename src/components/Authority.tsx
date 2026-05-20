import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { scrollToSection } from "@/utils/scroll";
import { AnimatedButton } from "@/components/ui/animated-button";
import { TextAnimate } from "@/components/ui/text-animate";

// --- DADOS ---
const metrics = [
  {
    id: 1,
    icon: Users,
    number: "+5.240",
    label: "Usuários Ativos",
    description: "Brasileiros que já retomaram o controle financeiro.",
  },
  {
    id: 2,
    icon: DollarSign,
    number: "+R$2.1 Mi",
    label: "Organizados",
    description: "Em finanças organizadas e economizadas.",
  },
  {
    id: 3,
    icon: TrendingUp,
    number: "27,3%",
    label: "Economia Média",
    description: "Gaste menos vendo para onde seu dinheiro vai.",
  },
  {
    id: 4,
    icon: Shield,
    number: "100%",
    label: "Dados Seguros",
    description: "Criptografia bancária para sua proteção.",
  },
];

// --- COMPONENTE DO CARD (Reutilizável) ---
const MetricCard = ({ metric }: { metric: (typeof metrics)[0] }) => (
  <div className="bg-white md:bg-card rounded-2xl shadow-lg border border-green-100 p-6 flex flex-col items-start justify-between h-full w-full min-h-[220px]">
    <div className="w-full">
      {/* Ícone */}
      <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <metric.icon className="w-6 h-6 text-green-600" />
      </div>

      {/* Dados */}
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{metric.number}</h3>
      <p className="text-lg font-semibold text-green-600 mb-3">{metric.label}</p>
    </div>

    {/* Descrição */}
    <p className="text-sm text-gray-500 leading-relaxed">{metric.description}</p>
  </div>
);

const Authority = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.15,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Funções de Navegação
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % metrics.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + metrics.length) % metrics.length);
  };

  // --- LÓGICA DE AUTOPLAY (5 SEGUNDOS) ---
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 segundos

    // Limpa o timer se o componente desmontar ou se o usuário interagir (mudar o index)
    // Isso evita que o slide pule duas vezes seguidas se você clicar no botão
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4" ref={elementRef}>
        {/* Header */}
        <div className={`text-center mb-12 max-w-4xl mx-auto fade-in-scroll ${isVisible ? "visible" : ""}`}>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <TextAnimate animation="slideUp" by="word">
              Milhares de brasileiros já organizaram suas vidas com o Moovi
            </TextAnimate>
          </h2>
        </div>

        {/* --- VERSÃO DESKTOP (GRID PARADO - IGUAL INSTAGRAM TESTIMONIALS) --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* --- VERSÃO MOBILE (CARROSSEL MANUAL + AUTOMÁTICO) --- */}
        <div className="md:hidden mt-4 relative">
          {/* Container do carrossel */}
          <div className="overflow-hidden py-4 px-1">
            {" "}
            {/* Padding para a sombra não cortar */}
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {metrics.map((metric) => (
                <div key={metric.id} className="w-full flex-shrink-0 px-2">
                  <MetricCard metric={metric} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-green-200 rounded-full p-2 shadow-lg hover:bg-green-50 transition-colors -ml-2"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-green-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-green-200 rounded-full p-2 shadow-lg hover:bg-green-50 transition-colors -mr-2"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6 text-green-700" />
          </button>

          {/* Indicadores (Bolinhas) */}
          <div className="flex justify-center gap-2 mt-6">
            {metrics.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-green-600 w-8" : "bg-green-200 w-2"
                }`}
                aria-label={`Ir para dado ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Botão CTA Final */}
        <div className="text-center mt-12">
          <AnimatedButton
            size="xl"
            variant="mooviSolid"
            text="Quero esses resultados"
            emoji="​"
            onClick={() => scrollToSection("pricing-section")}
          />
        </div>
      </div>
    </section>
  );
};

export default Authority;
