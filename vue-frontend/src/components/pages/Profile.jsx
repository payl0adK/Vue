import React, {Component, useState, useEffect} from 'react'
import '../../styles/profile.css'
import UserService from "../../services/UserService"
import User from "../../models/User"
import axios from "axios";
var store = require('store');

//const [username, setUsername] = useState("");
const Profile = function () {

    /*const [username, setUsername] = useState(UserService.getUserInfo(store.get("token").jwt)); 
    const state = {
        response: UserService.getUserInfo(store.get('token').jwt)
    }
    
    state.response.then((value) => {
        state.response = value;
    });
    console.log(state.response); */

    const [username, setUsername] = useState("");
    const [authorities, setAuthorities] = useState();

    const url = "http://localhost:8080/api/auth/userinfo";

    useEffect(() => {
        getUserInfo();
        console.log("User: " + state.user.username);
    });
    const state = {
        user: new User()
    }
    const getUserInfo = () => {
        var bearer = 'Bearer' + " " + store.get('token').jwt; 
        axios.get(url, {
            headers: {
                Authorization: bearer
            }
        })
        .then((response) => {
            var user = new User();
            

            const userInfo = response.data.username;
            const roles = response.data.roles;
            var user_roles = [];
            for (var i = 0; i < roles.length; i++) {
                user_roles.push(roles[i].roleName);
            }
            user.username = userInfo;
            user.authorities = roles;
            state.user = user;
            console.log(userInfo);
            setUsername(userInfo);
            setAuthorities("hello");
        })
    }
    
    
    return (
        <div className="profile_root">

        <div className="container">
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src="avatar" alt="" />
                </div>
                <div className="profile__info__credentials">
                    <b>{username}</b>
                    <b>{authorities}</b>
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
                    <div className="write__article">
                        write article (for profile's owner)
                    </div>

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