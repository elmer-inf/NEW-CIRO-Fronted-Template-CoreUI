import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporteriesgo/';
const Auth = new AuthService();
const headerByExcel = Auth.getHeaderByExcel();

export const getInherenteResidual1 = (fechaDesde, fechaHasta) => {
    const uri = `${HOST}${base}/mapainherenteresidual1?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
    const response = axios.get(uri);
    return response;
}

export const getInherenteResidual2 = (procesoId) => {
    const uri = HOST + base + '/mapainherenteresidual2?procesoId=' + procesoId;
    const response = axios.get(uri);
    return response;
}  



export const getInherente2ConRiesgos = (procesoId) => {
    const uri = HOST + base + '/mapainherente2conriesgos?procesoId=' + procesoId;
    const response = axios.get(uri);
    return response;
}  

export const getResidual2ConRiesgos = (procesoId) => {
    const uri = HOST + base + '/maparesidual2conriesgos?procesoId=' + procesoId;
    const response = axios.get(uri);
    return response;
}  

export const reporteConfigRiesgoExcel = (dataFilter) => {
    const uri = HOST + base + '/riesgoconfigexcel';
    return axios.post(uri, dataFilter, headerByExcel);
}

export const getReporteGerencial = (fechaDesde, fechaHasta) => {
    const uri = `${HOST}${base}/reportegerencial?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
    const response = axios.get(uri);
    return response;
}