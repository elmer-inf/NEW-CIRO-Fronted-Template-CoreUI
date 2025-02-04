import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form, Input } from 'reactstrap'
import { ChevronLeft, ChevronRight, Delete, Download, File } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages';
import { exportFile } from 'src/functions/Function';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { generateAllReport } from './controller/ReporteCiroController';
import ViewReportCIRO from './ciro/component/ViewReportCIRO';
import { CInputReact } from 'src/reusable/CInputReact';
import ViewReportEvento from './ViewReportEvento';
import { reporteAsfiExcel, reporteAuditExtExcel, reporteAuditIntExcel, reporteConfigEventoExcel, reporteEventoExcel } from './controller/ReporteEventoController';
import { saveAs } from 'file-saver';
import { toastSweetAlert } from 'src/reusable/SweetAlert2';
import { FilterText } from 'src/functions/FunctionEvento';
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
        // Campos para reporte de Auditoría, ASFI y Configurable Evento
        fechaDesde: Yup.mixed().when('tipo', {
          is: (val) => val !== null && ['evento', 'auditoriaExt', 'auditoriaInt', 'asfi', 'configurar'].includes(val.value),
          then: Yup.date().nullable().required(Messages.required),
          otherwise: Yup.date().nullable(), // No obligatorio para otros tipos
        }),
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
      if (values.tipo.value === 'configurar') {
        if (selectedFields.length === 0) {
          setShowError(true);
          return;
        }
        setShowError(false);
      }

      if (values.tipo.value === 'ciro') {
        setshowCiroReport(true);
        setLoadDataCiro(true);
      }
      if (values.tipo.value === 'evento') {
        setshowEventoReport(true);
        setLoadDataEvento(true);
      }
      if (values.tipo.value === 'auditoriaExt' || values.tipo.value === 'auditoriaInt' || values.tipo.value === 'asfi' || values.tipo.value === 'configurar') {
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

  //Genera reporte configurable de Evento
  const generateReportConfigEvento = async () => {

    const data = {
      dataFilter: {
        fechaDesde: formik.values.fechaDesde,
        fechaHasta: formik.values.fechaHasta
      },
      dataColumns: selectedFields.map(field => ({
        id: field.id,
        label: field.label
      }))
    };


    setSpin(true);
    await reporteConfigEventoExcel(data)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte configurado de Evento de Riesgo.xlsx');
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
    } else if (formik.values.tipo.value === 'configurar') {
      return generateReportConfigEvento();
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


  // Campos para configurar reporte de Eventos de Riesgo
  const camposDeEventosDeRiesgos = [
    { id: 1, label: 'Código del Evento' },
    { id: 2, label: 'Fecha del Inicio del Evento' },
    { id: 3, label: 'Hora de Inicio' },
    { id: 4, label: 'Fecha de Descubrimiento del Evento' },
    { id: 5, label: 'Hora de Descubrimiento' },
    { id: 6, label: 'CAMPO AUXILIAR MES-AÑO INICIO' },
    { id: 7, label: 'CAMPO AUXILIAR AÑO INICIO' },
    { id: 8, label: 'Fecha de Finalización del Evento' },
    { id: 9, label: 'Hora de Finalización' },
    { id: 10, label: 'CAMPO AUXILIAR MES-AÑO FIN' }, //10

    { id: 11, label: 'CAMPO AUXILIAR AÑO FIN' },
    { id: 12, label: 'Agencia' },
    { id: 13, label: '(Lugar) Oficina' },
    { id: 14, label: 'Área Involucrada (en la que se suscitó la incidencia)' },
    { id: 15, label: 'Unidad' },
    { id: 16, label: 'Descripción Resumida del Evento' },
    { id: 17, label: 'Descripción Larga del Evento' },
    { id: 18, label: 'Categoría (del Evento)' },
    { id: 19, label: 'Descripción Clase de Evento' },
    { id: 20, label: 'Tipo de Evento' }, //20

    { id: 21, label: 'Definición' },
    { id: 22, label: 'Subtipo de Evento' },
    { id: 23, label: 'Clase de Evento' },
    { id: 24, label: 'Evento Crítico' },
    { id: 25, label: 'Detalle Evento Crítico' },
    { id: 26, label: 'Factores de Riesgo Operativo' },
    { id: 27, label: 'MacroProceso' },
    { id: 28, label: 'Campo ASFI DE Macroproceso' },
    { id: 29, label: 'Código Riesgo Relacionado' },
    { id: 30, label: 'Descripción Riesgo' }, //30

    { id: 31, label: 'Código Macroproceso' },
    { id: 32, label: 'Procedimiento' },
    { id: 33, label: 'Proceso Critico' },
    { id: 34, label: 'Líneas de Negocio (Nivel 3)' },
    { id: 35, label: 'Líneas de Negocio ASFI' },
    { id: 36, label: 'Operación (Producto o Servicio afectado)' },
    { id: 37, label: 'Tipo de Servicio' },
    { id: 38, label: 'Descripción Operación, Producto o Servicio Afectado' },
    { id: 39, label: 'Operaciones ASFI' },
    { id: 40, label: 'Entidad o Comercio Afectado' }, //40

    { id: 41, label: 'Acciones efectuadas por el área responsable de la incidencia' },
    { id: 42, label: 'Estado del Evento' },
    { id: 43, label: 'Moneda' },
    { id: 44, label: 'Pérdida por Riesgo Operativo (Valor Contable) Monto de Pérdida' },
    { id: 45, label: 'Monto de Pérdida por Riesgo Operativo USD' },
    { id: 46, label: 'Gastos Asociados a la Pérdida (BS)' },
    { id: 47, label: 'Monto Total Recuperado' },
    { id: 48, label: 'Cobertura de Seguro SI / NO' },
    { id: 49, label: 'Póliza de Seguro asociada' },
    { id: 50, label: 'Monto Recuperado por Coberturas de Seguros BS' },//50

    { id: 51, label: 'Pérdida por Riesgo Operativo (Valor de Mercado)' },
    { id: 52, label: 'Recuperación de Activo' },
    { id: 53, label: 'Monto Total Final de la Perdida Expresado en USD' },
    { id: 54, label: 'Fecha de Registro Contable del evento de Pérdida' },
    { id: 55, label: 'Cuentas Contables Afectadas' },
    { id: 56, label: 'Nombre cuenta' },
    { id: 57, label: 'Fuente de información' },
    { id: 58, label: 'Impacto o Severidad' },
    { id: 59, label: 'Riesgo Relacionado' },
    { id: 60, label: 'Cargo(s) Involucrados' }, //60

    { id: 61, label: 'Canal' },
    { id: 62, label: 'Efectos de Pérdida' },
    { id: 63, label: 'Proceso Crítico' },
    { id: 64, label: 'Detalle Proceso Crítico' },
    { id: 65, label: 'Operativo' },
    { id: 66, label: 'Seguridad de la Información' },
    { id: 67, label: 'Liquidez y Mercado' },
    { id: 68, label: 'LGI FT y/o DP' },
    { id: 69, label: 'Fraude con medios de Pago Electrónico' },
    { id: 70, label: 'Legal y Regulatorio' }, //70

    { id: 71, label: 'Reputacional' },
    { id: 72, label: 'Cumplimiento' },
    { id: 73, label: 'Estratégico' },
    { id: 74, label: 'Gobierno Corporativo' },
    { id: 75, label: 'Código Inicial' },
    { id: 76, label: 'Sub Categorización' },
    { id: 77, label: 'Trimestre' } //77
  ];


  const [availableFields, setAvailableFields] = useState(
    camposDeEventosDeRiesgos.map(field => ({ ...field, selected: false }))
  );
  const [selectedFields, setSelectedFields] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectAllAvailable, setSelectAllAvailable] = useState(false);
  const [selectAllSelected, setSelectAllSelected] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAddField = () => {
    const toAdd = availableFields.filter(field => field.selected);
    setSelectedFields([...selectedFields, ...toAdd.map(field => ({ ...field, selected: false }))]);
    setAvailableFields(availableFields.filter(field => !field.selected));
    setSelectAllAvailable(false);
  };

  const handleRemoveField = () => {
    const toRemove = selectedFields.filter(field => field.selected);
    const newAvailableFields = [
      ...availableFields,
      ...toRemove.map(field => ({ ...field, selected: false }))
    ].sort((a, b) => a.id - b.id);
    setAvailableFields(newAvailableFields);
    setSelectedFields(selectedFields.filter(field => !field.selected));
    setSelectAllSelected(false);
  };

  const toggleSelection = (fieldId, isSelecting) => {
    const updateSelection = fields => fields.map(field =>
      field.id === fieldId ? { ...field, selected: !field.selected } : field
    );
    if (isSelecting) {
      setAvailableFields(updateSelection(availableFields));
    } else {
      setSelectedFields(updateSelection(selectedFields));
    }
  };

  const filteredAvailableFields = availableFields.filter(field =>
    field.label.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleToggleSelectAllAvailable = () => {
    const newValue = !selectAllAvailable;
    setAvailableFields(availableFields.map(field =>
      filteredAvailableFields.includes(field) ? { ...field, selected: newValue } : field
    ));
    setSelectAllAvailable(newValue);
  };

  const handleToggleSelectAllSelected = () => {
    const newValue = !selectAllSelected;
    setSelectedFields(selectedFields.map(field => ({ ...field, selected: newValue })));
    setSelectAllSelected(newValue);
  };

  useEffect(() => {
    setShowError(false);
    formik.setFieldValue('selectedFields', selectedFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFields]);

  const splitIntoTwoColumns = (fields) => {
    const midpoint = Math.ceil(fields.length / 2);
    return [fields.slice(0, midpoint), fields.slice(midpoint)];
  };

  const [availableCol1, availableCol2] = splitIntoTwoColumns(filteredAvailableFields);
  const [selectedCol1, selectedCol2] = splitIntoTwoColumns(selectedFields);

  return (
    <div className=''>
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

              {
                (formik.values.tipo !== null && formik.values.tipo.value === 'configurar')
                  ?
                  <Row>
                    <Col sm='12' xl='5'>
                      <Label className='form-label text-label'>
                        Seleccionar campo(s) de Eventos de Riesgo <span className='text-primary h5'><b>*</b></span>
                      </Label>
                      <FilterText
                        autoFocus={true}
                        name="searchAvailable"
                        placeholder="Buscar campos"
                        onFilter={e => setFilterText(e.target.value)}
                        disabled={availableFields.length === 0}
                      />
                      <Card className='custom-container-scrooll mt-2'>
                        <CardBody className='py-0'>
                          <FormGroup check className='pl-0 pb-2'>
                            <Label check>
                              <Input
                                type="checkbox"
                                className="orange-checkbox"
                                checked={selectAllAvailable}
                                onChange={handleToggleSelectAllAvailable}
                                disabled={availableFields.length === 0}
                              />{' '}
                              <small>Seleccionar todos</small>
                            </Label>
                          </FormGroup>
                          <Row>
                            <Col>
                              {availableCol1.map((field, index) => (
                                <FormGroup check key={index}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      className="orange-checkbox"
                                      checked={field.selected || false}
                                      onChange={() => toggleSelection(field.id, true)}
                                    />{' '}
                                    <small>{field.label}</small>
                                  </Label>
                                </FormGroup>
                              ))}
                            </Col>
                            <Col>
                              {availableCol2.map((field, index) => (
                                <FormGroup check key={index}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      className="orange-checkbox"
                                      checked={field.selected || false}
                                      onChange={() => toggleSelection(field.id, true)}
                                    />{' '}
                                    <small>{field.label}</small>
                                  </Label>
                                </FormGroup>
                              ))}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      {showError && (
                        <div className="text-danger text-center">Debe seleccionar al menos un campo de Evento de Riesgo.</div>
                      )}
                    </Col>
                    <Col sm='12' xl='2' className='align-self-center'>
                      <Row className='pt-2 justify-content-center'>
                        <Col xs="6" xl="12">
                          <Button
                            block
                            color="primary"
                            className='text-white'
                            onClick={handleAddField}
                            disabled={filteredAvailableFields.every(field => !field.selected)}
                          >
                            Agregar <ChevronRight size={17} className='mr-1' />
                          </Button>
                        </Col>
                      </Row>
                      <Row className='py-4 justify-content-center'>
                        <Col xs="6" xl="12">
                          <Button
                            block
                            color="primary"
                            className='text-white'
                            onClick={handleRemoveField}
                            disabled={selectedFields.every(field => !field.selected)}
                          >
                            <ChevronLeft size={17} className='mr-1' /> Quitar
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm='12' xl='5'>
                      <Label className='form-label text-label'>Campos seleccionados:</Label>
                      <Card className='custom-container-scrooll'>
                        <CardBody className='py-0'>
                          <FormGroup check className='pl-0 pb-2'>
                            <Label check>
                              <Input
                                type="checkbox"
                                className="orange-checkbox"
                                checked={selectAllSelected}
                                onChange={handleToggleSelectAllSelected}
                                disabled={selectedFields.length === 0}
                              />{' '}
                              <small>Seleccionar todos</small>
                            </Label>
                          </FormGroup>
                          <Row>
                            <Col>
                              {selectedCol1.map((field, index) => (
                                <FormGroup check key={index}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      className="orange-checkbox"
                                      checked={field.selected || false}
                                      onChange={() => toggleSelection(field.id, false)}
                                    />{' '}
                                    <small>{field.label}</small>
                                  </Label>
                                </FormGroup>
                              ))}
                            </Col>
                            <Col>
                              {selectedCol2.map((field, index) => (
                                <FormGroup check key={index}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      className="orange-checkbox"
                                      checked={field.selected || false}
                                      onChange={() => toggleSelection(field.id, false)}
                                      disabled={selectedFields.length === 0}
                                    />{' '}
                                    <small>{field.label}</small>
                                  </Label>
                                </FormGroup>
                              ))}
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  : null
              }

              <Row className='justify-content-center py-4'>
                <Col xs={6} md={4} xl={2}>
                  <Button
                    block
                    color="dark"
                    outline
                    onClick={() => { formik.handleReset(); setSelectedFields([]); setFilterText(''); setAvailableFields(camposDeEventosDeRiesgos.map(field => ({ ...field, selected: false }))); }}
                    disabled={!formik.dirty}
                  >
                    <Delete size={17} className='mr-2' />
                    Limpiar
                  </Button>
                </Col>
                <Col xs={6} md={4} xl={2}>
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
