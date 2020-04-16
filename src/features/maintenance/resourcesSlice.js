import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from '../apiWrapper';

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

export const getResourcesAsync = () => async dispatch => {
  try {
    const data = await fetchData('Resources', 'GET', null);
    dispatch(updateResources({
      ...data,
      editing: false,
    }));
  } catch (error) {
    console.error(error);
  }
}
export const postResourcesAsync = resource => async dispatch => {
  try {
    const data = await fetchData('Resources', 'POST', resource);
    dispatch(updateResources({
      ...data,
      editing: false,
    }));
  } catch (error) {
    console.error(error);
  }
}
export const putResourcesAsync = resource => async dispatch => {
  try {
    const data = await fetchData('Resources', 'PUT', resource);
    dispatch(updateResources({
      ...data,
      editing: false,
    }));
  } catch (error) {
    console.error(error);
  }
}
