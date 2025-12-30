import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

export default function Home() {
  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      
      {/* Background Image */}
      <motion.img
        src={hero}
        alt="Luxury Home"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-3xl px-6 text-center text-white">
          
          <h1 className="text-4xl md:text-6xl font-semibold tracking-wide">
            Beautiful Home Décor
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Curated luxury pieces designed to elevate your living spaces
            with elegance and warmth.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10"
          >
            <Link
              to="/products"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium shadow-lg hover:bg-gray-100 transition"
            >
              Explore Collection
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
