import styles from "../udtalelser/udtalelser.module.css";
import { useCRUD } from "../../hooks/useCRUD";

export default function Udtalelser() {
  const { items: reviews, loading, error } = useCRUD("reviews");

  const featuredReview = [...reviews].sort((a, b) => b.rating - a.rating)[0];

  if (loading) {
    return (
      <section className={styles.udtalelserSection}>
        <p className={styles.loadingMessage}>Indlæser udtalelser...</p>
      </section>
    );
  }

  return (
    <section className={styles.udtalelserSection}>
      <div className={styles.udtalelserContent}>
        <header className={styles.udtalelserHeader}>
          <p className={styles.sectionLabel}>UDTALELSER</p>
          <h2 className={styles.sectionHeading}>
            HVAD SIGER VORES SAMARBEJDSPARTNERE OM OS?
          </h2>
        </header>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        {featuredReview && (
          <blockquote className={styles.featuredQuote}>
            {featuredReview.text}
          </blockquote>
        )}

        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <article className={styles.reviewCard} key={review._id}>
              <div
                className={styles.reviewRating}
                aria-label={`${review.rating} ud af 5 stjerner`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={
                      star <= review.rating
                        ? styles.filledStar
                        : styles.emptyStar
                    }
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className={styles.reviewText}>
                {review.text}
              </blockquote>

              <footer className={styles.reviewAuthor}>
                <div>
                  <p className={styles.authorName}>{review.name}</p>
                  <p className={styles.authorPosition}>{review.position}</p>
                </div>

                <svg
                  className={styles.quoteIcon}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 7H3v6h5v-2H5V9h2V7zm10 0h-4v6h5v-2h-3V9h2V7zM3 13c0 3 2 5 5 5v-2c-2 0-3-1-3-3H3zm10 0c0 3 2 5 5 5v-2c-2 0-3-1-3-3h-2z" />
                </svg>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
