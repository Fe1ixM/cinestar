import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Cinestar Studio | Film- og TV-produktion</title>
        <meta
          name="description"
          content="Cinestar Studio skaber professionelle film- og TV-produktioner. Se vores portfolio, services og tidligere projekter."
        />

        <meta
          name="keywords"
          content="filmproduktion, TV-produktion, videoproduktion, Cinestar Studio"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Cinestar Studio | Film- og TV-produktion"
        />

        <meta
          property="og:description"
          content="Professionel film- og TV-produktion hos Cinestar Studio."
        />

        <meta property="og:type" content="website" />
      </Helmet>
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
    </>
  );
}
