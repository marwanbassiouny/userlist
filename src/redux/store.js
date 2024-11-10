import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './reducer';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
