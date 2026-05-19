// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4 dark:bg-charcoal-dark">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="font-display text-[10rem] font-light leading-none text-cream-300 dark:text-charcoal-light select-none">404</p>
        <p className="section-label mb-4 -mt-4">Page not found</p>
        <h1 className="font-display text-4xl text-charcoal dark:text-cream-100 mb-4">Oops, we lost this page</h1>
        <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="btn-gold">Go Home</Link>
          <Link to="/shop" className="btn-outline dark:border-cream-300 dark:text-cream-100">Shop Now</Link>
        </div>
      </motion.div>
    </main>
  );
}
