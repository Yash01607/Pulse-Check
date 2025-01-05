import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import reducer from "./reducers/index.jsx";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  { reducer: reducer },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
