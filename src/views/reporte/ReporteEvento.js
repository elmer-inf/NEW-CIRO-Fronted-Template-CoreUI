import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form } from 'reactstrap'
import { Delete, Download, File } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages';
import { exportFile } from 'src/functions/Function';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { generateAllReport } from './controller/ReporteCiroController';
import ViewReportCIRO from './ciro/component/ViewReportCIRO';
import { CInputReact } from 'src/reusable/CInputReact';
import ViewReportEvento from './evento/ViewReportEvento';
import { reporteAsfiExcel, reporteAuditExtExcel, reporteAuditIntExcel, reporteEventoExcel } from './controller/ReporteEventoController';
import { saveAs } from 'file-saver';
import { toastSweetAlert } from 'src/reusable/SweetAlert2';
var _ = require('lodash');

const ReporteEventos = () => {

  const today = new Date();
  const [spin, setSpin] = useState(false);
  const [showCiroReport, setshowCiroReport] = useState(false);
  const [showEventoReport, setshowEventoReport] = useState(false);

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

  // Opciones Trimestre Reporte CIRO
  const optionsTrimestre = [
    { value: '01-01|03-31', label: 'Enero - Marzo' },
    { value: '04-01|06-30', label: 'Abril - Junio' },
    { value: '07-01|09-30', label: 'Julio - Septiembre' },
    { value: '10-01|12-31', label: 'Octubre - Diciembre' }
  ];

  // Nombre de archivos para reporte CIRO
  const nameFiles = {
    fileA: 'RO<%= periodoEnvio %>A.ATATC',
    fileB: 'RO<%= periodoEnvio %>B.ATATC',
    fileC: 'RO<%= periodoEnvio %>C.ATATC',
    fileD: 'RO<%= periodoEnvio %>D.ATATC',
    fileE: 'RO<%= periodoEnvio %>E.ATATC',
    fileF: 'RO<%= periodoEnvio %>F.ATATC',
    fileG: 'RO<%= periodoEnvio %>G.ATATC',
    fileH: 'RO<%= periodoEnvio %>H.ATATC',
    fileI: 'RO<%= periodoEnvio %>I.ATATC',
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        // Campos para el reporte CIRO
        tipo: Yup.mixed().nullable().required(Messages.required),
        anio: Yup.mixed().when('tipo', {
          is: (val) => (val !== null && val.value === 'ciro'),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
        trimestre: Yup.mixed().when('tipo', {
          is: (val) => (val !== null && val.value === 'ciro'),
          then: Yup.mixed().nullable().required(Messages.required),
        }),

        // Campos para reporte de Auditoría y ASFI
        fechaDesde: Yup.mixed().when('tipo', {
          is: (val) => val !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi'].includes(val.value),
          then: Yup.date().nullable().required(Messages.required),
          otherwise: Yup.date().nullable(), // No obligatorio para otros tipos
        }),
        fechaHasta: Yup.mixed().when('tipo', {
          is: (val) => val !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi'].includes(val.value),
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
      if (values.tipo.value === 'ciro') {
        setshowCiroReport(true);
        setLoadDataCiro(true);
      }
      if (values.tipo.value === 'evento') {
        setshowEventoReport(true);
        setLoadDataEvento(true);
      }
      if (values.tipo.value === 'auditoriaExt' || values.tipo.value === 'auditoriaInt' || values.tipo.value === 'asfi') {
        getButtonAction();
      }
    }
  });

  // Genera Reporte CIRO
  const generateAllReportCiro = async () => {
    setSpin(true);
    const sendRequest = {
      fechaIniTrim: fechaReporte(0),
      fechaFinTrim: fechaReporte(1)
    }
    var formatDate = _.replace(sendRequest.fechaFinTrim, new RegExp("-", "g"), "");
    const dateFile = {
      'periodoEnvio': formatDate
    }
    var compiledA = _.template(nameFiles.fileA);
    var compiledB = _.template(nameFiles.fileB);
    var compiledC = _.template(nameFiles.fileC);
    var compiledD = _.template(nameFiles.fileD);
    var compiledE = _.template(nameFiles.fileE);
    var compiledF = _.template(nameFiles.fileF);
    var compiledG = _.template(nameFiles.fileG);
    var compiledH = _.template(nameFiles.fileH);
    var compiledI = _.template(nameFiles.fileI);

    var resultFileNameA = compiledA(dateFile);
    var resultFileNameB = compiledB(dateFile);
    var resultFileNameC = compiledC(dateFile);
    var resultFileNameD = compiledD(dateFile);
    var resultFileNameE = compiledE(dateFile);
    var resultFileNameF = compiledF(dateFile);
    var resultFileNameG = compiledG(dateFile);
    var resultFileNameH = compiledH(dateFile);
    var resultFileNameI = compiledI(dateFile);

    await generateAllReport(sendRequest)
      .then((response) => {
        exportFile(response.data.reportA, resultFileNameA)
        exportFile(response.data.reportB, resultFileNameB)
        exportFile(response.data.reportC, resultFileNameC)
        exportFile(response.data.reportD, resultFileNameD)
        exportFile(response.data.reportE, resultFileNameE)
        exportFile(response.data.reportF, resultFileNameF)
        exportFile(response.data.reportG, resultFileNameG)
        exportFile(response.data.reportH, resultFileNameH)
        exportFile(response.data.reportI, resultFileNameI)

        toastSweetAlert('success', Messages.ok, 2000);
        setSpin(false)
      }).catch((error) => {
        console.error("Error: ", error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false)
      })

  }

  // Genera Fecha Inicio y fecha Fin para el Reporte CIRO (Intervalo)
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
      console.error('Error al obtener Fecha reporte Inicio/Fin: ', error);
    }
    return fechaReporte;
  }


  // Genera Reporte Eventos de riesgo
  const generateReportEvent = async () => {
    const dataFilter = {
      fechaDesde: formik.values.fechaDesde,
      fechaHasta: formik.values.fechaHasta,
      estadoEvento: formik.values.estadoEvento.label === 'Ambos' ? ['Seguimiento', 'Solución'] : [formik.values.estadoEvento.label]
    };
    setSpin(true);
    await reporteEventoExcel(dataFilter)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte Eventos de riesgo.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte Evento de riesgo: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }




  //Genera reporte de Auditoria Externa
  const dataFilter = {
    fechaDesde: formik.values.fechaDesde,
    fechaHasta: formik.values.fechaHasta,
  };

  const generateReportAuditExt = async () => {
    setSpin(true);
    await reporteAuditExtExcel(dataFilter)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte de Auditoria Externa.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte Auditoria Externa: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }

  //Genera reporte de Auditoria Externa
  const generateReportAuditInt = async () => {
    setSpin(true);
    await reporteAuditIntExcel(dataFilter)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte de Auditoria Interna.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte Auditoria Interna: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }

  //Genera reporte de Auditoria Externa
  const generateReportAuditAsfi = async () => {
    setSpin(true);
    await reporteAsfiExcel(dataFilter)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte ASFI.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte ASFI: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }


  const getButtonAction = () => {
    if (formik.values.tipo.value === 'auditoriaExt') {
      return generateReportAuditExt();
    } else if (formik.values.tipo.value === 'auditoriaInt') {
      return generateReportAuditInt();
    } else if (formik.values.tipo.value === 'asfi') {
      return generateReportAuditAsfi();
    }
  };


  useEffect(() => {
    if (formik.values.tipo === null || formik.values.tipo.value !== 'ciro') {
      setshowCiroReport(false)
    }
    if (formik.values.tipo === null || formik.values.tipo.value !== 'evento') {
      setshowEventoReport(false)
    }
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
                    <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
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
                  </Row>
                  : null
              }

              <Row className='justify-content-center'>
                {(formik.values.tipo !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi'].includes(formik.values.tipo.value)) && (
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

                {(formik.values.tipo !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi'].includes(formik.values.tipo.value)) && (
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
                    onClick={() => { formik.handleReset() }}
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
                    {(formik.values.tipo !== null && ['Auditoria externa', 'Auditoria interna'].includes(formik.values.tipo.label))? 'Descargar reporte' : 'Generar'}        
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
                        onClick={() => generateAllReportCiro()}
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
                        onClick={() => generateReportEvent()}
                      >
                        <Download size={15} className='mr-2' /><span>Descargar reporte</span>
                      </Button>
                      : null
                  }


                </Col>
              </Row>
            </Form>

            {
              (formik.values.tipo !== null && formik.values.tipo.value === 'ciro' && showCiroReport === true)
                ? <ViewReportCIRO
                  fechaInicio={fechaReporte(0)}
                  fechaFin={fechaReporte(1)}
                  loadDataCiro={loadDataCiro}
                />
                : null
            }

            {
              (formik.values.tipo !== null && formik.values.estadoEvento !== null && formik.values.tipo.value === 'evento' && showEventoReport === true)
                ? <ViewReportEvento
                  fechaDesde={formik.values.fechaDesde}
                  fechaHasta={formik.values.fechaHasta}
                  estadoEvento={formik.values.estadoEvento.label === 'Ambos' ? ['Seguimiento', 'Solución'] : [formik.values.estadoEvento.label]}
                  loadDataEvento={loadDataEvento}
                />
                : null
            }
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteEventos
