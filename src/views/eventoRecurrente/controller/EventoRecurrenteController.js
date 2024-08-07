import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';
const Auth = new AuthService();
const HOST = HOSTURI.endpoint_riesgos

// Eventos recurrentes Factor persona - Paginacion
export const getEventosRecurrentesPaging = async (page, size) => {
  const uri = HOST + 'v1/eventoRiesgo/eventosrecurrentes/' + page + '/' + size + '/id:desc';
  const response = await axios.get(uri);
  return response;
};

// Listado de Archivos de Evento recurrente by ID
export const getArchivosByEventoRecurrente = async (idEvento) => {
  const uri = HOST.concat('v1/archivoeverecurrente/listarArchivobyId/', idEvento)
  const response = await axios.get(uri)
  return response
}

// Editar con archivos
export const putEventoRecurrenteId = (id, data) => {
  const uri = HOST.concat('v1/eventoRiesgo/editarrecurrentewithfiles/' + id)
  const headerFormData = Auth.getHeaderFormData(data);
  return axios.post(uri, data, headerFormData);
}

