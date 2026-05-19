// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (i) => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && i.selectedSize === action.payload.selectedSize)
        ),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("fashionhub_cart");
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialCart());

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("fashionhub_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, selectedSize, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, selectedSize, quantity },
    });
    toast.success(`${product.name} added to cart`, {
      style: { fontFamily: "'DM Sans', sans-serif", fontSize: "13px" },
      iconTheme: { primary: "#BFA882", secondary: "#fff" },
    });
  };

  const removeFromCart = (id, selectedSize) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, selectedSize } });
    toast.error("Item removed from cart", {
      style: { fontFamily: "'DM Sans', sans-serif", fontSize: "13px" },
    });
  };

  const incrementQty = (id, selectedSize) =>
    dispatch({ type: "INCREMENT", payload: { id, selectedSize } });

  const decrementQty = (id, selectedSize) =>
    dispatch({ type: "DECREMENT", payload: { id, selectedSize } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const subtotal = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
        subtotal,
        totalItems,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
