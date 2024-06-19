import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Col, Label, Row, Form } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import CInputRadio from 'src/reusable/CInputRadio'
import _ from 'lodash';
import { Chart as ChartJS, registerables } from 'chart.js';
import MapaInherenteResidual2 from './components/MapaInherenteResidual2';
import MapaInherenteResidual1 from './components/MapaInherenteResidual1';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectThree } from 'src/functions/Function';
import { CSelectReact } from 'src/reusable/CSelectReact';
ChartJS.register(...registerables);

const ReporteRiesgo = () => {
  const [dataProceso, setDataProceso] = useState([]);
  const [filtroProcesoId, setFiltroProcesoId] = useState('');

  const getProceso = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', true);
        setDataProceso(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  const formValueInitial = {
    procesoId: ''
  }

  const optionRiesgo = [
    { value: 'inherente', label: 'Riesgo inherente' },
    { value: 'residual', label: 'Riesgo residual' }
  ]

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object({
      procesoId: Yup.mixed().nullable(),
    }),
    onSubmit: values => {}
  });

  useEffect(() => {
    getProceso(15);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (formik.values.procesoId && formik.values.procesoId.value) {
      setFiltroProcesoId(formik.values.procesoId.value);
    } else {
      setFiltroProcesoId('');
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);

  return (
    <div className='unique-table'>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Eventos de Riesgo</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit} autoComplete="off">
              <Row className='justify-content-center pt-4'>
                <Label className='text-label'>
                  Tipo de reporte
                </Label>
              </Row>
              <Row className='justify-content-center pt-4'>
                <Col xs='12' md='5' className=''>
                  <CInputRadio
                    data={optionRiesgo}
                    id={'tipo'}
                    value={formik.values.tipo}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    touched={formik.touched.tipo}
                    errors={formik.errors.tipo}
                    sendValue={true}
                    column={2}
                  />
                </Col>
              </Row>

              <div className='divider divider-left'>
                <div className='divider-text'><span className='text-label h5'>PERFIL DE RIESGO</span></div>
              </div>
              <MapaInherenteResidual1 />

              <div className='divider divider-left pt-4'>
                <div className='divider-text'><span className='text-label h5'>MAPA DE RIESGO ATC</span></div>
              </div>
              <Row className='justify-content-center'>
                <Col xs='12' md='4' xl='2'>
                  <Label className='form-label'>Seleccionar Macroproceso:</Label>
                </Col>
                <Col xs='12' md='7' xl='4'>
                  <CSelectReact
                    type={"select"}
                    id={'procesoId'}
                    placeholder={''}
                    value={formik.values.procesoId}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    error={formik.errors.procesoId}
                    touched={formik.touched.procesoId}
                    options={dataProceso}
                  />
                </Col>
              </Row>
            </Form>

            <MapaInherenteResidual2 procesoId={filtroProcesoId} />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteRiesgo
