import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { ProductReducer } from "./reducers/ProductReducer";
import { UserReducer } from "./reducers/UserReducer";
import { CartReducer } from "./reducers/CartReducer";
import { persistReducer, persistStore } from "redux-persist";

const reducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
  carts: CartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["carts", "products"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistore = persistStore(store);

export { store, persistore };
