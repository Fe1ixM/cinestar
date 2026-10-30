import { Link } from "react-router-dom";
import styles from "../footer/footer.module.css";
import logo from "../../assets/logo.png";
import liquifer from "../../assets/liquifer.png";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer({
  showCta = true,
  showContact = true,
  showSocials = true,
}) {
  return (
    <footer className={styles.footer}>
      {(showCta || showContact || showSocials) && (
        <div className={styles.footerContent}>
          {showCta && (
            <h2 className={styles.footerHeading}>
              Har du en idé i tankerne?
              <br />
              Lad os starte dit projekt sammen
            </h2>
          )}

          {showContact && (
            <address className={styles.contactInformation}>
              <p className={styles.contactName}>Cinestar Studio</p>
              <a href="tel:+123456789" className={styles.contactLink}>
                +123-456-789
              </a>
              <a
                href="mailto:hello@awesomesite.com"
                className={styles.contactLink}
              >
                hello@awesomesite.com
              </a>
            </address>
          )}

          {showSocials && (
            <nav className={styles.socialLinks} aria-label="Sociale medier">
              {showSocials && (
                <nav className={styles.socialLinks} aria-label="Sociale medier">
                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>

                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>

                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>

                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>

                  <a
                    href="#"
                    className={styles.socialLink}
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </nav>
              )}
            </nav>
          )}
        </div>
      )}

      <div className={styles.footerBottom}>
        <img
          src={liquifer}
          alt=""
          aria-hidden="true"
          className={styles.footerBackground}
        />

        <div className={styles.footerOverlay} aria-hidden="true" />

        <div className={styles.footerBottomContent}>
          <Link to="/" className={styles.footerLogoLink}>
            <img
              src={logo}
              alt="Cinestar Studio – Forside"
              className={styles.footerLogo}
            />
          </Link>

          <p className={styles.copyright}>
            Copyright 2025 &copy; Cinestar | Powered by Romethem E Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
