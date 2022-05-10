import React, { useState } from 'react'
import NotificationService from '../services/NotificationService';
import UserService from '../services/UserService'
import '../styles/form.css'
var store = require('store'); // Store.js

const LoginForm = function () {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  var UserNickname;
  
  if (store.get("user") != null) {
    UserNickname = store.get("user").user;
  }
  function formSubmit () {
    UserService.login(username, password);
  }
  function signUp() {
    UserService.createUser(username, password);
  }
  function logoutUser() {
    UserService.logout();
  }
  
  return (
    <div className="container">
      <h1>{UserNickname}</h1>
      <div className="nav_container">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        <li className="nav-item w-50" role="presentation">
          <button className="nav-link active w-100" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Login</button>
        </li>
        <li className="nav-item w-50" role="presentation">
          <button className="nav-link w-100" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Register</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            <form onSubmit={formSubmit} className="login__form">
            <div className="form__inputs">
              <input 
                name="user" 
                value={username} 
                onChange={event => setUsername(event.target.value)} 
                className="form-control" 
                placeholder='Username'
              />
              <input 
                name="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                className="form-control"
                placeholder='Password'
              />
            </div>
            <div className="form__buttons">
              <button type="button" onClick={formSubmit} className="btn btn-primary">Sign In</button> 
              {store.get("user") != null &&
                <button type='button' onClick={logoutUser} className="btn btn-primary">Logout</button>
              }
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Remember me</label>
              </div>
            </div>
            </form>
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
        <form onSubmit={formSubmit} className="login__form">
            <div className="form__inputs">
              <input 
                name="user" 
                value={username} 
                onChange={event => setUsername(event.target.value)} 
                className="form-control" 
                placeholder='Username'
              />
              <input 
                name="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)} 
                className="form-control"
                placeholder='Password'
              />
            </div>
            <div className="form__buttons">
              <button type="button" onClick={signUp} className="btn btn-primary">Sign Up</button> 
            </div>
            </form>
        </div>
      </div>
      </div>
    </div>
    
  )
}

export default LoginForm;