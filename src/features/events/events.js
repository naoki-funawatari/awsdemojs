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

export const updateEventsAsync = () => async (dispatch, getState) => {
  const { token } = getState();
  const res = await fetch('https://localhost:44335/Events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const events = await res.json();
  // const parsedEvents = [...events].map(event => ({
  //   ...event,
  //   start: new Date(event.start),
  //   end: new Date(event.end)
  // }));
  // console.log(parsedEvents);
  // dispatch(updateEvents(parsedEvents));
  dispatch(updateEvents(events));
}
