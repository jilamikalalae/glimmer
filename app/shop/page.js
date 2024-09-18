import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Classy Blazer",
    price: "$20/week",
    color: "brown",
    category: "Men",
    img: "/image/turtleneck.jpeg",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 2,
    name: "Fur cuffed cardigan",
    price: "$30/week",
    color: "cream",
    category: "Women",
    img: "/image/fur-cuffed-cardigan.jpeg",
    sizes: ["S", "M", "L"],
  },
];

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-lg shadow-sm p-8"
          style={{ width: "300px", padding: "24px" }}
        >
          <div className="relative w-[250px] h-[300px] mx-auto">
            <Image
              src={product.img}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">Category: {product.category}</p>
            <p className="text-gray-700">Price: {product.price}</p>
            <p className="text-gray-500">Color: {product.color}</p>
            <p className="text-gray-500">Season: {product.season}</p>
            <p className="text-gray-500">Sizes: {product.sizes.join(", ")}</p>
            <button
              onClick={() => handleViewDetails(product.id)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

