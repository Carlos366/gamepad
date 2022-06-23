import authReducer from "./authReducer";
import favoriteReducer from "./favoriteReducer";
import {combineReducers} from "redux";
import {firestoreReducer} from "redux-firestore"
import {firebaseReducer} from "react-redux-firebase";

const root = combineReducers({
    auth:authReducer,
    favorite:favoriteReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default root;