import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message
      });

      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Failed to send message");
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-10"
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            Give us a feedback!
          </h1>

          <p className="text-gray-600 mb-8">
            Have a question or need assistance? We’d love to hear from you.
          </p>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          {success && <p className="text-green-600 mb-4">{success}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-gray-900"
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-gray-900"
            />

            <textarea
              rows="5"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-gray-900"
            />

            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
