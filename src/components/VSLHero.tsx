import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Iphone } from "@/components/ui/iphone";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/utils/scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Users, ArrowRight, Star } from "lucide-react";

const PANDA_VIDEO_URL =
  "https://player-vz-c1e2f242-e38.tv.pandavideo.com.br/embed/?v=4e6c28e8-f6eb-4e20-b216-224be1bc17f8";

const VSLHero = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const messages = [
    {
      id: 1,
      text: "🔥 Últimos dias com preço promocional!",
      icon: Sparkles,
    },
    {
      id: 2,
      text: "⚡️ +5.000 pessoas já organizaram suas finanças",
      icon: Users,
    },
    {
      id: 3,
      text: "⏳ Oferta limitada: Cancele quando quiser",
      icon: Clock,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-[#FAFAF7] overflow-x-hidden">
      {/* Top Banner */}
      <div className="w-full bg-moovi-green-deep text-white py-2 px-4 relative z-50">
        <div className="container mx-auto flex justify-center items-center">
          <div className="relative h-6 w-full max-w-md overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute flex items-center gap-2 text-xs md:text-sm font-medium whitespace-nowrap"
              >
                {(() => {
                  const Icon = messages[currentMessageIndex].icon;
                  return <Icon className="w-3 h-3 md:w-4 md:h-4 text-moovi-mint" />;
                })()}
                <span>{messages[currentMessageIndex].text}</span>
                <ArrowRight className="w-3 h-3 ml-1 opacity-70 hidden sm:block" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Header (Sticky, normal flow) */}
      <div className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-moovi-green rounded-lg flex items-center justify-center p-1.5 overflow-hidden">
              <img src="/moovi-pig.png" alt="Moovi" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <span className="font-extrabold text-xl md:text-2xl text-moovi-green-dark tracking-tight">moovi</span>
          </div>
          <Button
            className="bg-moovi-green hover:bg-moovi-green-dark text-white font-semibold rounded-xl px-5 hidden sm:flex shadow-md shadow-moovi-green/20"
            onClick={() => scrollToSection("pricing-section")}
          >
            Começar agora
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container max-w-6xl mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 flex-grow flex flex-col justify-center" ref={elementRef}>
        <div className={`grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-12 items-center fade-in-scroll ${isVisible ? "visible" : ""}`}>

          {/* Left Column: Text & CTA */}
          <div className="flex flex-col text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-moovi-green-light text-moovi-green text-xs font-semibold uppercase tracking-wider w-fit mx-auto lg:mx-0 mb-6 border border-moovi-green/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-moovi-green animate-pulse"></span>
              Assistente financeiro no WhatsApp
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-moovi-green-deep leading-[1.05] tracking-tight mb-6 text-balance">
              Organize seu dinheiro <span className="text-moovi-green">pelo WhatsApp.</span> Em segundos.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Mande uma mensagem como se fosse pra um amigo. A Moovi anota seus gastos, categoriza tudo e te avisa quando você está prestes a estourar o orçamento.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                className="bg-moovi-whatsapp hover:bg-[#1DBE5A] text-white font-bold text-lg px-8 py-7 shadow-xl shadow-moovi-whatsapp/30 hover:shadow-2xl hover:-translate-y-1 transition-all rounded-2xl w-full sm:w-auto flex items-center gap-3"
                onClick={() => scrollToSection("pricing-section")}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 invert brightness-0" />
                Começar grátis no WhatsApp
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-5 font-medium">
              7 dias grátis · Cancele quando quiser · Sem cartão
            </p>

            {/* Social Proof Avatars */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-12">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full border-2 border-[#FAFAF7] bg-[#FFE0B5] text-[#8B5A1C] flex items-center justify-center text-sm font-bold z-30 shadow-sm">JB</div>
                <div className="w-11 h-11 rounded-full border-2 border-[#FAFAF7] bg-[#D5E8F5] text-[#1E5A8B] flex items-center justify-center text-sm font-bold z-20 shadow-sm">MA</div>
                <div className="w-11 h-11 rounded-full border-2 border-[#FAFAF7] bg-[#E8D5F5] text-[#5A1E8B] flex items-center justify-center text-sm font-bold z-10 shadow-sm">RS</div>
                <div className="w-11 h-11 rounded-full border-2 border-[#FAFAF7] bg-moovi-green text-white flex items-center justify-center text-xs font-bold z-0 shadow-sm">+5k</div>
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 text-yellow-400 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  <strong className="text-gray-900 font-bold">4.9/5</strong> · +5.000 brasileiros usando
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real iPhone with Panda Video */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-moovi-green/10 rounded-full blur-[80px] -z-10"></div>

            <div className="w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px]">
              <Iphone
                className="size-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] rounded-[40px]"
                embedSrc={PANDA_VIDEO_URL}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VSLHero;
