import jwt_decode from 'jwt-decode';
//var CryptoJS = require("crypto-js");

import { HOSTURI } from 'src/config';

const sistema = HOSTURI.sis;


export default class AuthService {
    constructor(domain) {
        this.state = {
        };

        //this.fetch = this.fetch.bind(this);
        //this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = jwt_decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        window.localStorage.setItem('sired_access', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        var token = window.localStorage.getItem('sired_access');
        return (token !== null && token !== undefined) ? token : null;

    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('sired_access');
    }

    getProfile() {
        return jwt_decode(this.getToken());
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
    getHeader() {
        const token = this.getToken();
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'sistema':sistema
            }
        }

        return header;
    }
    getHeaderWithOutToken() {
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'sistema':sistema
            }
        }

        return header;
    }

}