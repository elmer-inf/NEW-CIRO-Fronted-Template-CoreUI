import { Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postListDescripcionMatrizR } from './controller/AdminMatrizRController'

const AdministracionMatrizRiesgosRegistrar = () => {

  const history = useHistory()
  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    campoE: '',
    campoF: '',
    campoG: '',
    tablaId: null
  }

  const handleOnSubmit = (dataToRequest) =>{
    postListDescripcionMatrizR(dataToRequest)
    .then(response => {
      console.log('Envio el request : ', response);
      history.push("/administracion/matriz-riesgo/listar")
    }).catch((error) => {
      console.log('Error al obtener datos: ', error)
    })
  }

  return (
    <div id=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Matriz de Riesgo</CardTitle>
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
export default AdministracionMatrizRiesgosRegistrar
