import React, {useState, useEffect} from 'react';
import axios from "axios";
import User from "../models/User";
import NotificationService from '../services/NotificationService';

const useGetUserByName = (username: string): User => {
    const [user, setUser] = useState({} as User);  

    useEffect(() => {
        axios.get("http://localhost:8080/api/user", {
            params: {
                username: username
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
    }, []);
    
    return new User(
        user.id,
        user.username,
        user.password,
        user.avatarUrl,
        user.enabled,
        user.authorities
    );
}

export default useGetUserByName;