import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_ciro

export const getTablaListaSeguridad = async () => {
    const uri = HOST.concat('v1/tablaListaSeguridad/listar')
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionSeguridadN1 = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcionSeguridad/listarNivel1/',idTabla)
    const response = await axios.get(uri)
    return response
}

export const postTablaDescripcionSeguridad = (data) => {
    const uri = HOST.concat('v1/tablaDescripcionSeguridad/registrar')
    return axios.post(uri, data);
}

export const putTablaDescripcionSeguridad = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcionSeguridad/editar/' + id;
    return axios.put(uri, data);
}

export const getTablaDescripcionSeguridadId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcionSeguridad/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
};