import React, { useState, useEffect } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { Search, Star, ShoppingCart, User, Sun, Moon, Menu, X, Home, Trash2 } from "lucide-react";
import { persistor } from "../Redux/store.js"
import store from "../Redux/store.js"
import { PulseLoader } from "react-spinners"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import logoImage from "../assets/Mealmindlogo.jpg";
import { Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import "react-toastify/dist/ReactToastify.css";
import { account } from '../Appwrite/AppwriteConfig.js';
import { HashLoader } from "react-spinners";
import { getUserID } from '../Appwrite/UserKiID.js';
import { RetrieveFoodDetailsToDatabase,DeleteFoodItemsFromDataBase } from '../Appwrite/auth.js';
import {setAddToCartMeals,selectAddToCartMeals,removeMealFromAddtOcART} from "../Redux/AddToCartSlice.js"
const Shopping = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Pasta Carbonara',
      image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
    },
    {
      id: 2,
      name: 'Vegetable Stir Fry',
      image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
    },
    {
      id: 3,
      name: 'Beef Wellington',
      image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
    }
  ]);
  const [loadingItems, setLoadingItems] = useState({});
  const dispatch = useDispatch()
  const addTOCartMeals = useSelector(selectAddToCartMeals)

useEffect(() => {
    const loadSavedMeals = async () => {
      setLoading(true)
      try {
        const userId = getUserID();
        if (userId) {
          // Clear existing meals first
          dispatch(setAddToCartMeals([]));
          await handleSavedMealsClick();
        }
      } catch (error) {
        console.error('Error loading saved meals:', error);
        toast.error("Failed to load meals");
      } finally {
        setLoading(false);
      }
      // setLoading(false)
    };
    loadSavedMeals();
  }, [dispatch]);

    const handleSavedMealsClick = async () => {
      // setLoading(true);
      try {
        const userId = getUserID(); // Get the current user's ID
        if (!userId) {
          throw new Error('User not logged in');
        }
        const meals = await RetrieveFoodDetailsToDatabase(userId)
        // setSavedMeals(meals)
        dispatch(setAddToCartMeals(meals)); // Set meals in the Redux store
      } catch (error) {
        console.error('Error fetching saved meals:', error);
      } finally {
        setLoading(false);
      }
    }

// const formatDate = (date) => {
//   return new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

const humanReadableDateConversion = (DATE) => {
  const isoDate = DATE;
  const date = new Date(isoDate);

  const humanReadable = date.toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  });

  // console.log(humanReadable);
  return humanReadable
}

if (loading) {
  if (loading) {
    return (
      <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
        <HashLoader color="#00ffc6" />
      </div>
    );
  }
}

console.log("The add to cart meal is:",addTOCartMeals)

