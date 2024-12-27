import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Features as FeaturesSection } from "@/components/Features";

const Features = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturesSection />
    </div>
  );
};

export default Features;