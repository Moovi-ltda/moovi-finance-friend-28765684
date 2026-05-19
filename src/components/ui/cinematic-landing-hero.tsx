import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/utils/scroll";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle, Star, ChevronDown, X } from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const PANDA_VIDEO_URL =
  "https://player-vz-c1e2f242-e38.tv.pandavideo.com.br/embed/?v=4e6c28e8-f6eb-4e20-b216-224be1bc17f8";

const AVATAR_URLS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
];

// ─── HEADLINE WORDS ANIMATION ──────────────────────────────────────────────────
const headlineVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const fadeUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
});

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pt-6 px-4 pointer-events-none flex justify-center">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "pointer-events-auto transition-all duration-500 w-full max-w-[900px] border border-white/[0.08] backdrop-blur-2xl overflow-hidden rounded-[32px]",
          isMobileMenuOpen 
            ? "bg-[#080d0a] shadow-2xl" 
            : scrolled 
              ? "bg-[#050a07]/90 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              : "bg-[#050a07]/40"
        )}
      >
        <div className="px-6 flex justify-between items-center h-16 md:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center cursor-pointer bg-transparent border-0 p-0"
          >
            <img
              src="/logo-moovi.png"
              alt="Moovi"
              className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
            />
          </button>

          {/* Nav Links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("pricing-section")}
              className="text-[14px] text-white/60 hover:text-white transition-colors font-medium tracking-wide"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection("pricing-section")}
              className="text-[14px] text-white/60 hover:text-white transition-colors font-medium tracking-wide"
            >
              Preços
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-[14px] text-white/60 hover:text-white transition-colors font-medium tracking-wide"
            >
              Como funciona
            </button>
          </div>

          {/* CTA — desktop only */}
          <a
            href="https://dash.moovi.chat"
            className="hidden md:flex h-10 px-6 rounded-full text-[14px] font-semibold text-[#05150C] bg-white hover:scale-105 hover:bg-gray-100 transition-all duration-300 items-center no-underline"
          >
            Entrar
          </a>

          {/* Mobile Hamburger / Close Button */}
          <button
            className="md:hidden flex flex-col items-end justify-center w-8 h-8 gap-[5px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7 text-white/90" strokeWidth={1.5} />
            ) : (
              <>
                <div className="w-6 h-[2px] bg-white/90 rounded-full" />
                <div className="w-[18px] h-[2px] bg-white/90 rounded-full" />
              </>
            )}
          </button>
        </div>

        {/* Mobile Expanded Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden px-6 pb-8 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-6 mt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("pricing-section");
                  }}
                  className="text-[17px] text-left font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Recursos
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("pricing-section");
                  }}
                  className="text-[17px] text-left font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Preços
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection("features");
                  }}
                  className="text-[17px] text-left font-semibold text-white/90 hover:text-white transition-colors"
                >
                  Como funciona
                </button>
              </div>

              <a
                href="https://dash.moovi.chat"
                className="h-[46px] w-[140px] rounded-full text-[15px] font-bold text-[#05150C] bg-white flex items-center justify-center hover:scale-105 transition-all no-underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

// ─── SOCIAL PROOF BAR ──────────────────────────────────────────────────────────
function SocialProof() {
  return (
    <motion.div
      variants={fadeUp(1.6)}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
    >
      {/* Avatars */}
      <div className="flex items-center">
        <div className="flex -space-x-2.5">
          {AVATAR_URLS.map((url, i) => (
            <img
              key={i}
              src={url}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-[#0a0f0c] object-cover"
              loading="lazy"
            />
          ))}
        </div>
        <div className="flex items-center gap-0.5 ml-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>

      {/* Text */}
      <p className="text-white/50 text-[13px] font-medium text-center sm:text-left leading-snug max-w-[200px] sm:max-w-none">
        <span className="text-white font-semibold">+5.240 brasileiros</span>{" "}
        já organizam suas finanças com a Moovi
      </p>
    </motion.div>
  );
}

