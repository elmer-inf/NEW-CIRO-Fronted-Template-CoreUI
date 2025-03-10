import { React, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete, Percent } from 'react-feather'
import { Row, Col, FormGroup, Label, Button, } from 'reactstrap'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController'
import * as Yup from "yup"
import { buildSelectTwo } from 'src/functions/Function'
import { countEstadoPlanes, resultAvance } from 'src/functions/FunctionsMatriz'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CBadge, CCallout, CProgress } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next'
import Select from "react-select";
import { Messages } from 'src/reusable/variables/Messages'

var _ = require('lodash');

const PlanesAccion = ({ nextSection, beforeSection, setObject, initValues }) => {

  const formik = Yup.object().shape({
    nroPlanes: Yup.string().nullable(),
    planesAccion: Yup.array().of(
      Yup.object().shape({
        nroPlan: Yup.number().nullable(),
        estrategia: Yup.string().nullable(),
        descripcion: Yup.string().nullable(),
        cargo: Yup.mixed().nullable(),
        correoCargo: Yup.string().nullable(),
        fechaAccion: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).nullable(),
        fechaImpl: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).nullable(),
        estado: Yup.mixed().nullable(),

        fechaSeg: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).nullable(),
        comenPropuesta: Yup.string().nullable(),
        comenEnProceso: Yup.string().nullable(),
        informadoPorCorreo: Yup.string().nullable(),
      })
    ),
    planesAccionEstado: Yup.string().nullable(),
  });

  function onChangePlanes(e, field, values, setValues) {
    // update dynamic form
    const planesAccion = [...values.planesAccion];
    const nroPlanes = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < nroPlanes) {
      for (let i = previousNumber; i < nroPlanes; i++) {
        planesAccion.push({ nroPlan: i + 1, estrategia: '', descripcion: '', cargo: '', correoCargo: '', fechaAccion: '', fechaImpl: '', estado: '', fechaSeg: '', comenPropuesta: '', comenEnProceso: '', informadoPorCorreo: 'NO' });
      }
    } else {
      for (let i = previousNumber; i >= nroPlanes; i--) {
        planesAccion.splice(i, 1);
      }
    }
    setValues({ ...values, planesAccion });

    // call formik onChange method
    field.onChange(e);
  }

  function onSubmit(values) {
    // Para obtener valor de "planesAccionAvance"
    const avance = resultAvance(values.planesAccion);

    const data = {
      ...values,
      planesAccionAvance: avance + '%'
    }
    //console.log('datos que se enviaran SECCION 5:', _.omit(data, ['nroPlanes']))
    setObject(_.omit(data, ['nroPlanes']));
    nextSection(5);
  }

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Estrategia para Administrar el Riesgo
  const [dataApiEstrategia, setDataApiEstrategia] = useState([])
  const callApiEstrategia = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEstrategia(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Cargo
  const [dataApiCargo, setDataApiCargo] = useState([])
  const callApiCargo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true);
        const sortedOptions = _.orderBy(options, ['nombre'], ['asc']);
        setDataApiCargo(sortedOptions);
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    callApiCargo(7);
    callApiEstrategia(4);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Despliegue de dataApi Parametros en options (Select)
  const optionsEstrategia = () => {
    const deployOption = dataApiEstrategia.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsEstado = [
    { value: 'Concluido', label: 'Concluido' },
    { value: 'En proceso', label: 'En proceso' },
    { value: 'No aplica', label: 'No aplica' },
    { value: 'Vencido', label: 'Vencido' }
  ]
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  const columns = [
    {
      dataField: 'nroPlan',
      text: 'Plan',
    }, {
      dataField: 'estrategia',
      text: 'Estrategia',
    }, {
      dataField: 'descripcion',
      text: 'Descripción',
    }, {
      dataField: 'cargo',
      text: 'Cargo',
    }, {
      dataField: 'fechaAccion',
      text: 'Fecha acción',
      style: { whiteSpace: 'nowrap' },
    }, {
      dataField: 'fechaImpl',
      text: 'Fecha implementación',
      style: { whiteSpace: 'nowrap' },
    }, {
      dataField: 'estado',
      text: 'Estado',
      formatter: colorEstado,
    }
  ]

  function colorEstado(cell) {
    if (cell === 'No iniciado') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      )
    }
    if (cell === 'Concluido') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-success-light">{cell}</CBadge>
      )
    }
    if (cell === 'En proceso') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-warning-light">{cell}</CBadge>
      )
    }
    if (cell === 'Vencido') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      )
    }
    if (cell === 'No aplicable') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      )
    }
  }

  // Style Select
  const customStyles = {
    menu: provided => ({ ...provided, zIndex: "9999 !important" }),
    control: (styles,) => ({
      ...styles,
      boxShadow: 'none'
    }),
  }

  // Construye objeto para Select CARGO
  const buildSelectCargo = (i) => {
    var result = null;
    try {
      if (initValues.planesAccion[i] !== null && initValues.planesAccion[i] !== undefined) {
        result = { value: initValues.planesAccion[i]['cargo'], label: initValues.planesAccion[i]['cargo'] };
      }
    } catch (error) {
      console.error('Error en Funcion buildSelectCargo: ', error);
      result = null;
    }
    return result;
  }

  return (
    <Formik initialValues={initValues} validationSchema={formik} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues, setFieldValue }) => (
        <Form className='pt-2'>
          <div className='divider divider-left divider-primary'>
            <div className='divider-text'><span className='text-label text-primary'>Planes de Acción</span></div>
          </div>
          <Row>
            <Col sm='12' md='6'>
              <Row>
                <Label xs='6' md='6' xl='6' className='text-label'>Nro. de planes de acción</Label>
                <Col xs='6' md='6' xl='6'>
                  <Field name="nroPlanes">
                    {({ field }) => (
                      <select {...field} className={'form-control' + (errors.nroPlanes && touched.nroPlanes ? ' is-invalid' : '')} onChange={e => onChangePlanes(e, field, values, setValues)}>
                        <option value="" disabled>Seleccionar</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                          <option key={i} value={i}>{i}</option>
                        )}
                      </select>
                    )}
                  </Field>
                  <ErrorMessage name="nroPlanes" component="div" className="invalid-feedback" />
                </Col>
              </Row>

            </Col>
          </Row>

          <FieldArray name="planesAccion">
            {() => (values.planesAccion.map((plan, i) => {
              const planErrors = (errors.planesAccion?.length && errors.planesAccion[i]) || {};
              const planTouched = (touched.planesAccion?.length && touched.planesAccion[i]) || {};
              return (
                <div key={i}>
                  <div className='divider divider-left divider-dark'>
                    <div className='divider-text '><span className='text-label'>Plan de acción {i + 1}</span></div>
                  </div>
                  <Row>
                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Estrategia para Administrar el Riesgo</Label>
                      <Field
                        name={`planesAccion.${i}.estrategia`}
                        className={'form-control' + (planErrors.estrategia && planTouched.estrategia ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsEstrategia()}
                      </Field>
                      <ErrorMessage name={`planesAccion.${i}.estrategia`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='9' className='mb-2'>
                      <Label>Descripción de la Acción</Label>
                      <Field
                        name={`planesAccion.${i}.descripcion`}
                        as="textarea"
                        rows="2"
                        className={'form-control' + (planErrors.descripcion && planTouched.descripcion ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.descripcion`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                      <Label className='form-label'>
                        Cargo
                      </Label>
                      <Select
                        placeholder="Seleccionar"
                        onChange={selectedOption => {
                          setFieldValue(`planesAccion.${i}.cargo`, selectedOption.label, false);
                          // Actualizar 'correoCargo' asegurándose de que cada cambio fuerza la actualización de Formik
                          setFieldValue(`planesAccion.${i}.correoCargo`, ''); // Primero resetear el campo
                          setTimeout(() => {
                            setFieldValue(`planesAccion.${i}.correoCargo`, selectedOption.descripcion); // Luego establecer el nuevo valor
                          }, 50);
                        }}
                        options={dataApiCargo.map(cargo => ({
                          value: cargo.id, // Asumiendo que la propiedad 'id' es la que quieres como valor.
                          label: cargo.nombre, // La propiedad 'nombre' se muestra en el Select.
                          descripcion: cargo.descripcion // Asegurándonos de incluir la descripción para usarla en correoCargo.
                        }))}

                        name={`planesAccion.${i}.cargo`}
                        styles={customStyles}
                        defaultValue={buildSelectCargo(i)}
                        className={(planErrors.cargo && planTouched.cargo ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.cargo`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                      <Label>Correo cargo</Label>
                      <Field
                        name={`planesAccion.${i}.correoCargo`}
                        as="input"
                        className={'form-control' + (planErrors.correoCargo && planTouched.correoCargo ? ' is-invalid' : '')}
                        disabled={true}
                      />
                      <ErrorMessage name={`planesAccion.${i}.correoCargo`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Fecha plan de acción</Label>
                      <Field
                        name={`planesAccion.${i}.fechaAccion`}
                        type="date"
                        className={'form-control' + (planErrors.fechaAccion && planTouched.fechaAccion ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.fechaAccion`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Fecha plan de implementación</Label>
                      <Field
                        name={`planesAccion.${i}.fechaImpl`}
                        type="date"
                        className={'form-control' + (planErrors.fechaImpl && planTouched.fechaImpl ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.fechaImpl`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Estado plan de acción</Label>
                      <Field
                        name={`planesAccion.${i}.estado`}
                        className={'form-control' + (planErrors.estado && planTouched.estado ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        <option value="No iniciado">No iniciado</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Vencido">Vencido</option>
                        <option value="No aplicable">No aplicable</option>
                        <option value="Concluido">Concluido</option>
                      </Field>
                      <ErrorMessage name={`planesAccion.${i}.estado`} component="div" className="invalid-feedback" />
                    </FormGroup>

                  </Row>
                </div>
              );
            }))}
          </FieldArray>

          <FieldArray name="planesAccion">
            {() => (values.planesAccion.map((plan, i) => {
              const planErrors = (errors.planesAccion?.length && errors.planesAccion[i]) || {};
              const planTouched = (touched.planesAccion?.length && touched.planesAccion[i]) || {};
              return (
                <div key={i}>
                  <div className='divider divider-left divider-dark'>
                    <div className='divider-text '><span className='text-label'>Seguimiento: Plan de acción {i + 1}</span></div>
                  </div>
                  <Row>
                    <FormGroup tag={Col} md='6' xl='2' className='mb-2'>
                      <Label>Fecha seguimiento</Label>
                      <Field
                        name={`planesAccion.${i}.fechaSeg`}
                        type="date"
                        className={'form-control' + (planErrors.fechaSeg && planTouched.fechaSeg ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.fechaSeg`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='12' xl='5' className='mb-2'>
                      <Label>Comentarios: Tareas Propuestas</Label>
                      <Field
                        name={`planesAccion.${i}.comenPropuesta`}
                        as="textarea"
                        rows="2"
                        className={'form-control' + (planErrors.comenPropuesta && planTouched.comenPropuesta ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.comenPropuesta`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='12' xl='5' className='mb-2'>
                      <Label>Comentarios: Tareas en Proceso</Label>
                      <Field
                        name={`planesAccion.${i}.comenEnProceso`}
                        as="textarea"
                        rows="2"
                        className={'form-control' + (planErrors.comenEnProceso && planTouched.comenEnProceso ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.comenEnProceso`} component="div" className="invalid-feedback" />
                    </FormGroup>

                  </Row>
                </div>
              );
            }))}
          </FieldArray>

          {
            values.nroPlanes === '' ?
              null :
              <Row className='custom-react-bootstrap-table table-hover-animation mt-2'>
                <Col xs='12'>
                  <BootstrapTable
                    classes={'mt-2'}
                    bootstrap4={true}
                    sort={{ dataField: 'nroPlan', order: 'asc' }}
                    noDataIndication={'No hay registros de Planes de acción'}
                    keyField='nroPlan'
                    data={values.planesAccion}
                    columns={columns}
                    bordered={false}
                    striped={false}
                    hover={false}
                    condensed={false}
                    wrapperClasses="table-responsive"
                  />

                  <div className='divider divider-left divider-primary'>
                    <div className='divider-text '><span className='text-label text-primary'>Seguimiento</span></div>
                  </div>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="info">
                    <div className="text-label">Nro. de Tareas</div>
                    <div className="h4">{values.planesAccion.length}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="danger">
                    <div className="text-label">No iniciadas</div>
                    <div className="h4">{countEstadoPlanes(values.planesAccion, 'No iniciado')}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="warning">
                    <div className="text-label">En proceso</div>
                    <div className="h4">{countEstadoPlanes(values.planesAccion, 'En proceso')}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="danger">
                    <div className="text-label">Vencido</div>
                    <div className="h4">{countEstadoPlanes(values.planesAccion, 'Vencido')}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="danger">
                    <div className="text-label">No aplicable</div>
                    <div className="h4">{countEstadoPlanes(values.planesAccion, 'No aplicable')}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='2'>
                  <CCallout color="success">
                    <div className="text-label">Concluido</div>
                    <div className="h4">{countEstadoPlanes(values.planesAccion, 'Concluido')}</div>
                  </CCallout>
                </Col>

                <Col xs='12' md='6' xl='6' className='pt-3'>
                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <Percent size={15} className='mb-1' />
                      <span className="pl-3 text-label">Avance</span>
                      <span className="ml-auto font-weight-bold">
                        {resultAvance(values.planesAccion)} <Percent size={15} className='mb-1' />
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-sm"
                        color={resultAvance(values.planesAccion) <= 32 ? 'danger' : resultAvance(values.planesAccion) <= 66 ? 'warning' : 'success'}
                        value={resultAvance(values.planesAccion)}
                      />
                    </div>
                  </div>
                </Col>

                <Col xs='12' md='6' xl='6' className='pt-3'>
                  <Row>
                    <Label xs='4' md='3' xl='2' className='text-label'>Estado:</Label>
                    <Col xs='8' md='9' xl='4'>
                      <Select
                        placeholder="Seleccionar"
                        value={optionsEstado.find(option => option.label === values.planesAccionEstado)}
                        onChange={selectedOption => {
                          setFieldValue('planesAccionEstado', selectedOption.label, false);
                        }}
                        options={optionsEstado}
                        name="planesAccionEstado"
                        styles={customStyles}
                        className={(errors.planesAccionEstado && touched.planesAccionEstado ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name="planesAccionEstado" component="div" className="invalid-feedback" />
                    </Col>
                  </Row>
                </Col>
              </Row>
          }


          <Row className='pt-4'>
            <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
              <Button
                outline
                color="primary"
                block
                onClick={() => beforeSection(5)}
              >
                <ChevronLeft size={17} className='mr-1' />
                Atrás
              </Button>
            </Col>
            <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
              <Button
                color="dark"
                block
                type='reset'
              //onClick={() => { formik.handleReset(); }}
              //disabled={!formik.dirty || formik.isSubmitting}
              >
                <Delete size={17} className='mr-2' /> Limpiar
              </Button>
            </Col>
            <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
              <Button
                className='text-white'
                color="primary"
                block
                type="submit"
              >
                Siguiente
                <ChevronRight size={17} className='ml-1' />
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default PlanesAccion

