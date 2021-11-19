import axios from 'axios'
import { HOSTURI } from '../../../../config'
//import AuthService from 'src/views/authentication/AuthService';

const HOST = HOSTURI.endpoint_ciro
//const Auth = new AuthService();
//const header = Auth.getHeader();

//console.log('new header: ', header)

export const getTablaLista = async () => { 
    const uri = HOST.concat('v1/tablaLista/listar')
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
    console.log('URIII  : ', uri)
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
