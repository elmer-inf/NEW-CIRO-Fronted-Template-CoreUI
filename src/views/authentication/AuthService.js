import jwt_decode from 'jwt-decode';
//var CryptoJS = require("crypto-js");
import { HOSTURI } from 'src/config';

const https = require('https');
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
    window.localStorage.setItem('riesgos_access', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    var token = window.localStorage.getItem('riesgos_access');
    return (token !== null && token !== undefined) ? token : null;
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('riesgos_access');
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
        'sistema': sistema
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }

    return header;
  }

  getHeaderWithOutToken() {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        'sistema': sistema
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }

    return header;
  }

  getHeaderFormData(dataHeader) {
    //const token = this.getToken();
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiI0ZGM2ZmFjOS1jMTk4LTQxZjAtYTZkNy0zYTBiYTQ4ZmMxOTQiLCJhdXRob3JpdGllcyI6eyJpZCI6IjRkYzZmYWM5LWMxOTgtNDFmMC1hNmQ3LTNhMGJhNDhmYzE5NCIsInVzZXJuYW1lIjoiQ29icmFuemEiLCJ0b2tlbiI6IjRkYzZmYWM5LWMxOTgtNDFmMC1hNmQ3LTNhMGJhNDhmYzE5NCJ9LCJzdWIiOiJDb2JyYW56YSIsImlhdCI6MTYzNjY3MDk3NSwiZXhwIjoxNjM2NzU3Mzc1fQ.Q0zgncqMb3jwJk3Vv7kkQIEyQchMwizdqLSCYxcSIocicp6eEKILxHdq5xnxUB3wW-ogj5JDgVsxAm2bXvLTqQ';
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
        //    'Authorization': 'Bearer ' + token,
        'sistema': sistema
      },
      // data: dataHeader
    }
    return header;
  }

}