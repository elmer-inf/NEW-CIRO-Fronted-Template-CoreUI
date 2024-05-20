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
    const uri = HOST + 'v1/eventoRiesgo/editarwithfiles/' + id;
    const headerFormData = Auth.getHeaderFormData(data);
    return axios.put(uri, data, headerFormData);
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


// Listado de Archivos de Evento ID
export const getArchivosByEvento = async (idEvento) => {
    const uri = HOST.concat('v1/archivo/listarArchivobyId/', idEvento)
    const response = await axios.get(uri)
    return response
}

// Eliminacion logica de Evento por ID
export const deleteEventoRiesgoId = (id) => {
    const uri = HOST + 'v1/eventoRiesgo/eliminar/' + id;
    return axios.put(uri, {});
}

// Eliminacion logica de Archivo por ID
export const deleteArchivoId = (id) => {
    const uri = HOST + 'v1/archivo/eliminar/' + id;
    return axios.put(uri, {});
}

