import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  blog: blogReducer,
  error: errorReducer,
  auth: authReducer,
});
