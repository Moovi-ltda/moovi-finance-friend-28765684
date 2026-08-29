import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ROW_1 = [
  "Lembrete: aluguel vence hoje",
  "Sua fatura do cartão fecha amanhã",
  "Lembrete: parcela do carro vence amanhã",
  "IPVA vence dia 10",
  "Reunião com o contador às 9h",
];

const ROW_2 = [
  "Lembrete: academia vence dia 20",
  "Conta de luz vence em 2 dias",
  "Lembrete: seguro do carro vence sexta",
  "Consulta médica amanhã às 10h",
  "Dentista amanhã às 14h",
];

const ROW_3 = [
  "Boleto da internet vence hoje",
  "Lembrete: condomínio vence em 3 dias",
  "Cartão Nubank fecha em 5 dias",
  "Renovação do seguro vence amanhã",
  "Lembrete: escola vence dia 8",
];


const Pill = ({ text }: { text: string }) => (
  <div className="px-5 py-3 md:px-6 md:py-3.5 rounded-full border border-primary/30 bg-background text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300 whitespace-nowrap font-medium text-[15px] md:text-base cursor-default flex-shrink-0 shadow-sm">
    {text}
  </div>
);

const MarqueeRow = ({ items, reverse = false, duration = 40 }: { items: string[], reverse?: boolean, duration?: number }) => (
  <div className="flex w-max relative">
    <motion.div
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration }}
      className="flex"
    >
      <div className="flex gap-4 md:gap-5 pr-4 md:pr-5">
        {/* Duplicating items to ensure the array is long enough for ultra-wide screens */}
        {[...items, ...items].map((text, i) => <Pill key={`a-${i}`} text={text} />)}
      </div>
      <div className="flex gap-4 md:gap-5 pr-4 md:pr-5">
        {[...items, ...items].map((text, i) => <Pill key={`b-${i}`} text={text} />)}
      </div>
    </motion.div>
  </div>
);

export default function InteractionExamples() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 overflow-hidden flex flex-col items-center">
      <div className="container px-4 text-center mb-12 md:mb-16" ref={elementRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mx-auto mb-4 max-w-[22rem] text-[clamp(1.5rem,6.5vw,2rem)] font-bold leading-[1.12] tracking-tight text-white [text-wrap:balance] sm:mb-6 sm:max-w-3xl sm:text-3xl md:text-5xl">
            Os lembretes que você agenda chegam no seu <span className="text-[#25D366]">WhatsApp</span>
          </h2>
          <p className="mx-auto max-w-[21rem] text-[15px] leading-relaxed text-white/60 sm:max-w-2xl md:text-lg">
            Você programa os vencimentos e compromissos dentro da plataforma. No WhatsApp, a Moovi faz só uma coisa: te lembrar na hora certa.
          </p>

        </motion.div>
      </div>

      <div className="w-full flex flex-col gap-4 md:gap-5 relative">
        {/* Fading Edges for the Marquee */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] md:w-[15%] bg-gradient-to-r from-[#05150C] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] md:w-[15%] bg-gradient-to-l from-[#05150C] to-transparent z-10" />

        <MarqueeRow items={ROW_1} duration={45} />
        <MarqueeRow items={ROW_2} duration={55} reverse />
        <MarqueeRow items={ROW_3} duration={48} />
      </div>
    </section>
  );
}
