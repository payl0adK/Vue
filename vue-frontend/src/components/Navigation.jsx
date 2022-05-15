import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import "../styles/nav.css"

var store = require('store');
const Navigation = () => {
  const url = "http://localhost:8080/api/auth/userinfo";
  const router = useNavigate();
  const [authorizedUser, setAuthorizedUser] = useState("");  
  useEffect(() => {
    if (store.get('token') != null) {
      getAuthorizedUser();
    }
    
}, []);

  const getAuthorizedUser = () => {
    var bearer = 'Bearer' + " " + store.get('token').jwt; 
    axios.get(url, {
        headers: {
            Authorization: bearer
        }
    })
    .then((response) => {    
    setAuthorizedUser(response.data);
    })
    
}
  return (
  <div className="container_fluid" id="navfluid">
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" onClick={() => router("/")}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => router("/login")}>Sign in/up</a>
        </li>
        
        {store.get("token") != null && 
        <li className="nav-item" if="">
          <a className="nav-link" onClick={() => router("/profile/" + authorizedUser.username)}>Profile</a>
        </li>
        }

      
      </ul>
    </div>
  </div>
  
  
  )
}

export default Navigation