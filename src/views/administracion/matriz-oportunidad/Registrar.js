import { Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postTablaDescripcionOportunidad } from './controller/AdminOportunidadController'

const AdministracionMatrizOportunidadRegistrar = () => {

  const history = useHistory()
  const formValueInitial = {
      campoA: '',
      nombre: '',
      campoB: '',
      campoC: '',
      campoD: '',
      tablaId: null,
      nivel2Id: null,
  }

  const handleOnSubmit = (dataToRequest) =>{
    postTablaDescripcionOportunidad(dataToRequest)
    .then(response => {
      console.log('Envio el request : ', response);
      history.push("/administracion/matriz-oportunidad/listar")
    }).catch((error) => {
      console.log('Error al obtener datos: ', error)
    })
  }

  return (
    <div id=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Matriz de oportunidad</CardTitle>
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
export default AdministracionMatrizOportunidadRegistrar
