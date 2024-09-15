"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div
        className="bg-yellow-300 w-full h-96 relative background"
        style={{
          backgroundImage:
            "url('https://www.fastsimon.com/wp-content/uploads/pexels-clint-maliq-13634354-scaled.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=summer")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg bg-white hover:bg-pink-300 text-black font-bold py-2 px-4 rounded-lg"
        >
          Summer outfit
        </button>
      </div>

      <div
        className="bg-yellow-300 w-full h-96 relative background"
        style={{
          backgroundImage:
            "url('https://assets.vogue.com/photos/65ce40783192a4382aaad59a/16:9/w_1280,c_limit/00-social%20(107).jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=winter")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg bg-white hover:bg-pink-300 text-black font-bold py-2 px-4 rounded-lg"
        >
          Winter outfit
        </button>
      </div>
    </>
  );
}
