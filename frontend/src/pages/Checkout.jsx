import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async (e) => {
  e.preventDefault();
  setError(""); // ✅ add this

    if (!user) {
      navigate("/login");
      return;
    }

    if (!address || !phone) {
      setError("Please fill all details");
      return;
    }
     try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.id,
        items: cart,
        address,
        phone,
        total,
      });

    // ✅ simulate successful order
     clearCart();
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError("Order failed");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* LEFT — SHIPPING DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md p-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Details
              </h2>

              {error && (
                <p className="mb-4 text-sm text-red-600">{error}</p>
              )}

              <form className="space-y-5" onSubmit={handlePlaceOrder}>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border bg-gray-100"
                />

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border bg-gray-100"
                />

                <input
                  type="text"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-900"
                />

                <textarea
                  rows="4"
                  placeholder="Shipping address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-900"
                />

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-black transition"
                >
                  Place Order
                </button>
              </form>
            </motion.div>

            {/* RIGHT — ORDER SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md p-8 h-fit"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <span className="text-sm">{item.name}</span>
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
}
