/* import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form } from 'reactstrap'
import { Delete, Download, File } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { CInputReact } from 'src/reusable/CInputReact';

const ReporteOportunidad = () => { 

  const today = new Date();
  const [spin, setSpin] = useState(false);
  const [loadDataEvento, setLoadDataEvento] = useState(false);
  const [loadDataCiro, setLoadDataCiro] = useState(false);

  const formValueInitial = {
    tipo: null,
    anio: '',
    trimestre: null,

    fechaDesde: '',
    fechaHasta: '',
    estadoEvento: null,
  }

  // Opciones Tipo de Reporte
  const optionsTipo = [
    { value: 'evento', label: 'Eventos de Riesgos' },
    { value: 'ciro', label: 'CIRO' },
    { value: 'auditoriaExt', label: 'Auditoria externa' },
    { value: 'auditoriaInt', label: 'Auditoria interna' },
    { value: 'asfi', label: 'ASFI' },
    { value: 'configurar', label: 'Configurar reporte de Eventos de Riesgo' },
  ]

  // Opciones para Estado de Evento
  const optionsEstadoEvento = [
    { value: 'solucion', label: 'Solución' },
    { value: 'seguimiento', label: 'Seguimiento' },
    { value: 'ambos', label: 'Ambos' },
  ];

  // Opciones Año Reporte
  const dataAnio = () => {
    var dataAnio = [];
    for (var i = 2021; i <= (new Date().getFullYear()); i++) {
      dataAnio.push({ "value": i, "label": i })
    }
    return dataAnio;
  }



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
            .max(today, Messages.dateValidation3)
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


  useEffect(() => {
    if (loadDataEvento) {
      setLoadDataEvento(false);
    }
    if (loadDataCiro) {
      setLoadDataCiro(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDataEvento, loadDataCiro]);



  return (
    <div className='table-hover-animation'>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Eventos de Riesgo</CardTitle>

          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit} autoComplete="off">
              <Row className='justify-content-center pt-4'>
                <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                  <Label className='form-label text-label'>
                    Tipo de Reporte <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CSelectReact
                    type={"select"}
                    id={'tipo'}
                    placeholder={'Seleccionar'}
                    value={formik.values.tipo}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    error={formik.errors.tipo}
                    touched={formik.touched.tipo}
                    options={optionsTipo}
                  />
                </FormGroup>
              </Row>

              {
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
              </Row>


              <Row className='justify-content-center py-4'>
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
              </Row>

            </Form> 
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteOportunidad
 */