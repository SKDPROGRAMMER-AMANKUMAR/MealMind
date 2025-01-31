import { createSlice } from "@reduxjs/toolkit";

const MealId = createSlice({
    name:"mealId",
    initialState:{
        Idmeal:''
    },
    reducers: {
        setMealId: (state,action) => {
            state.Idmeal = action.payload
        }
    }
})

export const {setMealId} = MealId.actions
export default MealId.reducer;