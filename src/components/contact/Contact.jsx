import { useState } from "react";
import styles from "../contact/contact.module.css";
import { useCRUD } from "../../hooks/useCRUD";
import contactBackground from "../../assets/studie2.jpg";

export default function Contact() {
  const { create } = useCRUD("messages");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await create(form);

    setStatus(result.success ? "success" : "error");
  };

  const closeConfirmation = () => {
    setStatus(null);
    setForm({
      name: "",
      email: "",
      subject: "",
      description: "",
    });
  };

  return (
    <>
      {status === "success" && (
        <div
          className={styles.confirmationOverlay}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.confirmationContent}>
            <h2>TAK FOR DIN BESKED {form.name}!</h2>
            <p>
              Vi bestræber os på at kontakte dig via din email indenfor 24
              timer.
            </p>
            <button
              type="button"
              onClick={closeConfirmation}
              className={styles.confirmationButton}
            >
              LUK
            </button>
          </div>
        </div>
      )}

      <section className={styles.contactSection}>
        <div className={styles.backgroundContainer} aria-hidden="true">
          <img
            src={contactBackground}
            alt=""
            className={styles.backgroundImage}
          />
          <div className={styles.backgroundOverlay}></div>
        </div>

        <div className={styles.contactContent}>
          <header className={styles.contactHeader}>
            <p className={styles.sectionLabel}>KONTAKT</p>
            <h2 className={styles.sectionHeading}>BOOK EN SAMTALE MED OS</h2>
          </header>

          <p className={styles.contactDescription}>
            Har du spørgsmål eller ønsker at vide mere om, hvordan vi kan hjælpe
            med dit næste projekt? Udfyld formularen, og vi kontakter dig
            hurtigst muligt. Vi ser frem til at samarbejde med dig!
          </p>

          <div className={styles.contactLayout}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formFields}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Navn"
                  aria-label="Navn"
                  autoComplete="name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  aria-label="Email"
                  autoComplete="email"
                  required
                />

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Emne"
                  aria-label="Emne"
                  required
                />

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Besked"
                  aria-label="Besked"
                  rows={6}
                  required
                />
              </div>

              {status === "error" && (
                <p className={styles.errorMessage} role="alert">
                  Noget gik galt. Prøv igen.
                </p>
              )}

              <button type="submit" className={styles.submitButton}>
                SEND BESKED
              </button>
            </form>

            <address className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.05 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.69A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+4512345678">+45 12 34 56 78</a>
              </div>

              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>Fotovej 66, 8456 Cineby</span>
              </div>

              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 7L2 7" />
                </svg>
                <a href="mailto:cinestar@production.dk">
                  cinestar@production.dk
                </a>
              </div>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
