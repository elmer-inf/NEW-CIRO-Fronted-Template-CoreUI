import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos

export const getRiesgos = async () => {
    const uri = HOST.concat('v1/matrizRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const postRiesgo = (data) => {
    const uri = HOST.concat('v1/matrizRiesgo/registrar')
    return axios.post(uri, data);
}

export const putRiesgoId = (id, data) => {
    const uri = HOST + 'v1/matrizRiesgo/editar/' + id;
    return axios.put(uri, data);
}

export const getRiesgoId = async (id) => {
    const uri = HOST + 'v1/matrizRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
}

export const putEvaluaRiesgo = (id, data) => {
    const uri = HOST + 'v1/matrizRiesgo/evaluaRiesgo/' + id;
    return axios.put(uri, data);
}

export const getGeneraCodigo = async (id) => {
    const uri = HOST + 'v1/matrizRiesgo/generaCodigo/' + id;
    const response = await axios.get(uri);
    return response;
}

export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacionRiesgo/' + id;
    const response = await axios.get(uri);
    return response;
};


// Paginacion
export const getMatrizPaging = async (page, size) => {
    const uri = HOST + 'v1/matrizRiesgo/' + page + '/' + size + '/id:desc';
    const response = await axios.get(uri);
    return response;
};


// Eliminacion logica de Riesgo por ID
export const deleteRiesgoId = (id) => {
    const uri = HOST + 'v1/matrizRiesgo/eliminar/' + id;
    return axios.put(uri, {});
}

// Lista de Riesgos por IDs
export const postListRiesgosByIds = (filter) => {
    const uri = HOST.concat('v1/matrizRiesgo/listbyids')
    return axios.post(uri, filter);
}


// NOTIFICACIONES
// Planes 10 dias antes de vencer
export const getPlanesDiezDiasVencer = () => {
    const uri = HOST.concat('v1/matrizRiesgo/planesdiezavencer');
    const response = axios.get(uri);
    return response;
}

// Planes 5 dias antes de vencer
export const getPlanesCincoDiasVencer = () => {
    const uri = HOST.concat('v1/matrizRiesgo/planescincoavencer');
    const response = axios.get(uri);
    return response;
}



// Planes vencidos
export const getPlanesVencidos = () => {
    const uri = HOST.concat('v1/matrizRiesgo/planesvencidos');
    const response = axios.get(uri);
    return response;
}