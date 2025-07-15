import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse"; // Ensure Parse is imported
import { isAdmin } from "../../hooks/useAuth";

function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null); // null: checking, true: allowed, false: not allowed

  useEffect(() => {
    const checkAdminAccess = async () => {
      console.log("AdminRoute: Starting admin access check...");

      // Ensure Parse SDK is initialized before proceeding
      if (!Parse.User || !Parse.User.current) {
        console.error("AdminRoute: Parse.User is not ready. Check parseConfig.js initialization.");
        setAllowed(false); // Assume not allowed if Parse isn't ready
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
        setAllowed(false); // Assume not allowed on error
      }
    };

    checkAdminAccess();

    // Optional: Add a listener for auth state changes if your Parse SDK supports it,
    // or keep the polling from AuthModule if you rely on that for general auth state.
    // For a simple AdminRoute, a single check on mount is often sufficient if login requires a refresh.
  }, []); // Empty dependency array means this runs once on mount

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
