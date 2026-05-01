import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import Authority from "@/components/Authority";

import FeaturesScroll from "@/components/FeaturesScroll";
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



      {/* 4. Features com Vídeo — Demonstração de cada funcionalidade */}
      <FeaturesScroll />

      {/* 5. Comparativo — Moovi vs métodos tradicionais (tabela) */}
      <ComparisonSection />

      {/* 6. Segurança — Seção dedicada para eliminar objeções */}
      <SecuritySection />

      {/* 6.5 Exemplos de Interação — Marquee infinito de perguntas */}
      <InteractionExamples />

      {/* 7. Depoimentos — Prova social com reviews reais */}
      <InstagramTestimonials />

      {/* 8. Planos — Conversão principal */}
      <Pricing />

      {/* Shared Gradient Wrapper for FAQ and Final CTA to eliminate seams */}
      <div className="relative bg-gradient-to-b from-moovi-green-deep via-moovi-green-dark to-[#05150C] overflow-hidden">
        {/* Shared Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-moovi-mint/10 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-moovi-green/10 rounded-full blur-[100px] -translate-x-1/4 pointer-events-none" />
        
        {/* 9. FAQ — Últimas objeções respondidas */}
        <FAQ />

        {/* 10. CTA Final — Última chance antes do footer */}
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
