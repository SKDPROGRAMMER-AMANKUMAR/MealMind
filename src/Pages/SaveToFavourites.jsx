import React, { useState, useEffect } from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiShoppingCart } from "react-icons/ti";
import {
  Search,
  Star,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Home,
} from "lucide-react";
import logoImage from "../assets/Mealmindlogo.jpg";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSavedMeals, addMealToFavorites, removeMealFromFavorites, selectSavedMeals } from "../Redux/getSavedmealSlice"
import { getUserID } from '../Appwrite/UserKiID';
import { getDatabaseID, getStorageID } from '../Appwrite/UnsavedDocsID.js';
import { RetrieveFoodImageAndItsDataFromSTaDB, DeleteFoodImagesFromDataBase } from "../Appwrite/auth.js"
import { persistor } from "../Redux/store.js"
import store from "../Redux/store.js"
import { PulseLoader } from "react-spinners"

const FavoritesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingunsavemeal, seLoadingunsavemeal] = useState(false)
  // const [favorites, setFavorites] = useState([
  //   {
  //     id: 1,
  //     name: 'Pasta Carbonara',
  //     image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Vegetable Stir Fry',
  //     image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: 'Beef Wellington',
  //     image: 'https://cdn.pixabay.com/photo/2011/05/25/14/49/fry-up-7627_1280.jpg'
  //   }
  // ]);
  const [loading, setLoading] = useState(false)
  // const [dbId,setDbId] = useState('')
  // const [stId,setStId] = useState('')
  // const [mealInfo, setMealInfo] = useState([]);
  // const [SavedMeals, SetSavedMeals] = useState([]);
  const dispatch = useDispatch()
  //  const databaseId = useSelector((state) => state.databaseAndStorageId.dbId);
  //  const storageId = useSelector((state) => state.databaseAndStorageId.stId);
  // const savedMeals = useSelector((state) => state.favorites.savedMeals) || [];
  const savedMeals = useSelector(selectSavedMeals); // Select meals from Redux store
  // console.log("The saved meals from the redux persist is : ",savedMeals)
  useEffect(() => {
    const loadSavedMeals = async () => {
      setLoading(true)
      const userId = getUserID();
      if (userId) {
        try {
          await handleSavedMealsClick(); // Call the function only if the user is valid
          // setDbId(databaseId)
          // setStId(storageId)
        } catch (error) {
          console.error('Error loading saved meals:', error);
        }
      } else {
        console.log('User not logged in');
      }
      setLoading(false)
    };

    loadSavedMeals();
  }, []); // Add dependency to trigger re-render when Redux state updates

  // let databaseId = getDatabaseID()
  // let storageId = getStorageID()
  const handleSavedMealsClick = async () => {
    // setLoading(true);
    try {
      const userId = getUserID(); // Get the current user's ID
      if (!userId) {
        throw new Error('User not logged in');
      }
      const meals = await RetrieveFoodImageAndItsDataFromSTaDB(userId)
      // setSavedMeals(meals)
      dispatch(setSavedMeals(meals)); // Set meals in the Redux store
    } catch (error) {
      console.error('Error fetching saved meals:', error);
    } finally {
      setLoading(false);
    }
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
  console.log("Meal Info from Redux:", savedMeals);  // Check if the values are populated correctly


  const filteredMeals = savedMeals.filter((meal) =>
    meal.name && meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("Saved Meal Data(SaveToFavourite.jsx)2:",filteredMeals)
  const unsavedMealHandler = async (mealId, DatabaseId, StorageId) => {
    if (!DatabaseId || !StorageId) {
      console.log("The dbId:", DatabaseId)
      console.log("The stId:", StorageId)
      console.error("Database ID or Storage ID is null. Cannot delete the document.");
      return;
    }

    if (mealId) {
      console.log("MealId:", mealId)
      console.log("MealId2:", mealId)

      console.log('Meal ID to remove:', mealId);
      console.log('Current saved meals:', store.getState().favorites.savedMeals);
      console.log('ID type:', typeof mealId);
      console.log('Stored ID type:', typeof store.getState().favorites.savedMeals[0]?.id);
    }
    try {
      seLoadingunsavemeal(true)
      const deleteDocsAndImage = await DeleteFoodImagesFromDataBase(DatabaseId, StorageId)
      if (deleteDocsAndImage) {
        console.log("Document deleted successfully(saveToFavourite.jsx)")
        dispatch(removeMealFromFavorites(mealId));
        // Wait a bit to let state update
        setTimeout(() => {
          console.log('Meals after removal:', store.getState().favorites.savedMeals);
        }, 100);

        await persistor.persist();
        //  await persistor.purge();;/
        toast.success("Meal Unsaved")
      }
    } catch (error) {
      console.log("Error while delting docs(saveToFavourite.jsx)", error.message)
    } finally {
      seLoadingunsavemeal(false)
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
  // const humanReadableDate = new Date(Date.now()).toLocaleString();
  // console.log(humanReadableDate);
  // const humanReadableDate = new Date().toLocaleString(); // This captures the time at creation
  // console.log(itemCreationTime);
  // const itemAddedTimestamp = Date.now(); // Stores the time the product was added to the cart
  // Stores the timestamp at the moment of creation
  // const humanReadableDate = new Date(itemAddedTimestamp).toLocaleString();
  // console.log(humanReadableDate); // This will show the exact time when the item was added to the cart

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
    
    console.log(humanReadable);
    return humanReadable
  }

  return (
    <>
      <div
        className={`min-h-screen relative ${darkMode ? "bg-slate-900 text-white" : "bg-[#ffc400cf]"
          } `}
      >
        {/* <div> */}
        {/* Sticky Header */}

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
              <Link to="/shopping">
                <ShoppingCart className="cursor-pointer text-slate-600 hover:text-teal-600" />
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
        {savedMeals.length > 0 ? (<div className="min-h-screen bg-gradient-to-br  flex flex-col items-center py-8 px-4">
          {filteredMeals.map((meal) => (
            <div
              key={meal.$id}
              className="w-[90%] sm:w-[95%] lw:w-[98%] bg-[#ebe9e9] rounded-2xl mb-6 shadow-lg"
            >
              {/* {console.log("The dbId and stId from Tailwind is:",meal)} */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-700 text-center mb-2">{meal.name}</h3>
                <div className='text-slate-500 text-sm'>
                  <span className='text-black text-[17px]'>Saved on:</span>&nbsp;{humanReadableDateConversion(meal.created)}
                </div>
                &nbsp;
                <hr className="border-t-2 border-gray-300 mb-4" />
                {/* <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-orange-500 text-white px-3 py-2 li:flex lp:hidden  gap-1 justify-center items-start rounded-lg text-sm"
                >
                  <TiShoppingCart className='text-[yellow] text-[18px]' /> Cart
                </motion.button> */}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[90%]">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-[230px] sm:h-[300px] object-cover rounded-lg"
                  />
                </div>

                <div className="flex items-center space-x-4 mt-4 mb-4">

                  &nbsp;

                  <motion.button
                    onClick={() => unsavedMealHandler(meal.$id, meal.dbId, meal.stId)}
                    whileHover={{ scale: 1.1 }}
                    className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    {loadingunsavemeal ? <PulseLoader color="#02ebff" /> : "Unsave Meal"}
                  </motion.button>
                  {/* </span> */}
                  <Link to="/shopping">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="bg-orange-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Add to Cart Meals
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          &nbsp;
        </div>) : (<div className="flex items-center justify-center ml-auto mr-auto mt-14 h-fit w-fit li:w-[95%] bg-gray-900 rounded-xl p-8 li:p-4">
          <p className="text-white text-2xl li:text-xl font-semibold font-mono">
            There are no saved meals...
          </p>
        </div>)}


        <Link to="/home">
          <div className='mt-10 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-md 
        fixed bottom-6 duration-300 transform -translate-x-1/2 
        md:absolute md:left-6 md:bottom-6 ml-28  flex hover:scale-95 cursor-pointer'>
            <ArrowLeft className="w-6 h-6" />
            Back to Home
          </div>
        </Link>

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
                  <Link to="/shopping" >
                    <ShoppingCart className="text-slate-600" />
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
  );
};

export default FavoritesPage;