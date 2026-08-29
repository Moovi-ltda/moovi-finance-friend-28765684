import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

export interface ImageItem {
  src: string;
  alt: string;
  label?: string;
}

interface PhoneCarouselProps {
  images: ImageItem[];
  className?: string;
  interval?: number;
}

export function PhoneCarousel({
  images,
  className,
  interval = 5000,
}: PhoneCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setTimeout(showNext, interval);
    return () => window.clearTimeout(timer);
  }, [activeIndex, images.length, interval, showNext]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 45) showPrevious();
    if (info.offset.x < -45) showNext();
  };

  return (
    <div className={cn("relative flex w-full flex-col items-center", className)}>
      <div className="pointer-events-none absolute left-1/2 top-[43%] h-[70%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/10 blur-[70px]" />
      <div className="pointer-events-none absolute left-1/2 top-[43%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[42%] border border-white/[0.06]" />

      <div className="relative h-[470px] w-full sm:h-[500px] lg:h-[445px] xl:h-[480px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeImage.src}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 26, rotate: 1.5, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -26, rotate: -1.5, scale: 0.97 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 mx-auto w-[230px] cursor-grab touch-pan-y active:cursor-grabbing sm:w-[245px] lg:w-[216px] xl:w-[235px]"
            role="img"
            aria-label={activeImage.alt}
          >
            <Iphone src={activeImage.src} style={{ width: "100%" }} />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showPrevious}
              aria-label="Mostrar tela anterior"
              className="absolute left-0 top-1/2 z-30 size-11 -translate-y-1/2 rounded-full border border-white/[0.12] bg-[#07110b]/80 text-white/70 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all hover:border-[#25D366]/35 hover:bg-[#0b1d12] hover:text-white focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05150c] sm:left-1 lg:left-0"
            >
              <ChevronLeft className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showNext}
              aria-label="Mostrar próxima tela"
              className="absolute right-0 top-1/2 z-30 size-11 -translate-y-1/2 rounded-full border border-white/[0.12] bg-[#07110b]/80 text-white/70 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all hover:border-[#25D366]/35 hover:bg-[#0b1d12] hover:text-white focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05150c] sm:right-1 lg:right-0"
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}
      </div>

      <div className="relative z-20 mt-3 min-w-[174px] rounded-full border border-white/[0.09] bg-[#07110b]/85 px-5 py-3 text-center shadow-[0_18px_45px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div>
          <p className="truncate text-[11px] font-semibold tracking-wide text-white/80">
            {activeImage.label ?? `Tela ${activeIndex + 1}`}
          </p>
          <div className="mt-1.5 flex items-center justify-center gap-1.5" aria-hidden="true">
            {images.map((image, index) => (
              <span
                key={image.src}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-5 bg-[#25D366]" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeImage.alt}. Tela {activeIndex + 1} de {images.length}.
      </p>
    </div>
  );
}
