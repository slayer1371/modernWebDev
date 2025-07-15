import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";
import { fetchCoffees } from "../hooks/CoffeeService"; // Assuming CoffeeService exists
import { addToCart } from "../hooks/CoffeeModelService"; // Assuming addToCart exists
import { Star, ShoppingCart, MessageSquare } from "lucide-react"; // Import Lucide icons

function MenuPage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const getCoffees = async () => {
      try {
        const fetchedCoffees = await fetchCoffees();
        // Calculate average rating and review count for each coffee
        const coffeesWithStats = fetchedCoffees.map(coffee => {
          const totalRating = coffee.reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = coffee.reviews.length > 0 ? (totalRating / coffee.reviews.length).toFixed(1) : 0;
          const reviewCount = coffee.reviews.length;
          return {
            ...coffee,
            averageRating: parseFloat(averageRating),
            reviewCount: reviewCount
          };
        });
        setCoffees(coffeesWithStats);
      } catch (err) {
        console.error("Failed to fetch coffees:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCoffees();
  }, []);

  const handleAddToCart = async (coffeeId, coffeeName) => {
    setCartMessage(""); // Clear previous messages
    try {
      const user = Parse.User.current(); // Get the current logged-in Parse user
      if (!user) {
        setCartMessage("You must be logged in to add to cart.");
        return;
      }
      await addToCart(user, coffeeId);
      setCartMessage(`Added ${coffeeName} to cart!`);
    } catch (err) {
      setCartMessage("Failed to add to cart. Please try again.");
      console.error("Error adding to cart:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-xl font-semibold text-red-700 p-4 border border-red-300 rounded-md shadow-sm">
          Error loading menu: {error.message}
        </div>
      </div>
    );
  }

  if (coffees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-500 p-4">
          No coffee items found. Please add some to your Parse `Coffee` class.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50"> {/* Overall background */}
      {/* Header Section */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Coffee Menu</h1>
          <p className="text-gray-600 mt-2">Discover our delicious selection of carefully crafted coffees</p>
        </div>
      </header>

      {/* Cart Message Display */}
      {cartMessage && (
        <div className={`text-center py-3 px-4 rounded-lg mx-auto mt-6 max-w-md ${
          cartMessage.includes("Added") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {cartMessage}
        </div>
      )}

      {/* Menu Items Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coffees.map((coffee) => (
            // Card Component Simulation
            <div key={coffee.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* CardHeader Simulation (Image Section) */}
              <div className="p-0">
                <div className="relative">
                  <img
                    src={coffee.imageUrl}
                    alt={coffee.name}
                    width={400} // Fixed width for consistent card image size
                    height={300} // Fixed height for consistent card image size
                    className="w-full h-48 object-cover rounded-t-lg" // w-full, fixed h, object-cover for fill, rounded top
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = `https://placehold.co/400x300/E0E0E0/333333?text=Image+Error`;
                    }}
                  />
                </div>
              </div>

              {/* CardContent Simulation */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{coffee.name}</h3>
                  <span className="text-xl font-bold text-green-700">${coffee.price ? coffee.price.toFixed(2) : "N/A"}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{coffee.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-800">
                      {coffee.averageRating > 0 ? coffee.averageRating : "N/A"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">({coffee.reviewCount} reviews)</span>
                </div>
              </div>

              {/* CardFooter Simulation */}
              <div className="p-6 pt-0 flex gap-2">
                {/* Add to Cart Button */}
                <button
                  className="cursor-pointer flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out text-sm"
                  onClick={() => handleAddToCart(coffee.id, coffee.name)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
                {/* View Details Button (instead of View Reviews, to match previous functionality) */}
                <Link
                  to={`/menu/${coffee.id}`}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-transparent border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;
