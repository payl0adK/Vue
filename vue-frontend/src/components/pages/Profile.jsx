import React, {Component, useState, useEffect} from 'react'
import '../../styles/profile.css'
import UserService from "../../services/UserService"
import User from "../../models/User"
import axios from "axios";
import {useParams} from "react-router-dom"
import NotificationService from '../../services/NotificationService';

var store = require('store');

const Profile = function () {
    const [authorizedUser, setAuthorizedUser] = useState("");  
    const [user, setUser] = useState("");
    const [username, setUsername] = useState("");
    const [params, setParams] = useState();
    const parameters = useParams();
    const url = "http://localhost:8080/api/auth/userinfo";
    
    
    useEffect(() => {
        getUserProfile();
        getAuthorizedUser();
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
    
    const getUserProfile = () => {
        axios.get("http://localhost:8080/api/user", {
            params: {
                username: parameters.username
            },
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            if (error.response.status == 404) {
                NotificationService.sendErrorNotification("User doesn't exists", 3000);
            }
        })
    }

    const uploadAvatar = () => {
        // TODO
        
    }

    return (
        <div className="profile_root">

        <div className="container">
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src="avatar" alt="" />
                    {user.username == authorizedUser.username &&
                       <button className='btn btn-dark'>Change avatar</button> 
                    }
                    
                </div>
                <div className="profile__info__credentials">
                    <div className="profile__info--user">
                      <b>{user.username}</b>  
                    </div>
                    {user.username == authorizedUser.username &&
                    <div className="profile__info-buttons">
                        <button type='button' className='btn btn-outline-dark'>Edit Profile</button>
                        <button type='button' className='btn btn-outline-dark'>Write a post</button>
                        <form class="mb-3">
                            <label for="formFile" class="form-label">Default file input example</label>
                            <input class="form-control" type="file" id="formFile"/>
                            <button onClick={uploadAvatar()}></button>
                        </form>
                    </div>
                    }
                </div>
            </div>

            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-articles" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Articles</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Comments</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Followers</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-articles">
                    Posts
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    Comments
                </div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    Articles
                </div>
            </div>
        </div>
        
    </div>)
}

export default Profile;


