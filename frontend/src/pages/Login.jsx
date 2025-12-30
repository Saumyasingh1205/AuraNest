import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue shopping at AuraNest
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl
                       hover:bg-black transition font-medium"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

