

import Link from 'next/link';

const products = [
  { id: 1, name: "Classy Blazer", price: "$20/week", color: "brown", category: "Men", img: "/image/turtleneck.jpeg", sizes: ["XS", "S", "M", "L"] },
  { id: 2, name: "Fur cuffed cardigan", price: "$30/week", color: "cream", category: "Women", img: "/image/fur-cuffed-cardigan.jpeg", sizes: ["S", "M", "L"] },
];

export default function Shop() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.img} alt={product.name} className="w-full h-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="mb-2"><strong>Price:</strong> {product.price}</p>
            <p className="mb-2"><strong>Category:</strong> {product.category}</p>
            <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline">
            View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}