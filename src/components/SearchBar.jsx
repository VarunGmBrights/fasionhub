// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    setResults(filtered);
  }, [query]);

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl bg-cream-50 dark:bg-charcoal shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-5 py-4 border-b border-cream-300 dark:border-charcoal-light">
          <FiSearch className="text-gold mr-3" size={20} />
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products…"
            className="flex-1 bg-transparent text-charcoal dark:text-cream-100 placeholder-charcoal/40 dark:placeholder-cream-200/40 focus:outline-none font-body text-sm"
          />
          <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal dark:text-cream-300 ml-3">
            <FiX size={18} />
          </button>
        </div>
        {results.length > 0 && (
          <ul>
            {results.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p.id)}
                className="flex items-center gap-4 px-5 py-3 hover:bg-cream-200 dark:hover:bg-charcoal-light cursor-pointer transition-colors"
              >
                <img src={p.image} alt={p.name} className="w-10 h-12 object-cover" />
                <div>
                  <p className="font-body text-sm text-charcoal dark:text-cream-100">{p.name}</p>
                  <p className="text-xs text-gold capitalize">{p.category}</p>
                </div>
                <span className="ml-auto font-body text-sm font-medium text-charcoal dark:text-cream-100">${p.price}</span>
              </li>
            ))}
          </ul>
        )}
        {query.length >= 2 && results.length === 0 && (
          <p className="px-5 py-6 text-sm font-body text-charcoal/50 dark:text-cream-300 text-center">No results for "{query}"</p>
        )}
      </motion.div>
    </motion.div>
  );
}
