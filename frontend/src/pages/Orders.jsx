import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${user.id}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Loading your orders...
      </div>
    );
  }
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-900">
                    #{order.id}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                   {new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="border-t pt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>{order.address}</p>
                  <p>{order.phone}</p>
                </div>

                <p className="text-lg font-semibold text-gray-900">
                  ₹{order.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
