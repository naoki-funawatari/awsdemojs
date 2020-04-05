import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const slice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetSchedule: (state, action) => [...action.payload],
    appendSchedule: (state, action) => {
      const {
        title,
        allDay,
        start,
        end,
        resourceId
      } = action.payload;

      const ids = [0, ...state.map(schedule => Number(schedule.id))];
      const id = Math.max(...ids) + 1;
      const schedule = {
        id,
        title,
        allDay,
        start,
        end,
        resourceId: resourceId || 1
      };
      return [...state, schedule];
    },
    updateSchedule: (state, action) => [...state].map(existingEvent => {
      return existingEvent.id === action.payload.id
        ? { ...existingEvent, start: action.payload.start, end: action.payload.end }
        : existingEvent;
    }),
    deleteSchedule: (state, action) => initialState,
  },
});

export default slice.reducer;

export const {
  updateSchedule,
  deleteSchedule
} = slice.actions;

// export const updateUserAsync = () => async (dispatch, getState) => {
//   const { token } = getState();
//   const res = await fetch('https://localhost:44335/Users', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     }
//   });

//   if (res.status === 200) {
//     const json = await res.json();
//     dispatch(updateUser(json));
//     return;
//   }
// }
