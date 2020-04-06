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
  // const { token } = getState();
  // const res = await fetch('https://localhost:44335/Users', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // });  
  // const events = await res.json();
  // dispatch(updateEvents(events));

  const resources = await new Promise(resolve => {
    setTimeout(() => {
      resolve(initialResources)
    }, 1000)
  });

  dispatch(updateResources(resources));
}

const initialResources = [
  { id: 1, title: '自分の予定', },
  { id: 2, title: '会議室１', },
  { id: 3, title: '会議室２', },
  { id: 4, title: '会議室３', },
  { id: 5, title: '会議室４', },
  { id: 6, title: '会議室５', },
  { id: 7, title: '会議室６', },
  { id: 8, title: '会議室７', },
  { id: 9, title: '会議室８', },
  { id: 10, title: '会議室９', },
  { id: 11, title: '会議室１０', },
];
