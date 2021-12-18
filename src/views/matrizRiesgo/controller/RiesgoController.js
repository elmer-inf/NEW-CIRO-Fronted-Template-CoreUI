import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getRiesgos = async () => {
    const uri = HOST.concat('v1/matrizRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const postRiesgo = (data) => {
    const uri = HOST.concat('v1/matrizRiesgo/registrar')
    return axios.post(uri, data);
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

export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacionRiesgo/' + id;
    const response = await axios.get(uri);
    return response;
};