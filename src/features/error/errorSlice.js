import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, { payload }) => payload
  }
});

export default slice.reducer;

export const {
  setError
} = slice.actions;
