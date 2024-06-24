import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporteriesgo/';

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