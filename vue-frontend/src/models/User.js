

class User {
    id;
    username;
    authorities;

    constructor(username, authorities) {
        this.username = username;
        this.authorities = authorities;
    };
}

export default User;