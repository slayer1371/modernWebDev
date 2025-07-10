import React, { useEffect, useState } from "react";
import { fetchCoffees } from "../hooks/CoffeeService";
import { addToCart } from "../hooks/CoffeeModelService";
import Parse from "parse";

function MenuPage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const getCoffees = async () => {
      try {
        const fetchedCoffees = await fetchCoffees();
        console.log(fetchedCoffees); // This will log coffee data
        setCoffees(fetchedCoffees);
      } catch (err) { 
        console.error("Failed to fetch coffees:", err);
        setError(err); // Set the error state
      } finally {
        setLoading(false); // Set loading to false after the operation
      }
    };

    getCoffees();
  }, []); // The empty dependency array ensures this runs once on mount

  const handleAddToCart = async (coffeeId, coffeeName) => {
    setCartMessage("");
    try {
      const user = Parse.User.current();
      if (!user) {
        setCartMessage("You must be logged in to add to cart.");
        return;
      }
      await addToCart(user, coffeeId);
      setCartMessage(`Added ${coffeeName} to cart!`);
    } catch (err) {
      setCartMessage("Failed to add to cart. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error.message}</div>;
  if (coffees.length === 0)
    return (
      <div>
        No coffee items found. Please add some to your Parse `Coffee` class.
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Our Coffee Menu</h1>
      {cartMessage && (
        <div className="mb-4 text-center text-green-700 bg-green-100 p-2 rounded">{cartMessage}</div>
      )}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{coffee.name}</h2>
            <p className="text-gray-600 mb-4 flex-grow">{coffee.description}</p>
            <p className="font-extrabold text-lg text-green-700 mb-4">
              Price: ${coffee.price ? coffee.price.toFixed(2) : "N/A"}
            </p>

            {/* Display Reviews Section */}
            {coffee.reviews && coffee.reviews.length > 0 && (
              <div className="mt-4 pt-4 border-t border-dashed border-gray-300 w-full">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Reviews:</h4>
                <div className="space-y-3">
                  {coffee.reviews.map((review) => (
                    <div key={review.id} className="text-sm bg-gray-50 p-3 rounded-md shadow-sm">
                      <p className="font-bold text-gray-800">
                        Rating: {review.rating} / 5
                      </p>
                      <p className="italic text-gray-600">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {coffee.reviews && coffee.reviews.length === 0 && (
              <p className="mt-4 text-gray-500 text-sm italic">No reviews yet.</p>
            )}

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6 w-full justify-center">
              {/* <Link
                to={`/menu/${coffee.id}`}
                className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-center"
              >
                View Details
              </Link> */}
              <button
                className="px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                onClick={() => handleAddToCart(coffee.id, coffee.name)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
