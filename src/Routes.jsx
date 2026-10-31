import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";

import Login from "./pages/login/Login";

import Backoffice from "./pages/backoffice/backoffice";

export default function AppRoutes() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/backoffice"
                element={
                  <ProtectedRoute role="admin">
                    <Backoffice />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
