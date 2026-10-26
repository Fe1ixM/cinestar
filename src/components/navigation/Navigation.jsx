// Hooks
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "../navigation/navigation.module.css";
import logo from "../../assets/logo.png";

// Dekleration af en funktion
export default function Navigation() {
  // Array destrukturering
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentLocation = useLocation();
  const navigate = useNavigate();
  // Objekt destrukturering
  const { isAuthenticated, user, logout } = useAuth();
  const userIsAdmin = isAuthenticated && user?.role === "admin";

  function closeMenu() {
    setMenuIsOpen(false);
  }
  function handleLogout() {
    logout();
    closeMenu();
    navigate("/");
  }
}
