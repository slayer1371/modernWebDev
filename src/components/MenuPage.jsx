import React, { useEffect, useState } from "react";
import Parse from "parse";
import { fetchCoffees } from "../hooks/CoffeeService";
import { addToCart } from "../hooks/CoffeeModelService";
import { Star, ShoppingCart, X } from "lucide-react";

export default function MenuPage() {
  const coffeeDetails = {
    Mocha: {
      calories: "190 kcal per 12 oz",
      sugar: "14 g",
      benefits:
        "Antioxidant-rich cocoa + gentle caffeine boost. Smooth, chocolatey comfort.",
    },
    Espresso: {
      calories: "5kcal per shot",
      sugar: "0g",
      benefits:
        "High-intensity caffeine rush. Low-calorie. Great for focus and metabolism.",
    },
    Latte: {
      calories: "150kcal per 12oz",
      sugar: "10g",
      benefits:
        "Creamy texture with calcium from milk. Milder caffeine for steady energy.",
    },
    "Latte Art Masterpiece": {
      calories: "160kcal per 12oz",
      sugar: "10g",
      benefits:
        "All the Latte perks plus Instagramworthy foam art. Calcium + gentle caffeine.",
    },
    "Cold Brew Concentrate": {
      calories: "5kcal per 4oz shot",
      sugar: "0g",
      benefits:
        "Smooth, less acidic. Long-lasting caffeine release. Mix with milk or water.",
    },
    "Vanilla Bean Frappuccino": {
      calories: "310kcal per 16oz",
      sugar: "45g",
      benefits:
        "Indulgent treat—vanilla sweetness, ice-blended chill. Enjoy sparingly!",
    },
    "Sumatra Mandheling (Single Origin)": {
      calories: "5kcal per 12oz",
      sugar: "0g",
      benefits:
        "Earthy, full-body flavor. Rich antioxidants. Single-origin purity.",
    },
    "Caramel Macchiato": {
      calories: "250kcal per 12oz",
      sugar: "30g",
      benefits:
        "Sweet caramel drizzle + espresso. Calcium from milk. Decadent coffee treat.",
    },
    "Matcha Latte": {
      calories: "200kcal per 12oz",
      sugar: "20g",
      benefits:
        "High in L-theanine for calm alertness. Antioxidant-packed green tea.",
    },
    "Hazelnut Americano": {
      calories: "10kcal per 12oz",
      sugar: "2g",
      benefits:
        "Robust espresso + hint of hazelnut. Low-calorie flavor twist.",
    },
    "Seasonal Spiced Chai Latte": {
      calories: "230kcal per 12oz",
      sugar: "32g",
      benefits:
        "Warm spices (cinnamon, clove) aid digestion. Cozy, aromatic, caffeine + spice.",
    },
  };

  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const results = await fetchCoffees();
        setCoffees(
          results.map((c) => {
            const total = c.reviews.reduce((sum, r) => sum + r.rating, 0);
            const avg = c.reviews.length
              ? (total / c.reviews.length).toFixed(1)
              : 0;
            return { ...c, averageRating: parseFloat(avg), reviewCount: c.reviews.length };
          })
        );
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = async (id, name) => {
    setCartMessage("");
    try {
      const user = Parse.User.current();
      if (!user) {
        setCartMessage("You must be logged in to add to cart.");
        return;
      }
      await addToCart(user, id);
      setCartMessage(`Added ${name} to cart!`);
    } catch {
      setCartMessage("Failed to add to cart. Please try again.");
    }
  };

  const openModal = (coffee) => setSelectedCoffee(coffee);
  const closeModal = () => setSelectedCoffee(null);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error loading menu.</div>;

  // fall‑back if a coffee isn’t listed in your details map
  const details =
    selectedCoffee && coffeeDetails[selectedCoffee.name]
      ? coffeeDetails[selectedCoffee.name]
      : { calories: "N/A", sugar: "N/A", benefits: "N/A" };

  return (
    <div className="min-h-screen bg-gray-50">
      {cartMessage && (
        <div className={`max-w-md mx-auto mt-6 text-center p-3 rounded ${
          cartMessage.includes("Added") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {cartMessage}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden">
            <img
              src={coffee.imageUrl}
              alt={coffee.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x300/E0E0E0/333333?text=No+Image";
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">{coffee.name}</h3>
                <span className="font-bold text-green-700">${coffee.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{coffee.description.slice(0, 60)}…</p>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{coffee.averageRating || "N/A"}</span>
                <span className="text-sm text-gray-500">({coffee.reviewCount})</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(coffee.id, coffee.name)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => openModal(coffee)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCoffee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4">
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src={selectedCoffee.imageUrl}
              alt={selectedCoffee.name}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedCoffee.name}</h2>
            <p className="mb-4 text-gray-700">
              <strong>Calories:</strong> {details.calories}
              <br />
              <strong>Sugar:</strong> {details.sugar}
              <br />
              <strong>Benefits:</strong> {details.benefits}
            </p>
            <p className="text-gray-600">{selectedCoffee.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
