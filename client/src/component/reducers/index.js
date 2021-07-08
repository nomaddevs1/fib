import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { fibinanciReducers } from "./fib";

export default combineReducers({
  form: formReducer,
  fib: fibinanciReducers,
});
