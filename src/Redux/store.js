import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mealInfoReducer from "./getmealInfoSlice"
import favoritesReducer from './getSavedmealSlice'; // Import the favorites reducer
import dbstReducer from "./getDatabaseAndStorageIDSlice.js"
import AddToCartReducer from "./AddToCartSlice.js"
import GetFileIdReducer from "./GetAvatarFileIDSlice.js"

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer for favorites
const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);
const persistedAddToCartReducer = persistReducer(persistConfig, AddToCartReducer);
const persistedFileIdReducer = persistReducer(persistConfig, GetFileIdReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    // meal: mealIdReducer,
    meals:mealInfoReducer,
    favorites:persistedFavoritesReducer, // Use the persisted reducer here
    AddToCart:persistedAddToCartReducer,
    databaseAndStorageId:dbstReducer,
    getFileId:persistedFileIdReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;