import axios from "axios";
var store = require('store');
const API_URL = "http://localhost:8080/api/"




class UserService {
    login(username, password) {
        
        axios.post(API_URL + "auth/login", {
            username: username,
            password: password
        })
        .then(function (response) {
            alert(response.data.token);
            store.set("user", {
                jwt: response.data.token,
                user: username
            });
            console.log(response);
        }).catch(function (error) {
            console.log(API_URL + "auth/login");
            console.log(error);
        })
    }
}

export default new UserService();