import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap'

import { useHistory } from 'react-router-dom'
import { getGroupByArea } from './controller/SeguridadController'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController'
import { getTablaDescripcionSeguridadN1 } from 'src/views/administracion/seguridad/controller/AdminSeguridadController'
import { buildSelectTwo } from 'src/functions/Function'

var _ = require('lodash');

const SeguridadListar = () => {

  const history = useHistory()

  const redirect = () => {
    history.push('/seguridad/Registrar')
  }

  //  P  A  R  A  M  E  T  R  O  S
  // Estado
 /*  const [dataApiEstado, setDataApiEstado] = useState([])
  const callApiEstado = (idTablaDes) => {
    getTablaDescripcionSeguridadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEstado(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Nivel Riesgo
  const [dataApiNivelRiesgo, setDataApiNivelRiesgo] = useState([])
  const callApiNivelRiesgo = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoB', false)
        setDataApiNivelRiesgo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiEstado(2);
    callApiNivelRiesgo(9);
  }, []) */
  // F  I  N     P  A  R  A  M  E  T  R  O  S


/*   const [dataApi, setDataApi] = useState([])

  const callApi = () => {
    getGroupByArea()
      .then(res => {
        console.log('result: ', res.data)
        setDataApi(res.data)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
    callApi()
  }, []) */



  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>Control de Riesgo en Seguridad</CardTitle>
              {/* <Button color='primary' onClick={redirect} className='float-right mt-1' style={{ width: '130px' }}>
                <span className='text-white'>Registrar</span>
              </Button> */}
            </CardHeader>
            <CardBody className='pb-4'>


            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default SeguridadListar
