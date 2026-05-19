// src/components/CartItem.jsx
import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { incrementQty, decrementQty, removeFromCart } = useCart();

  return (
    <div className="flex gap-5 py-6 border-b border-cream-300 dark:border-charcoal-light">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <img src={item.image} alt={item.name} className="w-24 h-32 object-cover object-center" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-[10px] font-body text-gold uppercase tracking-widest mb-1 capitalize">{item.category}</p>
            <Link to={`/product/${item.id}`}>
              <h3 className="font-display text-xl text-charcoal dark:text-cream-100 leading-snug">{item.name}</h3>
            </Link>
            <p className="font-body text-xs text-charcoal/50 dark:text-cream-300 mt-1">Size: {item.selectedSize}</p>
          </div>
          <button onClick={() => removeFromCart(item.id, item.selectedSize)}
            className="text-charcoal/30 hover:text-red-400 transition-colors shrink-0"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-5">
          {/* Qty controls */}
          <div className="flex items-center border border-cream-300 dark:border-charcoal-light">
            <button onClick={() => decrementQty(item.id, item.selectedSize)}
              className="w-8 h-8 flex items-center justify-center text-charcoal dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-charcoal-light transition-colors"
            >
              <FiMinus size={12} />
            </button>
            <span className="w-8 text-center font-body text-sm text-charcoal dark:text-cream-100">{item.quantity}</span>
            <button onClick={() => incrementQty(item.id, item.selectedSize)}
              className="w-8 h-8 flex items-center justify-center text-charcoal dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-charcoal-light transition-colors"
            >
              <FiPlus size={12} />
            </button>
          </div>
          <span className="font-display text-xl text-charcoal dark:text-cream-100">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
