import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

const Auth = new AuthService();
//const header = Auth.getHeader();


const HOST = HOSTURI.endpoint_riesgos

const base = '/v1/reporte/ciro/';



export const reportRiesgoOperativo = async () => {
    const uri = HOST + base + '/riesgooperativoA';
    const response = await axios.get(uri)
    return response
}



export const reportCuentasContables = async () => {
    const uri = HOST + base + '/cuentascontablesB';
    const response = await axios.get(uri)
    return response
}


export const reporteTipoEvento = async () => {
    const uri = HOST + base + '/tipoevebtoC';
    const response = await axios.get(uri)
    return response
}

export const reportAtencionFinanciera = async () => {
    const uri = HOST + base + '/atencionfinancieraD';
    const response = await axios.get(uri)
    return response
}


export const reportCanal = async () => {
    const uri = HOST + base + '/canalE';
    const response = await axios.get(uri)
    return response
}


export const reportProceso = async () => {
    const uri = HOST + base + '/procesoF';
    const response = await axios.get(uri)
    return response
}


export const reportOpreacion = async () => {
    const uri = HOST + base + '/operacionG';
    const response = await axios.get(uri)
    return response
}


export const reportLugar = async () => {
    const uri = HOST + base + '/lugarH';
    const response = await axios.get(uri)
    return response
}


export const reportLineaNegocio = async () => {
    const uri = HOST + base + '/lineanegocioI';
    const response = await axios.get(uri)
    return response
}



