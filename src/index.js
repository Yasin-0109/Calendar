import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/signup';
import reportWebVitals from './reportWebVitals';
import Schedule from './Schedule'
import App from './components/app'

ReactDOM.render(
  <React.StrictMode>
    <App></App>
    <Signup />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