// ─── CTA BUTTONS ────────────────────────────────────────────────────────────────
function HeroCTA() {
  return (
    <motion.div
      variants={fadeUp(1.3)}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
    >
      {/* Primary CTA */}
      <button
        onClick={() => scrollToSection("pricing-section")}
        className="group relative w-full sm:w-auto h-[52px] px-8 rounded-2xl text-[15px] font-bold text-white overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
      >
        {/* Gradient BG */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#25D366] to-[#1AAD55] rounded-2xl" />
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(37,211,102,0.25)] group-hover:shadow-[0_0_60px_rgba(37,211,102,0.4)] transition-shadow duration-500" />
        {/* Inner highlight */}
        <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-white/[0.15] to-transparent pointer-events-none" style={{ height: "50%" }} />
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Começar a usar a Moovi
          <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </button>

    </motion.div>
  );
}

// ─── FLOATING BADGES ────────────────────────────────────────────────────────────
function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.0 + delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        "absolute z-30 px-4 py-3 rounded-2xl",
        "bg-[#0a0f0c]/70 backdrop-blur-xl border border-white/[0.08]",
        "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]",
        "hidden lg:flex items-center gap-3",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ─── PHONE MOCKUP ───────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      variants={fadeUp(1.8)}
      initial="hidden"
      animate="visible"
      className="relative w-full flex items-center justify-center"
    >
      {/* Ambient glow behind phone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[500px] md:h-[500px] bg-[#25D366]/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] md:w-[300px] md:h-[600px] bg-[#25D366]/[0.04] rounded-full blur-[80px] pointer-events-none" />

      {/* Phone Container */}
      <div className="relative">
        {/* Floating Badge — Left */}
        <FloatingBadge className="top-12 -left-[160px]" delay={0}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 flex items-center justify-center border border-[#25D366]/20">
            <span className="text-lg">💰</span>
          </div>
          <div>
            <p className="text-white text-[13px] font-semibold tracking-tight">R$450 economizados</p>
            <p className="text-white/35 text-[11px] font-medium">Esse mês com Moovi</p>
          </div>
        </FloatingBadge>

        {/* Floating Badge — Right */}
        <FloatingBadge className="bottom-24 -right-[150px]" delay={0.2}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center border border-emerald-400/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-[13px] font-semibold tracking-tight">IA no WhatsApp</p>
            <p className="text-white/35 text-[11px] font-medium">Gastos categorizados</p>
          </div>
        </FloatingBadge>

        {/* THE PHONE */}
        <div
          className="relative w-[260px] h-[530px] md:w-[290px] md:h-[600px] rounded-[3rem] overflow-hidden"
          style={{
            background: "#111",
            boxShadow: `
              inset 0 0 0 2px #333,
              inset 0 0 0 5px #000,
              0 40px 100px -20px rgba(0,0,0,0.8),
              0 20px 40px -10px rgba(0,0,0,0.6),
              0 0 80px -20px rgba(37,211,102,0.08)
            `,
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-end pr-3">
            <div className="w-[5px] h-[5px] rounded-full bg-[#25D366] shadow-[0_0_6px_rgba(37,211,102,0.8)]" />
          </div>

          {/* Screen */}
          <div className="absolute inset-[5px] bg-black rounded-[2.7rem] overflow-hidden">
            {/* Screen glare */}
            <div
              className="absolute inset-0 z-40 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)",
              }}
            />

            {/* Video */}
            <iframe
              id="panda-player-hero"
              src={PANDA_VIDEO_URL}
              className="w-full h-full"
              style={{ border: "none" }}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Hardware buttons */}
          <div
            className="absolute top-[120px] -left-[2px] w-[3px] h-[24px] rounded-l-sm"
            style={{
              background: "linear-gradient(90deg, #444 0%, #1a1a1a 100%)",
              boxShadow: "-1px 0 3px rgba(0,0,0,0.7)",
            }}
          />
          <div
            className="absolute top-[160px] -left-[2px] w-[3px] h-[40px] rounded-l-sm"
            style={{
              background: "linear-gradient(90deg, #444 0%, #1a1a1a 100%)",
              boxShadow: "-1px 0 3px rgba(0,0,0,0.7)",
            }}
          />
          <div
            className="absolute top-[210px] -left-[2px] w-[3px] h-[40px] rounded-l-sm"
            style={{
              background: "linear-gradient(90deg, #444 0%, #1a1a1a 100%)",
              boxShadow: "-1px 0 3px rgba(0,0,0,0.7)",
            }}
          />
          <div
            className="absolute top-[170px] -right-[2px] w-[3px] h-[60px] rounded-r-sm"
            style={{
              background: "linear-gradient(-90deg, #444 0%, #1a1a1a 100%)",
              boxShadow: "1px 0 3px rgba(0,0,0,0.7)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── TRUST PILL ─────────────────────────────────────────────────────────────────
function TrustPill() {
  return (
    <motion.div
      variants={fadeUp(0.2)}
      initial="hidden"
      animate="visible"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
    >
      <div className="flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
      </div>
      <span className="text-[12px] sm:text-[13px] font-medium text-white/60">
        Inteligência Artificial + WhatsApp
      </span>
    </motion.div>
  );
}

// ─── MAIN HERO EXPORT ──────────────────────────────────────────────────────────
export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CinematicHero({ className, ...props }: CinematicHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const headlineWords = ["Seu", "dinheiro", "organizado."];
  const headlineAccent = ["leve.", "WhatsApp,", "com", "IA."];

  return (
    <>
      <Navbar />

      <section
        ref={sectionRef}
        className={cn(
          "dark relative min-h-screen overflow-hidden",
          "bg-gradient-to-b from-[#05150C] to-[#0A1A10] text-foreground",
          className
        )}
        {...props}
      >
        {/* ─── BACKGROUND LAYERS ─────────────────────────────────────── */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundSize: "60px 60px",
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)
              `,
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 70%)",
            }}
          />

          {/* Ambient orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#25D366]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-[#0F6B3A]/[0.04] rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-0 -translate-x-1/3 w-[400px] h-[400px] bg-emerald-900/[0.03] rounded-full blur-[100px]" />
        </motion.div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
          }}
        />

        {/* ─── CONTENT ──────────────────────────────────────────────── */}
        <motion.div style={{ opacity }} className="relative z-10">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
            {/* Layout: Text (left) + Phone (right) on desktop, stacked on mobile */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              {/* ─── LEFT COLUMN: Copy ─────────────────────────────── */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full order-1">
                {/* Trust pill */}
                <TrustPill />

                {/* Headline */}
                <div className="mt-7 md:mt-8">
                  <h1 className="text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] font-extrabold leading-[1.05] tracking-tight">
                    {/* Line 1 */}
                    <span className="block text-white">
                      {headlineWords.map((word, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={headlineVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline-block mr-[0.25em]"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                    {/* Line 2 — accent */}
                    <span className="block mt-1">
                      {headlineAccent.map((word, i) => (
                        <motion.span
                          key={i}
                          custom={i + headlineWords.length}
                          variants={headlineVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline-block mr-[0.25em] bg-gradient-to-r from-[#25D366] to-[#5EE89C] bg-clip-text text-transparent"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  </h1>
                </div>

                {/* Subheadline */}
                <motion.p
                  variants={fadeUp(1.0)}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 md:mt-7 text-[15px] md:text-[17px] text-white/45 leading-relaxed max-w-[480px] font-medium"
                >
                  A Moovi organiza seus gastos automaticamente, usando Inteligência Artificial. 
                  Sem planilha, sem esforço.
                </motion.p>

                {/* CTA Buttons */}
                <div className="mt-8 md:mt-10 w-full sm:w-auto">
                  <HeroCTA />
                </div>

                {/* Social proof */}
                <div className="mt-8 md:mt-10">
                  <SocialProof />
                </div>
              </div>

              {/* ─── RIGHT COLUMN: Phone Mockup ────────────────────── */}
              <div className="order-2 mt-14 lg:mt-0 w-full flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── SCROLL INDICATOR ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/20" />
          </motion.div>
        </motion.div>

        {/* ─── BOTTOM FADE ──────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1A10] to-transparent pointer-events-none z-[5]" />
      </section>
    </>
  );
}
