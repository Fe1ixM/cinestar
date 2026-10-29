import studioThumbnail from "../../assets/studio3.jpg";
import styles from "../ctaSection/ctasection.module.css";

export default function CallToAction() {
  return (
    <section className={styles.ctaSection}>
      <div className={ctaContent}>
        <p className={styles.ctaLabel}>CINESTAR STUDIO</p>
        <h2 className={styles.ctaHeading}>
          Har du en idé til dit næste projekt?
        </h2>
        <p className={styles.ctaSubtitle}>
          Lad os omsætte dine visioner til levende billeder, der fænger dit
          publikum. Hos os får du en professionel, kreativ proces fra
          idéudvikling til færdig produktion.
        </p>

        <figure className={styles.ctaThumbnailContainer}>
          <img
            className={styles.ctaThumbnail}
            src={studioThumbnail}
            alt="Video af Filmproduktion i Cinestar Studio"
          />
        </figure>

        <h3 className={styles.ctaSubheading}>
          Tøv ikke med at vælge Cinestar til dit næste film-projekt
        </h3>

        <p className={styles.ctaSubtitle}>
          Hos Cinestar kombinerer vi vores passion for historiefortælling med et
          skarpt øje for detaljen. Med moderne udstyr og et erfarent team sikrer
          vi, at din produktion løfter sig fra skitse til strålende slutresultat
          – hver gang.
        </p>

        <dl className={styles.ctaStatistics}>
          <div className={styles.ctaStatistic}>
            <dd className={styles.ctaStatisticNumber}>250+</dd>
            <dt className={styles.ctaStatisticLabel}>Filmproduktioner</dt>
          </div>

          <div className={styles.ctaStatistic}>
            <dd className={styles.ctaStatisticNumber}>78+</dd>
            <dt className={styles.ctaStatisticLabel}>Musikvideoer</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
