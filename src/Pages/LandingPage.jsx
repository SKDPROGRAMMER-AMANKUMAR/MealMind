import React, { useState, useEffect } from 'react';
import { Book, Heart, ShoppingBag, Search, ChefHat, ArrowRight, Facebook, Twitter, Instagram, Mail, Menu, X, Clock, Award, Users } from 'lucide-react';
import logo from "../assets/Mealmindlogo.jpg";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <Link to="/">
            <div className="flex items-center group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-orange-500 shadow-lg">
                <img 
                  src={logo} 
                  alt="MealMind Logo" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                MealMind
              </span>
            </div>
              </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link className="text-gray-600 hover:text-orange-500 transition-colors duration-300" to="/features">
              Features
              </Link>
              <Link className="text-gray-600 hover:text-orange-500 transition-colors duration-300" to="/about">
              About
              </Link>
               <Link to="/contact">
              <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">Contact</a>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button className="text-gray-600 hover:text-orange-500 px-4 py-2 rounded-lg transition-colors duration-300">
                Login
              </button>
              </Link>
              <Link to="/register">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                Sign Up
              </button>
              </Link>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden bg-white shadow-lg`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/features">
            <a href="#features" className="block px-3 py-2 rounded-md text-gray-600 hover:text-orange-500">Features</a>
            </Link>
            <Link to="/about">
            <a href="#about" className="block px-3 py-2 rounded-md text-gray-600 hover:text-orange-500">About</a>
            </Link>
            <Link to="/contact">
            <a href="#contact" className="block px-3 py-2 rounded-md text-gray-600 hover:text-orange-500">Contact</a>
            </Link>
            <div className="flex gap-2 pt-2">
            <Link to="/login">
              <button className="w-full text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">Login</button>
              </Link>
              <Link to="/register">
              <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 whitespace-nowrap">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 sm:pt-32 lg:pt-40 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block mb-12">
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-pulse opacity-20"></div>
              <img 
                src={logo} 
                alt="MealMind Brain Logo" 
                className="w-full h-full rounded-full object-cover shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white"
              />
              <div className="absolute -right-4 top-1/2 animate-bounce">
                <Award className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Your kitchen, your rules,
            </span>
            <br />your recipes.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your cooking experience with personalized recipe management, smart ingredient search, and effortless meal planning.
          </p>
          <Link to="/register">
          <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">Smart Features for Smart Cooking</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover powerful tools designed to make your cooking journey seamless and enjoyable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-500 transition-colors">Smart Recipe Search</h3>
            <p className="text-gray-600">Find the perfect recipe by ingredients or cuisine type with our intelligent search system. Filter by dietary restrictions and cooking time.</p>
          </div>

          <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-500 transition-colors">Save Favorites</h3>
            <p className="text-gray-600">Keep all your beloved recipes in one place for quick and easy access anytime. Organize them into collections and share with friends.</p>
          </div>

          <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-500 transition-colors">Shopping Lists</h3>
            <p className="text-gray-600">Automatically generate smart shopping lists from your selected recipes. Organize by store sections and share with family members.</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group bg-white/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <Book className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-600">Recipes Available</div>
            </div>

            <div className="group bg-white/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-orange-500 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Cooks</div>
            </div>

            <div className="group bg-white/50 backdrop-blur-sm p-8 rounded-xl hover:shadow-lg transition-all duration-300">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-gray-600">Cuisines</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link className='cursor-pointer' to="/">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                  <img src={logo} alt="MealMind Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold">MealMind</span>
              </div>
              </Link>
              <p className="text-gray-400">Your personal recipe management assistant that makes cooking easier and more enjoyable.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Home</a></li>
                <Link to="/features">
                <li><a href="#features" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Features</a></li>
                </Link>
                <Link to="/about">
                <li><a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">About Us</a></li>
                </Link>
                <Link to="/contact">
                <li><a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Contact</a></li>
                </Link>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <Link to="/privacy">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Privacy Policy</a></li>
                </Link>
                <Link to="/terms">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Terms of Service</a></li>
                </Link>
                <Link to="/cookies">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Cookie Policy</a></li>
                </Link>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 MealMind. All rights reserved.</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/5 to-orange-800/5"></div>
      </footer>
    </div>
  );
};

export default LandingPage;