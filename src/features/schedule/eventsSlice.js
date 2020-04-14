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
      const resourceIds = action.payload.resourceIds;
      const newEvents = resourceIds.map(resourceId => ({ id, title, allDay, start, end, resourceId }));
      console.table(newEvents);
      return [...state, ...newEvents];
    },
    putEvents: (state, action) => {
      console.log('------------------putEvents------------------');
      const id = action.payload.id;
      const title = action.payload.title;
      const allDay = action.payload.allDay;
      const start = action.payload.start;
      const end = action.payload.end;
      const resourceIds = action.payload.resourceIds;
      const newEvents = resourceIds.map(resourceId => ({ id, title, allDay, start, end, resourceId }));
      console.table(newEvents);
      const removed = state.filter(event => event.id !== id);
      return [...removed, ...newEvents];
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

const createUrl = (view, range) =>
  `Events`
  + `?view=${view}`
  + range.map(v => `&range=${v.toISOString()}`).join('');

export const getEventsAsync = (view, range) => async dispatch => {
  try {
    const url = createUrl(view, range);
    const data = await fetchData(url, 'GET', null);
    dispatch(updateEvents(data));
  } catch (error) {
    console.error(error);
  }
}
export const postEventsAsync = (event, view, range) => async dispatch => {
  try {
    const url = createUrl(view, range);
    const data = await fetchData(url, 'POST', { ...event });
    dispatch(updateEvents(data));
  } catch (error) {
    console.error(error);
  }
}
export const putEventsAsync = (event, view, range) => async dispatch => {
  try {
    const url = createUrl(view, range);
    const data = await fetchData(url, 'PUT', { ...event });
    dispatch(updateEvents(data));
  } catch (error) {
    console.error(error);
  }
}
export const deleteEventsAsync = (event, view, range) => async dispatch => {
  try {
    const url = createUrl(view, range);
    const data = await fetchData(url, 'DELETE', { ...event });
    dispatch(updateEvents(data));
  } catch (error) {
    console.error(error);
  }
}
export const generateNewId = events => {
  const ids = events.map(event => event.id);
  const newId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
  return newId;
}
