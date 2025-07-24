
import { useEffect, useState } from "react";
import { LoginUser } from "../hooks/AuthService.jsx";
import { useNavigate } from "react-router-dom"; // Added for potential future navigation, though not used in the provided logic
import Parse from "parse"; // Added for Parse.User.requestPasswordReset

const AuthLogin = () => {
  //  to hold the login credentials
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  // trigger the login attempt
  const [login, setLogin] = useState(false); // Original login state

  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    if (userCredentials.email && userCredentials.password && login) {
      setLoading(true); 
      setMessage(""); 

      LoginUser({
        username: userCredentials.email,
        password: userCredentials.password,
      })
        .then((userLoggedIn) => {
          if (userLoggedIn) {
            setMessage(`Welcome back, ${userLoggedIn.get("firstName")}!`);
            console.log("User logged in:", userLoggedIn);
            navigate("/");           // ← add this to send them to home

           
          } else {
            setMessage("Login failed. Please check your credentials.");
          }
          setLogin(false); 
        })
        .catch((error) => {
          console.error("Login failed:", error);
          // Set error message for display
          setMessage(`Login failed: ${error.message || "An unexpected error occurred."}`);
          setLogin(false); 
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [userCredentials, login, navigate]); 

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage("");
    try {
      await Parse.User.requestPasswordReset(resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setResetMessage("Error: " + err.message);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setUserCredentials({ ...userCredentials, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Login submitted: ", userCredentials);
    setLogin(true); // Trigger the useEffect for login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
        {showForgotPassword ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <h2 className="text-lg font-semibold">Reset Password</h2>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded"
            >
              Send Reset Email
            </button>
            <button
              type="button"
              className="cursor-pointer w-full mt-2 text-gray-600 underline"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
            {resetMessage && <div className="mt-2 text-center">{resetMessage}</div>}
          </form>
        ) : (
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                id="email"
                name="email"
                value={userCredentials.email}
                onChange={onChangeHandler}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                id="password"
                name="password"
                value={userCredentials.password}
                onChange={onChangeHandler}
                placeholder="*******"
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="cursor-pointer w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                disabled={login || loading} 
              >
                Login
              </button>
            </div>
            <p className="text-sm mt-2">
              <button
                type="button"
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </p>
          </form>
        )}

        {/* Display loading indicator */}
        {loading && (
          <div className="mt-4 text-center text-blue-600 font-medium">
            Logging in...
          </div>
        )}

        {/* Display success/error messages */}
        {message && (
          <div className={`mt-4 text-center p-3 rounded-md ${
            message.startsWith("Welcome") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLogin;
