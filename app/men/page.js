"use client";

import LinearLoading from "@/components/LinearLoading";
import apiFetch from "@/utils/api-fetch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/v1/clothes?category=Men");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchApi = apiFetch();

  // Function to handle renting the product
  const rentProduct = async (productId, size) => {
    try {
      await fetchApi.rentFetch(productId, size, router);
      fetchProducts();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const openModal = (product) => {
    const size = selectedSizes[product._id];
    if (!size) {
      alert("Please select a size before renting!");
      return;
    }
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = async () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const submitModal = async () => {
    if (selectedProduct) {
      await rentProduct(
        selectedProduct._id,
        selectedSizes[selectedProduct._id]
      ); // Call the API when the modal closes
      resetSizeSelection(selectedProduct._id);
    }
    setShowModal(false);
    setSelectedProduct(null);
  };

  const selectSize = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: selectedSizes[productId] === size ? null : size,
    }));
  };

  const resetSizeSelection = (productId) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: null,
    }));
  };

  const handleProductClick = (product) => {
    Object.keys(selectedSizes).forEach((key) => {
      if (parseInt(key) !== product._id) {
        resetSizeSelection(key);
      }
    });
    setSelectedProduct(product);
  };

  // Show loading or error messages
  if (loading) {
    return LinearLoading();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Men&apos;s Clothing for Rent</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <div className="w-full h-96 mb-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2">
              <strong>Price:</strong> ฿{product.price}/week
            </p>
            <p className="mb-2">
              <strong>Color:</strong> {product.color}
            </p>
            <p className="mb-2">
              <strong>Season:</strong> {product.season}
            </p>

            <div className="flex space-x-2 mb-2">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => {
                    handleProductClick(product);
                    selectSize(product._id, size);
                  }}
                  className={`px-2 py-1 border rounded cursor-pointer ${
                    selectedSizes[product._id] === size
                      ? "bg-pink-300 text-white border-pink-300"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>

            <button
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              onClick={() => openModal(product)}
            >
              Rent
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            {selectedProduct && (
              <>
                <p className="mb-2 text-lg">
                  <strong>Product:</strong> {selectedProduct.name}
                </p>
                <p className="mb-2 text-lg">
                  <strong>Price:</strong> {selectedProduct.price}
                </p>
                <p className="mb-4 text-lg">
                  <strong>Selected Size:</strong>{" "}
                  {selectedSizes[selectedProduct._id]}
                </p>
                <img
                  src="/qr-code/qrcode.png"
                  alt="QR Code for Payment"
                  className="w-full h-auto mb-4"
                />
              </>
            )}
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-300"
                onClick={submitModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
