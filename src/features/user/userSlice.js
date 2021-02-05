import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: "user",
   initialState: {
      user: "",
      isUpload: false,
   },
   reducers: {
      login: (state, action) => {
         state.user = action.payload;
      },
      logout: (state) => {
         state.user = null;
      },
      toggleUpload: (state) => {
         state.isUpload = !state.isUpload;
      },
   },
});

export const { login, logout, toggleUpload } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsUpload = (state) => state.user.isUpload;

export default userSlice.reducer;
