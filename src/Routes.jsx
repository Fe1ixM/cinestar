import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import Navigation from "./components/navigation/Navigation";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </BrowserRouter>
  );
}
