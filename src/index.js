import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Redux
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux';
import { datasetReducer, regressionReducer } from './redux/reducer';
import store from './redux/store';

const reducer = combineReducers({datasetReducer, regressionReducer});

const myStore = createStore(
  reducer,
  store,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
