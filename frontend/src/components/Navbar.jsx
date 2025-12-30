import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          Aura<span className="text-yellow-600">Nest</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          {user && (
            <NavLink to="/cart" className={linkClass}>
              Cart ({cart.length})
            </NavLink>
          )}
          {user && (
  <NavLink to="/orders" className={linkClass}>
    Orders
  </NavLink>
)}
          {/* AUTH */}
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {user?.name && (
  <span className="text-gray-600 text-sm">
    Hi, {user.name}
  </span>
)}
<NavLink to="/contact" className={linkClass}>
  Contact Us
</NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
