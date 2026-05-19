// src/components/SidebarFilter.jsx
import { FiX } from "react-icons/fi";

const categoryOptions = ["women", "men", "kids", "accessories"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const tagOptions = ["new", "trending", "bestseller", "sale"];

export default function SidebarFilter({ filters, setFilters, onClose }) {
  const toggle = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl text-charcoal dark:text-cream-100">Filters</h2>
        {onClose && (
          <button onClick={onClose} className="text-charcoal/50 dark:text-cream-300 hover:text-charcoal dark:hover:text-cream-100 lg:hidden">
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-8">
        <h3 className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-4">Category</h3>
        <div className="space-y-2.5">
          {categoryOptions.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggle("categories", c)}
                className={`w-4 h-4 border transition-colors cursor-pointer ${
                  filters.categories?.includes(c)
                    ? "bg-gold border-gold"
                    : "border-cream-300 dark:border-charcoal-light group-hover:border-gold"
                }`}
              />
              <span className="font-body text-sm capitalize text-charcoal dark:text-cream-200">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-4">
          Price: $0 – ${filters.maxPrice || 600}
        </h3>
        <input
          type="range" min={0} max={600} step={10}
          value={filters.maxPrice || 600}
          onChange={(e) => setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs font-body text-charcoal/50 dark:text-cream-300 mt-1">
          <span>$0</span><span>$600</span>
        </div>
      </div>

      {/* Size */}
      <div className="mb-8">
        <h3 className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s} onClick={() => toggle("sizes", s)}
              className={`w-10 h-10 border font-body text-xs transition-all ${
                filters.sizes?.includes(s)
                  ? "border-gold bg-gold text-white"
                  : "border-cream-300 dark:border-charcoal-light text-charcoal dark:text-cream-200 hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((t) => (
            <button
              key={t} onClick={() => toggle("tags", t)}
              className={`px-3 py-1.5 border font-body text-xs capitalize transition-all ${
                filters.tags?.includes(t)
                  ? "border-gold bg-gold text-white"
                  : "border-cream-300 dark:border-charcoal-light text-charcoal dark:text-cream-200 hover:border-gold"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => setFilters({ categories: [], sizes: [], tags: [], maxPrice: 600 })}
        className="mt-auto btn-outline w-full text-center"
      >
        Reset Filters
      </button>
    </div>
  );
}
