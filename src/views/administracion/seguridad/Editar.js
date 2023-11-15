import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { putTablaDescripcionSeguridad, getTablaDescripcionSeguridadId } from './controller/AdminSeguridadController'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionSeguridadEditar = ({ match }) => {

  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    nombre: '',
    tablaId: null
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idTabDesc = match.params.id;
    putTablaDescripcionSeguridad(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/seguridad/Listar");
        } else {
          console.error('Hubo un  error ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/seguridad/Listar");
        }
      }).catch((error) => {
        console.error('Error al modificar Párametro de Seguridad: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/seguridad/Listar");
      });
  }

  const matched = (dataResponse) => {
    var nivel1 = { value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla }
    const valores = {
      nombre: dataResponse.nombre,
      tablaId: nivel1,
    }
    setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true)
    const idParametro = match.params.id;
    await getTablaDescripcionSeguridadId(idParametro)
      .then((response) => {
        const res = response.data;
        matched(res)
        setSpin(false)
      }).catch((error) => {
        setSpin(false);
        console.error("Error: ", error);    
        toastSweetAlert('error', Messages.no_ok, 3000);
      });
  }

  useEffect(() => {
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Seguridad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
                ? <div></div>
                : <Formulario
                  initialValuess={formValueToEdit}
                  handleOnSubmit={handleOnSubmit}
                />
            }
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionSeguridadEditar
