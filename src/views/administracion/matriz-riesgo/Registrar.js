import { Fragment, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { postTablaDescripcionRiesgo } from './controller/AdminRiesgoController'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionMatrizRiesgosRegistrar = () => {

  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    campoE: '',
    campoF: '',
    campoG: '',
    tablaId: ''
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionRiesgo(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/matriz-riesgo/listar");
        } else {
          console.error('Error; ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-riesgo/listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-riesgo/listar");
      })
  }

  return (
    <div>
      <CCSpinner show={spin} />
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
