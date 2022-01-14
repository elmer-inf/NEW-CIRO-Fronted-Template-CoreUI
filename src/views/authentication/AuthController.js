import axios from 'axios';
import { HOSTURI } from 'src/config';
import AuthService from './AuthService';

const HOST = HOSTURI.endpoint_riesgos;
const Auth = new AuthService();

const header = Auth.getHeaderWithOutToken();

export const postAuthentication = (data) => {
    const uri = HOST + 'v1/auth/authentication';
    return axios.post(uri, data, header);

}
