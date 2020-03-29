import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import token from "./token";
import user from "./user";

const reducer = combineReducers({
  token,
  user,
});

const store = configureStore({ reducer });

export default store;
