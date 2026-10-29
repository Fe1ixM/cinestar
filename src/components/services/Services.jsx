import styles from "../services/services.module.css";
import liquiferBackground from "../../assets/liquifer.png";

export default function Services() {
  return (
    <section className={styles.servicesSection}>
      <img
        src={liquiferBackground}
        alt=""
        aria-hidden="true"
        className={styles.backgroundOverlay}
      />

      <div className={styles.servicesContent}>
        <p className={styles.servicesLabel}>Service</p>

        <h2 className={styles.servicesHeading}>HVILKEN SERVICE TILBYDER VI?</h2>

        <div className={styles.servicesList}>
          <article className={styles.service}>
            <svg
              className={styles.serviceIcon}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="12" width="38" height="25" rx="3" />
              <path d="M5 19h38M14 12l5 7M25 12l5 7M36 12l4 7" />
              <path d="m21 24 9 5-9 5z" />
            </svg>

            <div className={styles.serviceDetails}>
              <h3 className={styles.serviceTitle}>FILM PRODUKTION</h3>
              <p className={styles.serviceDescription}>
                Vi skaber professionelle filmproduktioner, der formidler dit
                budskab klart, engagerende og visuelt overbevisende.
              </p>
            </div>
          </article>

          <article className={styles.service}>
            <svg
              className={styles.serviceIcon}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 38 19 13l8 15 6-9 9 19z" />
              <circle cx="34" cy="11" r="4" />
              <path d="M6 42h36" />
            </svg>

            <div className={styles.serviceDetails}>
              <h3 className={styles.serviceTitle}>EN KREATIV RETNING</h3>
              <p className={styles.serviceDescription}>
                Vi sikrer en kreativ retning, der løfter dit projekt fra
                almindeligt til uforglemmeligt.
              </p>
            </div>
          </article>

          <article className={styles.service}>
            <svg
              className={styles.serviceIcon}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="10" width="38" height="27" rx="3" />
              <path d="M17 43h14M24 37v6" />
              <path d="m20 18 11 5.5L20 29z" />
            </svg>

            <div className={styles.serviceDetails}>
              <h3 className={styles.serviceTitle}>TV PRODUKTION</h3>
              <p className={styles.serviceDescription}>
                Vi leverer komplette løsninger inden for formatudvikling,
                optagelse og redigering.
              </p>
            </div>
          </article>

          <article className={styles.service}>
            <svg
              className={styles.serviceIcon}
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M27 35V9l15-3v26" />
              <path d="M27 15l15-3" />
              <ellipse cx="20" cy="36" rx="7" ry="5" />
              <ellipse cx="35" cy="32" rx="7" ry="5" />
            </svg>

            <div className={styles.serviceDetails}>
              <h3 className={styles.serviceTitle}>MUSIK VIDEO</h3>
              <p className={styles.serviceDescription}>
                Lad din musik træde frem i et visuelt univers, der forstærker
                din lyd og dit budskab.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
