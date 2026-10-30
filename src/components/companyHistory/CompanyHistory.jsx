import cameraMan from "../../assets/filming.jpg";
import styles from "../companyHistory/companyhistory.module.css";

export default function History() {
  return (
    <section className={styles.historySection}>
      <div className={styles.historyContent}>
        <header className={styles.historyHeader}>
          <p className={styles.historyLabel}>HISTORIEN</p>
          <h2 className={styles.historyHeading}>HISTORIEN BAG CINESTAR</h2>
        </header>
        <p className={styles.historyDescription}>
          Cinestar blev grundlagt med en passion for at fortælle historier, der
          fanger og bevæger sit publikum. Virksomheden begyndte som en lille
          uafhængig film- og tv-produktionsenhed med et klart fokus på originalt
          og visuelt engagerende indhold.
        </p>

        <div className={styles.ceoDetails}>
          <p className={styles.ceoName}>DYAS KARDINAL</p>
          <p className={styles.ceoTitle}>CEO AF CINESTAR</p>
        </div>

        <figure className={styles.historyImageContainer}>
          <img
            src={cameraMan}
            alt="Dyas Kardinal - CEO af Cinestar"
            className={styles.historyImage}
          />
        </figure>
      </div>
    </section>
  );
}
