import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getTablaListaEvento = async () => {
    const uri = HOST.concat('v1/tablaLista/listar')
    const response = await axios.get(uri)
    return response
}


export const getTablaDescripcionEventoN1 = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcion/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionEventoN2 = async (idTabla, idNivel2) => {
    const uri = HOST.concat('v1/tablaDescripcion/listarNivel2/',idTabla,'/', idNivel2);
    console.log('URIII  : ', uri)
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionEventoN3 = async (idTabla, idNivel2, idNivel3) => { 
    const uri = HOST.concat('v1/tablaDescripcion/listarNivel3/',idTabla,'/', idNivel2,'/', idNivel3);
    const response = await axios.get(uri)
    return response
}

 export const postTablaDescripcionEvento = (data) => {
    const uri = HOST.concat('v1/tablaDescripcion/registrar')
    return axios.post(uri, data);
}

 export const getTablaDescripcionEventoId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcion/mostrar2/' + id;
    const response = await axios.get(uri);
    return response;
};

export const putTablaDescripcionEventoId = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcion/editar/' + id;
    return axios.put(uri, data);
}
