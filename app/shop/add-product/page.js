"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddClothesImageUpload from "@/components/AddClothesImageUpload";

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    color: "",
    category: "Men",
    season: "Winter",
    imageUrl: "",
    sizes: [],
  });
  const [newSize, setNewSize] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSize = () => {
    if (newSize && !newProduct.sizes.includes(newSize)) {
      setNewProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize],
      }));
      setNewSize("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProduct.imageUrl == "") {
      alert("Image URL is required!");
    }

    try {
      const response = await fetch("/api/portal/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      router.back();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageUpload = (url) => {
    setNewProduct((prev) => ({ ...prev, imageUrl: url }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            name="color"
            value={newProduct.color}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Season
          </label>
          <select
            name="season"
            value={newProduct.season}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sizes
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newProduct.sizes.map((size, index) => (
              <span
                key={index}
                className="px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
              >
                {size}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            placeholder="Add new size"
          />
          <button
            type="button"
            onClick={handleAddSize}
            className="bg-[#F3D0D7] text-white border border-gray-300 p-2 rounded flex items-center mt-2"
          >
            Add Size
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          {/* <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          /> */}

          <AddClothesImageUpload onUploadComplete={handleImageUpload} />
        </div>
        <button
          type="submit"
          className="bg-[#F3D0D7] text-white border border-gray-300 p-2 rounded"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
