import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiX,FiUpload } from "react-icons/fi";
// import { FaGoogle, FaApple } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { GiKnifeFork } from "react-icons/gi";
import { Link,useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../assets/Mealmindlogo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserAccount } from "../Appwrite/auth";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const validateUsername = (username) => {
    const usernameRegex = /^_[A-Za-z0-9]*[!@#$%^&*()][A-Za-z0-9]*$/;
    return usernameRegex.test(username);
  };

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

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Initialize errors and loading state
    let newErrors = {};
    setLoading(true);
  
    // Validate username
    if (!validateUsername(formData.username)) {
      newErrors.username =
        "Username must start with an underscore (_) and contain at least one uppercase letter and one special character.";
      toast.warn("Invalid Username");
    }
  
    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      toast.warn("Invalid Email");
    }
  
    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Strong passwords need at least 8 characters, uppercase, lowercase, and a number.";
      toast.warn("Invalid Password");
    }
  
    // Set errors and stop if validation fails
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setLoading(false); // Stop loading if validation fails
      return;
    }
  
    // Proceed if no validation errors
    try {
      const UserCreateResponse = await createUserAccount(
        formData.email,
        formData.password,
        formData.username,
        formData.name,
        dispatch
      );
  
      if (UserCreateResponse ) {
        toast.success("Account created successfully!");
        // console.log("User data:", UserCreateResponse);
        navigate("/login");
        // Clear the form
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        
        return true
      } else {
        toast.error("Failed to create account");
    }

    } catch (error) {
      console.error("Error during account creation:", error);
      toast.error("Account creation failed! Please try again.");
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };


  return (
    <div className="flex flex-col justify-center items-center min-h-screen
     bg-[#f0eded] px-4">
      {/* Logo and Name */}
     
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg lw:rounded-none shadow-lg p-6 sm:w-2/3 lw:w-[100vw] lw:h-[100vh] lg:w-1/2 xl:w-1/3 w-full"
      >
        {/* Cross Button */}
        <Link to="/">
          <button
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 sm:text-2xl xs:text-xl"
            aria-label="Close"
          >
            <FiX />
          </button>
        </Link>

        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Create an Account
        </h1>

        {/* Name */}
        <div className="mb-3 relative">
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

        {/* Username */}
        <div className="mb-1 relative">
          <FiUser className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* {errors.username && (
            // alert(errors.username)
            // <p className="text-red-500 text-sm mt-2 ">{notifyWarning}</p>
          )} */}
        </div>
        <p className="text-gray-500 text-sm mb-3">Username must start with _, include one uppercase letter, and a special character.</p>

        {/* Email */}
        <div className="mb-3 relative">
          <FiMail className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type="email"
            name="email"
            // required
            aria-required="true"
          aria-describedby="username-error"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-1 relative">
          <FiLock className="absolute text-gray-500 left-3 top-3 text-xl" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            title="Strong passwords need at least 8 characters, uppercase, lowercase, and a number."
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
        <p className="text-gray-500 text-sm mt-2 mb-3">Strong passwords need at least 8 characters, uppercase, lowercase, and a number.</p>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 mb-2"
        >
         {loading ? <PulseLoader className= "text-white" />: "Sign Up"}
        </button>

        {/* Avatar Upload */}
        <Link to="/avatar">
        <div className="text-center mb-2 flex justify-center items-center cursor-pointer hover:bg-[#1c1c19] hover:duration-100 rounded-lg  bg-[#000000]">
        <FiUpload className="text-gray-200 text-2xl mr-2" />
          <p className="text-gray-100 py-3 cursor-pointer  hover:duration-100 rounded-lg ">Upload Avatar</p>
        </div>
        </Link>

        {/* Post Signup Options */}
        {/* <Link to="/auth">
        <div className="text-center mb-4 flex justify-center gap-2 items-center cursor-pointer hover:bg-[#212121] hover:duration-100 rounded-lg  bg-[#000000]">
          <p className="text-white py-3 cursor-pointer hover:duration-100 rounded-lg ">Or continue with</p>
          <FaArrowRight className="text-[#174dff] text-2xl"/>
        </div>
        </Link> */}
        

        {/* Already have an Account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an Account?{" "}
          <Link to="/login">
            <span className="font-semibold text-blue-600 cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;