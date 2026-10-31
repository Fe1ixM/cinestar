import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import blogDetailImg from "../../../assets/studio.jpg";
import styles from "../blogOnePage/blogonepage.module.css";

export default function BlogOnePage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3042/blog/${id}`);

        if (!response.ok) {
          throw new Error("Kunne ikke hente blogindlægget.");
        }

        const result = await response.json();
        setBlog(result.data || result);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.blogDetail}>
        <p className={styles.message}>Indlæser blog...</p>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className={styles.blogDetail}>
        <p className={styles.message}>Blog ikke fundet.</p>
        <Link to="/blog" className={styles.backLink}>
          Tilbage til blogarkivet
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.blogDetail}>
      <header className={styles.hero}>
        <img src={blogDetailImg} alt="Studio" className={styles.heroImage} />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Blog Arkiv</h1>

          <nav aria-label="Brødkrummesti" className={styles.breadcrumb}>
            <Link to="/">Forside</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/blog">Blog Arkiv</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{blog.title}</span>
          </nav>
        </div>
      </header>

      <article className={styles.article}>
        {blog.image && (
          <img src={blog.image} alt="" className={styles.articleImage} />
        )}

        <header className={styles.articleHeader}>
          <h2>{blog.title}</h2>

          {blog.created && (
            <p className={styles.date}>
              Oprettet den{" "}
              <time dateTime={blog.created}>
                {new Date(blog.created).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          )}
        </header>

        {blog.teaser && <p className={styles.teaser}>{blog.teaser}</p>}

        {blog.description && (
          <div className={styles.articleBody}>
            {blog.description
              .split("\n")
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        )}

        <Link to="/blog" className={styles.backLink}>
          Tilbage til blogarkivet
        </Link>
      </article>
    </main>
  );
}
