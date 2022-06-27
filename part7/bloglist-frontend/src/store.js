import { createStore, combineReducers } from "redux";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
});

export default createStore(reducer);
