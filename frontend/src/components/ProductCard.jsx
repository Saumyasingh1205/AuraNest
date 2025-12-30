import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      {/* IMAGE CONTAINER – fixed height */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="text-gray-600 mt-1">₹{product.price}</p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}