import Hero from "../components/hero/Hero";
import CallToAction from "../components/ctaSection/CtaSection";
import Portfolio from "../components/portfolio/Portfolio";

export default function Home() {
  return (
    <div>
      <Hero />
      <CallToAction />
      <Portfolio />
    </div>
  );
}
