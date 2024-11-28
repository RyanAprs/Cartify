import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { ProductReducer } from "./reducers/ProductReducer";
import { UserReducer } from "./reducers/UserReducer";
import { CartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
  carts: CartReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
