// src/components/CategoryCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/shop?category=${category.id}`}
        className="relative block overflow-hidden group cursor-pointer aspect-[3/4]"
      >
        <img
          src={category.image} alt={category.label}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">{category.count} items</p>
              <h3 className="font-display text-3xl text-white font-light">{category.label}</h3>
            </div>
            <div className="w-10 h-10 border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <FiArrowUpRight className="text-white" size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
