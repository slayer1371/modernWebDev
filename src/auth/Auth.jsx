import { Link, useNavigate } from "react-router-dom";
import Parse from "parse";
import { logout } from "../hooks/useAuth"; 
import { useState, useEffect } from "react";

const AuthModule = () => {
  // to track if the user is logged in.
  const [isLoggedIn, setIsLoggedIn] = useState(!!Parse.User.current());
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!Parse.User.current());
    }, 2000); // Checks every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Handler for the logout button click
  const handleLogout = async () => {
    try {
      await logout(); // Called the logout function 
      setIsLoggedIn(false); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get the current user's username for display
  const currentUser = Parse.User.current();
  const username = currentUser ? currentUser.getUsername() : "Guest";

  if (isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome back, <span className="text-amber-600">{username}!</span>
        </h2>
        <p className="text-gray-600 mb-6">Ready for your next coffee adventure?</p>
        <button
          onClick={handleLogout}
          className="cursor-pointer text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    );
  }
  // If the user is not logged in, displaying a prompt and Login/Register buttons
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-xl text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        Join Our Coffee Community!
      </h2>
      <p className="text-gray-600 mb-6">Login or register to view / add to your cart.</p>
      <div className="flex space-x-3"> 
        <Link to="/login">
          <button
            type="button"
            className="cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </Link>
        <Link to="/register"> 
          <button
            type="button"
            className="cursor-pointer text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthModule;
