import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';

// Components
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';

import {ToastContainer} from "react-toastify";
ReactDOM.render(
  <Router>
    <Navigation/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/app" element={<App />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/profile/:username" element={<Profile/>} />
  </Routes>
  <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
  />
</Router>,
  document.getElementById('root')
);

