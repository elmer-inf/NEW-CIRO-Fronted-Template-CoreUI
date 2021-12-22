import React, { useState, useEffect, Fragment } from 'react'

import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { getTablaListaOportunidad, postTablaDescripcionOportunidad } from './controller/AdminOportunidadController'
import { buildSelectTwo } from 'src/functions/Function'

const AdministracionMatrizOportunidadRegistrar = () => {

  const history = useHistory();
  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    tablaId: null,
    nivel2Id: null,
  }
  const optionsSelect = {
    opTabla: tablaListaOptions,
    opLebel2List: []

  }

  const handleOnSubmit = (dataToRequest) => {
    postTablaDescripcionOportunidad(dataToRequest)
      .then(response => {
        console.log('Envio el request : ', response);
        history.push("/administracion/matriz-oportunidad/listar")
      }).catch((error) => {
        console.log('Error al obtener datos: ', error)
      })
  }


  /* LISTA LAS TABLAS LISTA*/
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApi();
  }, [])


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
