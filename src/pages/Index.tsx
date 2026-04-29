import VSLHero from "@/components/VSLHero";
import FeaturesScroll from "@/components/FeaturesScroll";
import Authority from "@/components/Authority";
import InstagramTestimonials from "@/components/InstagramTestimonials";
import ComparisonSection from "@/components/ComparisonSection";
import { Pricing } from "@/components/Pricing";
import Footer from "@/components/Footer";
import { FAQ } from "@/components/FAQ";

import { MobileExitIntent } from "@/components/MobileExitIntent";

const Index = () => {
  return (
    <div className="min-h-screen">
      <VSLHero />
      <Authority />

      <FeaturesScroll />
      <ComparisonSection />
      <InstagramTestimonials />
      <Pricing />
      <FAQ />
      <Footer />

      <MobileExitIntent />
    </div>
  );
};
export default Index;
