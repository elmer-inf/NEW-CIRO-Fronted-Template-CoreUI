import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { getTablaListaEvento, postTablaDescripcionEvento } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionEventoRegistrar = () => {

  const [spin, setSpin] = useState(false);
  const [tablaListaOptions, setTablaListaOptions] = useState([]);
  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: [],
    tabla_n3: [],
  }

  const formValueInitial = {
    tablaLista: '',
    nombre: '',
    clave: '',
    descripcion: '',
    campoA: '',
    campoB: '',
    campoC: '',
    campoD: '',
    codigoAsfi: '',
    nivel2_id: '',
    nivel3_id: ''
  }

  const getTablaLista = async () => {
    await getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true);
        setTablaListaOptions(options);
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlert('error', Messages.no_ok, 3000);
      })
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionEvento(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/evento-riesgo/Listar");
        } else {
          console.error('Hubo un  error ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/evento-riesgo/Listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/evento-riesgo/Listar");
      })
  }

  useEffect(() => {
    getTablaLista();
  }, [])

  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Evento de Riesgo</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            <Formulario
              initialValuess={formValueInitial}
              optionToSelect={optionsToFormik}
              handleOnSubmit={handleOnSubmit}
              isEdit={false}
            />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionEventoRegistrar
