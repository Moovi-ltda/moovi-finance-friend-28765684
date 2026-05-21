import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Iphone } from "@/components/ui/iphone";
import {
  MessageCircle,
  LayoutDashboard,
  Bell,
  Tags,
  Target,
  CreditCard,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


interface Feature {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  image?: string;
  images?: string[]; // dois mockups lado a lado
}

const features: Feature[] = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Registre Tudo pelo WhatsApp",
    description:
      "Envie uma mensagem ou áudio de 5 segundos. A IA categoriza automaticamente seus gastos e receitas.",
    images: [
      "/features/concertar.png",
      "/features/whatsapp_2.png",
    ],
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Painel Profissional",
    description:
      "Visualize saldo, receitas, despesas e histórico dos últimos 30 dias com gráficos claros.",
    images: [
      "/features/painel_profissional_1.jpeg",
      "/features/painel_profissional_2.jpeg",
    ],
  },
  {
    number: "03",
    icon: Bell,
    title: "Lembretes Personalizados",
    description:
      "Fale em linguagem natural: 'me lembre de pagar a academia dia 20'. O Moovi avisa na hora certa.",
    images: [
      "/features/lembretes_1.png",
      "/features/lembretes_2.png",
    ],
  },
  {
    number: "04",
    icon: Tags,
    title: "Categorias Personalizadas",
    description:
      "Todas as transações organizadas com busca, filtros avançados e categorias inteligentes.",
    images: [
      "/features/categorias_personalizadas_1.jpeg",
      "/features/categorias_personalizadas_2.jpeg",
    ],
  },
  {
    number: "05",
    icon: Target,
    title: "Limites Inteligentes",
    description:
      "Defina limites por categoria e receba alertas antes de estourar o orçamento.",
    image: "/features/Limites_Inteligentes.png",
  },
  {
    number: "06",
    icon: CreditCard,
    title: "Gestão de Contas e Cartões",
    description:
      "Adicione contas e cartões em linguagem natural. Controle saldos e limites em um só lugar.",
    images: [
      "/features/gestao_contas_1.jpeg",
      "/features/gestao_contas_2.jpeg",
    ],
  },
];

