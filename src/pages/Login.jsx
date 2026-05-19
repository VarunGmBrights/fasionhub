// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back!");
      navigate("/");
    }, 1200);
  };

  return (
    <main className="min-h-screen flex dark:bg-charcoal-dark">
      {/* Left image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-dark/30" />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="section-label text-gold mb-3">Welcome back</p>
          <h2 className="font-display text-5xl font-light leading-tight">Your style,<br/>Your story.</h2>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="block mb-10">
            <span className="font-display text-3xl text-charcoal dark:text-cream-100">Fashion<span className="text-gold">Hub</span></span>
          </Link>
          <h1 className="font-display text-3xl text-charcoal dark:text-cream-100 mb-2">Sign In</h1>
          <p className="font-body text-sm text-charcoal/50 dark:text-cream-300 mb-8">
            Don't have an account? <Link to="/register" className="text-gold hover:text-gold-dark">Register</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300" size={15} />
              <input type="email" placeholder="Email address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-10"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300" size={15} />
              <input type={showPass ? "text" : "password"} placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-10 pr-10"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-cream-300 hover:text-gold transition-colors"
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="accent-gold"
                />
                <span className="font-body text-xs text-charcoal/60 dark:text-cream-300">Remember me</span>
              </label>
              <button type="button" className="font-body text-xs text-gold hover:text-gold-dark transition-colors">Forgot password?</button>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center">
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
