// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Message sent! We'll reply within 24 hours."); setForm({ name: "", email: "", subject: "", message: "" }); }, 1200);
  };

  return (
    <main className="min-h-screen pt-20 dark:bg-charcoal-dark">
      {/* Header */}
      <section className="bg-cream-200 dark:bg-charcoal py-14 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-3">Get in touch</p>
          <h1 className="section-title dark:text-cream-100">Contact Us</h1>
          <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mt-3">We'd love to hear from you.</p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-8">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            </div>
            <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field" />
            <textarea rows={6} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" />
            <button type="submit" disabled={loading} className="btn-gold flex items-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-8">Contact information</h2>
          <div className="space-y-6 mb-10">
            {[
              { icon: <FiMail size={18} />, label: "Email", value: "gmvarun60@gmail.com" },
              { icon: <FiPhone size={18} />, label: "Phone", value: "+91 7618782564" },
              { icon: <FiMapPin size={18} />, label: "Address", value: " Hosaroad , banglore (560068) " },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 border border-cream-300 dark:border-charcoal-light flex items-center justify-center text-gold shrink-0">{item.icon}</div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 dark:text-cream-300 mb-0.5">{item.label}</p>
                  <p className="font-body text-sm text-charcoal dark:text-cream-100">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-cream-200 dark:bg-charcoal h-48 flex items-center justify-center text-charcoal/30 dark:text-cream-300 font-body text-sm mb-8">
            📍 Interactive Map
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-cream-300 dark:border-charcoal-light flex items-center justify-center text-charcoal dark:text-cream-200 hover:border-gold hover:text-gold transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
