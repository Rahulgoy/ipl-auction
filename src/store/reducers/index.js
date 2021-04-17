import authReducer from "./authReducer";

import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import playerReducer from "./playerReducer";

export default combineReducers({
  auth: authReducer,
  playerB: playerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
