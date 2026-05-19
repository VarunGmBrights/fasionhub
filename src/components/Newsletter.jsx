// src/components/Newsletter.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { toast.error("Enter a valid email"); return; }
    setSent(true);
    toast.success("You're subscribed! 🎉");
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="bg-charcoal-dark py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label text-gold mb-4">Stay in the loop</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream-100 mb-4">
            Get 10% Off Your First Order
          </h2>
          <p className="font-body text-cream-300 text-sm mb-10 leading-relaxed">
            Subscribe to our newsletter for exclusive offers, style inspiration, and early access to new arrivals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-charcoal-light border border-charcoal-light text-cream-100 placeholder-cream-300/50 px-5 py-3.5 font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button type="submit"
              className="btn-gold flex items-center justify-center gap-2 shrink-0"
            >
              {sent ? "Subscribed ✓" : <><FiSend size={13} /> Subscribe</>}
            </button>
          </form>
          <p className="font-body text-xs text-cream-300/40 mt-5">No spam, unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
