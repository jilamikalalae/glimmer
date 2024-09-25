"use client";

import { useState } from "react";

const womenProducts = [
  {
    id: 1,
    name: "Balloon Skirt",
    price: "$30/week",
    color: "Cream",
    season: "Spring",
    sizes: ["S", "M", "L"],
    img: "/image_woman/balloon skirt.jpg",
  },
  {
    id: 2,
    name: "Black Cardigan",
    price: "$50/week",
    color: "Black",
    season: "Winter",
    sizes: ["M", "L"],
    img: "/image_woman/black cardigan.jpg",
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    price: "$50/week",
    color: "Black",
    season: "Fall",
    sizes: ["S", "M"],
    img: "/image_woman/black jacket.jpg",
  },
  {
    id: 4,
    name: "Formal Brown Blazer",
    price: "$50/week",
    color: "Brown",
    season: "Winter",
    sizes: ["M", "L", "XL"],
    img: "/image_woman/brown blazer.jpg",
  },
  {
    id: 5,
    name: "Off Shoulder Flounce",
    price: "$50/week",
    color: "White",
    season: "Summer",
    sizes: ["S", "M"],
    img: "/image_woman/Off Shoulder Flounce .jpg",
  },
  {
    id: 6,
    name: "Classy Ivory Strip Sweater",
    price: "$50/week",
    color: "Ivory",
    season: "Winter",
    sizes: ["M", "L"],
    img: "/image_woman/sweater.jpg",
  },
];

export default function Women() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({}); // State to track size selection for each product

  const openModal = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert("Please select a size before renting!");
      return;
    }
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    if (selectedProduct) {
      resetSizeSelection(selectedProduct.id); // Reset size selection for the product
    }
    setShowModal(false);
    setSelectedProduct(null);
  };

  const selectSize = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: selectedSizes[productId] === size ? null : size, // Reselect the size or unselect it
    }));
  };

  const resetSizeSelection = (productId) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: null, // Unselect the size for the product
    }));
  };

  const handleProductClick = (product) => {
    // Reset all other product size selections
    Object.keys(selectedSizes).forEach((key) => {
      if (parseInt(key) !== product.id) {
        resetSizeSelection(key); // Unselect sizes of other products
      }
    });
    setSelectedProduct(product);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Women&apos;s Clothing for Rent
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {womenProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <div className="w-full h-90 mb-4">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2">
              <strong>Price:</strong> {product.price}
            </p>
            <p className="mb-2">
              <strong>Color:</strong> {product.color}
            </p>
            <p className="mb-2">
              <strong>Season:</strong> {product.season}
            </p>

            {/* Display Available Sizes */}
            <div className="flex space-x-2 mb-2">
              {product.sizes.map((size, index) => (
                <span
                  key={index}
                  onClick={() => {
                    handleProductClick(product); // Handle new product selection
                    selectSize(product.id, size); // Select size for the new product
                  }}
                  className={`px-2 py-1 border rounded cursor-pointer ${
                    selectedSizes[product.id] === size
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  {selectedSizes[selectedProduct.id]}
                </p>{" "}
                {/* Display selected size */}
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
                onClick={closeModal}
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
