import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  id: null,
  allDay: null,
  start: null,
  end: null,
  resourceId: null
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
