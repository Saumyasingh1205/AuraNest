import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // auto-login
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("User already exists or server error");
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
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Join AuraNest to discover premium home décor
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

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
            Create Account
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
