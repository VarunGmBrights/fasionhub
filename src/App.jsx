// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

// Pages without Navbar/Footer wrapper
const FULLSCREEN_ROUTES = ["/login", "/register"];

function Layout({ darkMode, setDarkMode }) {
  const isFullscreen = FULLSCREEN_ROUTES.some((r) => window.location.pathname === r);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-charcoal-dark min-h-screen flex flex-col">
        {!isFullscreen && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
        <main className="flex-1">
          <AppRoutes />
        </main>
        {!isFullscreen && <Footer />}
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("fashionhub_dark") === "true";
  });

  useEffect(() => {
    localStorage.setItem("fashionhub_dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className={darkMode ? "dark" : ""}>
            <div className="min-h-screen bg-cream-50 dark:bg-charcoal-dark transition-colors duration-300">
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              <AppRoutes />
              <Footer />
              <ScrollToTop />
            </div>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                background: "#1A1A1A",
                color: "#FAF8F5",
                borderRadius: "0",
                padding: "14px 18px",
              },
              success: { iconTheme: { primary: "#BFA882", secondary: "#FAF8F5" } },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
