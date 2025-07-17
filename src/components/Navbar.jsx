import React from "react";
import { Link } from "react-router-dom";
import AuthModule from "../auth/AuthNav"; 

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center"> 
        <div className="text-2xl font-bold text-white tracking-wide">
          <Link to="/" className="hover:text-gray-300 transition-colors duration-200">
            CoffeeShop
          </Link>
        </div>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-amber-400 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="text-white text-lg font-medium hover:text-amber-400 transition-colors duration-200"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white text-lg font-medium hover:text-amber-400 transition-colors duration-200"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link to="/my-orders" 
                          className="text-white text-lg font-medium hover:text-amber-400 transition-colors duration-200"

                          >
              My Orders
            </Link>
          </li>
        </ul>

        <div className="flex items-center"> 
          <AuthModule />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
