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

const endPoint = 'https://naoki-funawatari.tk/api/Resources';

export const getResourcesAsync = () => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const resources = await res.json();
    dispatch(updateResources(resources));
  } catch (e) {
    console.error(e);
  }
}
export const postResourcesAsync = resource => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...resource }),
    });
    const resources = await res.json();
    dispatch(updateResources(resources));
  } catch (e) {
    console.error(e);
  }
}
