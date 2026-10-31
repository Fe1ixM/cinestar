import { useState } from "react";
import { Link } from "react-router-dom";
import { useCRUD } from "../../hooks/useCRUD";
import faqImg from "../../assets/studio.jpg";
import styles from "../faq/faq.module.css";

export default function FAQ() {
  const { items: faqs, loading } = useCRUD("faqs");
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <main className={styles.faqPage}>
      <header className={styles.hero}>
        <img src={faqImg} alt="" className={styles.heroImage} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>FAQ</h1>

          <nav aria-label="Brødkrummesti" className={styles.breadcrumb}>
            <Link to="/">Forside</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">FAQ</span>
          </nav>
        </div>
      </header>

      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className={styles.faqContent}>
          <p className={styles.eyebrow}>Ofte stillede spørgsmål</p>

          <h2 className={styles.faqHeading} id="faq-heading">
            DE MEST ALMINDELIGE SPØRGSMÅL, VI FÅR
          </h2>

          <p className={styles.faqSubtitle}>
            Her finder du svar på de spørgsmål, vi oftest bliver stillet om
            vores processer, tjenester og produktioner. Har du brug for
            yderligere information? Tøv ikke med at kontakte os!
          </p>

          {loading ? (
            <p className={styles.message} role="status">
              Indlæser spørgsmål...
            </p>
          ) : faqs.length > 0 ? (
            <div className={styles.faqList}>
              {faqs.map((faq) => {
                const isOpen = openId === faq._id;

                return (
                  <article className={styles.faqItem} key={faq._id}>
                    <h3>
                      <button
                        type="button"
                        className={`${styles.questionButton} ${
                          isOpen ? styles.open : ""
                        }`}
                        onClick={() => toggleFAQ(faq._id)}
                        aria-expanded={isOpen}
                        aria-controls={`answer-${faq._id}`}
                      >
                        <span>{faq.question}</span>

                        <svg
                          className={styles.chevron}
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {isOpen ? (
                            <path d="m6 15 6-6 6 6" />
                          ) : (
                            <path d="m6 9 6 6 6-6" />
                          )}
                        </svg>
                      </button>
                    </h3>

                    {isOpen && (
                      <div id={`answer-${faq._id}`} className={styles.answer}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className={styles.message}>
              Der er ingen spørgsmål at vise lige nu.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
