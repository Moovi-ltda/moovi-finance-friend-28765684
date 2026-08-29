import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Iphone } from "@/components/ui/iphone";
import {
  Bell,
  LayoutDashboard,
  PieChart,
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
  images?: [string, string];
  imageLabels?: [string, string];
}

const features: Feature[] = [
  {
    number: "01",
    icon: LayoutDashboard,
    title: "Dashboard Intuitivo",
    description:
      "Lance e categorize receitas e despesas em segundos. Saldo, resultado do mês e evolução financeira sempre atualizados.",
    images: [
      "/features/dashboard-intuitivo-resumo.png",
      "/features/dashboard-intuitivo-comparativos-alertas.png",
    ],
    imageLabels: ["Resumo do mês", "Comparativos e alertas"],
  },
  {
    number: "02",
    icon: PieChart,
    title: "Relatórios Visuais",
    description:
      "Gráficos claros mostram para onde está indo seu dinheiro, com filtros por período, categoria e conta, além de exportação em PDF ou Excel.",
    images: [
      "/features/dashboard-intuitivo-por-categoria.png",
      "/features/dashboard-intuitivo-visao-geral.png",
    ],
    imageLabels: ["Por categoria", "Visão geral"],
  },
  {
    number: "03",
    icon: Bell,
    title: "Lembretes no WhatsApp",
    description:
      "Você agenda os vencimentos e compromissos dentro da plataforma e o lembrete chega automaticamente no seu WhatsApp. Lançamentos, gráficos, relatórios e análises continuam no Dashboard.",
    image: "/dashboard/dash-18.png",
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Contas a Pagar e Receber",
    description:
      "Acompanhe pendências, parcelas e vencimentos em uma única tela, com status de cada compromisso.",
    image: "/dashboard/dash-16.png",
  },
  {
    number: "05",
    icon: Tags,
    title: "Categorias Personalizadas",
    description:
      "Todas as transações organizadas com busca, filtros avançados e categorias inteligentes.",
    images: [
      "/features/categorias-personalizadas-despesas.png",
      "/features/categorias-personalizadas-receitas.png",
    ],
    imageLabels: ["Despesas", "Receitas"],
  },
  {
    number: "06",
    icon: Target,
    title: "Limites Inteligentes",
    description:
      "Defina limites por categoria e receba alertas antes de estourar o orçamento.",
    images: [
      "/features/limites-inteligentes-visao-geral.png",
      "/features/limites-inteligentes-orcamento.png",
    ],
    imageLabels: ["Visão geral", "Orçamento por categoria"],
  },
];


