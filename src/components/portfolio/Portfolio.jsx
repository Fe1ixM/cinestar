import { useState } from "react";
import styles from "../portfolio/portfolio.module.css";
import daughterMom from "../../assets/daughter_mom.jpg";
import schoolLife from "../../assets/school_life.jpg";
import intoYourHeart from "../../assets/into_your_heart.jpg";

export default function Portfolio() {
  const [currentProject, setCurrentProject] = useState(0);

  function showPreviousProject() {
    setCurrentProject((current) => (current === 0 ? 2 : current - 1));
  }

  function showNextProject() {
    setCurrentProject((current) => (current === 2 ? 0 : current + 1));
  }

  return (
    <section className={styles.portfolioSection}>
      <div className={styles.portfolioContent}>
        <p className={styles.portfolioLabel}>Portfolio</p>
        <h2 className={styles.portfolioHeading}>Udvalgte Projekter</h2>

        <div className={styles.projectCarousel}>
          {currentProject === 0 && (
            <article className={styles.project}>
              <img
                className={styles.projectImage}
                src={daughterMom}
                alt="Daughter vs Mom filmproduktion"
              />

              <div className={styles.projectDetails}>
                <h3 className={styles.projectTitle}>Daughter vs Mom</h3>
                <p className={styles.projectSubtitle}>
                  The story of mom and daughter
                </p>
                <p className={styles.projectDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  a dui pharetta, vehingunt lacus eu, ultrices purus. Nunc eget
                  auctor leo, at vehicula orci.
                </p>
              </div>
            </article>
          )}

          {currentProject === 1 && (
            <article className={styles.project}>
              <img
                src={schoolLife}
                alt="School Life dokumentarfilm"
                className={styles.projectImage}
              />

              <div className={styles.projectDetails}>
                <h3 className={styles.projectTitle}>School Life</h3>
                <p className={styles.projectSubtitle}>A school movie</p>
                <p className={styles.projectDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  a dui pharetta, vehingunt lacus eu, ultrices purus. Nunc eget
                  auctor leo, at vehicula orci.
                </p>
              </div>
            </article>
          )}

          {currentProject === 2 && (
            <article className={styles.project}>
              <img
                src={intoYourHeart}
                alt="Into Your Heart musikprojekt"
                className={styles.projectImage}
              />

              <div className={styles.projectDetails}>
                <h3 className={styles.projectTitle}>Into Your Heart</h3>
                <p className={styles.projectSubtitle}>A story of youth</p>
                <p className={styles.projectDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  a dui pharetta, vehingunt lacus eu, ultrices purus. Nunc eget
                  auctor leo, at vehicula orci.
                </p>
              </div>
            </article>
          )}

          <button
            type="button"
            onClick={showPreviousProject}
            className={styles.previousButton}
            aria-label="Forrige Projekt"
          >
            &lt;
          </button>

          <button
            type="button"
            onClick={showNextProject}
            className={styles.nextButton}
            aria-label="Næste projekt"
          >
            &gt;
          </button>
        </div>

        <nav className={styles.projectNavigation} aria-label="Vælg projekt">
          <button
            type="button"
            onClick={() => setCurrentProject(0)}
            className={
              currentProject === 0
                ? styles.activeProjectButton
                : styles.projectButton
            }
            aria-label="Vis Daughter vs Mom"
            aria-current={currentProject === 0 ? "true" : undefined}
          />

          <button
            type="button"
            onClick={() => setCurrentProject(1)}
            className={
              currentProject === 1
                ? styles.activeProjectButton
                : styles.projectButton
            }
            aria-label="Vis School Life"
            aria-current={currentProject === 1 ? "true" : undefined}
          />

          <button
            type="button"
            onClick={() => setCurrentProject(2)}
            className={
              currentProject === 2
                ? styles.activeProjectButton
                : styles.projectButton
            }
            aria-label="Vis Into Your Heart"
            aria-current={currentProject === 2 ? "true" : undefined}
          />
        </nav>

        <div className={styles.portfolioDescription}>
          <p className={styles.portfolioDescriptionParagraph}>
            Her præsenterer vi et udvalg af de produktioner, vi er stolte af at
            have skabt.
            <br />
            Hvert projekt fortæller sin unikke historie og illustrerer vores
            ambition om at levere høj kvalitet, originalitet og visuel
            gennemslagskraft.
            <br />
            Gå på opdagelse, og lad dig inspirere af vores arbejde.
          </p>
        </div>
      </div>
    </section>
  );
}
