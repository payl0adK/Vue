import React from 'react'
var store = require('store');
const Navigation = () => {
  return (
  <div className="container">
    <ul className="nav">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/app">App</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/login">Login/Register</a>
  </li>
  
  {store.get("user") != null && 
  <li className="nav-item" if="">
    <a className="nav-link" href="/profile">Profile</a>
  </li>
  }

 {store.get("user") != null && 
  <li className="nav-item" if="">
    <a className="nav-link" href="/logout">logout</a>
  </li>
  }
  
</ul>
  </div>
  
  )
}

export default Navigation