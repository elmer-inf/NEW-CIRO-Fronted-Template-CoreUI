import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getOportunidades = async () => {
    const uri = HOST.concat('v1/matrizOportunidad/listar')
    const response = await axios.get(uri)
    return response
}

export const postOportunidad = (data) => {
    const uri = HOST.concat('v1/matrizOportunidad/registrar')
    return axios.post(uri, data);
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

export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacionOportunidad/' + id;
    const response = await axios.get(uri);
    return response;
};
