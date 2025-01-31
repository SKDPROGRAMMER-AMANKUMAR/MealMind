import React, { useState,useEffect} from 'react';
import { ChefHat, Clock, Utensils, ArrowLeft, Youtube } from 'lucide-react';
import { FaFireAlt, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/Mealmindlogo.jpg";
import { PacmanLoader } from 'react-spinners';
import {getMealInfo} from "../Appwrite/fetchMealInfo"
import { useSelector } from 'react-redux';
// let globalMealData;
export const getMealDatainIngredients = (mealdata) => {
  // console.log("The mealData(Ingredient) is: ",mealdata)
  // const letmealdata = mealdata
  // globalMealData = letmealdata;
}

const IngredientsPage = () => {
  const [loading,setLoading] = useState(false)
  const [mealInfo, setMealInfo] = useState(null);
 const isMealData = useSelector((state) => state.meals.Meals);
  useEffect(() => {
    const fetchMealInfo = async () => {
      // Assuming getMealDatainIngredients is a function that fetches or returns meal data
      // const mealData = await getMealInfo(); // fetches meal data asynchronously
      // setMealInfo(mealData); // update state with meal data
        try {
           const mealKiJaankari = await isMealData
           if(mealKiJaankari) {
            console.log("The mealData(Ingredient)2 is: ", isMealData);
             setMealInfo(mealKiJaankari)
           }
        } catch (error) {
          console.log("Error while gettin meal info:",error.message)
        }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    fetchMealInfo();
  }, []);
  
  // let MealInfo = getMealInfo()
  // console.log("The mealInfo2 is (Ingredients.jsx)",mealInfo)

  if (loading) {
    return (
      <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
        <PacmanLoader color="#00cdff" />
      </div>
    );
  }
  

  const recipe = {
    name: "BeaverTails",
    image: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
    ingredients: [
      { name: "Water", quantity: "1/2 cup" },
      { name: "Yeast", quantity: "2 parts" },
      { name: "Sugar", quantity: "1/2 cup" },
      { name: "Milk", quantity: "1/2 cup" },
      { name: "Butter", quantity: "6 tblsp" },
      { name: "Eggs", quantity: "2" },
      { name: "Salt", quantity: "1 ½ tsp" },
      { name: "Flour", quantity: "2-1/2 cups" },
      { name: "Oil", quantity: "for frying" },
      { name: "Lemon", quantity: "garnish" },
      { name: "Sugar", quantity: "garnish" },
      { name: "Cinnamon", quantity: "garnish" }
    ],
    instruction: "In the bowl of a stand mixer, add warm water, a big pinch of sugar and yeast. Allow to sit until frothy.\r\nInto the same bowl, add 1/2 cup sugar, warm milk, melted butter, eggs and salt, and whisk until combined.\r\nPlace a dough hook on the mixer, add the flour with the machine on, until a smooth but slightly sticky dough forms.\r\nPlace dough in a bowl, cover with plastic wrap, and allow to proof for 1 1/2 hours.",
    youtube_Url: "https://www.youtube.com/watch?v=2G07UOqU2e8"
  };

  return (
  <>
 <div className="min-h-screen bg-gradient-to-b from-[#ffbb00a4] to-[#fff5d6]">
    {/* Header */}
    <div className="sticky top-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-orange-500 shadow-lg">
              <img 
                src={logo} 
                alt="MealMind Logo" 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">INGREDIENTS</h1>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Large Recipe Image */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={mealInfo ? mealInfo?.image:recipe.image} 
          alt={mealInfo ? mealInfo?.title:recipe.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{mealInfo ? mealInfo?.title:recipe.name}</h2>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredients Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
            <Utensils className="mr-2 sm:mr-3 text-teal-600" />
            Ingredients List
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {mealInfo?.ingredients.map((ingredient, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <FaLeaf className="mr-2 sm:mr-3 text-teal-500 text-sm sm:text-base" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{ingredient.name}</span>
                </div>
                <span className="text-gray-600 text-sm sm:text-base">{ingredient.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Instructions</h3>
            <div className="relative">
              <textarea
                value={mealInfo ? mealInfo?.Instruction:recipe.instruction}
                readOnly
                className="w-full h-40 sm:h-48 p-3 sm:p-4 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none overflow-y-auto"
              />
            </div>
          </div>

          {/* YouTube URL Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
              <Youtube className="mr-2 sm:mr-3 text-red-600" />
              YouTube Tutorial
            </h3>
            <a 
              href={mealInfo ? mealInfo?.Youtube_Url:recipe.youtube_Url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 sm:p-4 bg-red-50 rounded-lg sm:rounded-xl text-blue-600 hover:underline overflow-hidden text-ellipsis text-sm sm:text-base"
            >
              {mealInfo ? mealInfo?.Youtube_Url:recipe.youtube_Url}
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Back Button */}
    <Link to="/home">
      <button className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 bg-teal-600 text-white p-2 sm:p-3 rounded-full shadow-xl hover:bg-teal-700 transition-colors">
        <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
    </Link>
  </div>
    </>
  );
};

export default IngredientsPage;