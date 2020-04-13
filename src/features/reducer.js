import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import token from "./authentication/tokenSlice";
import user from "./authentication/usersSlice";
import events from "./schedule/eventsSlice";
import resources from "./schedule/resourcesSlice";
import eventDialog from "./schedule/eventDialogSlice";
// import error from "./error/errorSlice";

const reducer = combineReducers({
  token,
  user,
  events,
  resources,
  eventDialog,
  // error,
});

const store = configureStore({ reducer });

export default store;

export const { dispatch, getState } = store;
