import axios from 'axios'
import { HOSTURI } from 'src/config'

const HOST = HOSTURI.endpoint_riesgos

export const getTablaListaRiesgo = async () => {
    const uri = HOST.concat('v1/tablaListaMatrizRiesgo/listar')
    const response = await axios.get(uri)
    return response
}

export const getTablaDescripcionRiesgoN1 = async (idTabla) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizRiesgo/listarNivel1/', idTabla)
    const response = await axios.get(uri)
    return response
}

export const postTablaDescripcionRiesgo = (data) => {
    const uri = HOST.concat('v1/tablaDescripcionMatrizRiesgo/registrar')
    return axios.post(uri, data);
}

export const putTablaDescripcionRiesgo = (id, data) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizRiesgo/editar/' + id;
    return axios.put(uri, data);
}

export const getTablaDescripcionRiesgoId = async (id) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizRiesgo/mostrar/' + id;
    const response = await axios.get(uri);
    return response;
}

export const deleteTablaDescripcionRiesgoId = (id) => {
    const uri = HOST + 'v1/tablaDescripcionMatrizRiesgo/eliminar/' + id;
    return axios.delete(uri);
}