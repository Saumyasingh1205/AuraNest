import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
<<<<<<< HEAD
=======
import Contact from "./pages/Contact";
>>>>>>> b08323b (Added contact page and navbar update)
export default function App() {
  return (
    <>
      <Navbar />

      {/* GLOBAL OFFSET FOR FIXED NAVBAR */}
      <main className="bg-[#faf7f2] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
<<<<<<< HEAD
=======
          <Route path="/contact" element={<Contact />} />
>>>>>>> b08323b (Added contact page and navbar update)
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />}/>
        </Routes>
      </main>
    </>
  );
}

