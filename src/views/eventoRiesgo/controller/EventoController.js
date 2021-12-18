import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getEventos = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const postEventoRiesgo = (data) => {
    const uri = HOST.concat('v1/eventoRiesgo/registrar')
    return axios.post(uri, data);
}

export const putEvaluaEvento = (id, data) => {
    const uri = HOST + 'v1/eventoRiesgo/evaluaEvento/' + id;
    return axios.put(uri, data);
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