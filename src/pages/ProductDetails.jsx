// src/pages/ProductDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar, FiMinus, FiPlus, FiArrowLeft } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  const wishlisted = product ? isWishlisted(product.id) : false;

  useEffect(() => { window.scrollTo({ top: 0 }); setSelectedImg(0); setSelectedSize(""); setQty(1); }, [id]);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
      <div className="text-5xl">🔍</div>
      <h2 className="font-display text-3xl text-charcoal dark:text-cream-100">Product not found</h2>
      <Link to="/shop" className="btn-gold mt-4">Back to Shop</Link>
    </div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("Please select a size"); return; }
    addToCart(product, selectedSize, qty);
  };

  return (
    <main className="min-h-screen pt-20 dark:bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-xs text-charcoal/50 dark:text-cream-300 mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-charcoal dark:text-cream-100 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] overflow-hidden bg-cream-200 dark:bg-charcoal mb-4">
              <img
                src={product.images?.[selectedImg] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i} onClick={() => setSelectedImg(i)}
                    className={`w-20 aspect-[3/4] overflow-hidden border-2 transition-colors ${selectedImg === i ? "border-gold" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="section-label mb-3 capitalize">{product.category} / {product.subcategory}</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal dark:text-cream-100 leading-tight mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={14} className={i < Math.floor(product.rating) ? "text-gold" : "text-cream-300"} fill={i < Math.floor(product.rating) ? "#BFA882" : "none"} />
                ))}
              </div>
              <span className="font-body text-sm text-charcoal/50 dark:text-cream-300">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-4xl text-charcoal dark:text-cream-100">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="font-body text-xl text-charcoal/40 dark:text-cream-300 line-through">${product.originalPrice}</span>
                  <span className="badge bg-gold text-white">-{product.discount}%</span>
                </>
              )}
            </div>

            <p className="font-body text-sm text-charcoal/70 dark:text-cream-300 leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-3">
                  Colors: <span className="font-medium text-charcoal dark:text-cream-100">{product.colors.join(", ")}</span>
                </p>
              </div>
            )}

            {/* Size */}
            <div className="mb-8">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300 mb-3">
                Size {!selectedSize && <span className="text-red-400 ml-1">*</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s} onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] h-11 px-3 border font-body text-sm transition-all ${
                      selectedSize === s
                        ? "border-gold bg-gold text-white"
                        : "border-cream-300 dark:border-charcoal-light text-charcoal dark:text-cream-200 hover:border-gold"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-cream-300 dark:border-charcoal-light">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-cream-200 dark:hover:bg-charcoal-light transition-colors text-charcoal dark:text-cream-200">
                  <FiMinus size={14} />
                </button>
                <span className="w-12 text-center font-body text-sm text-charcoal dark:text-cream-100">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-cream-200 dark:hover:bg-charcoal-light transition-colors text-charcoal dark:text-cream-200">
                  <FiPlus size={14} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn-gold flex items-center gap-2 flex-1 justify-center">
                <FiShoppingBag size={15} /> Add to Cart
              </button>

              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className={`w-11 h-11 border flex items-center justify-center transition-all ${
                  wishlisted ? "border-red-400 text-red-400" : "border-cream-300 dark:border-charcoal-light text-charcoal dark:text-cream-200 hover:border-gold hover:text-gold"
                }`}
              >
                {wishlisted ? <FaHeart size={16} /> : <FiHeart size={16} />}
              </button>
            </div>

            {/* Info tags */}
            <div className="border-t border-cream-300 dark:border-charcoal-light pt-6 space-y-3">
              {[
                ["SKU", `FH-${String(product.id).padStart(4, "0")}`],
                ["Category", product.category],
                ["Tags", product.tags?.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 font-body text-xs">
                  <span className="text-charcoal/50 dark:text-cream-300 w-20 uppercase tracking-wide">{k}</span>
                  <span className="text-charcoal dark:text-cream-100 capitalize">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-12">
              <p className="section-label mb-3">You may also like</p>
              <h2 className="section-title dark:text-cream-100">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
