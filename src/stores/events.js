import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateEvents: (state, action) => action.payload,
  },
});

export default slice.reducer;

export const {
  updateEvents
} = slice.actions;

export const updateEventsAsync = () => {
  return async (dispatch, getState) => {
    const events = await new Promise(resolve => {
      setTimeout(() => {
        resolve(initialEvents)
      }, 1000)
    });

    dispatch(updateEvents(events));
  }
}

// const { token } = getState();
// const res = await fetch('https://localhost:44335/Users', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// });

// if (res.status === 200) {
//   const json = await res.json();
//   dispatch(updateUser(json));
//   return;
// }

const initialEvents = [
  {
    id: 1,
    title: '予定１',
    allDay: false,
    start: new Date(2020, 3, 4, 9, 0, 0),
    end: new Date(2020, 3, 4, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 2,
    title: '予定２',
    allDay: true,
    start: new Date(2020, 3, 4, 14, 0, 0),
    end: new Date(2020, 3, 4, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 3,
    title: '予定３',
    allDay: false,
    start: new Date(2020, 3, 5, 8, 30, 0),
    end: new Date(2020, 3, 5, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 4,
    title: '予定４',
    allDay: false,
    start: new Date(2020, 3, 6, 7, 0, 0),
    end: new Date(2020, 3, 6, 10, 30, 0),
    resourceId: 4,
  },
];
