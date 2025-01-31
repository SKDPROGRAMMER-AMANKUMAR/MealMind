import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import logo from "../assets/Mealmindlogo.jpg";
import { Link } from "react-router-dom";
import { Book, Heart, ShoppingBag, Search, ChefHat, ArrowRight, Facebook, Twitter, Instagram, Mail, Menu, X, Clock, Award, Users } from 'lucide-react';


const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#FDF9F6] text-gray-800 min-h-screen flex flex-col justify-between">
      {/* Back Button */}
      

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-orange-600 to-orange-400 text-white py-20 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed">
            At <span className="font-bold">MealMind</span>, we believe cooking is more than just a task—it's an art, a joy, and a way to connect. Our mission is to empower you with tools that make every meal unforgettable.
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <img
            src={logo}
            alt="Our Mission"
            className="rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
          />

          {/* Mission Statement */}
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We aim to transform the way you approach cooking. Whether you're a beginner or a seasoned chef, our platform provides smart tools to make planning, shopping, and cooking effortless. With features designed for real-life needs, we want to inspire creativity and bring joy back to the kitchen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Join us as we make the world of cooking more accessible, sustainable, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="bg-gray-50 py-16 px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
            Meet Our Team
          </h2>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={logo}
                  alt="Team Member"
                  className="rounded-full mx-auto mb-4 w-24 h-24 object-cover border-4 border-orange-600"
                />
                <h3 className="text-xl font-bold text-gray-800">Developer</h3>
                <p className="text-gray-600 text-sm">Role {index + 1}</p>
                <div className="flex justify-center gap-4 mt-4 text-gray-500">
                  <FaFacebookF className="hover:text-orange-600 cursor-pointer" />
                  <FaTwitter className="hover:text-orange-600 cursor-pointer" />
                  <FaInstagram className="hover:text-orange-600 cursor-pointer" />
                  <FaLinkedin className="hover:text-orange-600 cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.button
        className="flex items-center text-orange-600 font-bold text-lg p-3 hover:text-orange-800 transition duration-300"
        onClick={() => window.history.back()}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        <AiOutlineArrowLeft className="mr-2" /> Back
      </motion.button>

      {/* Footer */}
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
                {/* <Link to="/about">
                <li><a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">About Us</a></li>
                </Link> */}
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

export default AboutUs;
