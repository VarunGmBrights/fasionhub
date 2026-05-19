// src/components/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes[0]);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/product/${product.id}`} className="product-card block dark:bg-charcoal-light">
        {/* Image */}
        <div className="relative overflow-hidden bg-cream-200 dark:bg-charcoal aspect-[3/4]">
          {!imgLoaded && <div className="skeleton absolute inset-0" />}
          <img
            src={product.image} alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="badge bg-gold text-white">-{product.discount}%</span>
            )}
            {product.tags?.includes("new") && (
              <span className="badge bg-charcoal dark:bg-cream-100 text-white dark:text-charcoal">New</span>
            )}
            {product.tags?.includes("bestseller") && (
              <span className="badge bg-blush text-charcoal">Best Seller</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-charcoal/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            {wishlisted
              ? <FaHeart size={14} className="text-red-500" />
              : <FiHeart size={14} className="text-charcoal dark:text-cream-100" />}
          </button>

          {/* Add to Cart overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-charcoal dark:bg-gold text-cream-100 py-3 font-body text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gold dark:hover:bg-gold-dark transition-colors"
            >
              <FiShoppingBag size={14} /> Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gold uppercase tracking-widest font-body mb-1 capitalize">{product.category}</p>
          <h3 className="font-display text-lg text-charcoal dark:text-cream-100 leading-snug mb-2 line-clamp-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} size={11}
                  className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-cream-300"}
                  fill={i < Math.floor(product.rating) ? "#BFA882" : "none"}
                />
              ))}
            </div>
            <span className="text-[11px] font-body text-charcoal/50 dark:text-cream-300">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-charcoal dark:text-cream-100 font-medium">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="font-body text-sm text-charcoal/40 dark:text-cream-300 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
