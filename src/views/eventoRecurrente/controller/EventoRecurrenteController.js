import axios from 'axios'
import { HOSTURI } from 'src/config'
import AuthService from 'src/views/authentication/AuthService';

//const Auth = new AuthService();
const HOST = HOSTURI.endpoint_riesgos

// Eventos recurrentes Factor persona - Paginacion
export const getEventosRecurrentesPaging = async (page, size) => {
  const uri = HOST + 'v1/eventoRiesgo/eventosrecurrentes/' + page + '/' + size + '/id:desc';
  const response = await axios.get(uri);
  return response;
};

