// src/pages/Wishlist.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiArrowRight, FiTrash2, FiShoppingBag } from "react-icons/fi";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes[0]);
    removeFromWishlist(product.id);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 dark:bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-2">Your Favourites</p>
          <h1 className="section-title dark:text-cream-100 mb-10">Wishlist</h1>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiHeart size={60} className="text-cream-300 dark:text-charcoal-light mb-6" />
            <h2 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-3">Your wishlist is empty</h2>
            <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mb-8">Save items you love to your wishlist.</p>
            <Link to="/shop" className="btn-gold inline-flex items-center gap-2">
              Discover Products <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="product-card dark:bg-charcoal-light group relative"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-cream-200 dark:bg-charcoal">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gold uppercase tracking-widest mb-1 capitalize">{product.category}</p>
                    <h3 className="font-display text-lg text-charcoal dark:text-cream-100 line-clamp-1 mb-2">{product.name}</h3>
                    <span className="font-display text-xl text-charcoal dark:text-cream-100">${product.price}</span>
                  </div>
                </Link>

                {/* Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex items-center justify-center gap-1.5 bg-charcoal dark:bg-gold text-white py-2.5 font-body text-xs uppercase tracking-widest hover:bg-gold dark:hover:bg-gold-dark transition-colors"
                  >
                    <FiShoppingBag size={12} /> Add
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex items-center justify-center gap-1.5 border border-cream-300 dark:border-charcoal-light text-charcoal/60 dark:text-cream-300 py-2.5 font-body text-xs uppercase tracking-widest hover:border-red-400 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={12} /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
