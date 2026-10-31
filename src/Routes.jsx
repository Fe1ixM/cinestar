import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Blog from "./pages/blog/Blog";
import BlogOnePage from "./pages/blog/blogOnePage/BlogOnePage";
import FAQ from "./pages/faq/Faq";
import Error from "./pages/404/errorPage";

import Login from "./pages/login/Login";

import Backoffice from "./pages/backoffice/backoffice";

export default function AppRoutes() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogOnePage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route
                path="/backoffice"
                element={
                  <ProtectedRoute role="admin">
                    <Backoffice />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>

          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