const filteredMeals = addTOCartMeals.filter((meal) =>
  meal.name && meal.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const unsavedMealHandler = async (mealId, DatabaseId, ) => {
  if (!DatabaseId) {
    console.log("The dbId:", DatabaseId)
    // console.log("The stId:", StorageId)
    console.error("Database ID is null. Cannot delete the document.");
    return;
  }

  if (mealId) {
    console.log("MealId:", mealId)
    console.log("MealId2:", mealId)

    console.log('Meal ID to remove:', mealId);
    console.log('Current saved meals:', store.getState().AddToCart.AddToCartMeals);
    console.log('ID type:', typeof mealId);
    // console.log('Stored ID type:', typeof store.getState().AddToCart.AddToCartMeals[0]?.id);
  }
  try {
   // Set loading state for this specific item
   setLoadingItems(prev => ({ ...prev, [mealId]: true }));
    dispatch(removeMealFromAddtOcART(mealId));
    const deleteDocsAndImage = await DeleteFoodItemsFromDataBase(DatabaseId)
    if (deleteDocsAndImage.status === "not found") {
      console.log("Item already removed from database");
      // Wait a bit to let state update
      setTimeout(() => {
        console.log('Meals after removal:', store.getState().AddToCart.AddToCartMeals);
      }, 100);

      await persistor.persist();
      //  await persistor.purge();;/
    }else{
      console.log("Document deleted successfully");
    }
    toast.success("Meal Remvoed From Cart")
  } catch (error) {
    console.error("Error while deleting:", error.message);
    toast.error("Failed to remove meal");
    
    // If database delete fails, revert Redux state
    await handleSavedMealsClick(); 
  } finally {
     // Clear loading state for this specific item
     setLoadingItems(prev => ({ ...prev, [mealId]: false }));
  }
}


const SearchBar = ({ className }) => (
  <div className={`relative w-full ${className}`}>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="text-black w-5 h-5" />
    </div>
    <input
      type="text"
      placeholder="Search Meals..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 text-black border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

return (
  <>
    <div
      className={`min-h-screen relative ${darkMode ? "bg-slate-900 text-white" : "bg-[#3300ff8b]"
        } `}
    >
      <header className="sticky lw:rounded-b-2xl  rounded-b-3xl  top-0 z-50 bg-white dark:bg-slate-800 shadow-md">
        {/* Large Screen Header */}
        <div className="hidden lg:flex items-center justify-center p-4">
          <div className="absolute left-4 lg:block mb-1">
            <Link to="/home">
              <div className="flex justify-center items-center gap-2">
                <img
                  src={logoImage}
                  alt="MealMind Logo"
                  className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold text-orange-600">
                  MealMind
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full max-w-xl">
            <SearchBar />
          </div>

          <div className="absolute right-4 flex space-x-4">
            <Link to="/home">
              <Home className='cursor-pointer text-slate-600 hover:text-teal-600' />
            </Link>
            <Link to="/favourites">
              <Star className="cursor-pointer text-slate-600 hover:text-teal-600" />
            </Link>
            <Link to="/profile">
              <User className="cursor-pointer text-slate-600 hover:text-teal-600" />
            </Link>
            {darkMode ? (
              <Sun
                onClick={() => setDarkMode(false)}
                className="cursor-pointer hover:text-yellow-500"
              />
            ) : (
              <Moon
                onClick={() => setDarkMode(true)}
                className="cursor-pointer text-gray-600 hover:text-blue-500"
              />
            )}
          </div>
        </div>

        {/* Tablet/Mid-Screen Header */}
        <div className="hidden md:block lg:hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/home">
              <div className="flex justify-center items-center gap-2">
                <img
                  src={logoImage}
                  alt="MealMind Logo"
                  className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold text-orange-600">
                  MealMind
                </span>
              </div>
            </Link>
            <Menu
              className="cursor-pointer text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
          <div className="mt-2">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex flex-col items-center p-4">
          <div className="w-full flex justify-between items-center mb-3">
            <Link to="/home">
              <div className="flex justify-center items-center gap-2">
                <img
                  src={logoImage}
                  alt="MealMind Logo"
                  className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <span className="text-2xl font-bold text-orange-600">
                  MealMind
                </span>
              </div>
            </Link>
            <Menu
              className="cursor-pointer text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
          <SearchBar />
        </div>
      </header>
      <ToastContainer />
      {/* <div> ------------------------------------------------------ */}

      {addTOCartMeals.length > 0 ? (
        <div className="lp:w-[90%] li:w-[90%] mx-auto mt-8 space-y-6">
          {filteredMeals.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
                      <div className="relative w-24 h-24 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">
                        Added on {humanReadableDateConversion(item.created)}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    // onClick={() => console.log('Remove:', item.$id)}
                    onClick={() => unsavedMealHandler(item.id, item.dbId)}
                    disabled={loadingItems[item.id]} // Disable button while loading
                  >
                    <Trash2 size={18} className="animate-pulse" />
                    <span className="font-medium">{loadingItems[item.id] ? <PulseLoader color="#02ebff" /> : "Remove"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center ml-auto mr-auto mt-14 h-fit w-fit li:w-[95%] bg-gray-900 rounded-xl p-8 li:p-4">
          <p className="text-white text-2xl li:text-xl font-semibold font-mono">
            No meals added yet.
          </p>
        </div>
      )}
      {/* </div> ------------------------------------------------ */}

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-end"
        >
          <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "100%" }}
            className="w-full bg-white dark:bg-slate-800 rounded-t-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-teal-600">Menu</span>
              <X
                className="cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Link to="/home">
                  <Home className="text-slate-600" />
                </Link>
                <span>Home</span>
              </div>

              <div className="flex items-center space-x-3">
                <Link to="/favourites" >
                  <Star className="text-slate-600" />
                </Link>
                <span>Shopping List</span>
              </div>

              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <User className="text-slate-600" />
                </Link>
                <span>Profile</span>
              </div>

              <div className="flex items-center  space-x-3">
                {darkMode ? (
                  <Sun
                    onClick={() => setDarkMode(false)}
                    className="text-yellow-500 cursor-pointer"
                  />
                ) : (
                  <Moon
                    onClick={() => setDarkMode(true)}
                    className="text-blue-500 cursor-pointer"
                  />
                )}
                <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  </>
)
}

export default Shopping
