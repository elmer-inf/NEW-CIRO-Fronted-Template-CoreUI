import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos

export const getSeguridad = async () => {
    const uri = HOST.concat('v1/seguridad/listar')
    const response = await axios.get(uri)
    return response
}

export const postSeguridad = (data) => {
    const uri = HOST.concat('v1/seguridad/registrar')
    return axios.post(uri, data);
}

export const getSeguridadId = async (id) => {
    const uri = HOST + 'v1/seguridad/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
}


export const putSeguridadId = (id, data) => {
    const uri = HOST + 'v1/seguridad/editar/' + id;
    return axios.put(uri, data);
}

export const getGroupByArea = async () => {
    const uri = HOST.concat('v1/seguridad/agrupaPorArea')
    const response = await axios.get(uri)
    return response
}

// Paginacion
export const getListSeguridadPaging = async (page, size) => {
    const uri = HOST + 'v1/seguridad/' + page + '/' + size + '/id:desc';
    const response = await axios.get(uri);
    return response;
};