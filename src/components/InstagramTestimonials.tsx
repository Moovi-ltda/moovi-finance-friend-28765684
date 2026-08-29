import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";

// --- INTERFACES ---
interface Testimonial {
  id: number;
  image: string;
  imageAlt: string;
  imagePosition: string;
  title: string;
  quote: string;
  initials: string;
  name: string;
  date: string;
  rating: number;
}

// --- DADOS ---
// Mantive seus dados originais aqui
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    image: "/testimonials/testimonial-dashboard-insights.webp",
    imageAlt: "Dashboard da Moovi com comparação mensal, alertas de orçamento e saldo por conta",
    imagePosition: "object-[center_43%]",
    title: "Visão do mês em segundos",
    quote: "Abro o painel e já entendo para onde meu dinheiro foi. A comparação mensal e os alertas de orçamento deixaram minhas decisões muito mais rápidas.",
    initials: "CM",
    name: "Carlos Mendes",
    date: "15/11/2025",
    rating: 5,
  },
  {
    id: 2,
    image: "/testimonials/testimonial-2.jpg",
    imageAlt: "Mensagem de uma cliente contando como os lembretes da Moovi ajudam na organização",
    imagePosition: "object-center",
    title: "Lembretes que ajudam",
    quote: "Nunca fui organizada com dinheiro, mas o Dashboard do Moovi tornou tudo simples. E os lembretes não me deixam esquecer de nada.",
    initials: "AP",
    name: "Ana Paula",
    date: "22/05/2025",
    rating: 5,
  },
  {
    id: 3,
    image: "/testimonials/testimonial-goals.webp",
    imageAlt: "Tela de metas da Moovi com objetivos financeiros e barras de progresso",
    imagePosition: "object-[center_52%]",
    title: "Metas mais claras",
    quote: "Configurei os vencimentos no Dashboard e o lembrete chegou na hora certa. Salvou meu mês!",
    initials: "RS",
    name: "Ricardo Silva",
    date: "28/10/2025",
    rating: 5,
  },
  {
    id: 4,
    image: "/testimonials/testimonial-dashboard-overview.webp",
    imageAlt: "Dashboard da Moovi com saldo, receitas, despesas e evolução financeira",
    imagePosition: "object-[center_46%]",
    title: "Controle sem complicação",
    quote: "O dashboard reúne saldo, receitas e despesas de um jeito direto. Em poucos segundos eu entendo como está meu mês.",
    initials: "JF",
    name: "Juliana Ferreira",
    date: "03/09/2025",
    rating: 5,
  },
];

// --- COMPONENTE DO CARD ISOLADO ---
// Criei este componente separado para poder reusar ele tanto no Grid (PC) quanto no Carrossel (Mobile) sem repetir código.
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-border/50 h-full w-full">
    {/* Imagem do Screenshot */}
    <div className="relative w-full h-64 md:h-72 overflow-hidden bg-muted">
      <img
        src={testimonial.image}
        alt={testimonial.imageAlt}
        className={`w-full h-full object-cover ${testimonial.imagePosition}`}
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* Conteúdo do Card */}
    <div className="p-6 flex flex-col flex-grow text-left">
      <h3 className="text-lg font-bold text-foreground mb-3">{testimonial.title}</h3>

      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <blockquote className="text-sm text-muted-foreground mb-4 flex-grow italic">"{testimonial.quote}"</blockquote>

      <div className="flex items-center gap-2 mb-4 text-sm text-primary font-medium">
        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
          <Check className="w-4 h-4" />
          <span>Cliente verificado</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-primary">{testimonial.initials}</span>
        </div>

        <div className="flex-grow min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.date}</p>
        </div>
      </div>
    </div>
  </div>
);

const InstagramTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden relative" id="testimonials-section">
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0F6B3A]/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-[22px] min-[375px]:text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-snug tracking-tight">
            Junte-se a <span className="text-[#25D366]">+5.240 brasileiros</span> que <br />
            simplificaram suas finanças.
          </h2>
        </motion.div>

        {/* --- VERSÃO DESKTOP (GRID PARADO) --- */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* --- VERSÃO MOBILE (CARROSSEL MANUAL) --- */}
        <div className="md:hidden mt-8 relative">
          {/* Container do carrossel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonialsData.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm md:text-base text-white/60">
            ✨ Depoimentos autênticos de usuários reais do Moovi
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramTestimonials;
