import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse";
import { isAdmin } from "../../hooks/useAuth";

function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null); 

  useEffect(() => {
    const checkAdminAccess = async () => {
     
      if (!Parse.User || !Parse.User.current) {
        console.error("AdminRoute: Parse.User is not ready. Check initialization.");
        setAllowed(false); 
        return;
      }

      const user = Parse.User.current();
      console.log("AdminRoute: Current Parse User:", user ? user.id : "No user logged in.");

      if (!user) {
        setAllowed(false); // No user logged in, so not an admin
        console.log("AdminRoute: No user logged in, redirecting.");
        return;
      }

      try {
        const isUserAdmin = await isAdmin(user);
        setAllowed(isUserAdmin);
        console.log("AdminRoute: isAdmin result:", isUserAdmin);
      } catch (error) {
        console.error("AdminRoute: Error during isAdmin check:", error);
        setAllowed(false); 
      }
    };

    checkAdminAccess();

    
  }, []); 

  if (allowed === null) {
    // Still checking, show a loading indicator
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Checking admin access...</div>
      </div>
    );
  }

  if (!allowed) {
    // Not allowed, redirect to home
    console.log("AdminRoute: Access denied, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // Allowed, render children
  console.log("AdminRoute: Access granted.");
  return children;
}

export default AdminRoute;
