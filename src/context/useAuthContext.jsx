import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:3042";
const TOKEN_STORAGE_KEY = "token";

// JWT token
function readStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// Payload (Data i JWT token. (Role, user, ... ))
function decodeTokenPayload(token) {
  if (!token) {
    return null;
  }

  try {
    // Split deler en string til et array, hvor end den finder en separator. ("henrik.lars.marie")
    // [1] Angiver hvilket index
    const encodedPayload = token.split(".")[1];

    if (!encodedPayload) {
      return null;
    }

    const base64Payload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");

    const paddedPayload = base64Payload.padEnd(
      base64Payload.length + ((4 - (base64Payload.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(paddedPayload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readStoredToken);

  const [user, setUser] = useState(() => decodeTokenPayload(readStoredToken()));

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(readStoredToken()),
  );

  async function login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const receivedToken = result.data?.token;

      if (!response.ok || result.status !== "ok" || !receivedToken) {
        return {
          success: false,
          error: result.message || "Login failed.",
        };
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, receivedToken);

      setToken(receivedToken);
      setUser(decodeTokenPayload(receivedToken));
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      };
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }

  const authContextValue = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
