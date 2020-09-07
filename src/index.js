import React from 'react';
import ReactDOM from 'react-dom';
import Approuter from './routes/AppRouter';


ReactDOM.render(
  <React.StrictMode>
    <Approuter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

