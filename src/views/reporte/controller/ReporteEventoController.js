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

export const reporteAuditExtExcel = (dataFilter) => {
    const uri = HOST + base + '/auditextexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}

export const reporteAuditIntExcel = (dataFilter) => {
    const uri = HOST + base + '/auditintexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}

export const reporteAsfiExcel = (dataFilter) => {
    const uri = HOST + base + '/asfiexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}

export const reporteConfigEventoExcel = (dataFilter) => {
    const uri = HOST + base + '/eventoconfigexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}