import React from "react";
import { useContext } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-gray-900 mb-10">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="w-28 h-24 overflow-hidden rounded-xl flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mt-1">₹{item.price}</p>
                </div>

                {/* ACTION */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-4 mt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link to="/checkout">
  <button
    disabled={cart.length === 0}
    className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl
               hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Proceed to Checkout
  </button>
</Link>
          </div>
        </div>
      )}
    </section>
  );
}