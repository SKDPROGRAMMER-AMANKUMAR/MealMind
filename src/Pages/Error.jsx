import React from "react";
import { FiSearch } from "react-icons/fi"; // Icon from react-icons
import { RefreshCcw } from "lucide-react"; // Icon from lucide-react
import { FaHome } from "react-icons/fa"; // Home icon for back navigation

const Error = () => {
  const handleRedirect = () => {
    window.location.href = "/login"; // Redirect to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 text-center">
      {/* Animated Search Icon */}
      <div className="text-orange-500 mb-6 animate-pulse">
        <FiSearch size={120} />
      </div>

      {/* Error Heading */}
      <h1 className="text-5xl font-extrabold text-orange-600 mb-4">
        Oops! We couldn't find that page.
      </h1>

      {/* Error Description */}
      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-8">
        The page you were searching for doesn’t exist or may have been moved. Double-check your
        spelling or explore other features on our website. Don’t worry, we’re here to help you get
        back on track!
      </p>

      {/* Additional Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mb-8">
        <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg border border-orange-300 hover:shadow-2xl transition-all duration-300">
          <FaHome size={30} className="text-orange-500" />
          <span className="text-gray-800 font-medium">Go back to the Homepage</span>
        </div>
        <div
          onClick={handleRedirect}
          className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-lg border border-orange-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <RefreshCcw size={30} className="text-orange-500" />
          <span className="text-gray-800 font-medium">Refresh and Try Again</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="flex items-center gap-2 text-gray-600 text-sm italic">
        <span>Need help?</span>
        <a
          href="/contact"
          className="text-orange-500 font-semibold hover:underline"
        >
          Contact Support
        </a>
      </div>

      {/* Back to Homepage Button */}
      <button
        onClick={handleRedirect}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
      >
        <FaHome size={20} />
        Back to Homepage
      </button>
    </div>
  );
};

export default Error;
