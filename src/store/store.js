import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { productReducer } from "./reducers/ProductReducer";
import { thunk } from "redux-thunk";

const reducer = combineReducers({
  products: productReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
