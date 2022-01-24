import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

const Auth = new AuthService();
//const header = Auth.getHeader();


const HOST = HOSTURI.endpoint_riesgos

export const getEventos = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const postEventoRiesgo = (data) => {
    const uri = HOST.concat('v1/eventoRiesgo/registrar')
    return axios.post(uri, data);
}

export const putEventoRiesgoId = (id, data) => {
    const uri = HOST + 'v1/eventoRiesgo/editar/' + id;
    return axios.put(uri, data);
}

export const postEventoRiesgoFormData = (data) => {
    const uri = HOST.concat('v1/eventoRiesgo/registrarwithfiles')
    const headerFormData = Auth.getHeaderFormData(data);
    return axios.post(uri, data, headerFormData);
}

export const putEvaluaEvento = (id, data) => {
    const uri = HOST + 'v1/eventoRiesgo/evaluaEvento/' + id;
    return axios.put(uri, data);
}

export const getGeneraCodigo = async (id) => {
    const uri = HOST + 'v1/eventoRiesgo/generaCodigo/' + id;
    const response = await axios.get(uri);
    return response;
}

export const getEventoRiesgoId = async (id) => {
    const uri = HOST + 'v1/eventoRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};

export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacionEvento/' + id;
    const response = await axios.get(uri);
    return response;
};

// Paginacion
export const getEventosPaging = async (page, size) => {
    const uri = HOST + 'v1/eventoRiesgo/' + page + '/' + size + '/id:desc';
    const response = await axios.get(uri);
    return response;
};

// 1ra Alerta / Notificacion - 10 dias antes
export const getDiezDiasAntes = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/diezDiasAntes');
    const response = await axios.get(uri);
    return response;
}

// 2da Alerta / Notificacion - 5 dias antes
export const getCincoDiasAntes = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/cincoDiasAntes');
    const response = await axios.get(uri);
    return response;
}

// 3ra Alerta / Notificacion - Plan vencido
export const getPlanVencido = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/planVencido');
    const response = await axios.get(uri);
    return response;
}

// Listado de Archivos de Evento ID
export const getArchivosByEvento = async (idEvento) => {
    const uri = HOST.concat('v1/archivo/listarArchivobyId/', idEvento)
    const response = await axios.get(uri)
    return response
}