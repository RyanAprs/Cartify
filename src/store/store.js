import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { ProductReducer } from "./reducers/ProductReducer";
import { UserReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
