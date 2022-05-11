import React, {Component, useState} from 'react'
import '../../styles/profile.css'
import UserService from "../../services/UserService"

var store = require('store');

//const [username, setUsername] = useState("");
const Profile = function () {

    const [username, setUsername] = useState(UserService.getUserInfo(store.get("token").jwt)); 
    console.log(UserService.getUserInfo(store.get("token").jwt));
    
    return (
        <div className="profile_root">

        <div className="container">
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src="avatar" alt="" />
                </div>
                <div className="profile__info__credentials">
                    <b>{username}</b>
                    <b>Roles</b>
                </div>
            </div>

            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-articles" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Articles</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Comments</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Followers</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-articles">
                    <div className="write__article">
                        write article (for profile's owner)
                    </div>

                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    Comments
                </div>
                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    Articles
                </div>
            </div>
        </div>
        
    </div>)
    
  
}

export default Profile;