import { createSlice } from "@reduxjs/toolkit";

const mealInfoSlice = createSlice({
    name: "meal",
    initialState:{
        Meals:null,
        error:null
    },
    reducers:{
        setMealData:(state,action) => {
            state.Meals = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          }, 
    }
})
export const { setMealData , setError } = mealInfoSlice.actions;
export default mealInfoSlice.reducer;