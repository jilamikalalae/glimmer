"use client"; // Ensures the component is treated as a client component

import { useState } from 'react';
import { FaEdit, FaCheck, FaArrowLeft, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, name: "Classy Blazer", price: "$20/week", color: "brown", category: "Women", season: "winter", img: "/image_woman/turtleneck.jpeg", sizes: ["XS", "S", "M", "L"] },
  { id: 2, name: "Fur cuffed cardigan", price: "$30/week", color: "cream", category: "Women", season: "fall", img: "/image_woman/fur-cuffed-cardigan.jpeg", sizes: ["S", "M", "L"] },
  { id: 3, name: "Shirt", price: "$30/week", color: "cream", category: "Men", season: "fall", img: "/image_men/shirt.jpeg", sizes: ["S", "M", "L"] },
];

export default function ProductDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(products.find(p => p.id === parseInt(id)));
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [newSize, setNewSize] = useState('');
  const router = useRouter();

  const handleEdit = () => setIsEditing(true);
  const handleDone = () => {
    setIsEditing(false);
    setProduct(editedProduct);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSize = () => {
    if (newSize && !editedProduct.sizes.includes(newSize)) {
      setEditedProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setNewSize('');
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between">
        {/* Back Button */}
        <button onClick={handleBack} className="text-indigo-600 hover:text-indigo-500 flex items-center mb-4">
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      <div className="flex">
        {/* Product Image */}
        <div className="w-1/2">
          <Image 
            src={product.img}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-1/2 pl-8">
          <div className="flex justify-between">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Product Information</h3>
            {!isEditing ? (
              <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-500 flex items-center">
                <FaEdit className="mr-2" /> Edit
              </button>
            ) : (
              <button onClick={handleDone} className="text-green-600 hover:text-green-500 flex items-center">
                <FaCheck className="mr-2" /> Done
              </button>
            )}
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details of the product.</p>

          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* Product Name */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Product name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 p-2 rounded">
                  {!isEditing ? (
                    product.name
                  ) : (
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-1 rounded"
                    />
                  )}
                </dd>
              </div>

              {/* Category */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Category</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 p-2 rounded">
                  {!isEditing ? (
                    product.category
                  ) : (
                    <select
                      name="category"
                      value={editedProduct.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-1 rounded"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                  )}
                </dd>
              </div>

              {/* Season */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Season</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 p-2 rounded">
                  {!isEditing ? (
                    product.season
                  ) : (
                    <select
                      name="season"
                      value={editedProduct.season}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-1 rounded"
                    >
                      <option value="winter">Winter</option>
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="fall">Fall</option>
                    </select>
                  )}
                </dd>
              </div>

              {/* Price */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 p-2 rounded">
                  {!isEditing ? (
                    product.price
                  ) : (
                    <input
                      type="text"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-1 rounded"
                    />
                  )}
                </dd>
              </div>

              {/* Color */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Color</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 border border-gray-300 p-2 rounded">
                  {!isEditing ? (
                    product.color
                  ) : (
                    <input
                      type="text"
                      name="color"
                      value={editedProduct.color}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-1 rounded"
                    />
                  )}
                </dd>
              </div>

              {/* Sizes Available */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Sizes Available</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-wrap gap-2">
                  {!isEditing ? (
                    product.sizes.map((size, index) => (
                      <button key={index} className="border border-gray-300 p-2 rounded bg-[#F3D0D7]">
                        {size}
                      </button>
                    ))
                  ) : (
                    <>
                      {editedProduct.sizes.map((size, index) => (
                        <button
                          key={index}
                          className={`border border-gray-300 p-2 rounded ${
                            editedProduct.sizes.includes(size) ? 'bg-[#F3D0D7] text-white' : 'bg-gray-200'
                          }`}
                          onClick={() =>
                            setEditedProduct(prev => ({
                              ...prev,
                              sizes: prev.sizes.includes(size)
                                ? prev.sizes.filter(s => s !== size)
                                : [...prev.sizes, size],
                              }))
                            }
                          >
                            {size}
                          </button>
                        ))}
                        <div className="flex gap-2 mt-4">
                          <input
                            type="text"
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            placeholder="Add new size"
                          />
                          <button
                            onClick={handleAddSize}
                            className="bg-[#F3D0D7] text-white border border-gray-300 p-2 rounded flex items-center"
                          >
                            <FaPlus className="mr-2" /> Add Size
                          </button>
                        </div>
                      </>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }