import { useDispatch,useSelector } from "react-redux"
import {setMealId} from "./MealIdSlice"

const GetMealDataFromAPI_apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
const GetMealFullDetailByMealId_apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
const GetMeaCategoryDetailBydescription = "https://www.themealdb.com/api/json/v1/1/categories.php"

// const MealId;
export const GetMealDataFromAPI = async() => {
    // const dispatch = useDispatch()

   try {
    const getMealInfo = await fetch(GetMealDataFromAPI_apiUrl)
    const getAccurateMealInfo = await getMealInfo.json()
    if(getAccurateMealInfo){
        console.log("Meal Successfully get fetched")
        return true;
    }
   } catch (error) {
     console.log("Error while fetching Meal: ",error.message)
   }
}

export const GetMealFullDetailByMealId = async(mealId) => {
   try {
    const getemealInfoBYID = await fetch(`${GetMealFullDetailByMealId_apiUrl}${mealId}`)
    const getAccurateMealInfoById = await getemealInfoBYID.json()
    if(getAccurateMealInfoById){
        console.log("GetMealFullDetailByMealID successfully done:",getAccurateMealInfoById)
        return true;
    }
   } catch (error) {
       console.log("Error while GetMealFullDetailByMealID method: ",error.message)
   }
}

export const GetMeaCategoryDetailwithDescription = async() => {
   try {
    const getemealcategoryBYdescription = await fetch(GetMeaCategoryDetailBydescription)
    const getAccuratemealcategoryBYdescription = await getemealcategoryBYdescription.json()
    if(getAccuratemealcategoryBYdescription){
        console.log("GetMealFullDetailByMealID successfully done:",getAccuratemealcategoryBYdescription)
        return true;
    }
   } catch (error) {
       console.log("Error while GetMealFullDetailByMealID method: ",error.message)
   }
}