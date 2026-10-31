import { Link } from "react-router-dom";
import styles from "../404/errorPage.module.css";

export default function error() {
  return (
    <main className={styles.error}>
      <section className={styles.errorContent}>
        <h1>404 Page Not Found</h1>
        <p>Beklager, siden du søger eksisterer ikke.</p>
        <Link to="/" className={styles.homeLink}>
          Tilbage til forsiden?
        </Link>
      </section>
    </main>
  );
}
