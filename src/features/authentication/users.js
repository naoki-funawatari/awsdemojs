import { createSlice } from "@reduxjs/toolkit";
import { deleteToken } from './token';
import { fetchData } from '../apiWrapper';

const initialState = {
  id: null,
  name: null
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => action.payload,
    deleteUser: (state, action) => initialState,
  },
  extraReducers: {
    [deleteToken]: (state, action) => initialState,
  }
});

export default slice.reducer;

export const {
  updateUser,
  deleteUser
} = slice.actions;

export const updateUserAsync = () => async dispatch => {
  try {
    const data = await fetchData(
      'Users',
      'GET',
      null
    );
    dispatch(updateUser({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
