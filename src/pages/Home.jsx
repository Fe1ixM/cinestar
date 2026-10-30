import Hero from "../components/hero/Hero";
import CallToAction from "../components/ctaSection/CtaSection";
import Portfolio from "../components/portfolio/Portfolio";
import Services from "../components/services/Services";
import History from "../components/companyHistory/CompanyHistory";
import Udtalelser from "../components/udtalelser/Udtalelser";
import Contact from "../components/contact/Contact";
import Blog from "../components/blog/Blog";

export default function Home() {
  return (
    <div>
      <Hero />
      <CallToAction />
      <Portfolio />
      <Services />
      <History />
      <Udtalelser />
      <Contact />
      <Blog />
    </div>
  );
}
