import { Link } from "react-router-dom";
import { useCRUD } from "../../hooks/useCRUD";
import blogImg from "../../assets/studio.jpg";
import styles from "../blog/blog.module.css";

export default function Blog() {
  const { items: blogs, loading } = useCRUD("blogs");

  const sorted = [...blogs].sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  );

  return (
    <main className={styles.blogPage}>
      <header className={styles.hero}>
        <img src={blogImg} alt="Blog arkiv" className={styles.heroImage} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Blog Arkiv</h1>
          <nav aria-label="Brødkrummesti" className={styles.breadcrumb}>
            <Link to="/">Forside</Link>
            <span aria-hidden="true"> / </span>
            <span>Blog Arkiv</span>
          </nav>
        </div>
      </header>

      <section className={styles.blogSection} aria-label="Blogindlæg">
        <div className={styles.blogList}>
          {loading ? (
            <p className={styles.loading}>Indlæser blogs...</p>
          ) : sorted.length === 0 ? (
            <p className={styles.empty}>Der er ingen blogindlæg endnu.</p>
          ) : (
            sorted.map((blog) => (
              <article key={blog._id} className={styles.blogCard}>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={styles.blogImage}
                  />
                )}

                <div className={styles.blogContent}>
                  <h2>{blog.title}</h2>
                  <p>{blog.teaser || blog.description}</p>

                  <Link to={`/blog/${blog._id}`} className={styles.readMore}>
                    Læs mere
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        <section
          className={styles.newsletter}
          aria-labelledby="newsletter-heading"
        >
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h2 id="newsletter-heading">
                EN BLOG DER KAN INSPIRERE OG HJÆLPE DIG
              </h2>
              <p>
                Få de nyeste opdateringer, tips og indsigter direkte i din
                indbakke. Vores blog deler viden, inspiration og historier, der
                kan hjælpe dig med at tage dine projekter til det næste niveau.
              </p>
            </div>

            <form className={styles.newsletterForm}>
              <label
                htmlFor="newsletter-email"
                className={styles.visuallyHidden}
              >
                Din emailadresse
              </label>

              <input
                type="email"
                id="newsletter-email"
                name="email"
                placeholder="Indtast din emailadresse"
                required
              />

              <button type="submit">TILMELD NU</button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
