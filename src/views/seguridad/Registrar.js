import { Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postSeguridad } from './controller/SeguridadController'

const SeguridadRegistrar = () => {

  const history = useHistory()
  const formValueInitial = {
    fechaRegistro: '',
    ipUrl: '',
    activoInformacion: '',
    red: '',
    descripcionRiesgo: '',
    recomendacion: '',
    fechaSolucion: '',
    fechaLimite: '',
    planTrabajo: '',
    informeEmitido: '',
    ciSeguimiento: '',
    comentario: '',

    tipoActivoId: null,
    estadoId: null,
    nivelRiesgoId: null,
    areaId: null
  }

  const handleOnSubmit = (dataToRequest) =>{
    postSeguridad(dataToRequest)
    .then(response => {
      console.log('Envio el request : ', response);
      history.push("/seguridad/Listar")
    }).catch((error) => {
      console.log('Error al obtener datos: ', error)
    })
  }

  return (
    <div>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Riesgo en Seguridad</CardTitle>
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
export default SeguridadRegistrar