function FloatingPiggy({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const piggyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = piggyRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0 });

      gsap.to(el, {
        y: -10,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(el, {
        rotation: 5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 30%",
        onUpdate: (self) => {
          const p = self.progress;
          let opacity = 0.6;
          if (p < 0.08) opacity = (p / 0.08) * 0.6;
          else if (p > 0.92) opacity = ((1 - p) / 0.08) * 0.6;
          gsap.set(el, { opacity });
        },
        onLeave: () => gsap.set(el, { opacity: 0 }),
        onLeaveBack: () => gsap.set(el, { opacity: 0 }),
      });
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={piggyRef}
      className="hidden lg:block fixed right-6 xl:right-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-moovi-green/10 rounded-full blur-xl" />
        <img
          src="/moovi-piggy.png"
          alt=""
          className="w-12 h-12 xl:w-14 xl:h-14 drop-shadow-[0_4px_16px_rgba(22,101,52,0.3)]"
        />
      </div>
    </div>
  );
}

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stackEl = stackRef.current;
    if (!section || !header) return;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches;

    const ctx = gsap.context(() => {
      const headerEls = header.querySelectorAll(".header-animate");
      gsap.fromTo(
        headerEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 120%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // No mobile/tablet, NÃO ativamos o stacking pin — cards viram lista normal.
      if (isMobile || !stackEl) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        stackEl.querySelectorAll(".stack-card")
      );
      if (cards.length === 0) return;

      gsap.set(cards.slice(1), { yPercent: 120 });

      const holdDuration = 1;
      const transitionDuration = 1;
      const totalUnits = 1 + (cards.length - 1) * (holdDuration + transitionDuration);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stackEl,
          start: "top top",
          end: () => `+=${totalUnits * 80}vh`,
          scrub: 1,
          pin: true,
        },
      });

      tl.to({}, { duration: holdDuration });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const transitionStart = 1 + (index - 1) * (holdDuration + transitionDuration) + holdDuration;

        tl.to(
          card,
          { yPercent: 0, duration: transitionDuration, ease: "power3.inOut" },
          transitionStart
        );

        cards.slice(0, index).forEach((prevCard, prevIndex) => {
          const depth = index - prevIndex;
          const overlay = prevCard.querySelector(".stack-card__overlay");

          tl.to(
            prevCard,
            {
              scale: 1 - 0.04 * depth,
              y: -(18 * depth),
              duration: transitionDuration,
              ease: "power3.inOut",
            },
            transitionStart
          );

          if (overlay) {
            tl.to(
              overlay,
              {
                opacity: Math.min(0.2 * depth, 0.6),
                duration: transitionDuration,
                ease: "power3.inOut",
              },
              transitionStart
            );
          }
        });

        if (index < cards.length - 1) {
          tl.to({}, { duration: holdDuration }, transitionStart + transitionDuration);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} className="relative bg-white z-40 overflow-hidden" id="features">
      <FloatingPiggy sectionRef={sectionRef} />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="header-animate flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-moovi-green/30" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-moovi-green">
              Funcionalidades
            </span>
            <div className="h-px w-8 bg-moovi-green/30" />
          </div>

          <h2 className="header-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] max-w-4xl mx-auto">
            Como o Moovi ajuda você a ter{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-moovi-green to-moovi-green-dark">
              controle do seu dinheiro
            </span>
            ?
          </h2>

          <p className="header-animate text-base md:text-lg text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
            Seis ferramentas inteligentes que transformam a forma como você
            gerencia suas finanças.
          </p>
        </div>
      </div>

      {/* Stacking Cards (desktop) / Lista vertical (mobile) */}
      <div
        ref={stackRef}
        className="relative w-full lg:h-screen flex flex-col lg:items-center lg:justify-center lg:overflow-hidden px-4 sm:px-6 lg:px-0 gap-6 lg:gap-0 pb-8 lg:pb-0"
      >
        <div
          className="relative w-full lg:w-[92vw] lg:max-w-[1100px] lg:h-[80vh] flex flex-col lg:block gap-6 lg:gap-0"
          style={{ perspective: "1200px" }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.number}
                className="stack-card relative lg:absolute lg:inset-0 rounded-[1.5rem] border border-gray-200 overflow-hidden lg:will-change-transform bg-white"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
                  transformOrigin: "top center",
                }}
              >
                {/* White overlay for depth stacking */}
                <div className="stack-card__overlay absolute inset-0 bg-white opacity-0 z-10 pointer-events-none" />

                {/* Content layout */}
                <div className="relative z-[2] lg:h-full flex flex-col lg:flex-row items-center gap-6 lg:gap-10 p-6 sm:p-8 lg:p-12">
                  {/* Text side */}
                  <div
                    className={`flex flex-col justify-center gap-4 lg:gap-5 flex-1 min-w-0 ${i % 2 !== 0 ? "lg:order-2" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono tracking-[0.2em] text-moovi-green">
                        {feature.number}
                      </span>
                      <div className="h-px w-12 bg-gradient-to-r from-moovi-green/40 to-transparent" />
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-moovi-green/10 border border-moovi-green/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-moovi-green" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>

                  {/* Image side */}
                  <div
                    className={`flex-1 min-w-0 flex items-center justify-center ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                  >
                    {feature.images ? (
                      feature.images.length === 2 ? (
                        /* Dois iPhones lado a lado com larguras fixas em px */
                        <div className="relative flex items-end justify-center gap-3">
                          <div className="absolute -inset-8 bg-moovi-green/[0.05] rounded-3xl blur-3xl pointer-events-none" />

                          {/* iPhone esquerdo — atrás */}
                          <div
                            style={{
                              width: 140,
                              flexShrink: 0,
                              transform: "rotate(-5deg) translateY(18px)",
                              transformOrigin: "bottom center",
                              filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.28))",
                            }}
                          >
                            <Iphone src={feature.images[0]} style={{ width: "100%" }} />
                          </div>

                          {/* iPhone direito — frente */}
                          <div
                            style={{
                              width: 160,
                              flexShrink: 0,
                              transform: "rotate(5deg) translateY(0px)",
                              transformOrigin: "bottom center",
                              filter: "drop-shadow(0 20px 42px rgba(0,0,0,0.35))",
                            }}
                          >
                            <Iphone src={feature.images[1]} style={{ width: "100%" }} />
                          </div>
                        </div>
                      ) : (
                        /* Um único iPhone */
                        <div className="relative flex items-center justify-center">
                          <div className="absolute -inset-8 bg-moovi-green/[0.05] rounded-3xl blur-3xl pointer-events-none" />
                          <div
                            className="w-[180px] sm:w-[220px] lg:w-[260px]"
                            style={{ filter: "drop-shadow(0 20px 42px rgba(0,0,0,0.35))" }}
                          >
                            <Iphone src={feature.images[0]} style={{ width: "100%" }} />
                          </div>
                        </div>
                      )
                    ) : (
                      /* Imagem única */
                      <div className="relative w-full max-w-[500px]">
                        <div className="absolute -inset-6 bg-moovi-green/[0.04] rounded-3xl blur-2xl" />
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="relative w-full h-auto rounded-xl shadow-lg shadow-black/10"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom padding for the section content to breathe before the next section */}
      <div className="h-16 md:h-24" />
    </section>
  );
}
