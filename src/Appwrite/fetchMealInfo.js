import { getMealDatainIngredients } from "../Pages/Ingredients.jsx"
import {setMealData} from "../Redux/getmealInfoSlice.js"
// import {setSavedMealData} from "../Redux/getSavedmealSlice.js"
// import { useDispatch,useSelector } from "react-redux"

export const getMealInfo = (meals,dispatch) => {
  // const dispatch = useDispatch()
   const mealInfo = {
     id:meals.id,
     image:meals.image,
     title:meals.title,
     ingredients:meals.ingredients,
     Youtube_Url:meals.youtube_Url,
     Instruction:meals.Instruction 
   } 
   dispatch(setMealData(mealInfo))
   console.log("The meal data is(fetchMealInfo.js):",mealInfo)
   getMealDatainIngredients(mealInfo)
   return mealInfo
} 

// export const getSavedMealData = (meals,dispatch) => {
//   const savedmealInfo = {
//     id: meals.id,
//     image: meals.image,
//     title: meals.title,
//     ingredients: meals.ingredients,
//     Youtube_Url: meals.youtube_Url,
//     Instruction: meals.Instruction 
// };
//   dispatch(setSavedMealData([savedmealInfo])); // Sending an array for consistency
//   return savedmealInfo
// }

// export const getSavedMealData = (meals, dispatch) => {
//   if (!meals || !meals.id || !meals.image || !meals.title) {
//     console.error("Invalid meal data:", meals);
//     return; // Avoid dispatching invalid data
//   }

//   const savedmealInfo = {
//     id: meals.id,
//     image: meals.image,
//     title: meals.title,
//     ingredients: meals.ingredients || '',  // Default to empty string if undefined
//     Youtube_Url: meals.youtube_Url || '',   // Default to empty string if undefined
//     Instruction: meals.Instruction || '',   // Default to empty string if undefined
//   };
//   console.log("Fetched meal data: ", savedmealInfo);
//   dispatch(setSavedMealData([savedmealInfo])); // Sending an array for consistency
//   return savedmealInfo;
// };

