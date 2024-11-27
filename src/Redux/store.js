import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import authReducer from "./Reducers.js/authReducer";
import { thunk } from "redux-thunk";

const rootReducer= combineReducers({
    auth: authReducer
})

const store= legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;