function PhoneMockupPair({
  images,
  labels,
  title,
}: {
  images: [string, string];
  labels?: [string, string];
  title: string;
}) {
  return (
    <div
      className="relative w-full"
      role="group"
      aria-label={`Duas telas do recurso ${title} no Moovi`}
    >
      {/* Desktop: aparelhos maiores, quase retos e com sobreposição controlada. */}
      <div
        className="relative mx-auto hidden w-full max-w-[560px] lg:block"
        style={{ height: "min(570px, 65vh)" }}
      >
        <div className="absolute inset-x-[2%] bottom-[4%] h-[72%] rounded-full bg-moovi-green/[0.09] blur-[72px] pointer-events-none" />
        <div className="absolute inset-x-[9%] bottom-[1%] h-px bg-gradient-to-r from-transparent via-gray-300/80 to-transparent pointer-events-none" />

        <div
          className="absolute bottom-[2%] left-[1%] z-[1]"
          style={{
            width: "clamp(210px, 32vh, 248px)",
            transform: "rotate(-2.5deg) translateY(10px)",
            transformOrigin: "bottom center",
            filter: "drop-shadow(0 24px 32px rgba(15, 23, 42, 0.22))",
          }}
        >
          <Iphone src={images[0]} style={{ width: "100%" }} />
        </div>

        <div
          className="absolute bottom-[3%] right-0 z-[2]"
          style={{
            width: "clamp(224px, 34vh, 268px)",
            transform: "rotate(2.25deg)",
            transformOrigin: "bottom center",
            filter: "drop-shadow(0 30px 42px rgba(15, 23, 42, 0.28))",
          }}
        >
          <Iphone src={images[1]} style={{ width: "100%" }} />
        </div>
      </div>

      {/* Mobile/tablet: as duas telas ficam visíveis sem disputar o gesto vertical. */}
      <div className="relative h-full min-h-[250px] w-full lg:hidden">
        <div className="absolute inset-x-[8%] bottom-[4%] h-[72%] rounded-full bg-moovi-green/[0.08] blur-[48px] pointer-events-none" />
        <div className="absolute inset-x-[12%] bottom-[1%] h-px bg-gradient-to-r from-transparent via-gray-300/70 to-transparent pointer-events-none" />

        <figure
          className="absolute bottom-[2%] left-[5%] z-[1]"
          style={{
            width: "min(43%, 180px)",
            transform: "rotate(-3deg) translateY(8px)",
            transformOrigin: "bottom center",
            filter: "drop-shadow(0 18px 24px rgba(15, 23, 42, 0.2))",
          }}
        >
          {labels?.[0] && (
            <figcaption className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gray-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-gray-600 shadow-sm">
              {labels[0]}
            </figcaption>
          )}
          <Iphone src={images[0]} style={{ width: "100%" }} />
        </figure>

        <figure
          className="absolute bottom-[3%] right-[4%] z-[2]"
          style={{
            width: "min(46%, 190px)",
            transform: "rotate(2.5deg)",
            transformOrigin: "bottom center",
            filter: "drop-shadow(0 22px 30px rgba(15, 23, 42, 0.26))",
          }}
        >
          {labels?.[1] && (
            <figcaption className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gray-200 bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-gray-600 shadow-sm">
              {labels[1]}
            </figcaption>
          )}
          <Iphone src={images[1]} style={{ width: "100%" }} />
        </figure>
      </div>
    </div>
  );
}


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

    let media: ReturnType<typeof gsap.matchMedia> | undefined;

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

      if (!stackEl) return;

      const cards = gsap.utils.toArray<HTMLElement>(stackEl.querySelectorAll(".stack-card"));
      if (cards.length === 0) return;

      media = gsap.matchMedia();

      media.add(
        {
          isMobile: "(max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { isMobile, reduceMotion } = mediaContext.conditions as {
            isMobile: boolean;
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (reduceMotion) return;

          const overlays = cards.map((card) => card.querySelector<HTMLElement>(".stack-card__overlay"));
          const holdDuration = isMobile ? 0.55 : 1;
          const transitionDuration = 1;
          const enterY = isMobile ? 108 : 120;
          const depthScale = isMobile ? 0.025 : 0.04;
          const depthOffset = isMobile ? 10 : 18;

          gsap.set(cards, { yPercent: 0, y: 0, scale: 1, transformOrigin: "top center" });
          gsap.set(cards.slice(1), { yPercent: enterY });
          gsap.set(overlays, { opacity: 0 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stackEl,
              start: "top top",
              end: () =>
                isMobile
                  ? `+=${Math.round(window.innerHeight * cards.length * 0.76)}`
                  : `+=${(1 + (cards.length - 1) * (holdDuration + transitionDuration)) * 80}`,
              scrub: isMobile ? 0.65 : 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: isMobile
                ? {
                    snapTo: "labelsDirectional",
                    duration: { min: 0.16, max: 0.32 },
                    delay: 0.08,
                    ease: "power2.out",
                  }
                : undefined,
            },
          });

          timeline.addLabel("card-0", 0);
          timeline.to({}, { duration: holdDuration });

          let cursor = holdDuration;

          cards.forEach((card, index) => {
            if (index === 0) return;

            timeline.to(
              card,
              { yPercent: 0, duration: transitionDuration, ease: "power3.inOut" },
              cursor
            );

            cards.slice(0, index).forEach((previousCard, previousIndex) => {
              const depth = index - previousIndex;
              const overlay = overlays[previousIndex];

              timeline.to(
                previousCard,
                {
                  scale: 1 - depthScale * depth,
                  y: -(depthOffset * depth),
                  duration: transitionDuration,
                  ease: "power3.inOut",
                },
                cursor
              );

              if (overlay) {
                timeline.to(
                  overlay,
                  {
                    opacity: Math.min((isMobile ? 0.14 : 0.2) * depth, 0.6),
                    duration: transitionDuration,
                    ease: "power3.inOut",
                  },
                  cursor
                );
              }
            });

            cursor += transitionDuration;
            timeline.addLabel(`card-${index}`, cursor);

            if (index < cards.length - 1) {
              timeline.to({}, { duration: holdDuration }, cursor);
              cursor += holdDuration;
            }
          });

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        }
      );
    }, section);

    return () => {
      media?.revert();
      ctx.revert();
    };
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

      {/* Stacking Cards — mesma narrativa por rolagem no desktop e no mobile. */}
      <div
        ref={stackRef}
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden px-4 pb-4 pt-24 sm:px-6 lg:h-screen lg:px-0 lg:py-0 motion-reduce:h-auto motion-reduce:overflow-visible motion-reduce:py-8"
      >
        <div
          className="relative h-[calc(100svh-7rem)] min-h-[540px] max-h-[760px] w-full sm:h-[calc(100svh-7.5rem)] lg:h-[80vh] lg:max-h-none lg:w-[92vw] lg:max-w-[1100px] motion-reduce:flex motion-reduce:h-auto motion-reduce:min-h-0 motion-reduce:max-h-none motion-reduce:flex-col motion-reduce:gap-6"
          style={{ perspective: "1200px" }}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.number}
                className="stack-card absolute inset-0 overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white will-change-transform motion-reduce:relative motion-reduce:inset-auto motion-reduce:min-h-[520px]"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)",
                  transformOrigin: "top center",
                }}
              >
                {/* White overlay for depth stacking */}
                <div className="stack-card__overlay absolute inset-0 bg-white opacity-0 z-10 pointer-events-none" />

                {/* Content layout */}
                <div className="relative z-[2] flex h-full flex-col items-center gap-3 p-5 sm:gap-5 sm:p-8 lg:flex-row lg:gap-10 lg:p-12">
                  {/* Text side */}
                  <div
                    className={`flex min-w-0 flex-none flex-col justify-center gap-3 sm:gap-4 lg:flex-1 lg:gap-5 ${i % 2 !== 0 ? "lg:order-2" : ""}`}
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
                    className={`flex min-h-0 w-full min-w-0 flex-1 items-center justify-center lg:w-auto ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                  >
                    {feature.images ? (
                      <PhoneMockupPair
                        images={feature.images}
                        labels={feature.imageLabels}
                        title={feature.title}
                      />
                    ) : (
                      /* Imagem única */
                      <div className="relative flex h-full w-full max-w-[500px] items-center justify-center">
                        <div className="absolute -inset-6 bg-moovi-green/[0.04] rounded-3xl blur-2xl" />
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="relative max-h-full w-full rounded-xl object-contain shadow-lg shadow-black/10"
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
