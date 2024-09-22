"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div
        className="bg-yellow-300 w-full h-96 relative"
        style={{
          backgroundImage:
            "url('https://www.fastsimon.com/wp-content/uploads/pexels-clint-maliq-13634354-scaled.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=summer")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg border-2 border-white"
        >
          Summer outfit
        </button>
      </div>

      <div
        className="bg-yellow-300 w-full h-96 relative"
        style={{
          backgroundImage:
            "url('https://assets.vogue.com/photos/65ce40783192a4382aaad59a/16:9/w_1280,c_limit/00-social%20(107).jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=winter")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg border-2 border-white"
        >
          Winter outfit
        </button>
      </div>

      <div
        className="bg-yellow-300 w-full h-96 relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/86/16/c7/8616c7b82373d98005da7f0f18001af1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=spring")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg border-2 border-white"
        >
          Spring outfit
        </button>
      </div>

      <div
        className="bg-yellow-300 w-full h-96 relative"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/33/82/4a/33824a22638f24eb411b8d185017f1f2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/season?season=fall")}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-lg hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-lg border-2 border-white"
        >
          Fall outfit
        </button>
      </div>
    </>
  );
}