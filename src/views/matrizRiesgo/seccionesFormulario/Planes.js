import { React, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Row, Col, FormGroup, Label, Button, } from 'reactstrap'
import { getTablaDescripcionNivel, getTablaDescripcionMatrizR } from '../controller/MatrizRiesgoController';
import * as Yup from "yup"
import { buildSelectTwo } from 'src/functions/Function'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

var _ = require('lodash');

const PlanesAccion = ({ nextSection, beforeSection, setObject, initValues, isEdit }) => {

  const formik = Yup.object().shape({
      nroPlanes: Yup.string().nullable(),
      planesAccion: Yup.array().of(
        Yup.object().shape({
          nroPlan: Yup.number().nullable(),
          estrategia: Yup.string().nullable(),
          descripcion: Yup.string().nullable(),
          cargo: Yup.mixed().nullable(),
          fechaAccion: Yup.date().nullable(),
          fechaImpl: Yup.date().nullable(),
          estado: Yup.mixed().nullable()
        })
      )
  });

  function onChangeControles(e, field, values, setValues) {
    // update dynamic form
    const planesAccion = [...values.planesAccion];
    const nroPlanes = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < nroPlanes) {
      for (let i = previousNumber; i < nroPlanes; i++) {
        planesAccion.push({ nroPlan: i+1, estrategia: '', descripcion: '', cargo: '', fechaAccion: '', fechaImpl: '', estado: '' });
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
    const data = {
      ...values,
    }
    // display form field values on success
    //alert(JSON.stringify(_.omit(data, ['nroPlanes']), null, 10));
    console.log('datos que se enviaran SECCION 5:', _.omit(data, ['nroPlanes']))
    setObject(_.omit(data, ['nroPlanes']));
    nextSection(5);
  }

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Estrategia para Administrar el Riesgo
  const [dataApiEstrategia, setDataApiEstrategia] = useState([])
  const callApiEstrategia = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEstrategia(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

   // Cargo
   const [dataApiCargo, setDataApiCargo] = useState([])
   const callApiCargo = (idTablaDes) => {
     getTablaDescripcionNivel(idTablaDes)
       .then(res => {
         const options = buildSelectTwo(res.data, 'id', 'nombre', false)
         setDataApiCargo(options)
       }).catch((error) => {
         console.log('Error: ', error)
       })
   }

  useEffect(() => {
    callApiCargo(7);
    callApiEstrategia(10);
  }, [])

  // Despliegue de dataApi Patametros en options (Select)
  const optionsEstrategia = () => {
    const deployOption = dataApiEstrategia.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsCargo = () => {
    const deployOption = dataApiCargo.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.label}</option>
      )
    });
    return deployOption;
  }

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // Autocompleta nombre, criticidad y valoracion de Macroproceso
  /* useEffect(() => {
    if(formik.fields !== null || formik.fields !== ''){
      console.log('no es nulo');
      formik.setFieldValue('macroNombre', formik.values.procesoId.nombre, false)
      formik.setFieldValue('macroCriticidad', formik.values.procesoId.descripcion, false)
      formik.setFieldValue('macroValoracion', formik.values.procesoId.campoA, false)
    }else{
      console.log('es nulo');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.fields]); */

  return (
    <Formik initialValues={initValues} validationSchema={formik} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues }) => (
        <Form >
          <Row className='pt-4'>
            <Col sm='12' md='6'>
              <Row>
                <Label xs='6' md='6' xl='6' className='text-label'>Nro. de planes de acción</Label>
                <Col xs='6' md='6' xl='6'>
                  <Field name="nroPlanes">
                    {({ field }) => (
                      <select {...field} className={'form-control' + (errors.nroPlanes && touched.nroPlanes ? ' is-invalid' : '')} onChange={e => onChangeControles(e, field, values, setValues)}>
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
          {/* {console.log('Valuesdss:', values.planesAccion) */}
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
                        rows="1"
                        className={'form-control' + (planErrors.descripcion && planTouched.descripcion ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`planesAccion.${i}.descripcion`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Cargo</Label>
                      <Field
                        name={`planesAccion.${i}.cargo`}
                        className={'form-control' + (planErrors.cargo && planTouched.cargo ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsCargo()}
                      </Field>
                      <ErrorMessage name={`planesAccion.${i}.cargo`} component="div" className="invalid-feedback" />
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
                        <option value="Concluido">Concluido</option>
                      </Field>
                      <ErrorMessage name={`planesAccion.${i}.estado`} component="div" className="invalid-feedback" />
                    </FormGroup>

                  </Row>
                </div>
              );
            }))}
          </FieldArray>

          <div className='d-flex justify-content-between pt-4'>
            <Button
              style={{ width: '130px' }}
              className='text-white'
              color="primary"
              onClick={() => beforeSection(5)}
            >
              <ChevronLeft size={17} className='mr-1'/>
              Atrás
            </Button>
            <Button
              style={{ width: '130px' }}
              color="dark"
              outline
              type='reset'
            /* onClick={() => { formik.handleReset() }}
            disabled={(!formik.dirty || formik.isSubmitting)} */
            >
              <Delete size={17} className='mr-2'/>
              Limpiar
            </Button>
            <Button
              style={{ width: '130px' }}
              className='text-white'
              color="primary"
              type="submit"
              //disabled={formik.isSubmitting}
            >
              Siguiente
              <ChevronRight size={17} className='ml-1'/>
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export default PlanesAccion

