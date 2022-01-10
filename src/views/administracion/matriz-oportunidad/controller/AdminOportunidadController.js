import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getTablaListaOportunidad = async () => {
    const uri = HOST.concat('v1/tablaListaMatrizOportunidad/listar')
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionOportunidadN1 = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizOportunidad/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionOportunidadN2 = async (idTabla, idNivel2) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizOportunidad/listarNivel2/',idTabla,'/', idNivel2);
    console.log('URIII  : ', uri)
    const response = await axios.get(uri)
    return response
}

export const postTablaDescripcionOportunidad = (data) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizOportunidad/registrar')
    return axios.post(uri, data);
}

export const putTablaDescripcionOportunidadId = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizOportunidad/editar/' + id;
    return axios.put(uri, data);
}

 export const getTablaDescripcionOportunidadId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizOportunidad/mostrar2/' + id;
    const response = await axios.get(uri);
    return response;
};

