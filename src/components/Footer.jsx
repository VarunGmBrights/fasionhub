// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";

const footerLinks = {
  Shop: [
    { label: "Women", to: "/shop?category=women" },
    { label: "Men", to: "/shop?category=men" },
    { label: "Kids", to: "/shop?category=kids" },
    { label: "Accessories", to: "/shop?category=accessories" },
    { label: "New Arrivals", to: "/shop?sort=latest" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/" },
    { label: "Press", to: "/" },
  ],
  Support: [
    { label: "FAQ", to: "/" },
    { label: "Shipping & Returns", to: "/" },
    { label: "Size Guide", to: "/" },
    { label: "Track Order", to: "/" },
  ],
};

const socials = [
  { icon: <FiInstagram size={18} />, href: "#", label: "Instagram" },
  { icon: <FiTwitter size={18} />, href: "#", label: "Twitter" },
  { icon: <FiFacebook size={18} />, href: "#", label: "Facebook" },
  { icon: <FiYoutube size={18} />, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-4">
              <span className="font-display text-3xl font-semibold text-cream-100">
                Fashion<span className="text-gold">Hub</span>
              </span>
            </Link>
            <p className="font-body text-sm text-cream-300 leading-relaxed max-w-xs mb-6">
              Curating premium fashion for those who appreciate quality, craftsmanship, and timeless style.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 border border-charcoal-light flex items-center justify-center text-cream-300 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-cream-100 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-body text-sm text-cream-300 hover:text-gold transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-light pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-cream-300/60">
            © {new Date().getFullYear()} FashionHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <Link key={t} to="/" className="font-body text-xs text-cream-300/60 hover:text-gold transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
