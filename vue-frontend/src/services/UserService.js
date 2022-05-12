import axios from "axios";
import NotificationService from "./NotificationService";
import User from "../models/User";

var store = require('store');
const API_URL = "http://localhost:8080/api/"

class UserService {
    login(username, password) {
        
        axios.post(API_URL + "auth/login", {
            username: username,
            password: password
        })
        .then(function (response) {
            NotificationService.sendSuccessNotification("Success", 3000);
            store.set("token", {
                jwt: response.data.token
            });
            window.location = window.location.href // Reload page without request
        }).catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })
    }

    createUser(username, password) {
        axios.post(API_URL + "user", {
            username: username,
            password: password
        })
        .then(function (response) {
            NotificationService.sendErrorNotification("Success", 3000);
        })
        .catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })
    }


   
    getUserInfo(jwt) {
        var bearer = 'Bearer' + " " + jwt; 
   
        axios.get(API_URL + "auth/userinfo", {
            headers: {
                Authorization: bearer
            }
        })
        .then((response) => {
            
        })
        .catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })

       
        
    }

    logout() {
        store.clearAll();
        window.location = window.location.href;
    }

       
}

export default new UserService();