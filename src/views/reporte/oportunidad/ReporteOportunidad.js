import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form, Input } from 'reactstrap'
import { ChevronLeft, ChevronRight, Delete, File } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { Messages } from 'src/reusable/variables/Messages';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { CInputReact } from 'src/reusable/CInputReact';
import { FilterText } from 'src/functions/FunctionEvento';
import { reporteConfigOportunidadExcel } from './controller/ReporteOportunidadController';
import { saveAs } from 'file-saver';
import { toastSweetAlert } from 'src/reusable/SweetAlert2';

const ReporteOportunidades = () => {

  const today = new Date();
  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    fechaDesde: '',
    fechaHasta: '',
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        fechaDesde: Yup.date().nullable().required(Messages.required),
        fechaHasta: Yup.date().min(Yup.ref('fechaDesde'), Messages.dateValidation1).max(today, Messages.dateValidation3).nullable().required(Messages.required),
      }
    ),
    onSubmit: values => {
      if (selectedFields.length === 0) {
        setShowError(true);
        return;
      }
      setShowError(false);
      generateReportConfigOportunidad();
    }
  });



  //Genera reporte configurable de Oportunidad
  const generateReportConfigOportunidad = async () => {

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
    console.log('data: ', data);
    await reporteConfigOportunidadExcel(data)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs(blob, 'Reporte configurado de Matriz de Oportunidad.xlsx');
          toastSweetAlert('success', Messages.ok, 2000);
        } else {
          toastSweetAlert('error', Messages.no_ok, 2000);
        }
        setSpin(false);
      }).catch((error) => {
        console.error('Error al generar reporte Oportunidad: ', error);
        toastSweetAlert('error', Messages.no_ok, 2000);
        setSpin(false);
      })
  }


  // Campos para configurar reporte de Eventos de Riesgo
  const camposDeOportunidades = [
    { id: 1, label: 'Área/Dependencia' },
    { id: 2, label: 'Unidad' },
    { id: 3, label: 'Código Macroproceso' },
    { id: 4, label: 'Macroproceso' },
    { id: 5, label: 'Proceso' },
    { id: 6, label: 'Dueño Proceso' },
    { id: 7, label: 'Responsable Unidad a Cargo' },
    { id: 8, label: 'Fecha Evaluación' },
    { id: 9, label: 'Código de Oportunidad' },
    { id: 10, label: 'Definición de Oportunidad' },
    { id: 11, label: 'Causa de la Oportunidad' },
    { id: 12, label: 'Consecuencia o efecto positivo' },
    { id: 13, label: 'Definición Completa de la Oportunidad' },
    { id: 14, label: 'Clasificación Factores (Internos/Externos)' },
    { id: 15, label: 'Grupo de Interés Relacionado' },
    { id: 16, label: 'Probabilidad' },
    { id: 17, label: 'Probabilidad Cuán probable es que la Oportunidad ocurra' },
    { id: 18, label: 'Porcentaje de Ocurrencia' },
    { id: 19, label: 'Valoración Probabilidad' },
    { id: 20, label: 'Impacto Oportunidad Cualitativo' },
    { id: 21, label: 'Impacto' },
    { id: 22, label: 'Porcentaje de Impacto' },
    { id: 23, label: 'Valoración Probabilidad de Impacto' },
    { id: 24, label: 'Impacto' },
    { id: 25, label: 'Valoración Oportunidad' },
    { id: 26, label: '¿Tiene Controles o Fortalezas? (SI/NO)' },
    { id: 27, label: '(4) Descripción de la Fortaleza Actual' },
    { id: 28, label: 'Ponderación Control/Fortaleza' },
    { id: 29, label: 'Valoración de la Fortaleza Actual' },
    { id: 30, label: 'Número de Planes de Acción' },
    { id: 31, label: 'Estrategia para Administrar la Oportunidad' },
    { id: 32, label: 'Descripción de la(s) Acción(es)' },
    { id: 33, label: 'Cargo' },
    { id: 34, label: 'Fecha Implementación' },
    { id: 35, label: 'Número de Tareas' },
    { id: 36, label: 'No iniciadas' },
    { id: 37, label: 'En proceso' },
    { id: 38, label: 'Concluidas' },
    { id: 39, label: 'Avance' },
    { id: 40, label: 'Estado' },
    { id: 41, label: 'Fecha Seguimiento' },
    { id: 42, label: 'Comentarios tareas Concluidas' },
    { id: 43, label: 'Comentarios Tareas en Proceso' },
    { id: 44, label: 'Fecha Implementación Acción' }
  ];



  const [availableFields, setAvailableFields] = useState(
    camposDeOportunidades.map(field => ({ ...field, selected: false }))
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
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Matriz de Oportunidades</CardTitle>
          </CardHeader>
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
                    <div className="text-danger text-center">Debe seleccionar al menos un campo de Matriz de Oportunidad.</div>
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
                    onClick={() => { formik.handleReset(); setSelectedFields([]); setFilterText(''); setAvailableFields(camposDeOportunidades.map(field => ({ ...field, selected: false }))); }}
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

export default ReporteOportunidades
