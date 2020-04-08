import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    updateResources: (state, action) => action.payload,
  },
});

export default slice.reducer;

export const {
  updateResources
} = slice.actions;

export const updateResourcesAsync = () => async (dispatch, getState) => {
  const { token } = getState();
  const res = await fetch('https://localhost:44335/Resources', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const resources = await res.json();
  dispatch(updateResources(resources));
}
