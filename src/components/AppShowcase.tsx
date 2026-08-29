import { Iphone } from "@/components/ui/iphone";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TextAnimate } from "@/components/ui/text-animate";

export function AppShowcase() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // URL do seu vídeo no Panda
  const PANDA_VIDEO_URL =
    "https://player-vz-c1e2f242-e38.tv.pandavideo.com.br/embed/?v=4e6c28e8-f6eb-4e20-b216-224be1bc17f8";

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4" ref={elementRef}>
        {/* Cabeçalho */}
        <div className={`text-center mb-16 space-y-4 fade-in-scroll ${isVisible ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            <TextAnimate animation="slideUp" by="word">
              Seu Assessor Financeiro Pessoal
            </TextAnimate>
          </h2>
          <p className="text-xl text-muted-foreground">Direto no seu Dashboard 💚</p>
        </div>

        {/* Container dos iPhones */}
        <div
          className={`
          relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 
          fade-in-scroll fade-in-scroll-delay-200 ${isVisible ? "visible" : ""}
        `}
        >
          {/* 2. iPhone Central (VÍDEO) */}
          <div className="w-full max-w-[320px] md:w-1/3 z-10 md:scale-110 transition-transform duration-500">
            <Iphone
              className="size-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] rounded-[40px]"
              embedSrc={PANDA_VIDEO_URL}
            />
          </div>

          {/* 3. iPhone Direito (Imagem) */}
        </div>
      </div>
    </section>
  );
}
