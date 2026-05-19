# 🛍️ FashionHub – Premium Fashion eCommerce

A full-featured, modern fashion eCommerce frontend built with React + Vite + Tailwind CSS.

---

## 🚀 Quick Start (Step-by-Step)

### Step 1 – Install Node.js
Make sure you have Node.js v18 or higher installed.
→ Download: https://nodejs.org

Verify in terminal:
```
node -v   # should print v18.x.x or higher
npm -v
```

---

### Step 2 – Open the project in VS Code
1. Unzip the downloaded file
2. Open VS Code
3. Go to **File → Open Folder** and select the `fashionhub` folder

---

### Step 3 – Open the VS Code Terminal
Press **Ctrl + `** (backtick) to open the integrated terminal.

---

### Step 4 – Install dependencies
Run this command in the terminal:
```bash
npm install
```
This installs all packages (React, Vite, Tailwind, Framer Motion, etc.)
⏳ Takes about 30–60 seconds.

---

### Step 5 – Start the development server
```bash
npm run dev
```
You'll see:
```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

---

### Step 6 – Open in browser
Go to → **http://localhost:5173**

🎉 Your FashionHub website is live!

---

## 📁 Project Structure

```
fashionhub/
├── src/
│   ├── assets/              # Images & icons
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky nav with dark mode, cart badge, search
│   │   ├── Footer.jsx       # Full footer with links & socials
│   │   ├── Hero.jsx         # Auto-rotating hero slider
│   │   ├── ProductCard.jsx  # Product card with hover effects
│   │   ├── CategoryCard.jsx # Category tiles
│   │   ├── CartItem.jsx     # Cart row with qty controls
│   │   ├── Loader.jsx       # Spinner + skeleton card
│   │   ├── SearchBar.jsx    # Search overlay with live results
│   │   ├── SidebarFilter.jsx# Filter sidebar (category, price, size, tags)
│   │   ├── Newsletter.jsx   # Email signup section
│   │   └── ScrollToTop.jsx  # Floating scroll-to-top button
│   ├── pages/
│   │   ├── Home.jsx         # Hero, categories, trending, sale, testimonials
│   │   ├── Shop.jsx         # Grid, filters, sorting, pagination
│   │   ├── ProductDetails.jsx # Gallery, size selector, add to cart
│   │   ├── Cart.jsx         # Cart items, promo code, order summary
│   │   ├── Wishlist.jsx     # Saved items, move to cart
│   │   ├── Login.jsx        # Email/password, show/hide, remember me
│   │   ├── Register.jsx     # Sign up with password strength meter
│   │   ├── About.jsx        # Brand story, stats, team
│   │   ├── Contact.jsx      # Contact form, info, socials
│   │   └── NotFound.jsx     # 404 page
│   ├── context/
│   │   ├── CartContext.jsx  # Add/remove/qty/total – persists to localStorage
│   │   └── WishlistContext.jsx # Wishlist – persists to localStorage
│   ├── data/
│   │   └── products.js      # 20 products with real Unsplash images
│   ├── routes/
│   │   └── AppRoutes.jsx    # All routes with Framer Motion page transitions
│   ├── App.jsx              # Root: Providers + Navbar + Footer + Toaster
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind + custom CSS
├── tailwind.config.js       # Custom colors, fonts, shadows, animations
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Responsive layout (mobile-first) | ✅ |
| Dark / Light mode toggle | ✅ |
| Sticky navbar with scroll effect | ✅ |
| Live search overlay | ✅ |
| Auto-rotating hero slider | ✅ |
| Product grid with filters | ✅ |
| Category, price, size, tag filters | ✅ |
| Sort (popular, price, latest, discount) | ✅ |
| Pagination | ✅ |
| Product details with image gallery | ✅ |
| Add to cart + quantity controls | ✅ |
| Wishlist (add/remove/move to cart) | ✅ |
| Cart persists across page refreshes | ✅ |
| Toast notifications | ✅ |
| Skeleton loading cards | ✅ |
| Framer Motion page transitions | ✅ |
| Scroll-to-top button | ✅ |
| Login / Register forms | ✅ |
| About & Contact pages | ✅ |
| 404 Not Found page | ✅ |

---

## 🛠️ Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🎨 Design System

**Fonts:** Cormorant Garamond (display) + DM Sans (body)
**Colors:**
- `gold` – #BFA882 (brand accent)
- `cream` – warm off-white backgrounds
- `charcoal` – #1A1A1A (text/dark bg)
- `blush` – #F2B8B0 (badge accent)

---

Built with ❤️ using React + Vite + Tailwind CSS
