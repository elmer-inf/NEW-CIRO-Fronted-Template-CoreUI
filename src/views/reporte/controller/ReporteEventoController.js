import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporteevento/';
const Auth = new AuthService();
const headerByExcel = Auth.getHeaderByExcel();

export const reporteEvento = async (dataFilter) => {
    const uri = HOST + base + '/evento';
    const response = await axios.post(uri, dataFilter);
    return response;
}

export const reporteEventoExcel = (dataFilter) => {
    const uri = HOST + base + '/eventoexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}