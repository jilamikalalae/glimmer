"use client"; // Add this to make the component a Client Component

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';

const products = [
  { id: 1, name: "Classy Blazer", price: "$20/week", color: "brown", category: "Men", img: "/image/turtleneck.jpeg", sizes: ["XS", "S", "M", "L"] },
  { id: 2, name: "Fur cuffed cardigan", price: "$30/week", color: "cream", category: "Women", img: "/image/fur-cuffed-cardigan.jpeg", sizes: ["S", "M", "L"] },
];

export default function ProductDetails({ params }) {
  const { id } = params; // Get the dynamic ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find(p => p.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-8">
      <div className="flex">
        <div className="w-1/2">
          <Image 
            src={product.img}
            alt={product.name}
            width={500}  
            height={500}
            className="object-cover"
          />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-2"><strong>Category:</strong> {product.category}</p>
          <p className="text-lg mb-2"><strong>Price:</strong> {product.price}</p>
          <p className="text-lg mb-2"><strong>Color:</strong> {product.color}</p>
          <p className="text-lg mb-2"><strong>Sizes Available:</strong> {product.sizes.join(', ')}</p>
          <button
            onClick={() => router.push(`/product/edit/${product.id}`)}
            className="bg-babypink text-white px-4 py-2 rounded mt-4 flex items-center gap-2"
          >
            <FaEdit /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}