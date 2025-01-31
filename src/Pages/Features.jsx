import React from "react";
import { GiMeal, GiNotebook, GiShoppingCart, GiFireBowl, GiKitchenScale, GiCook } from "react-icons/gi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from "../assets/Mealmindlogo.jpg";
import { Link } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF9F4] text-gray-800 min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Title and Description */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-orange-600 mb-4">
              Smart Features for Smart Cooking
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Discover powerful tools designed to make your cooking journey seamless, enjoyable, and efficient.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiMeal className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Recipe Search
              </h3>
              <p className="text-gray-600 text-sm">
                Search for recipes by ingredients or cuisine, tailored to your taste.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiNotebook className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Save Favorites
              </h3>
              <p className="text-gray-600 text-sm">
                Save your favorite recipes and add personal notes for each.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiShoppingCart className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Shopping Lists
              </h3>
              <p className="text-gray-600 text-sm">
                Generate shopping lists automatically from selected recipes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiFireBowl className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Meal Planner
              </h3>
              <p className="text-gray-600 text-sm">
                Plan meals for the week and manage your diet effectively.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiKitchenScale className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Portion Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Adjust recipes to serve any number of people with accurate proportions.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <GiCook className="text-orange-600 text-6xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Guided Cooking
              </h3>
              <p className="text-gray-600 text-sm">
                Step-by-step instructions with timers and tips to perfect every dish.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto md:mx-0 md:ml-6 text-orange-600 text-lg font-semibold hover:text-orange-700 transition-colors"
          >
            <IoArrowBackCircleSharp className="text-3xl" />
            <span>Back</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181a1d] text-gray-300 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                              <img src={logo} alt="MealMind Logo" className="w-full h-full object-cover" />
                            </div>
            <h3 className="text-xl font-bold text-white mb-2">MealMind</h3>
            <p>Your personal recipe management assistant that makes cooking easier and more enjoyable.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Quick Links</h4>
            <ul>
              <Link to='/'>
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Home</li>
              </Link>
              {/* <Link to="/features">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Features</li>
              </Link> */}
              <Link to="/about">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">About Us</li>
              </Link>
              <Link to="/contact">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Contact</li>
              </Link>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Legal</h4>
            <ul>
              <Link to="/privacy">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Privacy Policy</li>
              </Link>
              <Link to="/terms">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Terms of Service</li>
              </Link>
              <Link to="/cookies">
              <li className="hover:text-orange-600 transition-colors cursor-pointer">Cookie Policy</li>
              </Link>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Connect With Us</h4>
            <div className="flex gap-4">
              <FaFacebookF className="hover:text-orange-600 transition-colors cursor-pointer" />
              <FaTwitter className="hover:text-orange-600 transition-colors cursor-pointer" />
              <FaInstagram className="hover:text-orange-600 transition-colors cursor-pointer" />
              <FaEnvelope className="hover:text-orange-600 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 MealMind. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Features;
