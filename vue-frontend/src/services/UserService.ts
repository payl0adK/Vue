import axios from "axios";
import NotificationService from "./NotificationService";

var store = require('store');
const API_URL = "http://localhost:8080/api/"

class UserService {
    login(username: string, password: string) {
        
        axios.post(API_URL + "auth/login", {
            username: username,
            password: password
        })
        .then(function (response) {
            NotificationService.sendSuccessNotification("Success", 3000);
            store.set("token", {
                jwt: response.data.token
            });
            window.location.href = window.location.href // Reload page without request
        }).catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })
    }

    createUser(username: string, password: string) {
        axios.post(API_URL + "user", {
            username: username,
            password: password
        })
        .then(() => {
            NotificationService.sendSuccessNotification("Success", 3000);
        })
        .catch((error) => {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })
    }


   
    async getUserInfo(jwt: string) {
        var bearer = 'Bearer' + " " + jwt; 
   
        await axios.get(API_URL + "auth/userinfo", {
            headers: {
                Authorization: bearer
            }
        })
        .catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })

       
        
    }

    logout() {
        store.clearAll();
        window.location.href = window.location.href;
    }


    userIsAuthorized() {
        if (store.get('token') != null) {
            return true;
        } 
        return false;
    }

    userExists(name: string) {
        axios.get("http://localhost:8080/api/user/exists", {
            params: {
                username: name
            }
        })
        .catch(() => {
            return false;
        })

        return true;
    }
}

export default new UserService();