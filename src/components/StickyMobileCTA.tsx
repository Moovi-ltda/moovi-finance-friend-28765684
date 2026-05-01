import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { scrollToSection } from "@/utils/scroll";
import { motion, AnimatePresence } from "framer-motion";

export function StickyMobileCTA() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const pricingSection = document.getElementById("pricing-section");

      // Show after scrolling past the hero (400px)
      if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Hide when user is at the pricing section
      if (pricingSection) {
        const rect = pricingSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && !isHidden && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom"
        >
          <button
            onClick={() => scrollToSection("pricing-section")}
            className="w-full bg-moovi-whatsapp hover:bg-[#1DBE5A] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-moovi-whatsapp/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt=""
              className="w-4 h-4 invert brightness-0"
            />
            Ver planos e começar agora
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
