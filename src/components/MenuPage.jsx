import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCoffees } from "../hooks/CoffeeService";

function MenuPage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error.message}</div>;
  if (coffees.length === 0)
    return (
      <div>
        No coffee items found. Please add some to your Parse `Coffee` class.
      </div>
    );

  return (
    <div>
      <h1>Our Coffee Menu</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h2>{coffee.name}</h2>
            <p>{coffee.description}</p>{" "}
            {/* Optional chaining for safety */}
            <p style={{ fontWeight: "bold" }}>
              Price: ${coffee.price ? coffee.price.toFixed(2) : "N/A"}
            </p>

            {/* Display Reviews Section */}
            {coffee.reviews && coffee.reviews.length > 0 && (
              <div style={{ marginTop: '15px', borderTop: '1px dashed #eee', paddingTop: '10px' }}>
                <h4 style={{ marginBottom: '5px' }}>Reviews:</h4>
                {coffee.reviews.map((review) => (
                  <div key={review.id} style={{ fontSize: '0.9em', marginBottom: '5px', background: '#f9f9f9', padding: '8px', borderRadius: '5px' }}>
                    <p>
                      <strong>Rating: {review.rating} / 5</strong>
                    </p>
                    <p style={{ fontStyle: 'italic' }}>"{review.text}"</p>
                  </div>
                ))}
              </div>
            )}
            {coffee.reviews && coffee.reviews.length === 0 && (
              <p style={{ marginTop: '15px', color: '#888', fontSize: '0.9em' }}>No reviews yet.</p>
            )}
            
            <Link
              to={`/menu/${coffee.id}`}
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "8px 15px",
                background: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              View Details {/* Doesn't work right now :) */}
            </Link>
            <button
              style={{
                marginLeft: "10px",
                padding: "8px 15px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              // We'll add an onClick handler here for "Add to Cart"
              onClick={() => console.log(`Added ${coffee.name} to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
