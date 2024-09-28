"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/portal/clothes");
        const result = await response.json();

        if (response.ok && result.success) {
          setProducts(result.data);
        } else {
          setError(result.message || "Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  if (loading) return;
  if (loading) {
    return LinearLoading();
  }
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="mb-4">
        <Link href="/shop/add-product">
          <button className="bg-[#F3D0D7] text-white border border-gray-300 p-2 rounded flex items-center">
            Add Product
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded flex flex-col relative"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2">
              <strong>Price:</strong> {product.price}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-2">
              <strong>Season:</strong> {product.season}
            </p>
            <p className="mb-2">
              <strong>Color:</strong> {product.color}
            </p>
            <div className="flex space-x-2 mb-2">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-default"
                >
                  {size}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Link
                href={`/product/${product._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-2 text-red-600 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
