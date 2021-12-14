import axios from 'axios'
import { HOSTURI } from '../../../config'
//import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_ciro
//const Auth = new AuthService();
//const header = Auth.getHeader();

//console.log('new header: ', header)

// Lista Matrices de riesgo
export const getMatricesRiesgo = async () => {
    const uri = HOST.concat('v1/matrizRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

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

// Lista parametros Matriz Riesgo
export const getTablaDescripcionMatrizR = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizRiesgo/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

// Registra Matriz de riesgo
export const postMatrizRiesgo = (data) => {
    const uri = HOST.concat('v1/matrizRiesgo/registrar')
    return axios.post(uri, data);
}

// Mostrar Matriz de riesgo
export const getMatrizRiesgoId = async (id) => {
    const uri = HOST + 'v1/matrizRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};

// Evalua matriz de riesgo
export const putEvaluaRiesgo = (id, data) => {
    const uri = HOST + 'v1/matrizRiesgo/evaluaRiesgo/' + id;
    return axios.put(uri, data);
}


// MODIFICARRRRRRRRRRRR
export const getUltimaObservacion = async (id) => {
    const uri = HOST + 'v1/observacion/ultimaObservacion/' + id;
    const response = await axios.get(uri);
    return response;
};
