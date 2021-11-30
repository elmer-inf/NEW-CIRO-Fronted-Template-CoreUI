import axios from 'axios'
import { HOSTURI } from '../../../config'
//import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_ciro
//const Auth = new AuthService();
//const header = Auth.getHeader();

//console.log('new header: ', header)

export const getEventos = async () => {
    const uri = HOST.concat('v1/eventoRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const getEventosPaging = async (page, size) => {
    const uri = HOST + 'v1/eventoRiesgo/' + page + '/' + size + '/id:desc';
    const response = await axios.get(uri);

    return response;

};


export const getTablaDescripcionNivel = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcion/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionNivel2 = async (idTabla, idNivel2) => {

    const uri = HOST.concat('v1/tablaDescripcion/listarNivel2/',idTabla,'/', idNivel2);
    //console.log('URIII xxxxxxxx  : ', uri)
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionNivel3 = async (idTabla, idNivel2, idNivel3) => { 

    const uri = HOST.concat('v1/tablaDescripcion/listarNivel3/',idTabla,'/', idNivel2,'/', idNivel3);
    //console.log('URIII xxxxxxxx  : ', uri)
    const response = await axios.get(uri)
    return response
}

export const postListDescripcion = (data) => {
    const uri = HOST.concat('v1/tablaDescripcion/registrar')
    return axios.post(uri, data);
}

 export const getTablaDescripcionId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcion/mostrar2/' + id;
    const response = await axios.get(uri);
    return response;
};

export const editTablaDescripcion = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcion/editar/' + id;
    return axios.put(uri, data);
}

// Registra evento
export const postEventoRiesgo = (data) => {
    const uri = HOST.concat('v1/eventoRiesgo/registrar')
    return axios.post(uri, data);
}

// Evalua evento
export const putEvaluaEvento = (id, data) => {
    const uri = HOST + 'v1/eventoRiesgo/evaluaEvento/' + id;
    return axios.put(uri, data);
}

// Mostrar evento
export const getEventoRiesgoId = async (id) => {
    const uri = HOST + 'v1/eventoRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};

// Ultima observacion de evento
export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacion/' + id;
    const response = await axios.get(uri);
    return response;
};

