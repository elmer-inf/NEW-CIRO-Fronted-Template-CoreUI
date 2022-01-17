import React, { Fragment, useState,useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form } from 'reactstrap'
import { Delete, Printer, Save } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages';
import ViewReportCIRO from './component/ViewReportCIRO';

const ReporteEventos = () => {

  const [showCiroReport, setshowCiroReport] = useState(false);

  const formValueInitial = {
    tipo: null,
    anio: '',
    trimestre: null,
  }

  // Opciones Tipo de Reporte
  const optionsTipo = [
    { value: 'ciro', label: 'CIRO' },
  ]

  // Opciones Año Reporte
  const dataAnio = () => {
    var dataAnio = [];
    for (var i = 2021; i <= (new Date().getFullYear()); i++) {
      dataAnio.push({ "value": i, "label": i })
    }
    return dataAnio;
  }

  // Opciones Trimestre Reporte
  const optionsTrimestre = [
    { value: '01-01|03-31', label: 'Enero - Marzo' },
    { value: '04-01|06-30', label: 'Abril - Junio' },
    { value: '07-01|09-30', label: 'Julio - Septiembre' },
    { value: '10-01|12-31', label: 'Octubre - Diciembre' }
  ];

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        tipo: Yup.mixed().nullable().required(Messages.required),
        anio: Yup.mixed().nullable().required(Messages.required),
        trimestre: Yup.mixed().when('tipo', {
          is: (val) => (val !== null && val.value === 'ciro'),
          then: Yup.mixed().nullable().required(Messages.required)
        }
        )

      }
    ),

    onSubmit: values => {
      const data = {
        ...values
      }
      console.log('datos que se enviaran:', data)

      if (values.tipo.value === 'ciro') {
        generateReportCiro(data)
      }


    }
  })

  const generateReportCiro = (dataToRequest) => {
    console.log('llego: ', dataToRequest);

    //console.log('fecha INICIO reporte:', fechaReporte(0)); // anio-mes-dia
    //console.log('fecha FINAL reporte:', fechaReporte(1));

    setshowCiroReport(true)
  }

  // Genera Fecha Inicio y fecha Fin para el Reporte (Intervalo)
  const fechaReporte = (tipo) => {
    var anio = formik.values.anio !== null ? formik.values.anio.value : null;
    var trimestre = formik.values.trimestre !== null ? formik.values.trimestre.value : null;
    var fechaReporte = '';
    try {
      if (anio !== null && trimestre !== null && tipo !== null) {
        if (tipo === 0) {
          fechaReporte = anio + '-' + trimestre.split('|')[0];
        } else if (tipo === 1) {
          fechaReporte = anio + '-' + trimestre.split('|')[1];
        }
      }
    }
    catch (error) {
      console.log('Error al obtener Fecha reporte Inicio/Fin: ', error);
    }
    return fechaReporte;
  }



  const generateAllReportCiro = () => {
    console.log('Genererar todos los reortes CIRO');
  }

  useEffect(() => { //componentWillMount
    if (formik.values.tipo === null || formik.values.tipo.value !== 'ciro') {
      setshowCiroReport(false)

    }
  }, [formik.values.tipo]);



  return (
    <div className='table-hover-animation'>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Eventos de Riesgo</CardTitle>
            {
              (formik.values.tipo !== null && formik.values.tipo.value === 'ciro')
                ? <Button
                  color='primary'
                  className='float-right mt-1 text-white'
                  onClick={() => generateAllReportCiro}
                >
                  <Printer size={15} className='mr-2' /><span>Generar 9 reportes</span>
                </Button>
                : null

            }

          </CardHeader>
          <CardBody>
            <Form onSubmit={formik.handleSubmit} autoComplete="off">
              <Row className='justify-content-center pt-4'>
                <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                  <Label className='form-label text-label'>
                    Tipo de Reporte
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
                {
                  (formik.values.tipo !== null && formik.values.tipo.value === 'ciro')
                    ? <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                      <Label className='form-label text-label'>
                        Trimestre
                      </Label>
                      <CSelectReact
                        type={"select"}
                        id={'trimestre'}
                        placeholder={'Seleccionar'}
                        value={formik.values.trimestre}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        error={formik.errors.trimestre}
                        touched={formik.touched.trimestre}
                        options={optionsTrimestre}
                      />
                    </FormGroup>
                    : null
                }

              </Row>
              <Row>
                <Col xs={12} sm={12} md={{ size: 2, order: 0, offset: 4 }}>
                  <Button
                    size={'sm'}
                    style={{ width: '130px' }}
                    color="dark"
                    outline
                    onClick={() => { formik.handleReset() }}
                    disabled={!formik.dirty || formik.isSubmitting}
                  >
                    <Delete size={17} className='mr-2' />
                    Limpiar
                  </Button>
                </Col>
                <Col xs={12} sm={12} md={{ size: 2, order: 0, offset: 0 }}>
                  <Button
                    size={'sm'}
                    style={{ width: '130px' }}
                    className='text-white'
                    color="primary"
                    type="submit"
                  //disabled={formik.isSubmitting}
                  >
                    <Save size={17} className='mr-2' />
                    Generar
                  </Button>
                </Col>

              </Row>

            </Form>
<hr/>
            {

              (formik.values.tipo !== null && formik.values.tipo.value === 'ciro' && showCiroReport === true)
                ? <ViewReportCIRO fechaInicio={fechaReporte(0)} fechaFin={fechaReporte(1)} trimestre={formik.values.trimestre} />
                : <h6><center>{'Seleccione un tipo de reporte'}</center></h6>
            }
          </CardBody>
        </Card>

      </Fragment>






    </div>
  )
}

export default ReporteEventos
