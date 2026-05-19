// src/pages/Shop.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import SidebarFilter from "../components/SidebarFilter";
import { SkeletonCard } from "../components/Loader";
import { products } from "../data/products";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popularity", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

const PER_PAGE = 8;

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ categories: [], sizes: [], tags: [], maxPrice: 600 });
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync URL params on first load
  useEffect(() => {
    const cat = searchParams.get("category");
    const sortParam = searchParams.get("sort");
    if (cat) setFilters((p) => ({ ...p, categories: [cat] }));
    if (sortParam) setSort(sortParam);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.sizes.length) list = list.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    if (filters.tags.length) list = list.filter((p) => p.tags?.some((t) => filters.tags.includes(t)));
    list = list.filter((p) => p.price <= filters.maxPrice);

    if (sort === "popularity") list.sort((a, b) => b.popularity - a.popularity);
    else if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "discount") list.sort((a, b) => b.discount - a.discount);
    else list.sort((a, b) => b.id - a.id); // latest = highest id

    return list;
  }, [filters, sort, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  return (
    <main className="min-h-screen pt-20 dark:bg-charcoal-dark">
      {/* Page header */}
      <div className="bg-cream-200 dark:bg-charcoal py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-2">Explore</p>
          <h1 className="section-title dark:text-cream-100">Shop All</h1>
          <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mt-2">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300" size={15} />
            <input
              value={search} onChange={handleSearch} placeholder="Search products…"
              className="input-field pl-9 text-sm"
            />
          </div>

          {/* Sort */}
          <select
            value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="input-field w-auto cursor-pointer font-body text-sm"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 font-body text-sm border border-cream-300 dark:border-charcoal-light px-4 py-2.5 text-charcoal dark:text-cream-200 hover:border-gold transition-colors"
          >
            <FiFilter size={15} /> Filters
            {(filters.categories.length + filters.sizes.length + filters.tags.length) > 0 && (
              <span className="bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {filters.categories.length + filters.sizes.length + filters.tags.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <SidebarFilter filters={filters} setFilters={setFilters} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-6">🛍️</div>
                <h3 className="font-display text-2xl text-charcoal dark:text-cream-100 mb-2">No products found</h3>
                <p className="font-body text-sm text-charcoal/50 dark:text-cream-300">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {paginated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`w-10 h-10 font-body text-sm transition-all ${
                          page === i + 1
                            ? "bg-gold text-white"
                            : "border border-cream-300 dark:border-charcoal-light text-charcoal dark:text-cream-200 hover:border-gold"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-cream-50 dark:bg-charcoal-dark z-50 p-8 overflow-y-auto custom-scrollbar"
            >
              <SidebarFilter filters={filters} setFilters={setFilters} onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
