import { createSlice } from "@reduxjs/toolkit";
import store from '../reducer';

const initialState = [];

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateEvents: (state, action) => {
      console.log([...action.payload])
      return [...action.payload].map(event => ({
        ...event,
        start: typeof event.start === "string"
          ? event.start
          : event.start.toISOString(),
        end: typeof event.end === "string"
          ? event.end
          : event.end.toISOString()
      }))
    },
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
  dispatch(updateEvents(events));
}

export const getParsedEvents = () => {
  const { events } = store.getState();
  const parsedEvents = [...events].map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));
  return parsedEvents;
}
