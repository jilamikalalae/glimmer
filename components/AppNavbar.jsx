"use client";
import React, { useState } from "react";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-[Poppins] cursor-pointer">
          <Image
            className="h-10 inline"
            src="/logo.png" // If the logo is in the 'public' folder
            alt="Logo"
            width={40} // Set your desired width
            height={40} // Set your desired height
          />
          {/* <img className="h-10 inline" src={Logo} alt="logo" /> */}
          tailwind
        </span>

        <span
          className="text-3xl cursor-pointer mx-2 md:hidden block"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </div>

      <ul
        className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${
          isMenuOpen ? "top-[80px] opacity-100" : "top-[-400px] opacity-0"
        }`}
      >
        <li className="mx-4 my-6 md:my-0">
          <a href="#" className="text-xl hover:text-cyan-500 duration-100">
            HOME
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a href="#" className="text-xl hover:text-cyan-500 duration-100">
            SERVICE
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a href="#" className="text-xl hover:text-cyan-500 duration-100">
            ABOUT
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a href="#" className="text-xl hover:text-cyan-500 duration-100">
            CONTACT
          </a>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <a href="#" className="text-xl hover:text-cyan-500 duration-100">
            BLOG'S
          </a>
        </li>

        <button className="bg-cyan-400 text-white duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded">
          Get started
        </button>
      </ul>
    </nav>
  );
};

export default AppNavbar;
