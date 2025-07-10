import React, { useEffect, useState } from "react";
import Parse from "parse"; 
import { getUserCart } from "../hooks/CoffeeModelService"; 
import { Link } from "react-router-dom";

function CartPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = Parse.User.current();
        if (!user) {
          // If no user is logged in, set an error and stop loading
          setError("You must be logged in to view your cart.");
          setLoading(false);
          return;
        }

        // Fetch the user's cart object from Parse
        const cartObj = await getUserCart(user);
        // Get the raw items array from the cart object, default to empty array if no cart or no items
        const rawCartItems = cartObj ? cartObj.get("items") || [] : [];

        let enrichedCartItems = [];
        let totalPrice = 0;

        // Only proceed if there are items in the cart
        if (rawCartItems.length > 0) {
          const Coffee = Parse.Object.extend("Coffee");
          const query = new Parse.Query(Coffee);
          // Extract all unique coffeeIds from the raw cart items
          const coffeeIds = rawCartItems.map(item => item.coffeeId);
          // Query Parse for all Coffee objects whose objectId is in the coffeeIds list
          query.containedIn("objectId", coffeeIds);
          const coffees = await query.find();

          // Create a map for quick lookup of coffee details by ID
          const coffeeMap = {};
          coffees.forEach(c => { coffeeMap[c.id] = c; });

          // Iterate through raw cart items and attach full coffee details
          enrichedCartItems = rawCartItems.map(item => {
            const coffeeDetails = coffeeMap[item.coffeeId];
            if (coffeeDetails) {
              const itemPrice = coffeeDetails.get("price") || 0;
              totalPrice += itemPrice * item.quantity;
              return {
                ...item, // Keep existing properties (coffeeId, quantity)
                coffee: { // Attach a clean object with relevant coffee details
                  id: coffeeDetails.id,
                  name: coffeeDetails.get("name"),
                  price: itemPrice,
                  // Add any other properties you might need for display, e.g., description, imageUrl
                }
              };
            }
            // If coffee details are not found (e.g., coffee was deleted), return item with null coffee
            return {
              ...item,
              coffee: null // Indicate that coffee details are missing
            };
          });
        }

        // Update state with the fully enriched items and calculated total
        setItems(enrichedCartItems);
        setTotal(totalPrice);

      } catch (err) {
        setError("Failed to load cart. Please try logging in again.");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-xl font-semibold text-red-700 p-4 border border-red-300 rounded-md shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-xl my-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-xl text-gray-600 py-10">
          Your cart is empty. Start adding some delicious coffee!
          <p className="mt-4">
            <Link to="/menu" className="text-blue-600 hover:underline font-medium">
              Browse our menu
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.coffeeId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.coffee ? item.coffee.name : `Unknown Coffee (${item.coffeeId})`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${item.coffee ? (item.coffee.price || 0).toFixed(2) : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${item.coffee ? ((item.coffee.price || 0) * item.quantity).toFixed(2) : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
            <div className="font-bold text-2xl text-gray-800">
              Total: <span className="text-green-700">${total.toFixed(2)}</span>
            </div>
            {/* Checkout Button */}
            <button
              className="ml-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              onClick={() => console.log("Proceed to Checkout!")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
