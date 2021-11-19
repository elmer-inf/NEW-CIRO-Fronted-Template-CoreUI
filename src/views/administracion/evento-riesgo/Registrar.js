import { Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postListDescripcion } from './controller/AdminEventoController'

const AdministracionEventoRegistrar = () => {

  const history = useHistory()
  const formValueInitial = {
      tablaLista: null,
      nombre: '',
      clave: '',
      descripcion: '',
      nivel2_id: null,
      nivel3_id: null
  }

  const handleOnSubmit = (dataToRequest) =>{
    postListDescripcion(dataToRequest)
    .then(response => {
      console.log('Envio el request : ', response);
      history.push("/administracion/evento-riesgo/listar")
    }).catch((error) => {
      console.log('Error al obtener datos: ', error)
    })
  }

  return (
    <div id=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Evento de Riesgo</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            <Formulario
              initialValuess={formValueInitial}
              handleOnSubmit={handleOnSubmit}
            />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionEventoRegistrar
