// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=women", label: "Women" },
  { to: "/shop?category=men", label: "Men" },
  { to: "/shop?category=kids", label: "Kids" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream-50/95 dark:bg-charcoal-dark/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display text-2xl lg:text-3xl font-semibold text-charcoal dark:text-cream-100 tracking-tight">
                Fashion<span className="text-gold">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.label} to={link.to} className="nav-link dark:text-cream-200 dark:hover:text-gold text-sm">
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(true)} className="text-charcoal dark:text-cream-200 hover:text-gold dark:hover:text-gold transition-colors">
                <FiSearch size={20} />
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className="text-charcoal dark:text-cream-200 hover:text-gold dark:hover:text-gold transition-colors">
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <Link to="/wishlist" className="relative text-charcoal dark:text-cream-200 hover:text-gold dark:hover:text-gold transition-colors">
                <FiHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-charcoal dark:text-cream-200 hover:text-gold dark:hover:text-gold transition-colors">
                <FiShoppingBag size={20} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
              <Link to="/login" className="hidden sm:flex text-charcoal dark:text-cream-200 hover:text-gold dark:hover:text-gold transition-colors">
                <FiUser size={20} />
              </Link>
              {/* Hamburger */}
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-charcoal dark:text-cream-200">
                <FiMenu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-cream-50 dark:bg-charcoal-dark z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-cream-300 dark:border-charcoal-light">
                <span className="font-display text-2xl text-charcoal dark:text-cream-100">Fashion<span className="text-gold">Hub</span></span>
                <button onClick={() => setMobileOpen(false)} className="text-charcoal dark:text-cream-200">
                  <FiX size={22} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label} to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-charcoal dark:text-cream-200 hover:text-gold transition-colors text-base"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t border-cream-300 dark:border-charcoal-light">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-gold w-full text-center block">
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
