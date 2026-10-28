import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
