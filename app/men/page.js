"use client"; // Ensure it's a Client Component

import { useState } from 'react';

const menProducts = [
  { id: 1, name: "Denim Jacket", price: "$40/week", color: "Blue", season: "Winter", img: "/image_men/denim jacket.jpg" },
  { id: 2, name: "Black Shirt", price: "$60/week", color: "Black", season: "Spring", img: "/image_men/black shirt.jpg" },
  { id: 3, name: "Brown Jacket", price: "$50/week", color: "Brown", season: "Winter", img: "/image_men/brown jacket.jpg" },
  { id: 4, name: "Gray Knit Sweater", price: "$70/week", color: "Gray", season: "Winter", img: "/image_men/gray knit sweater.jpg" },
  { id: 5, name: "Stripe Blue Shirt", price: "$30/week", color: "Light Blue", season: "Summer", img: "/image_men/stripe blue shirt.jpg" },
  { id: 6, name: "White Polo Shirt", price: "$25/week", color: "White", season: "Winter", img: "/image_men/white polo shirt.jpg" },
];

export default function Men() {
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
      <h1 className="text-2xl font-bold mb-4">Men&apos;s Clothing for Rent</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menProducts.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <div className="w-full h-90 mb-4">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2"><strong>Price:</strong> {product.price}</p>
            <p className="mb-2"><strong>Color:</strong> {product.color}</p>
            <p className="mb-2"><strong>Season:</strong> {product.season}</p>
            <button
              className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition duration-300"
              onClick={() => openModal(product)}
            >
              Rent
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            {selectedProduct && (
              <>
                <p className="mb-2 text-lg"><strong>Product:</strong> {selectedProduct.name}</p>
                <p className="mb-4 text-lg"><strong>Price:</strong> {selectedProduct.price}</p>
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
