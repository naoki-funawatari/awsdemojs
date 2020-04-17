import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from '../apiWrapper';

const initialState = [];

const slice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    updateResources: (state, action) => action.payload,
    postResources: (state, action) => {
      console.log('------------------postResources------------------');
      const id = generateNewId(state);
      const title = action.payload.title;
      const resource_type_id = action.payload.resource_type_id;
      const resource_type_title = action.payload.resource_type_title;
      const remarks = action.payload.remarks;
      const newResource = { id, title, resource_type_id, resource_type_title, remarks }
      console.table(newResource);
      return [...state, newResource];
    },
    putResources: (state, action) => {
      console.log('------------------putResources------------------');
      const id = action.payload.id;
      const title = action.payload.title;
      const resource_type_id = action.payload.resource_type_id;
      const resource_type_title = action.payload.resource_type_title;
      const remarks = action.payload.remarks;
      const newResource = { id, title, resource_type_id, resource_type_title, remarks }
      console.table(newResource);
      const newResources = state.map(resource =>
        resource.id === id
          ? newResource
          : resource
      );
      return newResources;
    },
    deleteResources: (state, action) => {
      console.log('------------------deleteResources------------------');
      const id = action.payload.id;
      return state.filter(resource => resource.id !== id);
    },
  },
});

export default slice.reducer;

export const {
  updateResources,
  postResources,
  putResources,
  deleteResources,
} = slice.actions;

export const getResourcesAsync = () => async dispatch => {
  try {
    const data = await fetchData('Resources', 'GET', null);
    dispatch(updateResources(data));
  } catch (error) {
    console.error(error);
  }
}
export const postResourcesAsync = resource => async dispatch => {
  try {
    const data = await fetchData('Resources', 'POST', resource);
    dispatch(updateResources(data));
  } catch (error) {
    console.error(error);
  }
}
export const putResourcesAsync = resource => async dispatch => {
  try {
    const data = await fetchData('Resources', 'PUT', resource);
    dispatch(updateResources(data));
  } catch (error) {
    console.error(error);
  }
}
export const deleteResourcesAsync = resource => async dispatch => {
  try {
    const data = await fetchData('Resources', 'DELETE', resource);
    dispatch(updateResources(data));
  } catch (error) {
    console.error(error);
  }
}
export const generateNewId = resources => {
  const ids = resources.map(resource => resource.id);
  const newId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
  return newId;
}
