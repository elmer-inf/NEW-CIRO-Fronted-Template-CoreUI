import axios from 'axios'
import { HOSTURI } from '../../../../config'
//import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_ciro
//const Auth = new AuthService();
//const header = Auth.getHeader();

//console.log('new header: ', header)

export const getTablaListaMatrizR = async () => { 
    const uri = HOST.concat('v1/tablaListaMatrizRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionMatrizR = async (idTabla) => { 
    const uri = HOST.concat('v1/tablaDescripcionMatrizRiesgo/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

export const postListDescripcionMatrizR = (data) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizRiesgo/registrar')
    return axios.post(uri, data);
}

export const editTablaDescripcionMatrizR = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizRiesgo/editar/' + id;
    return axios.put(uri, data);
}

export const getTablaDescripcioMatrizId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};

/*
export const getTablaDescripcionNivel2 = async (idTabla, idNivel2) => { 
    const uri = HOST.concat('v1/tablaDescripcion/listarNivel2/',idTabla,'/', idNivel2);
    console.log('URIII  : ', uri)
    const response = await axios.get(uri)
    return response
}
  */