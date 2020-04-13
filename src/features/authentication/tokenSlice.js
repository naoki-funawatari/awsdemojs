import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const slice = createSlice({
  name: "token",
  initialState,
  reducers: {
    updateToken: (state, { payload }) => payload.access_token,
    deleteToken: (state, action) => initialState,
  }
});

export default slice.reducer;

export const {
  updateToken,
  deleteToken
} = slice.actions;
