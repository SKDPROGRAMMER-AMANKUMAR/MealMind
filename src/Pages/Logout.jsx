import React, { useState, useEffect } from 'react';
import { LogoutUser } from "../Appwrite/auth.js";
import { logout } from "../Redux/authSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from 'react-spinners';
// import { Logout, Cancel } from 'lucide-react';
import logoUrl from '../assets/Mealmindlogo.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const LogoutUserFromWebApp = async () => {
    try {
      setLoading(true);
      const Logout = await LogoutUser();
      if (Logout) {
        dispatch(logout(Logout));
        console.log("The user's authentication state is(mainhome) : ", isAuthenticated);
          toast.success("Logout Successfully");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.log("Error while user logout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    if (loading) {
      return (
        <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
          <HashLoader color="#00ffc6" />
        </div>
      );
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <ToastContainer/>
      <div
        className={`bg-gray-900 rounded-lg shadow-lg px-8 py-10 ${
          screenWidth < 500 ? 'w-[95%]' : 'w-full max-w-md'
        }`}
      >
        <div className="flex justify-center mb-6">
          <img src={logoUrl} alt="App Logo" className="h-20 w-20 rounded-full object-cover transform hover:scale-110 transition-transform duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Log out of MealMind?
        </h2>
        <p className="text-gray-400 mb-8">
          You can always log back in at any time. If you just want to switch
          accounts, you can do that by adding an existing account.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={LogoutUserFromWebApp}
            className="flex items-center px-8 py-4 text-sm font-medium text-gray-900 bg-gray-400 rounded-md hover:bg-gray-500"
          >
            {/* <Logout className="mr-2 h-5 w-5 text-white" /> */}
            <span className='font-serif text-xl rounded-xl li:text-sm'>Log out</span>
          </button>
          <Link to="/home">
            <button className="flex items-center px-8 py-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {/* <Cancel className="mr-2 h-5 w-5" /> */}
              <span className='font-serif text-xl li:text-sm rounded-xl'>Cancel</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;