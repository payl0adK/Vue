import React, {useState, useEffect} from 'react';
import axios from "axios";

import User from "../models/User";

var store = require('store');

const useAuthorizedUser = (): User => {
    const [authorizedUser, setAuthorizedUser] = useState({} as User);  
    const url = "http://localhost:8080/api/auth/userinfo";
    const bearer = 'Bearer' + " " + store.get('token').jwt; 

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: bearer
            }
        })
        .then((response) => {    
            setAuthorizedUser(response.data);
        })
        .catch((error) => {
        console.log(error.response.data.message);
        });
    }, []);


    return new User(
        authorizedUser.id,
        authorizedUser.username,
        authorizedUser.password,
        authorizedUser.avatarUrl,
        authorizedUser.enabled,
        authorizedUser.authorities
    );
}

export default useAuthorizedUser;