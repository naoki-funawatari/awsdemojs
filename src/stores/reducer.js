import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import token from "./token";
import user from "./user";
import events from "./events";

const reducer = combineReducers({
  token,
  user,
  events,
});

const store = configureStore({ reducer });

export default store;
