import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Col, Label, Row, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { Chart as ChartJS, registerables } from 'chart.js';
import MapaInherenteResidual2 from './components/MapaInherenteResidual2';
import MapaInherenteResidual1 from './components/MapaInherenteResidual1';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectThree } from 'src/functions/Function';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages'
import { CInputReact } from 'src/reusable/CInputReact';
import { BarChart2 } from 'react-feather';
ChartJS.register(...registerables);

const ReporteRiesgo = () => {

  const today = new Date();
  const [dataProceso, setDataProceso] = useState([]);
  const [filtroProcesoId, setFiltroProcesoId] = useState('');
  const [showMapa1, setShowMapa1] = useState(false);
  const [filtroFechas, setFiltroFechas] = useState({
    fechaDesde: '',
    fechaHasta: ''
  });

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
    fechaDesde: '',
    fechaHasta: '',
    procesoId: ''
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object({
      procesoId: Yup.mixed().nullable(),
      fechaDesde: Yup.date().required(Messages.required),
      fechaHasta: Yup.date().min(Yup.ref('fechaDesde'), Messages.dateValidation1).max(today, Messages.dateValidation3).required(Messages.required),
    }),
    onSubmit: values => {
      setFiltroFechas({
        fechaDesde: values.fechaDesde,
        fechaHasta: values.fechaHasta
      });
      setShowMapa1(true);
    }
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

  console.log('formik.values.procesoId: ', formik.values.procesoId);

  return (
    <div className='unique-table'>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Eventos de Riesgo</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit} autoComplete="off">

              <div className='divider divider-left'>
                <div className='divider-text'><span className='text-label h5'>PERFIL DE RIESGO</span></div>
              </div>
              <Row className='justify-content-center align-self-center pb-4'>
                <Col xs='4' md='3' lg='2'>
                  <Label className='form-label'>
                    Fecha Desde <span className='text-primary h5'><b>*</b></span>
                  </Label>
                </Col>
                <Col xs='8' md='3' lg='3'>
                  <CInputReact
                    type={"date"}
                    id={'fechaDesde'}
                    placeholder={'Fecha desde'}
                    value={formik.values.fechaDesde}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.fechaDesde}
                    errors={formik.errors.fechaDesde}
                  />
                </Col>

                <Col xs='4' md='3' lg='2'>
                  <Label className='form-label'>
                    Fecha Hasta <span className='text-primary h5'><b>*</b></span>
                  </Label>
                </Col>
                <Col xs='8' md='3' lg='3'>
                  <CInputReact
                    type={"date"}
                    id={'fechaHasta'}
                    placeholder={'Fecha hasta'}
                    value={formik.values.fechaHasta}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.fechaHasta}
                    errors={formik.errors.fechaHasta}
                  />
                </Col>

                <Col xs='6' md='6' lg='2'>
                  <Button
                    className='text-white'
                    block
                    color="primary"
                    type="submit"
                  >
                    <BarChart2 size={17} className='mr-2' />
                    Generar
                  </Button>
                </Col>
              </Row>

              {
                showMapa1 ?
                  <MapaInherenteResidual1 fechaDesde={filtroFechas.fechaDesde} fechaHasta={filtroFechas.fechaHasta} />
                  : null
              }

              <div className='divider divider-left pt-4'>
                <div className='divider-text'><span className='text-label h5'>MAPA DE RIESGO ATC</span></div>
              </div>
              <Row className='justify-content-center'>
                <Col xs='12' md='4' xl='2'>
                  <Label className='form-label'>Macroproceso:</Label>
                </Col>
                <Col xs='12' md='7' xl='6'>
                  <CSelectReact
                    type={"select"}
                    id={'procesoId'}
                    placeholder={'Seleccionar'}
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
