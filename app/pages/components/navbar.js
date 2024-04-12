"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      setIsLogged(true);
      console.log("Logged In");
    }
  }, [token, isLogged]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-dark-800 text-white py-4 shadow-md bg-black border-b border-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Bawarchi Restaurant"
            className="w-20 h-26 object-contain"
          />
        </div>
        <div className="hidden xl:flex items-center ml-auto">
          {isLogged && (
            <ul className="flex gap-4">
              <li>
                <a href="/dashboards/product_mix_dash">Product Reports</a>
              </li>
              <li>
                <a href="/dashboards/sales_dash">Sales Reports</a>
              </li>
              <li>
                <a href="/category_dash">Category</a>
              </li>
              <li>
                <a href="/product_dash">Product</a>
              </li>
              <li>
                <a href="/cashier_dash">Cashier</a>
              </li>
              <li>
                <a href="/order">Orders</a>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center ml-auto mt-2 mr-2">
          <button
            className="block xl:hidden ml-auto px-3 py-2 text-blue bg-white-500 hover:bg-gray-700 hover:text-black rounded-md"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Menu
          </button>
        </div>
        <div
          className={`xl:hidden absolute top-0 right-4 gap-4 ${
            showDropdown ? "block" : "hidden"
          }`}
        >
          {isLogged && (
            <ul className="flex gap-4 flex-col bg-white text-black absolute right-7 top-10 p-4 rounded-md shadow-md border border-gray-900 w-40 mt-10">
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/dashboards/product_mix_dash">Product Reports</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/dashboards/sales_dash">Sales Reports</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/category/category-add">Add Category</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/category/category-view">View Category</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/product/product-add">Add Product</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/product/product-view">View Product</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/cashier/cashier-add">Add Cashier</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/cashier/cashier-update">View and Update Cashier</a>
              </li>
              <li className="cursor-pointer border-b border-gray-400 pb-2">
                <a href="/order">Orders</a>
              </li>
            </ul>
          )}
        </div>
        <div className="flex gap-4 mt-2">
          {isLogged ? (
            <button
              onClick={handleLogout}
              className="bg-orange-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
