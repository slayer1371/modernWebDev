import { Link, useNavigate } from "react-router-dom";
import Parse from "parse";
import { logout } from "../hooks/useAuth"; 
import { useState, useEffect } from "react";

const AuthModule = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Parse.User.current());
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for login/logout changes
    const interval = setInterval(() => {
      setIsLoggedIn(!!Parse.User.current());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout(); // Calling the logout function from useAuth hook
    setIsLoggedIn(false); // Update local state
    navigate("/"); // Redirect to home page after logout
  };

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="cursor-pointer text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Logout
      </button>
    );
  }
  // If not logged in, show both Login and Register buttons
  return (
    <div className="flex space-x-2">
      <Link to="/login"> 
        <button
          type="button"
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </Link>
      <Link to="/register"> 
        <button
          type="button"
          className="cursor-pointer text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Register
        </button>
      </Link>
    </div>
  );
};

export default AuthModule;