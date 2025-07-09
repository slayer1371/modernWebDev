const AuthForm = ({ user, onChange, onSubmit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {user.isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* First Name Field (only for signup) */}
          {!user.isLogin && ( // Assuming 'isLogin' prop determines if it's a login or signup form
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                required
              />
            </div>
          )}

          {/* Last Name Field (only for signup) */}
          {!user.isLogin && (
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
              min="0" // Note: min attribute on password input is unusual, usually for numbers. Consider removing or clarifying its purpose.
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
