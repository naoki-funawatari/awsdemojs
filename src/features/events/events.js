import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from '../apiWrapper';

const initialState = [];

const slice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateEvents: (state, action) => action.payload,
    postEvents: (state, action) => {
      console.log('------------------postEvents------------------');
      const id = generateNewId(state);
      const title = action.payload.title;
      const allDay = action.payload.allDay;
      const start = action.payload.start;
      const end = action.payload.end;
      const resourceId = action.payload.resourceId;
      const newEvent = { id, title, allDay, start, end, resourceId }
      console.table(newEvent);
      return [...state, newEvent];
    },
    putEvents: (state, action) => {
      console.log('------------------putEvents------------------');
      const id = action.payload.id;
      const title = action.payload.title;
      const allDay = action.payload.allDay;
      const start = action.payload.start;
      const end = action.payload.end;
      const resourceId = action.payload.resourceId;
      const newEvent = { id, title, allDay, start, end, resourceId }
      console.table(newEvent);
      return state.map(event => event.id === id ? newEvent : event);
    },
    deleteEvents: (state, action) => {
      console.log('------------------deleteEvents------------------');
      const id = action.payload.id;
      return state.filter(event => event.id !== id);
    },
  },
});

export default slice.reducer;

export const {
  updateEvents,
  postEvents,
  putEvents,
  deleteEvents,
} = slice.actions;

export const getEventsAsync = () => async dispatch => {
  try {
    const data = await fetchData('Events', 'GET', null);
    dispatch(updateEvents(data));
  } catch (error) {
    console.log(error);
  }
}
export const postEventsAsync = event => async dispatch => {
  try {
    const data = await fetchData('Events', 'POST', event);
    dispatch(updateEvents(data));
  } catch (error) {
    console.log(error);
  }
}
export const putEventsAsync = event => async dispatch => {
  try {
    const data = await fetchData('Events', 'PUT', event);
    dispatch(updateEvents(data));
  } catch (error) {
    console.log(error);
  }
}
export const deleteEventsAsync = event => async (dispatch, getState) => {
  try {
    const data = await fetchData('Events', 'DELETE', event);
    dispatch(updateEvents(data));
  } catch (error) {
    console.log(error);
  }
}
export const generateNewId = events => {
  const ids = events.map(event => event.id);
  const newId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
  return newId;
}
