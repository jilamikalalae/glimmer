"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      setError("Please insert all requirements.");
      return;
    }

    try {
      // Check if user already exists
      const resUserExists = await fetch('/api/userexists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      const { error } = await resUserExists.json();
      
      console.log(error); // Debugging: Check what the API returns

      if (error) {
        setError(error);
        return;
      }

      // Register new user
      const res = await fetch('/api/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/login');  // Navigate to a success page or login page after signup
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-500">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-semibold leading-6 text-pink-600 hover:text-pink-500 focus:outline-none"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}