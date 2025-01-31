import React from 'react';
import { FiShield, FiLock, FiEye, FiTrash2, FiMail, FiArrowLeft } from 'react-icons/fi';
import { Utensils, Cookie, Share2 } from 'lucide-react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Book, Heart, ShoppingBag, Search, ChefHat, ArrowRight, Facebook, Twitter, Instagram, Mail, Menu, X, Clock, Award, Users } from 'lucide-react';
import logo from "../assets/Mealmindlogo.jpg";
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#FF6B1B] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex gap-2 items-center justify-around">
          <div className="flex items-center">

            <img src={logo} alt="MealMind Logo" className="w-12 rounded-full h-12 object-cover" />
            &nbsp;
            &nbsp;
            <h1 className="text-2xl font-bold">
              <span className="text-white">MealMind</span>
              <span className="text-[#1E293B]"> Privacy Policy</span>
            </h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-[#666E80] mb-8 text-lg leading-relaxed">
              At MealMind, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
            </p>
            
            <Section 
              icon={<FiShield className="h-8 w-8 text-[#FF6B1B]" />}
              title="Information We Collect"
            >
              We collect information you provide directly to us, such as your name, email address, and recipe preferences.
            </Section>
            
            <Section 
              icon={<Cookie className="h-8 w-8 text-[#FF6B1B]" />}
              title="Use of Cookies"
            >
              We use cookies to enhance your experience and analyze our traffic. You can control cookies through your browser settings.
            </Section>
            
            <Section 
              icon={<FiLock className="h-8 w-8 text-[#FF6B1B]" />}
              title="Data Security"
            >
              We implement a variety of security measures to maintain the safety of your personal information.
            </Section>
            
            <Section 
              icon={<Share2 className="h-8 w-8 text-[#FF6B1B]" />}
              title="Information Sharing"
            >
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
            </Section>
            
            <Section 
              icon={<FiEye className="h-8 w-8 text-[#FF6B1B]" />}
              title="Your Rights"
            >
              You have the right to access, correct, or delete your personal information at any time.
            </Section>
            
            <Section 
              icon={<FiTrash2 className="h-8 w-8 text-[#FF6B1B]" />}
              title="Data Retention"
            >
              We will retain your information for as long as your account is active or as needed to provide you services.
            </Section>
            
            <Section 
              icon={<FiMail className="h-8 w-8 text-[#FF6B1B]" />}
              title="Contact Us"
            >
              If you have any questions about this Privacy Policy, please contact us at privacy@mealmind.com.
            </Section>
          </div>
        </div>
      </main>

                    {/* <button
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2 mx-auto md:mx-0 md:ml-6 text-orange-600 text-lg font-semibold hover:text-orange-700 transition-colors"
                    >
                      <IoArrowBackCircleSharp className="text-3xl" />
                      <span>Back</span>
                    </button> */}

      <footer className="bg-gray-900 text-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                        <img src={logo} alt="MealMind Logo" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xl font-bold">MealMind</span>
                    </div>
                    <p className="text-gray-400">Your personal recipe management assistant that makes cooking easier and more enjoyable.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <Link to="/">
                      <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Home</a></li>
                      </Link>
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
                      {/* <Link to="/privacy">
                      <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Privacy Policy</a></li>
                      </Link> */}
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

const Section = ({ icon, title, children }) => {
  return (
    <div className="mb-10 last:mb-0">
      <div className="flex items-center mb-4">
        <div className="bg-[#FFF0E6] p-3 rounded-full mr-4">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-[#1E293B]">{title}</h2>
      </div>
      <p className="text-[#666E80] text-lg leading-relaxed pl-16">{children}</p>
    </div>
  );
};

export default PrivacyPolicy;
