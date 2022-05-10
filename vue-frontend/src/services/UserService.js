import axios from "axios";
import NotificationService from "./NotificationService";

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
            store.set("user", {
                jwt: response.data.token,
                user: username
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
        .then(function (response) {})
        .catch(function (error) {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        })
        this.login(username, password);
    }


    logout() {
        store.clearAll();
        window.location = window.location.href;
    }
}

export default new UserService();