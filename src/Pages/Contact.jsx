import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Book, Heart, ShoppingBag, Search, ChefHat, ArrowRight, Facebook, Twitter, Instagram, Mail, Menu, X, Clock, Award, Users } from 'lucide-react';
import logo from "../assets/Mealmindlogo.jpg";

const Contact = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-[#F9FAFB] text-gray-800 min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg leading-relaxed">
            Have questions, feedback, or need assistance? Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>
      </motion.section>

      {/* Contact Details Section */}
      <motion.section
        className="py-16 px-6"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Phone */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaPhoneAlt className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">Phone</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaEnvelope className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">Email</h3>
              <p className="text-gray-600">contact@mealmind.com</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <FaMapMarkerAlt className="text-blue-600 text-4xl mr-4" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">Address</h3>
              <p className="text-gray-600">
                123 Main Street, Suite 100<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 px-6 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Send Us a Message
          </h2>
          <form className="grid grid-cols-1 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            ></textarea>
            <motion.button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.section>

      <motion.button
        className="flex items-center mx-auto mt-6 mb-8 text-blue-600 font-bold text-lg p-3 hover:text-blue-800 transition duration-300"
        onClick={() => window.history.back()}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
      >
        <AiOutlineArrowLeft className="mr-2" /> Back
      </motion.button>

      {/* Footer Section */}
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
                {/* <Link to="/contact">
                <li><a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">Contact</a></li>
                </Link> */}
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

      {/* Back Button */}
    </div>
  );
};

export default Contact;
