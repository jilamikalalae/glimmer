"use client";
import Image from "next/image";
import { useState } from "react";

export default function AccountSettings() {
  const [name, setName] = useState("John Doe"); // Default value
  const [username, setUsername] = useState("johndoe"); // Default value
  const [email, setEmail] = useState("john@example.com"); // Default value
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Your account has been deleted.");
      // Add actual deletion logic here
    }
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    // Add actual logout logic here
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsEditing(false); // Exit edit mode after saving
    alert("Your changes have been saved.");
    // Add actual save logic here
  };

  const handleDeleteImage = () => {
    setProfilePicture(null);
    setPreview(null);
    alert("Profile picture has been deleted.");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-8">
        {/* Account Settings Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Account Settings
        </h1>

        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <label className="cursor-pointer mb-4">
            {preview ? (
              <Image
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 transition-opacity duration-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {preview && (
            <button
              type="button"
              onClick={handleDeleteImage}
              className="bg-black text-white text-sm py-1 px-4 rounded-md hover:bg-gray-800 transition duration-300"
            >
              Delete Image
            </button>
          )}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSaveChanges}>
          {[
            { label: "Name", value: name, setter: setName },
            { label: "Username", value: username, setter: setUsername },
            { label: "Email", value: email, setter: setEmail },
          ].map(({ label, value, setter }, index) => (
            <div key={index} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={label === "Email" ? "email" : "text"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Enter your ${label.toLowerCase()}`}
                disabled={!isEditing}
                required
                className={`border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 ${
                  isEditing ? "" : "bg-gray-100"
                }`}
                style={{ width: "600px" }} // Set a width of 600px
              />
            </div>
          ))}

          {isEditing && (
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>

        <hr className="mb-6" />

        {/* Delete Account and Log Out Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-300"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
          <button
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
