import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//reducers
import alert from "./reducers/alert";
import spinner from "./reducers/spinner";
import auth from "./reducers/auth";

const initState = {};

const rootReducer = combineReducers({
  alert,
  spinner,
  auth,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
