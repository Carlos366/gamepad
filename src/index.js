import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import './App.css';
import {createStore, applyMiddleware, compose} from "redux";
import root from "./Store/Reducers/root";
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import { reactReduxFirebase,getFirebase } from "react-redux-firebase";
import { reduxFirestore,getFirestore} from "redux-firestore";
import Firebase from "./Components/Firebase"

const store = createStore(root,
    compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore,getFirebase})),
        reduxFirestore(Firebase),
        reactReduxFirebase(Firebase, {userProfile: 'users', useFirestoreForProfile: true})
    )
);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}><App/></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
