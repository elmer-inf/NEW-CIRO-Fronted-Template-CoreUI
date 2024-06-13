import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Col, Label, Row, Form } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { Messages } from 'src/reusable/variables/Messages';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import CInputRadio from 'src/reusable/CInputRadio'
import BootstrapTable from 'react-bootstrap-table-next';
import { getInherente } from './controller/ReporteRiesgoController';
import _ from 'lodash';

const ReporteRiesgo = () => {

  const [dataMacroprocesos, setMacroprocesos] = useState([]);

  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    tipo: null,
    anio: '',
    trimestre: null,

    fechaDesde: '',
    fechaHasta: '',
    estadoEvento: null,
  }

  const optionRiesgo = [
    { value: 'inherente', label: 'Riesgo inherente' },
    { value: 'residual', label: 'Riesgo residual' }
  ]

  const columnStyles = {
    fontSize: '11px',
    verticalAlign: 'middle',
    alignItems: 'center',
    //whiteSpace: 'nowrap', 
  };

  const columnsValoracion = [
    {
      dataField: 'nro',
      text: 'N°',
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'codigo',
      text: 'Código',
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'macroproceso',
      text: 'Macroproceso',
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'prob',
      text: 'Prob',
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'probabilidad',
      text: 'Valoración de probabilidad',
      headerFormatter: () => { return (<div>Valoración de <br />probabilidad</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles,
    }, {
      dataField: 'factorProbabilidad',
      text: 'Factor de probabilidad',
      headerFormatter: () => { return (<div>Factor de <br />probabilidad</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'probabilidadDesc',
      text: 'Probabilidad',
      formatter: probabilidadFormatter,
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'impactoPor',
      text: 'Impacto por cada vez que ocurre el evento (USD)',
      headerFormatter: () => { return (<div>Impacto por cada <br/>vez que ocurre <br/>el evento (USD)</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'impacto',
      text: 'Impacto',
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'impactoDesc',
      text: 'Valoración de impacto',
      headerFormatter: () => { return (<div>Valoración <br/>de impacto</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'montoRiesgo',
      text: 'Monto Riesgo de pérdida (Anual)',
      headerFormatter: () => { return (<div>Monto Riesgo <br />de pérdida <br/>(Anual)</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'valoracionRiesgo',
      text: 'Valoración Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Valoración <br/>Riesgo (Matriz <br/>de Riesgo)</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }, {
      dataField: 'riesgo',
      text: 'Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Riesgo <br />(Matriz <br/>de Riesgo)</div>) },
      headerStyle: () => columnStyles,
      style: () => columnStyles
    }
  ]

  function probabilidadFormatter(cell, row) {

    let backgroundColor;
    switch (cell) {
      case 'Baja':
        backgroundColor = '#808080';
        break;
      case 'Media Baja':
        backgroundColor = '#FFFF66';
        break;
      case 'Media':
        backgroundColor = '#FFD685';
        break;
      case 'Media Alta':
        backgroundColor = '#FAC8C1';
        break;
      case 'Alta':
        backgroundColor = '#FF7F7E';
        break;
      default:
        backgroundColor = 'transparent';
    }

    return (
      <div style={{
        backgroundColor,
        display: 'block',
        width: 'calc(100% + 10px)',
        marginLeft: '-5px',
        height: 'auto',
      }}>
        <div style={{ marginLeft: '5px', marginRight: '5px' }}>{cell}</div>
      </div>
    );
  };


  /*  const getMacroprocesos = () => {
     getTablaDescripcionEventoN1(15)
       .then(res => {
         let filteredAndSorted = _.chain(res.data)
                                   .filter(item => item.clave !== null && item.clave !== "")
                                   .sortBy('clave')
                                   .value();
         
         filteredAndSorted = filteredAndSorted.map((item, index) => ({
           ...item,
           numero: index + 1
         }));
         setMacroprocesos(filteredAndSorted);
         console.log('res.data: ', filteredAndSorted);
       }).catch((error) => {
         console.error('Error: ', error);
       })
 } */

  const getMapaInherente = () => {
    getInherente()
      .then(res => {
        setMacroprocesos(res.data.valoracionesExposicion);
        console.log('res.data.valoracionesExposicion: ', res.data.valoracionesExposicion);
      }).catch((error) => {
        console.error('Error: ', error);
      })
  }

  useEffect(() => {
    getMapaInherente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        // Campos para el reporte CIRO
        tipo: Yup.mixed().nullable().required(Messages.required),

        // Campos para reporte de Auditoría, ASFI y Configurable Evento
        fechaDesde: Yup.date().nullable().required(Messages.required),

        fechaHasta: Yup.mixed().when('tipo', {
          is: (val) => val !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi', 'configurar'].includes(val.value),
          then: Yup.date()
            .min(Yup.ref('fechaDesde'), Messages.dateValidation1)
            //.max(today, Messages.dateValidation3)
            .nullable()
            .required(Messages.required),
          otherwise: Yup.date().nullable(), // No obligatorio para otros tipos
        }),
        // Campo para "estadoEvento" para tipo "evento"
        estadoEvento: Yup.mixed().when('tipo', {
          is: (val) => (val !== null && val.value === 'evento'),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
      }
    ),
    onSubmit: values => {

    }
  });

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.tipo]);


  return (
    <div className='unique-table'>
      <CCSpinner show={spin} />
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

              <BootstrapTable
                classes="unique-table"
                bootstrap4={true}
                sort={{ dataField: 'nro', order: 'asc' }}
                noDataIndication={'No se encontraron resultados'}
                keyField='nro'
                data={dataMacroprocesos}
                columns={columnsValoracion}
                bordered={false}
                striped={false}
                hover={false}
                condensed={false}
                wrapperClasses="table-responsive"
              />

              {/* {
                (formik.values.tipo !== null && formik.values.tipo.value === 'ciro')
                  ?
                  <Row className='justify-content-center'>
                    <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                      <Label className='form-label text-label'>
                        Año
                      </Label>
                      <CSelectReact
                        type={"select"}
                        id={'anio'}
                        placeholder={'Seleccionar'}
                        value={formik.values.anio}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.anio}
                        touched={formik.touched.anio}
                        options={dataAnio()}
                      />
                    </FormGroup>


                  </Row>
                  : null
              }

              <Row className='justify-content-center'>
                {(formik.values.tipo !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi', 'configurar'].includes(formik.values.tipo.value)) && (
                  <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                    <Label className='form-label'>
                      Fecha Desde <span className='text-primary h5'><b>*</b></span>
                    </Label>
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
                  </FormGroup>
                )}

                {(formik.values.tipo !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi', 'configurar'].includes(formik.values.tipo.value)) && (
                  <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                    <Label className='form-label'>
                      Fecha Hasta <span className='text-primary h5'><b>*</b></span>
                    </Label>
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
                  </FormGroup>
                )}

                {formik.values.tipo !== null && formik.values.tipo.value === 'evento' && (
                  <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                    <Label className='form-label'>
                      Estado de Evento <span className='text-primary h5'><b>*</b></span>
                    </Label>
                    <CSelectReact
                      type={"select"}
                      id={'estadoEvento'}
                      placeholder={'Seleccionar'}
                      value={formik.values.estadoEvento}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      error={formik.errors.estadoEvento}
                      touched={formik.touched.estadoEvento}
                      options={optionsEstadoEvento}
                    />
                  </FormGroup>
                )}
              </Row> */}


              {/*  <Row className='justify-content-center py-4'>
                <Col xs={4} md={2}>
                  <Button
                    block
                    color="dark"
                    outline
                    //onClick={() => { formik.handleReset(); setSelectedFields([]); setFilterText(''); setAvailableFields(camposDeEventosDeRiesgos.map(field => ({ ...field, selected: false }))); }}
                    disabled={!formik.dirty}
                  >
                    <Delete size={17} className='mr-2' />
                    Limpiar
                  </Button>
                </Col>
                <Col xs={4} md={2}>
                  <Button
                    block
                    className='text-white'
                    color="primary"
                    type="submit"
                  //disabled={formik.isSubmitting}
                  >
                    <File size={17} className='mr-2' />
                    {(formik.values.tipo !== null && ['auditoriaExt', 'auditoriaInt', 'asfi', 'configurar'].includes(formik.values.tipo.value)) ? 'Descargar reporte' : 'Generar'}
                  </Button>
                </Col>

                <Col xs={4} md={2} className={formik.values.tipo !== null && (
                  (formik.values.tipo.value === 'ciro' && formik.values.trimestre !== null && formik.values.anio !== null) ||
                  (formik.values.tipo.value === 'evento' && formik.values.fechaDesde !== null && formik.values.fechaHasta !== null && formik.values.estadoEvento !== null))
                  ? '' : 'd-none'}
                >
                  {
                    (formik.values.tipo !== null && formik.values.tipo.value === 'ciro' && formik.values.trimestre !== null && formik.values.anio !== null)
                      ? <Button
                        block
                        color='primary'
                        className='text-white'
                      //onClick={() => generateAllReportCiro()}
                      >
                        <Download size={15} className='mr-2' /><span>Descargar 9 reportes</span>
                      </Button>
                      : null
                  }

                  {
                    (formik.values.tipo !== null && formik.values.tipo.value === 'evento' && formik.values.fechaInicio !== null && formik.values.fechaDescubrimiento !== null && formik.values.estadoEvento !== null)
                      ? <Button
                        block
                        color='primary'
                        className='text-white'
                      //onClick={() => generateReportEvent()}
                      >
                        <Download size={15} className='mr-2' /><span>Descargar reporte</span>
                      </Button>
                      : null
                  }
                </Col>
              </Row> */}

            </Form>
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteRiesgo
