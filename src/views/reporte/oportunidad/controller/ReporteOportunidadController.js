import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporteoportunidad/';
const Auth = new AuthService();
const headerByExcel = Auth.getHeaderByExcel();

export const reporteConfigOportunidadExcel = (dataFilter) => {
  const uri = HOST + base + '/oportunidadconfigexcel';
  return axios.post(uri, dataFilter, headerByExcel);
}

export const getInherente = (procesoId) => {
  const uri = HOST + base + 'mapainherente?procesoId=' + procesoId;
  const response = axios.get(uri);
  return response;
}  

export const getInherenteConOportunidades = (procesoId) => {
  const uri = HOST + base + 'mapainherenteconoportunidades?procesoId=' + procesoId;
  const response = axios.get(uri);
  return response;
}  