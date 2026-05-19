// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=85",
    label: "New Season Arrivals",
    heading: "Dress for the\nLife You Want",
    sub: "Explore our curated edit of premium styles for every occasion.",
    cta: "Shop Women",
    ctaLink: "/shop?category=women",
    accent: "left",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=85",
    label: "Men's Collection",
    heading: "Refined Style,\nTimeless Edge",
    sub: "Sharp tailoring and relaxed essentials for the modern gentleman.",
    cta: "Shop Men",
    ctaLink: "/shop?category=men",
    accent: "right",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=85",
    label: "Up to 40% Off",
    heading: "Summer Sale\nNow Live",
    sub: "Hundreds of styles marked down. Limited time only.",
    cta: "Shop the Sale",
    ctaLink: "/shop?sort=discount",
    accent: "left",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/60 via-charcoal-dark/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: slide.accent === "left" ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`max-w-xl ${slide.accent === "right" ? "ml-auto text-right" : ""}`}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="section-label text-gold mb-4"
              >
                {slide.label}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] whitespace-pre-line mb-6"
              >
                {slide.heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="font-body text-base text-white/75 mb-10 leading-relaxed"
              >
                {slide.sub}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className={`flex gap-4 ${slide.accent === "right" ? "justify-end" : ""}`}
              >
                <Link to={slide.ctaLink} className="btn-gold flex items-center gap-2">
                  {slide.cta} <FiArrowRight size={14} />
                </Link>
                <Link to="/shop" className="border border-white/50 text-white font-body font-medium tracking-widest uppercase text-xs px-8 py-3.5 hover:bg-white/10 transition-colors">
                  View All
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`h-px transition-all duration-500 ${i === current ? "w-10 bg-gold" : "w-5 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
