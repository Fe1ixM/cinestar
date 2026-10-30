import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();

  const userIsAuthenticated = isAuthenticated;
  const userHasRequiredRole = !requiredRole || user?.role === requiredRole;

  if (!userIsAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userHasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
