import React, { useState } from 'react'
import UserService from '../services/UserService'

var store = require('store'); // Store.js
const LoginForm = function () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var UserNickname;
  console.log(store.get("user") != null);
  if (store.get("user") != null) {
    UserNickname = store.get("user").user;
  }
  function formSubmit () {
    UserService.login(username, password);
  }
  
  return (
    <form onSubmit={formSubmit}>
            <label>
                <h1>{UserNickname}</h1>
                <h1>Username: {username}</h1>
                <h1>Password: {password}</h1>
                User: <input name="user" value={username} onChange={event => setUsername(event.target.value)}/>
                Password: <input name="password" value={password} onChange={event => setPassword(event.target.value)}/>
            </label>
                <button type="button" onClick={formSubmit}>Sign In</button>
        </form>
  )
}

export default LoginForm;