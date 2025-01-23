import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form, Input } from 'reactstrap'
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Messages } from 'src/reusable/variables/Messages';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact';
import { ChevronLeft, ChevronRight, Delete, File } from 'react-feather';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { reporteConfigRiesgoExcel } from '../controller/ReporteRiesgoController';
import { saveAs } from 'file-saver';
import { toastSweetAlert } from 'src/reusable/SweetAlert2';
import { FilterText } from 'src/functions/FunctionEvento';

const ReporteConfigurable = () => {

  const today = new Date();
  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    fechaDesde: '',
    fechaHasta: '',
    estadoPlan: ''
  }

  const optionsEstado = [
    { value: 'Concluido', label: 'Concluido' },
    { value: 'En proceso', label: 'En proceso' },
    { value: 'No aplica', label: 'No aplica' },
    { value: 'Vencido', label: 'Vencido' },
    { value: 'Todos', label: 'Todos' }
  ]

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        fechaDesde: Yup.date().nullable().required(Messages.required),
        fechaHasta: Yup.date().min(Yup.ref('fechaDesde'), Messages.dateValidation1).max(today, Messages.dateValidation3).nullable().required(Messages.required),
        estadoPlan: Yup.mixed().required(Messages.required),
      }
    ),
    onSubmit: values => {
      if (selectedFields.length === 0) {
        setShowError(true);
        return;
      }
      setShowError(false);
      generateReportConfigRiesgo();
    }
  });



  //Genera reporte configurable de Matriz de riesgos
  const generateReportConfigRiesgo = async () => {

    const data = {
      estadoPlan: formik.values.estadoPlan.value,
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
    await reporteConfigRiesgoExcel(data)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte configurado de Matriz de Riesgos.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte de matriz de riesgos: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }


  // Campos para configurar reporte de Eventos de Riesgo
  const camposDeRiesgos = [
    { id: 1, label: 'Área/Dependencia' },
    { id: 2, label: 'Unidad' },
    { id: 3, label: 'Código Macroproceso' },
    { id: 4, label: 'Macroproceso' },
    { id: 5, label: 'Proceso' },
    { id: 6, label: 'Criticidad (Precalificación)' },
    { id: 7, label: 'Valoración Precalificación' },
    { id: 8, label: 'Dueño Proceso' },
    { id: 9, label: 'Responsable Unidad a Cargo' },
    { id: 10, label: 'Fecha Evaluación' },
    { id: 11, label: 'Evento Materializado (SI/NO)' },
    { id: 12, label: 'Código Evento' },
    { id: 13, label: 'Nombre del evento' },
    { id: 14, label: 'Fecha de descubrimiento del Evento' },
    { id: 15, label: 'Código de Riesgo' },
    { id: 16, label: 'Definición del Riesgo/Oportunidad' },
    { id: 17, label: 'Causa del Riesgo' },
    { id: 18, label: 'Consecuencia del Riesgo' },
    { id: 19, label: 'Tipo de Pérdida' },
    { id: 20, label: 'Efecto - Impacto ASFI' },
    { id: 21, label: 'Monetario/No monetario' },
    { id: 22, label: 'Definición del Riesgo (compuesta)' },
    { id: 23, label: 'Factor de Riesgo' },
    { id: 24, label: 'Clasifica como Fraude Interno?' },
    { id: 25, label: 'Tipo Fraude Interno' },
    { id: 26, label: 'Sub Tipo Fraude Interno' },
    { id: 27, label: 'Probabilidad (Cuán probable)' },
    { id: 28, label: 'Probabilidad (Inherente)' },
    { id: 29, label: '% de Ocurrencia' },
    { id: 30, label: 'Valoración Probabilidad (Inherente)' },
    { id: 31, label: 'Impacto (monetario o no)' },
    { id: 32, label: 'Impacto Inherente' },
    { id: 33, label: '% de Impacto' },
    { id: 34, label: 'Valoración de Imp. Inherente' },
    { id: 35, label: 'Riesgo (Inherente)' },
    { id: 36, label: 'Valoración Riesgo (Inherente)' },
    { id: 37, label: '¿Tiene Controles? (SI/NO)' },
    { id: 38, label: 'Descripción Control' },
    { id: 39, label: 'Está Formalizado? SI/NO' },
    { id: 40, label: 'Norma/procedimiento en la que está formalizado' },
    { id: 41, label: 'Tipo Control' },
    { id: 42, label: 'Ponderación Control' },
    { id: 43, label: 'Valoración de Control' },
    { id: 44, label: '% disminución del control' },
    { id: 45, label: 'Objetivo Control' },
    { id: 46, label: 'Probabilidad R' },
    { id: 47, label: 'Valoración Prob. R' },
    { id: 48, label: 'Valoración Prob R' },
    { id: 49, label: 'Impacto R' },
    { id: 50, label: 'Valoración Impacto. R' },
    { id: 51, label: 'Valoración Impacto R' },
    { id: 52, label: 'Riesgo R' },
    { id: 53, label: 'Valoración Riesgo R.' },
    { id: 54, label: 'N (número de planes de acción)' },
    { id: 55, label: 'Estrategia para Administrar el Riesgo' },
    { id: 56, label: 'Descripción de la(s) Acción(es)' },
    { id: 57, label: 'Cargo Responsable' },
    { id: 58, label: 'Fecha Implementación Acción Correctiva' },
    { id: 59, label: 'Fecha Implementación Acción Correctiva (función específica)' },
    { id: 60, label: 'Tipo de Pérdida (valoración cuantitativa)' },
    { id: 61, label: 'Efecto - Impacto ASFI (valoración cuantitativa)' },
    { id: 62, label: 'Criterio para la Valoración de Impacto' },
    { id: 63, label: 'Criterio de Cálculo Probabilidad' },
    { id: 64, label: 'Numero días (veces) en relación a un año Probabilidad' },
    { id: 65, label: 'Valoración Probabilidad (final)' },
    { id: 66, label: 'Probabilidad (final)' },
    { id: 67, label: 'Impacto por cada vez que ocurre el evento (USD)' },
    { id: 68, label: 'Impacto (final)' },
    { id: 69, label: 'Valoración de Imp. (final)' },
    { id: 70, label: 'Monto Riesgo de Pérdida (Anual)' },
    { id: 71, label: 'Valoración Riesgo (Matriz de Riesgo)' },
    { id: 72, label: 'Riesgo (Matriz de Riesgo)' },
    { id: 73, label: 'Numero de Tareas' },
    { id: 74, label: 'No iniciadas' },
    { id: 75, label: 'En proceso' },
    { id: 76, label: 'Concluidas' },
    { id: 77, label: 'Avance' },
    { id: 78, label: 'Estado' },
    { id: 79, label: 'Fecha Seguimiento' },
    { id: 80, label: 'Observaciones a tareas propuestas' },
    { id: 81, label: 'Seguimiento Tareas en Proceso' },
    { id: 82, label: 'Fecha Implementación Acción Correctiva (final)' }
];

  const [availableFields, setAvailableFields] = useState(
    camposDeRiesgos.map(field => ({ ...field, selected: false }))
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

  useEffect(() => {
    setShowError(false);
    formik.setFieldValue('selectedFields', selectedFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFields]);

  const [availableCol1, availableCol2] = splitIntoTwoColumns(filteredAvailableFields);
  const [selectedCol1, selectedCol2] = splitIntoTwoColumns(selectedFields);


  return (
    <div className=''>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          {/* <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Matriz de Oportunidades</CardTitle>
          </CardHeader> */}
          <CardBody>
            <Form onSubmit={formik.handleSubmit} autoComplete="off">
              <Row className='justify-content-center'>
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
                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>

                  <Label className='form-label'>
                    Estado plan de acción <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CSelectReact
                    type={"select"}
                    id={'estadoPlan'}
                    placeholder={'Seleccionar'}
                    value={formik.values.estadoPlan}
                    onChange={formik.setFieldValue}
                    onBlur={formik.setFieldTouched}
                    error={formik.errors.estadoPlan}
                    touched={formik.touched.estadoPlan}
                    options={optionsEstado}
                    //isDisabled={formik.values.otrosAux2 === true ? true : false}
                  />
                </FormGroup>
              </Row>

              <Row>
                <Col sm='12' xl='5'>
                  <Label className='form-label text-label'>
                    Seleccionar campo(s) de Matriz de Oportunidad <span className='text-primary h5'><b>*</b></span>
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
                    <div className="text-danger text-center">Debe seleccionar al menos un campo de Matriz de Riesgos.</div>
                  )}
                </Col>
                <Col sm='12' xl='2' className='align-self-center'>
                  <Row className='pt-2'>
                    <Col xs="12">
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
                  <Row className='py-4'>
                    <Col xs="12">
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

              <Row className='justify-content-center py-4'>
                <Col xs={4} md={2}>
                  <Button
                    block
                    color="dark"
                    outline
                    onClick={() => { formik.handleReset(); setSelectedFields([]); setFilterText(''); setAvailableFields(camposDeRiesgos.map(field => ({ ...field, selected: false }))); }}
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
                    <File size={17} className='mr-2' />Descargar reporte
                  </Button>

                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteConfigurable
