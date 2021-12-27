import axios from 'axios';
import { HOSTURI } from 'src/config';
import AuthService from 'src/views/authentication/AuthService';
//import AuthService from 'src/views/authentication/AuthService';


const HOST = HOSTURI.endpoint_ciro;
const Auth = new AuthService();

const header = Auth.getHeader();

export const getListPagingWithSearch = async (page, size,endpoint, search) => {
    const uri = HOST + endpoint + page + '/' + size + '/id:desc?' + search;
    console.log('endpoint:: ' ,  uri);
    const response = await axios.get(uri);

    return response;

};


// Get Menus

export const getMenuToNavigate = async () => {
    // const uri = HOST + 'menus';
     const uri = HOST + 'v1/auth/menu/ui';
     const response = await axios.get(uri, header);
 
     return response;
 };
 
 export const getMenuPath = async () => {
    // const uri = HOST + 'menus/path';
     const uri = HOST + 'v1/auth/menu/path';
     const response = await axios.get(uri, header);
 
     return response;
 };