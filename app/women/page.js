"use client"; // Add this to ensure it's a Client Component

import { useState } from 'react';

const womenProducts = [
  { id: 1, name: "Balloon Skirt", price: "$30/week", color: "Cream", season: "Spring", img: "/image_woman/balloon skirt.jpg" },
  { id: 2, name: "Black Cardigan", price: "$50/week", color: "Black", season: "Winter", img: "/image_woman/black cardigan.jpg" },
  { id: 3, name: "Black Leather Jacket", price: "$50/week", color: "Black", season: "Fall", img: "/image_woman/black jacket.jpg" },
  { id: 4, name: "Formal Brown Blazer", price: "$50/week", color: "Brown", season: "Winter", img: "/image_woman/brown blazer.jpg" },
  { id: 5, name: "Off Shoulder Flounce", price: "$50/week", color: "White", season: "Summer", img: "/image_woman/Off Shoulder Flounce .jpg" },
  { id: 6, name: "Classy Ivory Strip Sweater", price: "$50/week", color: "Ivory", season: "Winter", img: "/image_woman/sweater.jpg" },
];

export default function Women() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Women's Clothing for Rent</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {womenProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <div className="w-full h-90 mb-4">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2"><strong>Price:</strong> {product.price}</p>
            <p className="mb-2"><strong>Color:</strong> {product.color}</p>
            <p className="mb-2"><strong>Season:</strong> {product.season}</p>
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
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            {selectedProduct && (
              <>
                <p className="mb-2"><strong>Product:</strong> {selectedProduct.name}</p>
                <p className="mb-2"><strong>Price:</strong> {selectedProduct.price}</p>
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
