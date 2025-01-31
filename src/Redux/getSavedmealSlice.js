import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  savedMeals: [], // This will hold all the favorite meals
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSavedMeals: (state, action) => {
      state.savedMeals = action.payload;
    },
    // Action to add a meal to favorites
    addMealToFavorites: (state, action) => {
      const mealExists = state.savedMeals.some(meal => meal.id === action.payload.id);
      if (!mealExists) {
        state.savedMeals.push(action.payload);
      }
    },
    
    // Action to remove a meal from favorites
    removeMealFromFavorites: (state, action) => {
      console.log('Before removal:', state.savedMeals);
      console.log('Removing meal with ID:', action.payload);
      state.savedMeals = state.savedMeals.filter(meal => meal.$id !== action.payload);
      console.log('After removal:', state.savedMeals);
    },
    extraReducers: (builder) => {
      builder.addCase(PURGE, () => initialState);
    }
  },
});

// Create a selector to get the saved meals from the Redux state
export const selectSavedMeals = (state) => state.favorites.savedMeals; 

// Export the actions to be used in components
export const { setSavedMeals,addMealToFavorites, removeMealFromFavorites } = favoritesSlice.actions;

// Export the reducer to be added to the store
export default favoritesSlice.reducer;
