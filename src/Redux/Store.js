import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

const rootreducer = combineReducers(reducers);
const compstore = configureStore({ reducer: rootreducer, middleware: [thunk, logger] });
export default compstore;
