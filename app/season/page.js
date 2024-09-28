"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import LinearLoading from "@/components/LinearLoading";

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

  // State to store the fetched products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products based on the season from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/v1/clothes?season=${formattedSeason}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [formattedSeason]);

  // Select the appropriate banner image based on the season
  const bannerImage = banners[formattedSeason] || banners.Summer;

  return (
    <>
      {loading ? <LinearLoading /> : error ? <p>{error}</p> : null}
      <div style={{ textAlign: "center", margin: "0px 0" }}>
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

      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 lg:px-16">
        {/* Handle loading, error, and product display */}
        {!loading && products.length === 0 ? (
          <p>No products found for {formattedSeason} season.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card text-center">
              <div className="relative h-96 w-full">
                <img
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
              <p className="text-gray-700">฿{product.price}/week</p>
            </div>
          ))
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
