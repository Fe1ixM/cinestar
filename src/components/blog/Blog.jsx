import { Link } from "react-router-dom";
import { useCRUD } from "../../hooks/useCRUD";
import styles from "../blog/blog.module.css";

export default function Blog() {
  const { items: blogs, loading, error } = useCRUD("blogs");

  if (loading) {
    return (
      <section className={styles.blogSection}>
        <p className={styles.loadingMessage}>Indlæser blogs...</p>
      </section>
    );
  }

  const latestBlog = [...blogs].sort(
    (a, b) => new Date(b.created) - new Date(a.created),
  )[0];

  return (
    <section className={styles.blogSection}>
      <div className={styles.blogContent}>
        <header className={styles.blogHeader}>
          <p className={styles.blogLabel}>BLOG</p>
          <h2 className={styles.sectionHeading}>VORES SENESTE BLOG</h2>
        </header>

        <p className={styles.blogDescription}>
          Hold dig opdateret med de seneste nyheder, indblik og historier fra
          Cinestar. Vi deler inspiration, tips og bag kulisserne fra vores
          spændende projekter og produktioner.
        </p>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        {latestBlog ? (
          <Link to={`/blog/${latestBlog._id}`} className={styles.blogCard}>
            {latestBlog.image && (
              <img
                src={latestBlog.image}
                alt={latestBlog.title}
                className={styles.blogImage}
              />
            )}

            <div className={styles.blogCardContent}>
              <h3 className={styles.blogTitle}>{latestBlog.title}</h3>

              <p className={styles.blogTeaser}>
                {latestBlog.teaser || latestBlog.description}
              </p>

              <time className={styles.blogDate} dateTime={latestBlog.created}>
                Oprettet d.{" "}
                {new Date(latestBlog.created).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </Link>
        ) : (
          !error && (
            <p className={styles.emptyMessage}>
              Der er endnu ingen blogindlæg.
            </p>
          )
        )}
      </div>
    </section>
  );
}
