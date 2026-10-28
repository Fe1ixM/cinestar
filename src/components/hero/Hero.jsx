import heroImage from "../../assets/photoshoot.jpg";
import sundanceAward from "../../assets/award1.png";
import laAward from "../../assets/award2.png";
import styles from "../hero/hero.module.css";

export default function Hero() {
  return (
    <>
      <section className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img
            className={styles.heroImage}
            src={heroImage}
            alt="Filmproduktion i et studie"
          />
          <div
            className={styles.heroSectionBackgroundOverlay}
            aria-hidden="true"
          ></div>
        </div>

        <header className={styles.heroHeader}>
          <h1 className={styles.heroHeading}>
            CINESTAR STUDIO <br /> FILM & TV <br /> PRODUKTION
          </h1>
          <p className={styles.heroSubtitle}>
            Vi skaber levende fortællinger, der fanger dit publikum. Fra idé til
            færdigt produkt leverer vi professionelle film- og tv-løsninger, der
            gør din historie uforglemmelig.
          </p>
        </header>
      </section>

      <section className={styles.awardSection}>
        <div className={styles.awardSectionImageContainer}>
          <img
            src={sundanceAward}
            alt="Sundance film festival 2023 award image"
          />
          <img src={laAward} alt="Los Angeles film festival 2023 award image" />
        </div>
      </section>
    </>
  );
}
