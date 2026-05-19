import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import TrustMarquee from "@/components/TrustMarquee";
import Authority from "@/components/Authority";

import FeaturesShowcase from "@/components/FeaturesShowcase";
import ComparisonSection from "@/components/ComparisonSection";
import SecuritySection from "@/components/SecuritySection";
import InteractionExamples from "@/components/InteractionExamples";
import InstagramTestimonials from "@/components/InstagramTestimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { MobileExitIntent } from "@/components/MobileExitIntent";


const Index = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero — Captura atenção, copy principal, vídeo demo */}
      <CinematicHero />

      {/* 2. Prova Social — Números de impacto para validação imediata */}
      <Authority />

      {/* 4. Features — Seção clara com stacking cards */}
      <FeaturesShowcase />

      {/* Transition handled inside FeaturesShowcase via internal gradient */}

      {/* Shared Gradient Wrapper for Middle Sections */}
      <div className="dark relative bg-gradient-to-b from-[#05150C] via-[#0A1A10] to-[#071510] overflow-hidden text-foreground">
        <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-moovi-green/10 rounded-full blur-[120px] -translate-x-1/4 pointer-events-none" />
        <div className="absolute top-[60%] right-0 w-[600px] h-[600px] bg-moovi-mint/5 rounded-full blur-[150px] translate-x-1/4 pointer-events-none" />

        {/* 5. Comparativo — Moovi vs métodos tradicionais */}
        <ComparisonSection />

        {/* 6. Segurança — Eliminar objeções */}
        <SecuritySection />

        {/* 6.5 Exemplos de Interação — Marquee infinito */}
        <InteractionExamples />

        {/* 7. Depoimentos — Prova social antes da oferta */}
        <InstagramTestimonials />
      </div>

      {/* Hard cut transition to Pricing section */}

      {/* 8. Planos — Fundo branco para máximo contraste e conversão */}
      <Pricing />

      {/* 9. FAQ — Fundo branco para leitura limpa */}
      <FAQ />

      {/* Hard cut transition to Final CTA section */}

      {/* 10. CTA Final */}
      <div className="dark relative bg-gradient-to-b from-[#05150C] via-[#0A1210] to-[#05150C] overflow-hidden text-foreground">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-moovi-mint/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <FinalCTASection />
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* Overlays */}
      <MobileExitIntent />
    </div>
  );
};
export default Index;
