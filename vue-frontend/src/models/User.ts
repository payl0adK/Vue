import Authority from "./Authority";

export default class User {
    private _id: number;
    private _username: string;
    private _password: string;
    private _avatarUrl: string;
    private _enabled: boolean;
    private _authorities: Array<Authority>;

    constructor(
        id: number, 
        username: string, 
        password: string, 
        avatarUrl: string, 
        enabled: boolean, 
        authorities: Array<Authority>) {

        this._id = id;
        this._username = username;
        this._password = password;
        this._avatarUrl = avatarUrl;
        this._enabled = enabled;
        this._authorities = authorities;
    }

    public get id() {
        return this._id;
    }

    public get username() {
        return this._username;
    }

    public get password() {
        return this._password;
    }

    public get avatarUrl() {
        return this._avatarUrl;
    }

    public get enabled() {
        return this._enabled;
    }

    public get authorities() {
        return this._authorities;
    }

}