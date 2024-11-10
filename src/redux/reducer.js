import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesUsers: [], 
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
 
      const { id, name } = action.payload;
      if (!state.favoritesUsers.some(user => user.id === id)) {
        state.favoritesUsers.push({ id, name });
      }
    },
    removeFavorite: (state, action) => {
      const userId = action.payload;
      state.favoritesUsers = state.favoritesUsers.filter(user => user.id !== userId);
    },
  },
});


export const { addFavorite,removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
