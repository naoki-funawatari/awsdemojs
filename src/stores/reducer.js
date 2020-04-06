import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import token from "./token";
import user from "./users";
import events from "./events";
import resources from "./resources";

const reducer = combineReducers({
  token,
  user,
  events,
  resources,
});

const store = configureStore({ reducer });

export default store;
