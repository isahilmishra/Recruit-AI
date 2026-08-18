import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { BentoGridFeatures } from '@/components/landing/BentoGridFeatures';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CallToAction } from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16">
        <HeroSection />
        <BentoGridFeatures />
        <HowItWorks />
        <CallToAction />
      </main>
    </div>
  );
}
