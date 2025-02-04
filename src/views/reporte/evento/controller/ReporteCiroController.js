import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos
const base = '/v1/reporte/ciro/';

export const generateAllReport = async (dataDates) => {
    const uri = HOST + base + '/allFiles';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportRiesgoOperativo = async (dataDates) => {
    const uri = HOST + base + '/riesgooperativoA';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportCuentasContables = async (dataDates) => {
    const uri = HOST + base + '/cuentascontablesB';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reporteTipoEvento = async (dataDates) => {
    const uri = HOST + base + '/tipoevebtoC';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportAtencionFinanciera = async (dataDates) => {
    const uri = HOST + base + '/atencionfinancieraD';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportCanal = async (dataDates) => {
    const uri = HOST + base + '/canalE';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportProceso = async (dataDates) => {
    const uri = HOST + base + '/procesoF';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportOpreacion = async (dataDates) => {
    const uri = HOST + base + '/operacionG';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportLugar = async (dataDates) => {
    const uri = HOST + base + '/lugarH';
    const response = await axios.post(uri, dataDates)
    return response
}

export const reportLineaNegocio = async (dataDates) => {
    const uri = HOST + base + '/lineanegocioI';
    const response = await axios.post(uri, dataDates)
    return response
}