import { Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postTablaDescripcionSeguridad } from './controller/AdminSeguridadController'

const AdministracionSeguridadRegistrar = () => {

  const history = useHistory()
  const formValueInitial = {
    nombre: '',
    tablaId: null
  }

  const handleOnSubmit = (dataToRequest) =>{
    postTablaDescripcionSeguridad(dataToRequest)
    .then(response => {
      console.log('Envio el request : ', response);
      history.push("/administracion/seguridad/listar")
    }).catch((error) => {
      console.log('Error al obtener datos: ', error)
    })
  }

  return (
    <div id=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Seguridad</CardTitle>
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
export default AdministracionSeguridadRegistrar
