import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import token from "./authentication/token";
import user from "./authentication/users";
import events from "./events/events";
import resources from "./events/resources";
// import error from "./error/errorSlice";

const reducer = combineReducers({
  token,
  user,
  events,
  resources,
  // error,
});

const store = configureStore({ reducer });

export default store;

export const { dispatch, getState } = store;
