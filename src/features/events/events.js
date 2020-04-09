import { createSlice } from "@reduxjs/toolkit";
import store from '../reducer';

const initialState = [];

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateEvents: (state, action) => {
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

const endPoint = 'https://localhost:44335/Events';

export const getEventsAsync = () => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const events = await res.json();
    dispatch(updateEvents(events));
  } catch (e) {
    console.error(e);
  }
}

export const postEventsAsync = event => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...event }),
    });
    const events = await res.json();
    dispatch(updateEvents(events));
  } catch (e) {
    console.error(e);
  }
}

export const putEventsAsync = event => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...event }),
    });
    const events = await res.json();
    dispatch(updateEvents(events));
  } catch (e) {
    console.error(e);
  }
}

export const deleteEventsAsync = event => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const res = await fetch(endPoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...event }),
    });
    const events = await res.json();
    dispatch(updateEvents(events));
  } catch (e) {
    console.error(e);
  }
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
