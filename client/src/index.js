import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";



ReactDOM.render(
  <React.StrictMode>
  <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

