import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import authReducer from "./Reducers.js/authReducer";
import { thunk } from "redux-thunk";
import { appointmentsReducer } from "./Reducers.js/appointmentReduer";

const rootReducer= combineReducers({
    auth: authReducer,
    appointments: appointmentsReducer
})

const store= legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;