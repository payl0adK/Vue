import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../styles/nav.css";
import UserService from '../services/UserService';
import User from '../models/User';

import useAuthorizedUser from '../hooks/useAuthorizedUser';

const Navigation = () => {
  const router = useNavigate();
  const authorizedUser: User = useAuthorizedUser();  

  return (
  <div className="container_fluid" id="navfluid">
    <div className="container">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" onClick={() => router("/")}>Home</a>
        </li>

        {!UserService.userIsAuthorized() &&
        <li className="nav-item">
          <a className="nav-link" onClick={() => router("/login")}>Sign in/up</a>
        </li>
        }
        
        
        {UserService.userIsAuthorized() &&
        <li className="nav-item">
          <a className="nav-link" 
          onClick={() => router("/profile/" + authorizedUser.username)}>Profile</a>
        </li>
        }

      
      </ul>
    </div>
  </div>
  
  
  )
}

export default Navigation