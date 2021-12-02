/* Formik FieldArray */
import { React, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { X, Plus } from 'react-feather'
import { Row, Col, FormGroup, Label, Button } from 'reactstrap'
import { getTablaDescripcionNivel, getTablaDescripcionMatrizR } from '../controller/MatrizRiesgoController';
import { useFormik } from "formik"
import * as Yup from "yup"
import { buildSelectTwo } from 'src/functions/Function'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

var _ = require('lodash');

const ImportesRelacionados = ({ nextSection, beforeSection, setObject, initValues, isEdit }) => {

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Procedimiento
  const [dataApiProcedimiento, setDataApiProcedimiento] = useState([])
  const callApiProcedimiento = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiProcedimiento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo Control
  const [dataApiTipoControl, setDataApiTipoControl] = useState([])
  const callApiTipoControl = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiTipoControl(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Nivel de Automatización
  const [dataApiNivelAuto, setDataApiNivelAuto] = useState([])
  const callApiNivelAuto = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiNivelAuto(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

   // Control
   const [dataApiControl, setDataApiControl] = useState([])
   const callApiControl = (idTablaDes) => {
     getTablaDescripcionMatrizR(idTablaDes)
       .then(res => {
         const options = buildSelectTwo(res.data, 'id', 'campoB', true)
         setDataApiControl(options)
       }).catch((error) => {
         console.log('Error: ', error)
       })
   }

  useEffect(() => {
    callApiProcedimiento(16);
    callApiTipoControl(6);
    callApiNivelAuto(7);
    callApiControl(5);
  }, [])

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */


  const initialValues = {
    nroControles: '',
    controles: []
  };

  const formik = Yup.object().shape({
    nroControles: Yup.string().nullable(),
    controles: Yup.array().of(
      Yup.object().shape({
        descripcion: Yup.string().required('Campo obligatorio'),
        formalizado: Yup.string().nullable(),
        norma: Yup.mixed().required('Campo obligatorio'),
        tipo: Yup.mixed().nullable(),
        nivel: Yup.mixed().nullable(),
        ponderacion: Yup.mixed().nullable()
      })
    ),
    // campos solo para mostrar
    controlValoracion : Yup.string().nullable(),
    controlDisminucion : Yup.string().nullable(),
  });

  function onChangeControles(e, field, values, setValues) {
    // update dynamic form
    const controles = [...values.controles];
    const nroControles = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < nroControles) {
      for (let i = previousNumber; i < nroControles; i++) {
        controles.push({ descripcion: '', formalizado: false, norma: '', tipo: '', nivel: '', ponderacion: '' });
      }
    } else {
      for (let i = previousNumber; i >= nroControles; i--) {
        controles.splice(i, 1);
      }
    }
    setValues({ ...values, controles });

    // call formik onChange method
    field.onChange(e);
  }

  function onSubmit(values) {
    const data = {
      ...values,

    }
    // display form field values on success
    alert(JSON.stringify(_.omit(data, ['nroControles']), null, 10));
    console.log('datos que se enviaran SECCION 3:', data)
    setObject(data);
    nextSection(3);

  


  }





  const optionsProcedimiento = () => {
    const deployOption = dataApiProcedimiento.map((item, i) => {
      return (
        <option key={i} value={item.value}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsTipoControl = () => {
    const deployOption = dataApiTipoControl.map((item, i) => {
      return (
        <option key={i} value={item.value}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsNivelAuto = () => {
    const deployOption = dataApiNivelAuto.map((item, i) => {
      return (
        <option key={i} value={item.value}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsControl = () => {
    const deployOption = dataApiControl.map((item, i) => {
      return (
        <option key={i} value={item.value}>{item.label}</option>
      )
    });
    return deployOption;
  }

  // Autocompleta Probabilidad inherente, porcentaje y valoracion
  /* useEffect(() => {
    if(formik.values.ponderacion !== null){
      console.log('');
      formik.setFieldValue('controlValoracion', formik.values.ponderacion.nombre, false)
      formik.setFieldValue('controlDisminucion', formik.values.ponderacion.campoD, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.ponderacion]); */


  return (
    <Formik initialValues={initialValues} validationSchema={formik} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues }) => (
        <Form>
          <FormGroup row className='justify-content-center pt-4'>
            <Label sm='8'  xl='2' className='text-label'>Nro. de controles</Label>
            <Col sm='4'  xl='2'>
              <Field name="nroControles">
                {({ field }) => (
                  <select {...field} className={'form-control' + (errors.nroControles && touched.nroControles ? ' is-invalid' : '')} onChange={e => onChangeControles(e, field, values, setValues)}>
                    <option value="" disabled>Seleccionar</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                      <option key={i} value={i}>{i}</option>
                    )}
                  </select>
                )}
              </Field>
              <ErrorMessage name="nroControles" component="div" className="invalid-feedback" />
            </Col>
          </FormGroup>

          <FieldArray name="controles">
            {() => (values.controles.map((control, i) => {
              const controlErrors = errors.controles?.length && errors.controles[i] || {};
              const controlTouched = touched.controles?.length && touched.controles[i] || {};
              return (
                <div key={i}>
                  <div className='divider divider-left divider-dark'>
                    <div className='divider-text '><span className='text-label'>Control {i + 1}</span></div>
                  </div>
                  <Row>
                    <FormGroup tag={Col} md='6' lg='4' className='mb-2'>
                      <Label>Descripción</Label>
                      <Field
                        name={`controles.${i}.descripcion`}
                        as="textarea"
                        className={'form-control' + (controlErrors.descripcion && controlTouched.descripcion ? ' is-invalid' : '')}
                      />
                      <ErrorMessage name={`controles.${i}.descripcion`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='2' className='mb-2'>
                      <Field
                        name={`controles.${i}.formalizado`}
                        type="checkbox"
                        className={'mr-2' + (controlErrors.formalizado && controlTouched.formalizado ? ' is-invalid' : '')}
                      />
                      <Label>¿Está Formalizado?</Label>
                      <ErrorMessage name={`controles.${i}.formalizado`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Norma/procedimiento en la que está formalizado</Label>
                      <Field
                        name={`controles.${i}.norma`}
                        className={'form-control' + (controlErrors.norma && controlTouched.norma ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsProcedimiento()}
                      </Field>
                      <ErrorMessage name={`controles.${i}.norma`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Tipo de control</Label>
                      <Field
                        name={`controles.${i}.tipo`}
                        className={'form-control' + (controlErrors.tipo && controlTouched.tipo ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsTipoControl()}
                      </Field>
                      <ErrorMessage name={`controles.${i}.tipo`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Nivel de Automatización</Label>
                      <Field
                        name={`controles.${i}.nivel`}
                        className={'form-control' + (controlErrors.nivel && controlTouched.nivel ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsNivelAuto()}
                      </Field>
                      <ErrorMessage name={`controles.${i}.nivel`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                      <Label>Ponderación Control</Label>
                      <Field
                        name={`controles.${i}.ponderacion`}
                        className={'form-control' + (controlErrors.ponderacion && controlTouched.ponderacion ? ' is-invalid' : '')}
                        as={"select"}
                      >
                        <option value="" disabled>Seleccionar</option>
                        {optionsControl()}
                      </Field>
                      <ErrorMessage name={`controles.${i}.ponderacion`} component="div" className="invalid-feedback" />
                    </FormGroup>

                    {/* <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                      <Label className='form-label'>
                        Valoración de Control
                      </Label>
                      <CInputReact
                        type={"text"}
                        id={'controlValoracion'}
                        value={formik.values.controlValoracion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.controlValoracion}
                        errors={formik.errors.controlValoracion}
                        disabled={true}
                      />
                    </FormGroup>

                    <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                      <Label className='form-label'>
                        % disminución del control
                      </Label>
                      <CInputReact
                        type={"text"}
                        id={'controlDisminucion'}
                        value={formik.values.controlDisminucion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.controlDisminucion}
                        errors={formik.errors.controlDisminucion}
                        disabled={true}
                      />
                    </FormGroup> */}

                  </Row>
                  {/* <hr className='my-1' /> */}
                </div>
              );
            }))}
          </FieldArray>

          <div className='d-flex justify-content-between pt-4'>
            <Button
              style={{width: '130px'}}
              className='text-white'
              color="primary"
              onClick={() => beforeSection(3)}
            >
              <ChevronLeft size={17} className='mr-1'/>
              Atrás
            </Button>
            <Button
              style={{width: '130px'}}
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
              style={{width: '130px'}}
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

export default ImportesRelacionados

