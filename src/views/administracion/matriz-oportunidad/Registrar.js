import React, { useState, useEffect, Fragment } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { getTablaListaOportunidad, postTablaDescripcionOportunidad } from './controller/AdminOportunidadController'
import { buildSelectTwo } from 'src/functions/Function'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionMatrizOportunidadRegistrar = () => {

  const [spin, setSpin] = useState(false);
  const [tablaListaOptions, setTablaListaOptions] = useState([]);

  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    tablaId: '',
    nivel2Id: '',
  }
  const optionsSelect = {
    opTabla: tablaListaOptions,
    opLebel2List: []
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionOportunidad(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/matriz-oportunidad/Listar");
        } else {
          console.error('Error: ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-oportunidad/Listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-oportunidad/Listar");
      })
  }

  /* LISTA LAS TABLAS LISTA*/
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true);
        setTablaListaOptions(options);
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlert('error', Messages.no_ok, 3000);
      })
  }

  useEffect(() => {
    callApi();
  }, [])


  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Matriz de Oportunidad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            <Formulario
              initialValuess={formValueInitial}
              optionsList={optionsSelect}
              handleOnSubmit={handleOnSubmit}
              isEdit={false}
            />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionMatrizOportunidadRegistrar
