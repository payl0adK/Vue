

class User {
    id: BigInteger;
    username: string;
    password: string;

    constructor(id: BigInteger, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}