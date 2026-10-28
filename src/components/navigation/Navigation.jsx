import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import styles from "../navigation/navigation.module.css";
import logo from "../../assets/logo.png";

// Hooks
// Dekleration af en funktion
export default function Navigation() {
  // Array destrukturering
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentLocation = useLocation();
  const navigate = useNavigate();

  // Objekt destrukturering
  const { isAuthenticated, user, logout } = useAuth();
  const userIsAdmin = isAuthenticated && user?.role === "admin";

  const navigationLinks = [
    { path: "/", label: "FORSIDE" },
    { path: "/blog", label: "BLOG" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "KONTAKT" },
    ...(userIsAdmin ? [{ path: "/backoffice", label: "BACKOFFICE" }] : []),
    ...(!isAuthenticated ? [{ path: "/login", label: "LOGIN" }] : []),
  ];

  function closeMenu() {
    setMenuIsOpen(false);
  }

  function toggleMenu() {
    setMenuIsOpen((isOpen) => !isOpen);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }

  function renderNavigationLinks() {
    return navigationLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        onClick={closeMenu}
        className={
          currentLocation.pathname === link.path
            ? styles.activeLink
            : styles.navigationLink
        }
      >
        {link.label}
      </Link>
    ));
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label="Hovednavigation">
        <Link to="/" className={styles.logoLink} onClick={closeMenu}>
          <img src={logo} alt="CineStar Forside" className={styles.logo} />
        </Link>

        <div className={styles.desktopMenu}>
          {renderNavigationLinks()}

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              LOG UD
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className={styles.menuToggle}
          aria-label={menuIsOpen ? "Luk menu" : "Åbn menu"}
          aria-expanded={menuIsOpen}
          aria-controls="mobile-navigation"
        >
          {menuIsOpen ? "Luk" : "Menu"}
        </button>

        {menuIsOpen && (
          <div className={styles.mobileMenu} id="mobile-navigation">
            <button
              type="button"
              onClick={closeMenu}
              className={styles.closeButton}
            >
              Luk menu
            </button>

            <div className={styles.mobileLinks}>
              {renderNavigationLinks()}

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  LOG UD
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
