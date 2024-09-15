// app/product/[id]/page.js

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';

const products = [
  { id: 1, name: "Classy Blazer", price: "$20/week", color: "brown", category: "Women", img: "/image/turtleneck.jpeg", sizes: ["XS", "S", "M", "L"] },
  { id: 2, name: "Fur cuffed cardigan", price: "$30/week", color: "cream", category: "Women", img: "/image/fur-cuffed-cardigan.jpeg", sizes: ["S", "M", "L"] },
];

export default function ProductDetails() {
  const { id } = useRouter().query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedProduct = products.find(p => p.id === parseInt(id));
      setProduct(selectedProduct);
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="flex">
        <div className="w-1/2">
          <Image 
            src={product.img}
            alt={product.name}
            width={500}  // Set the width
            height={500} // Set the height
            layout="fixed" // Ensure fixed layout for consistent sizing
            className="object-cover" // Ensures the image covers the area without stretching
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