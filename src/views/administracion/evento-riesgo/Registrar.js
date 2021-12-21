import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { getTablaListaEvento, postTablaDescripcionEvento } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'

const AdministracionEventoRegistrar = () => {
  const history = useHistory()
  const formValueInitial = {
    tablaLista: null,
    nombre: '',
    clave: '',
    descripcion: '',
    campoA: '',
    campoB: '',
    campoC: '',
    campoD: '',
    nivel2_id: null,
    nivel3_id: null
  }


  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: [],
    tabla_n3: [],
  }
  const getTablaLista = async () => {
    await getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true)
        console.log('El response de tablaaaaa: ', res.data)
        //console.log('options : ', options)
        setTablaListaOptions(options)
      }).catch((error) => {
        //console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  const handleOnSubmit = (dataToRequest) => {
    postTablaDescripcionEvento(dataToRequest)
      .then(response => {
        console.log('Envio el request : ', response);
        history.push('/administracion/evento-riesgo/listar')
      }).catch((error) => {
        console.log('Error al obtener datos: ', error)
      })
  }
  useEffect(() => {
    getTablaLista();
  }, [])

  return (
    <div id=''>
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
