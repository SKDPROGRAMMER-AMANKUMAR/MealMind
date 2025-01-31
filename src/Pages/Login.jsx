import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUpload, FiX } from "react-icons/fi";
import logo from "../assets/Mealmindlogo.jpg"
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {LoggedInUser} from "../Appwrite/auth.js"
import { BeatLoader } from "react-spinners";
import { setUser } from "../Redux/authSlice.js";
import { useDispatch } from "react-redux";
import {usergetLoggedIn} from "../Appwrite/userLoggedIn.js"

const SigninForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false) ;
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; 
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let newErrors = {};
    setLoading(true)
    if (!validateEmail(formData.email)) {
      // newErrors.email = "Please enter a valid email address.";
    }
    if (!validatePassword(formData.password)) {
      newErrors.email = "Please enter a valid email address.";
      toast.warn("Invalid Password Follow The Instructions")
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if (Object.keys(newErrors).length === 0) {
      try {
        const userLoggedIn = await LoggedInUser(formData.email,formData.password)
        if(userLoggedIn.success){
          toast.success("Login successfully")
          console.log("User logged in successfully ")
          await usergetLoggedIn(userLoggedIn)
          // dispatch(setUser(userLoggedIn))
          navigate('/verify')
          // setTimeout(() => {
          //   // navigate('/home')
          // }, 3000);
        }else{
          toast.error("Login Failed")
        }
      } catch (error) {
        console.log("Error while userlogged in(Login.jsx):",error.message)
      }
      finally {
        setLoading(false)
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0eded] lw:bg-white  px-4">
      <ToastContainer theme="colored"/>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-lg p-6 sm:w-2/3 lw:w-[100vw]  lg:w-1/2 xl:w-1/3 w-full"
      >
        {/* Cross Button */}
        <Link to="/">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          <FiX className="text-2xl" />
        </button>
        </Link>

        {/* Header Section */}
        <div className="flex items-center justify-center mb-8 flex-wrap">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-blue-500"
          />

        </div>

        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login to your account
        </h1>

        {/* Name */}
        <div className="mb-6 relative">
          <FiUser className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       

        {/* Email */}
        <div className="mb-6 relative">
          <FiMail className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )} */}
        </div>

        {/* Password */}
        <div className="mb-1 relative">
          <FiLock className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff className="text-gray-500 text-xl" />
            ) : (
              <FiEye className="text-gray-500 text-xl" />
            )}
          </div>
          {/* {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )} */}
        </div>
        <p className="text-gray-500 text-sm mt-2">Strong passwords need at least 8 characters, uppercase, lowercase, and a number.</p>

        {/* Show Password Text (for smaller screens) */}
        {/* <div className="block lw:hidden text-sm text-gray-500 text-center mb-4">
          {showPassword ? "Hide Password" : "Show Password"}
        </div> */}

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mt-3"
        >
          {loading ? <BeatLoader className="text-white"/> : "Login"}
        </button>
        
        {/* <Link to="/forgetPassword">
        <div className="flex justify-center items-center mt-3 mb-3 font-serif text-gray-500 bg-[#edebeb] p-2 cursor-pointer rounded-lg hover:bg-[#e1dddd]">
          Forgot Password
        </div>
        </Link> */}

        {/* Already have an Account? */}
         
        <p className="text-center text-gray-600 ">
          Already have an Account?{" "}
          <Link to="/register">
          <span className="font-semibold text-blue-600 cursor-pointer">
            Register
            </span>
            </Link>
        </p>
        
      </form>
    </div>
  );
};

export default SigninForm;
