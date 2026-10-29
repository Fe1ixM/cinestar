import Hero from "../components/hero/Hero";
import CallToAction from "../components/ctaSection/CtaSection";
import Portfolio from "../components/portfolio/Portfolio";
import Services from "../components/services/Services";

export default function Home() {
  return (
    <div>
      <Hero />
      <CallToAction />
      <Portfolio />
      <Services />
    </div>
  );
}
