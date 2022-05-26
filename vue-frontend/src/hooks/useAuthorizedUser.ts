import React, {useState, useEffect} from 'react';
import axios from "axios";

import User from "../models/User";


var store = require('store');

function useAuthorizedUser() {
    const [authorizedUser, setAuthorizedUser] = useState<User | undefined>(undefined);  

    const url = "http://localhost:8080/api/auth/userinfo";

    useEffect(() => {
        const bearer = 'Bearer' + " " + store.get('token').jwt; 
        axios.get(url, {
            headers: {
                Authorization: bearer
            }
        })
        .then((response) => {    
        setAuthorizedUser(response.data);
        })
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