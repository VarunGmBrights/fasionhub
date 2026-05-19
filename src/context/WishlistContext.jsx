// src/context/WishlistContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.items.find((i) => i.id === action.payload.id)) return state;
      return { items: [...state.items, action.payload] };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload) };
    default:
      return state;
  }
};

const getInitial = () => {
  try {
    const saved = localStorage.getItem("fashionhub_wishlist");
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  } catch { return { items: [] }; }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, getInitial());

  useEffect(() => {
    localStorage.setItem("fashionhub_wishlist", JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product) => {
    if (state.items.find((i) => i.id === product.id)) {
      toast("Already in wishlist", { icon: "💛" });
      return;
    }
    dispatch({ type: "ADD", payload: product });
    toast.success("Added to wishlist", {
      iconTheme: { primary: "#BFA882", secondary: "#fff" },
    });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE", payload: id });
    toast.error("Removed from wishlist");
  };

  const isWishlisted = (id) => state.items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems: state.items, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
