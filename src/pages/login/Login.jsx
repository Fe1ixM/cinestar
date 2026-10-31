import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import styles from "../login/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/backoffice");
      } else {
        setError(result.error || "Login failed");
      }
    } catch {
      setError("Der opstod en fejl. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isAuthenticated) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginContent}>
          <h1 className={styles.heading}>Logget ind</h1>

          <p className={styles.loggedInText}>
            Du er logget ind som <span>{user?.email || "bruger"}</span>
          </p>

          {user?.role && <p className={styles.roleText}>Rolle: {user.role}</p>}

          <button
            type="button"
            onClick={handleLogout}
            className={styles.submitButton}
          >
            Log ud
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginContent}>
        <h1 className={styles.heading}>Login</h1>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Indtast email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Indtast password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Logger ind..." : "Log ind"}
          </button>
        </form>
      </section>
    </main>
  );
}
