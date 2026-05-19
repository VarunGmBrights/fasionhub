// src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiArrowRight, FiTag } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();

  return (
    <main className="min-h-screen pt-24 pb-20 dark:bg-charcoal-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-2">Your Selection</p>
          <h1 className="section-title dark:text-cream-100 mb-10">Shopping Cart</h1>
        </motion.div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-3">Your cart is empty</h2>
            <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn-gold inline-flex items-center gap-2">
              Start Shopping <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-2 pb-4 border-b border-cream-300 dark:border-charcoal-light">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/50 dark:text-cream-300">{cartItems.length} item{cartItems.length > 1 ? "s" : ""}</span>
                <button onClick={clearCart} className="font-body text-xs text-charcoal/40 hover:text-red-400 transition-colors uppercase tracking-wide">
                  Clear all
                </button>
              </div>
              {cartItems.map((item) => (
                <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
              ))}
              <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-dark transition-colors mt-6">
                ← Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-cream-200 dark:bg-charcoal p-8 sticky top-24">
                <h2 className="font-display text-2xl text-charcoal dark:text-cream-100 mb-8">Order Summary</h2>

                {/* Promo */}
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300" size={14} />
                    <input placeholder="Promo code" className="input-field pl-9 text-xs" />
                  </div>
                  <button
                    onClick={() => toast.error("Invalid promo code")}
                    className="bg-charcoal dark:bg-gold text-white px-4 font-body text-xs uppercase tracking-widest hover:bg-gold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-3 pb-6 border-b border-cream-300 dark:border-charcoal-light">
                  <div className="flex justify-between font-body text-sm text-charcoal/70 dark:text-cream-300">
                    <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-charcoal/70 dark:text-cream-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-gold">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-body text-xs text-charcoal/40 dark:text-cream-300">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-display text-2xl text-charcoal dark:text-cream-100 py-6">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => toast.success("Proceeding to checkout…")}
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  Checkout <FiArrowRight size={14} />
                </button>

                {/* Payment icons */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {["💳", "🔒"].map((i) => <span key={i} className="text-xl">{i}</span>)}
                  <span className="font-body text-xs text-charcoal/40 dark:text-cream-300">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
