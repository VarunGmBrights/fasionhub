// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Please fill in all fields"); return; }
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Account created!"); navigate("/"); }, 1200);
  };

  return (
    <main className="min-h-screen flex dark:bg-charcoal-dark">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=85" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-dark/30" />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="section-label text-gold mb-3">Join us</p>
          <h2 className="font-display text-5xl font-light leading-tight">Discover your<br/>signature style.</h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <Link to="/" className="block mb-10">
            <span className="font-display text-3xl text-charcoal dark:text-cream-100">Fashion<span className="text-gold">Hub</span></span>
          </Link>
          <h1 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-2">Create Account</h1>
          <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mb-8">
            Already have one? <Link to="/login" className="text-gold hover:text-gold-dark">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name", icon: <FiUser size={15} />, placeholder: "Full name", type: "text" },
              { key: "email", icon: <FiMail size={15} />, placeholder: "Email address", type: "email" },
            ].map(({ key, icon, placeholder, type }) => (
              <div key={key} className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300">{icon}</span>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={(e) => update(key, e.target.value)} className="input-field pl-10"
                />
              </div>
            ))}

            {["password", "confirm"].map((key) => (
              <div key={key} className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300" size={15} />
                <input type={showPass ? "text" : "password"}
                  placeholder={key === "password" ? "Password" : "Confirm password"}
                  value={form[key]} onChange={(e) => update(key, e.target.value)}
                  className="input-field pl-10 pr-10"
                />
                {key === "password" && (
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300 hover:text-gold"
                  >
                    {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                )}
              </div>
            ))}

            {/* Password strength */}
            {form.password && (
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((l) => (
                  <div key={l} className={`h-0.5 flex-1 transition-colors ${
                    form.password.length >= l * 2
                      ? form.password.length >= 8 ? "bg-green-400" : "bg-gold"
                      : "bg-cream-300 dark:bg-charcoal-light"
                  }`} />
                ))}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center mt-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Create Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
