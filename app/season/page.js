"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Example products data (you can import or fetch this in real scenarios)
const products = [
  {
    id: 1,
    name: "Classy Blazer",
    price: "$20/week",
    color: "brown",
    category: "Men",
    season: "Winter",
    img: "/image_woman/turtleneck.jpeg",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 2,
    name: "Fur cuffed cardigan",
    price: "$30/week",
    color: "cream",
    category: "Women",
    season: "Winter",
    img: "/image_woman/fur-cuffed-cardigan.jpeg",
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Shirt",
    price: "$20/week",
    color: "cream",
    category: "Men",
    season: "Fall",
    img: "/image_men/shirt.jpeg",
    sizes: ["S", "M", "L"],
  },
];

// Banner images for each season
const banners = {
  Summer:
    "https://www.fastsimon.com/wp-content/uploads/pexels-clint-maliq-13634354-scaled.webp",
  Winter:
    "https://assets.vogue.com/photos/65ce40783192a4382aaad59a/16:9/w_1280,c_limit/00-social%20(107).jpg",
  Spring:
    "https://i.pinimg.com/564x/86/16/c7/8616c7b82373d98005da7f0f18001af1.jpg",
  Fall: "https://i.pinimg.com/736x/33/82/4a/33824a22638f24eb411b8d185017f1f2.jpg",
};

export default function Season() {
  const searchParams = useSearchParams();
  const season = (searchParams.get("season") || "Summer").trim();

  // Format the season string
  const formattedSeason =
    season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

  // Filter products based on the selected season
  const filteredProducts = products.filter(
    (product) => product.season.toLowerCase() === formattedSeason.toLowerCase()
  );

  // Select the appropriate banner image based on the season
  const bannerImage = banners[formattedSeason] || banners.Summer;

  return (
    <>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {/* Hero section with dynamic banner */}
        <div
          className="w-full h-80 relative"
          style={{
            backgroundImage: `url('${bannerImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <h1
          style={{
            fontSize: "2.5rem",
            margin: "20px 0",
            color: "#000", // Change to black
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)", // Optional: light text shadow for contrast
          }}
        >
          Shop {formattedSeason} Collection
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#000", // Change to black
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)", // Optional: light text shadow for contrast
          }}
        >
          Explore the latest trends in our {formattedSeason} collection
        </p>
      </div>

      <div
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          padding: "0 50px",
        }}
      >
        {/* Display filtered products */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{ textAlign: "center" }}
            >
              <Image
                src={product.img}
                alt={product.name}
                width={300}
                height={400}
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
              <h3 style={{ margin: "15px 0" }}>{product.name}</h3>
              <p style={{ color: "#333" }}>{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found for {formattedSeason} season.</p>
        )}
      </div>

      <style jsx>{`
        .products-grid {
          margin-top: 50px;
        }
        .product-card h3 {
          font-size: 1.5rem;
          color: #222;
        }
        .product-card p {
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
}
