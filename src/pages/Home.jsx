// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Newsletter from "../components/Newsletter";
import { products, categories, testimonials } from "../data/products";

const trending = products.filter((p) => p.tags?.includes("trending")).slice(0, 4);
const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 4);

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Section label helper */}
      {/* ── CATEGORIES ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Explore</p>
          <h2 className="section-title dark:text-cream-100">Shop by Category</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* ── TRENDING ───────────────────────────────────────────────────────── */}
      <section className="bg-cream-200 dark:bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-label mb-3">Right now</p>
              <h2 className="section-title dark:text-cream-100">Trending Pieces</h2>
            </motion.div>
            <Link to="/shop?sort=popularity" className="hidden sm:flex items-center gap-2 font-body text-sm text-gold hover:text-gold-dark transition-colors">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── OFFER BANNER ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85"
          alt="Sale banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal-dark/65" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <p className="section-label text-gold mb-4">Limited Time</p>
          <h2 className="font-display text-5xl md:text-7xl font-light text-white mb-6">
            Up to <span className="text-gold italic">40% Off</span>
          </h2>
          <p className="font-body text-white/70 mb-10 max-w-md mx-auto">
            Season's biggest sale — premium styles at unbeatable prices. Ends Sunday.
          </p>
          <Link to="/shop?sort=discount" className="btn-gold inline-flex items-center gap-2">
            Shop the Sale <FiArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* ── NEW ARRIVALS ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-3">Just dropped</p>
            <h2 className="section-title dark:text-cream-100">New Arrivals</h2>
          </motion.div>
          <Link to="/shop?sort=latest" className="hidden sm:flex items-center gap-2 font-body text-sm text-gold hover:text-gold-dark transition-colors">
            See All New <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ── FEATURES STRIP ─────────────────────────────────────────────────── */}
      <section className="border-y border-cream-300 dark:border-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🚚", title: "Free Shipping", sub: "On orders over $200" },
              { icon: "↩️", title: "Free Returns", sub: "30-day return policy" },
              { icon: "🔒", title: "Secure Payment", sub: "256-bit SSL encrypted" },
              { icon: "💬", title: "24/7 Support", sub: "Chat & email support" },
            ].map((f) => (
              <div key={f.title}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <p className="font-body font-semibold text-sm text-charcoal dark:text-cream-100 mb-1">{f.title}</p>
                <p className="font-body text-xs text-charcoal/50 dark:text-cream-300">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream-100 dark:bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Happy Customers</p>
            <h2 className="section-title dark:text-cream-100">What Our Community Says</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-charcoal-light p-8 shadow-card"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar key={j} size={13} className="text-gold fill-gold" fill="#BFA882" />
                  ))}
                </div>
                <p className="font-body text-sm text-charcoal/70 dark:text-cream-300 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-body font-semibold text-sm text-charcoal dark:text-cream-100">{t.name}</p>
                    <p className="font-body text-xs text-gold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
