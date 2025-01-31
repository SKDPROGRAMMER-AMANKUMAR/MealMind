import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
    AddToCartMeals: [], // This will hold all the add to cart meals
};

const AddToCartSlice = createSlice({
  name: 'AddToCartMeals2',
  initialState,
  reducers: {
    setAddToCartMeals: (state, action) => {
      // Filter out any items without valid IDs
      state.AddToCartMeals = action.payload.filter(meal => meal && meal.id && meal.dbId);
    },
    // Action to add a meal to favorites
    addMealToCart: (state, action) => {
      const mealExists = state.AddToCartMeals.some(meal => meal.id === action.payload.id);
      if (!mealExists) {
        state.AddToCartMeals.push(action.payload);
      }
    },
    
    // Action to remove a meal from favorites
    removeMealFromAddtOcART: (state, action) => {
      console.log('Before removal:', state.AddToCartMeals);
      console.log('Removing meal with ID:', action.payload);
      state.AddToCartMeals = state.AddToCartMeals.filter(meal => meal.id !== action.payload);
      console.log('After removal:', state.AddToCartMeals);
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => initialState);
    }
  },
});

// Create a selector to get the saved meals from the Redux state
export const selectAddToCartMeals = (state) => state.AddToCart.AddToCartMeals; 

// Export the actions to be used in components
export const { setAddToCartMeals,addMealToCart, removeMealFromAddtOcART } = AddToCartSlice.actions;

// Export the reducer to be added to the store
export default AddToCartSlice.reducer;
