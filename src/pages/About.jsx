// src/pages/About.jsx
import { motion } from "framer-motion";
import Newsletter from "../components/Newsletter";

const team = [
  { name: "Isabelle Laurent", role: "Creative Director", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { name: "Marcus Chen", role: "Head of Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Priya Sharma", role: "Head of Buying", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80" },
  { name: "James Okafor", role: "Brand Partnerships", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
];

export default function About() {
  return (
    <main className="min-h-screen dark:bg-charcoal-dark">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-dark/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label text-gold mb-4">Our Story</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">About FashionHub</h1>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label mb-4">Our Mission</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal dark:text-cream-100 mb-8">
            Fashion that tells your story
          </h2>
          <p className="font-body text-base text-charcoal/70 dark:text-cream-300 leading-relaxed mb-6">
            Founded in 2026, FashionHub was born from a simple belief: premium fashion should be accessible, sustainable, and deeply personal. We work directly with artisan manufacturers across banglore and Shivmogga  and HUBLI to bring you pieces that last a lifetime.
          </p>
          <p className="font-body text-base text-charcoal/70 dark:text-cream-300 leading-relaxed">
            Every garment in our collection is selected for its quality, craftsmanship, and timeless appeal. We believe in buying less, but better – and we're committed to helping you build a wardrobe that truly reflects who you are.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-cream-200 dark:bg-charcoal py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["2018", "Founded"],
            ["50K+", "Happy Customers"],
            ["200+", "Brand Partners"],
            ["40+", "Countries"],
          ].map(([num, label]) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="font-display text-5xl text-gold mb-2">{num}</p>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-charcoal/60 dark:text-cream-300">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="section-label mb-3">The People</p>
          <h2 className="section-title dark:text-cream-100">Meet Our Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="aspect-[3/4] overflow-hidden mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="font-display text-xl text-charcoal dark:text-cream-100">{m.name}</h3>
              <p className="font-body text-xs text-gold uppercase tracking-widest mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}
