import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { putTablaDescripcionRiesgo, getTablaDescripcionRiesgoId } from './controller/AdminRiesgoController'
import { Messages } from 'src/reusable/variables/Messages'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'

const AdministracionMatrizRiesgoEditar = ({ match }) => {

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

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idTabDesc = match.params.id;
    putTablaDescripcionRiesgo(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/matriz-riesgo/listar");
        } else {
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-riesgo/listar");
        }
      }).catch((error) => {
        console.error('Error al modificar Párametro de Matriz de Riesgo: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-riesgo/listar");
      });
  }

  const matched = (dataResponse) => {
    var nivel1 = { value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla }
    const valores = {
      campoA: dataResponse.campoA,
      nombre: dataResponse.nombre,
      campoB: dataResponse.campoB,
      campoC: dataResponse.campoC,
      campoD: dataResponse.campoD,
      campoE: dataResponse.campoE,
      campoF: dataResponse.campoF,
      campoG: dataResponse.campoG,

      tablaId: nivel1,
    }
    setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true);
    const idParametro = match.params.id;
    await getTablaDescripcionRiesgoId(idParametro)
      .then((response) => {
        const res = response.data;
        matched(res);
        setSpin(false);
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
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Matriz de Riesgo</CardTitle>
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
export default AdministracionMatrizRiesgoEditar
