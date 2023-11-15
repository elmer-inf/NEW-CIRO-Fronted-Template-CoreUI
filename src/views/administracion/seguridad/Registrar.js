import { Fragment, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { postTablaDescripcionSeguridad } from './controller/AdminSeguridadController'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionSeguridadRegistrar = () => {

  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    nombre: '',
    tablaId: ''
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionSeguridad(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/seguridad/Listar");
        } else {
          console.error('Error: ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/seguridad/Listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/seguridad/Listar");
      })
  }

  return (
    <div>
      <CCSpinner show={spin} />
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
