import { createSlice } from "@reduxjs/toolkit";
import { deleteToken } from './token';

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

export const updateUserAsync = () => async (dispatch, getState) => {
  const { token } = getState();
  const res = await fetch('https://naoki-funawatari.tk/api/Users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (res.status === 200) {
    const json = await res.json();
    dispatch(updateUser(json));
    return;
  }
}
