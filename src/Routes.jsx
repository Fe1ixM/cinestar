import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
