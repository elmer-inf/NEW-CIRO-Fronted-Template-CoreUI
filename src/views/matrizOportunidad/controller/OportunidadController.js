import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos

export const getOportunidades = async () => {
    const uri = HOST.concat('v1/matrizOportunidad/listar')
    const response = await axios.get(uri)
    return response
}

export const postOportunidad = (data) => {
    const uri = HOST.concat('v1/matrizOportunidad/registrar')
    return axios.post(uri, data);
}

export const putOportunidadId = (id, data) => {
    const uri = HOST + 'v1/matrizOportunidad/editar/' + id;
    return axios.put(uri, data);
}

export const getOportunidadId = async (id) => {
    const uri = HOST + 'v1/matrizOportunidad/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};

export const putEvaluaOportunidad = (id, data) => {
    const uri = HOST + 'v1/matrizOportunidad/evaluaOportunidad/' + id;
    return axios.put(uri, data);
}

export const getGeneraCodigo = async (id) => {
    const uri = HOST + 'v1/matrizOportunidad/generaCodigo/' + id;
    const response = await axios.get(uri);
    return response;
}

export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacionOportunidad/' + id;
    const response = await axios.get(uri);
    return response;
};
// Paginacion
export const getOportunidadPaging = async (page, size) => {
    const uri = HOST + 'v1/matrizOportunidad/' + page + '/' + size + '/id:desc';
    const response = await axios.get(uri);
    return response;
};