import { Navigate, useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Welcome to Our <span className="text-amber-400">Coffee Shop!</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover a wide range of exquisite coffee blends, crafted to perfection for your ultimate enjoyment.
        </p>
        <div className="relative w-full max-w-xl mx-auto mb-10">
          <img
            src="https://imgs.search.brave.com/rmuEYn_ykVcPVQiTLz4dVOfyVfBbIYh13iN6qWrXEVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/MTIwOTg4MS9waG90/by9hcm9tYXRpYy1t/b3JuaW5nLWNvZmZl/ZS1pbi1nbGFzcy1j/dXAtYW5kLWEtbG9u/Zy1zaGFkb3ctZnJv/bS10aGUtY3VwLW9u/LWJlaWdlLWNvbG9y/LWJhY2tncm91bmQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PU4tbXJycjk1Ynh3/QjY0eUhxQjBiZnc4/WWU3Y1Jkd2dIeHBn/RXhKVXB3QTA9" // Placeholder image for demonstration
            alt="Aromatic Coffee"
            className="w-full h-auto rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 border-4 border-amber-400"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/800x450/4B5563/FFFFFF?text=Image+Unavailable"; 
            }}
          />
          <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
        </div>
        <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Experience the perfect brew every time, a moment of pure bliss in every cup.
        </p>
        <button
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
          onClick={() => navigate("/menu")}
        >
          Explore Our Menu
        </button>
      </div>
    </div>
  );
}

export default HomePage;