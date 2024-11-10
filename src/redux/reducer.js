import { createSlice } from '@reduxjs/toolkit';

// Initial state to store favorite user IDs
const initialState = {
  favoritesUsers: [], // Array of favorite users, each with { id, name }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      // Add user if they're not already in the favorites list
      const { id, name } = action.payload;
      if (!state.favoritesUsers.some(user => user.id === id)) {
        state.favoritesUsers.push({ id, name });
      }
    },
    removeFavorite: (state, action) => {
      // Remove user by ID
      const userId = action.payload;
      state.favoritesUsers = state.favoritesUsers.filter(user => user.id !== userId);
    },
  },
});


export const { addFavorite,removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
