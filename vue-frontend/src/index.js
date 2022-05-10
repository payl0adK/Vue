import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/pages/Home';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import ToastContainer from "react-toastify";
ReactDOM.render(
  <Router>
    <Navigation/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/app" element={<App />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
</Router>,
  document.getElementById('root')
);

