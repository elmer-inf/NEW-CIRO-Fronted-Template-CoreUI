import axios from 'axios';
import { HOSTURI } from 'src/config';
//import AuthService from 'src/views/authentication/AuthService';


const HOST = HOSTURI.endpoint_ciro;
//const Auth = new AuthService();

//const header = Auth.getHeader();

export const getListPagingWithSearch = async (page, size,endpoint, search) => {
    const uri = HOST + endpoint + page + '/' + size + '/id:desc?' + search;
    const response = await axios.get(uri);

    return response;

};