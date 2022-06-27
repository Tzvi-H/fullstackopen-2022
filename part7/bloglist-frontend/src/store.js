import { createStore, combineReducers } from "redux";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  notification: notificationReducer,
});

export default createStore(reducer);
