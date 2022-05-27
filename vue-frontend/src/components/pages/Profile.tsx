import React, {useState, useEffect} from 'react'
import '../../styles/profile.css'
import User from "../../models/User";
import {useParams} from "react-router-dom"
import UploadAvatarButton from '../UI/UploadAvatarButton';

// Hooks
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import useGetUserByName from '../../hooks/useGetUserByName';

const Profile = function () {
    const parameters = useParams();
    const authorizedUser: User = useAuthorizedUser();
    const user: User = useGetUserByName(parameters.username);
    
    return (
        <div className="profile_root">

        <div className="container">
            <div className="profile__info">
                <div className="profile__avatar">
                    <img src={user.avatarUrl ? user.avatarUrl : "avatar"} alt="" />
                    {user.username == authorizedUser.username &&
                       <UploadAvatarButton user={user} authorizedUser={authorizedUser}/>
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
                    </div>
                    }
                </div>
            </div>

            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-articles" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Posts</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Comments</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Followers</button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane show active" id="pills-home" role="tabpanel" aria-labelledby="pills-articles">
                    Posts
                </div>
                <div className="tab-pane" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    Comments
                </div>
                <div className="tab-pane" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    Articles
                </div>
            </div>
        </div>

    </div>)
}

export default Profile;


