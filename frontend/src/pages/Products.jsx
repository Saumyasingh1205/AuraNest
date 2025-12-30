import React,{ useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Our Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}