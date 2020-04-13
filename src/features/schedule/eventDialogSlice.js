import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isNew: false,
  id: null,
  allDay: null,
  start: null,
  end: null,
  resourceIds: []
};

const slice = createSlice({
  name: "eventDialog",
  initialState,
  reducers: {
    openEventDialog: (state, action) => action.payload,
    closeEventDialog: (state, action) => initialState,
  },
});

export default slice.reducer;

export const {
  openEventDialog,
  closeEventDialog,
} = slice.actions;
