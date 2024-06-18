import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporteriesgo/';

export const getInherente = () => {
    const uri = HOST + base + '/mapainherente1';
    const response = axios.get(uri);
    return response;
}

export const getInherente2 = () => {
    const uri = HOST + base + '/mapainherente2';
    const response = axios.get(uri);
    return response;
}