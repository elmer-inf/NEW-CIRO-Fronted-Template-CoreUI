import { React, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Row, Col, FormGroup, Label, Button, } from 'reactstrap'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import * as Yup from "yup"
import { buildSelectThree, buildSelectTwo } from 'src/functions/Function'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CInputReact } from 'src/reusable/CInputReact'
import Select from "react-select";

var _ = require('lodash');

const Controles = ({ nextSection, beforeSection, setObject, initValues, dataAux, dataApiControl, optionsObjetivo, isEdit }) => {

  const formik = Yup.object().shape({
    controlId: Yup.mixed().required('Campo obligatorio'),
    controlObjetivo: Yup.mixed().required('Campo obligatorio'),
    controlComentario: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').nullable(),
    // campos solo para mostrar
    controlValoracion: Yup.string().nullable(),
    controlDisminucion: Yup.string().nullable(),

    controlesTiene: Yup.string().required('Campo obligatorio'),
    nroControles: Yup.string().nullable().when('controlesTiene', {
      is: (val) => (val === 'true'),
      then: Yup.string().nullable().required("Campo obligatorio"),
    }),

    controles: Yup.array().of(
      Yup.object().shape({
        nroControl: Yup.number().nullable(),
        descripcion: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').nullable(),
        formalizado: Yup.string().nullable(),
        norma: Yup.mixed().nullable(),
        tipo: Yup.mixed().nullable(),
        nivel: Yup.mixed().nullable()
      })
    )
  });

  function onChangeControles(e, field, values, setValues) {
    // update dynamic form
    const controles = [...values.controles];
    const nroControles = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < nroControles) {
      for (let i = previousNumber; i < nroControles; i++) {
        controles.push({ nroControl: i + 1, descripcion: '', formalizado: false, norma: '', tipo: '', nivel: '' });
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
    /* if(typeof values.controlObjetivo === 'object'){
      console.log('SI es objeto');
    } else{
      console.log('NO es objeto');
    } */
    const data = {
      ...values,
      controlesTiene: Boolean(values.controlesTiene),

      controlId: (values.controlId !== null)
        ? (Number.isInteger(values.controlId))
          ? values.controlId
          : values.controlId.value
        : 0,

      controlObjetivo: (values.controlObjetivo !== null)
        ? (typeof values.controlObjetivo === 'object')
          ? values.controlObjetivo.value
          : values.controlObjetivo
        : "",
    }
    console.log('datos que se enviaran SECCION 3:', _.omit(data, ['nroControles']));

    setObject(_.omit(data, ['nroControles']), values);
    nextSection(3);
  }

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Procedimiento
  const [dataApiProcedimiento, setDataApiProcedimiento] = useState([])
  const callApiProcedimiento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'nombre', 'descripcion', true);
        setDataApiProcedimiento(_.filter(options, ['campoA', dataAux.procedimientoAux])); /* campoA */
        /* setDataApiProcedimiento(options); */
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo Control
  const [dataApiTipoControl, setDataApiTipoControl] = useState([])
  const callApiTipoControl = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
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
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiNivelAuto(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiProcedimiento(16);
    callApiTipoControl(6);
    callApiNivelAuto(7);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAux])

  const optionsTipoControl = () => {
    const deployOption = dataApiTipoControl.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.label}</option>
      )
    });
    return deployOption;
  }

  const optionsNivelAuto = () => {
    const deployOption = dataApiNivelAuto.map((item, i) => {
      return (
        <option key={i} value={item.label}>{item.label}</option>
      )
    });
    return deployOption;
  }
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // Style Select
  const customStyles = {
    menu: provided => ({ ...provided, zIndex: "9999 !important" }),
    control: (styles,) => ({
      ...styles,
      boxShadow: 'none'
    }),
    option: (styles, { isDisabled, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? '#e79140' : 'white',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          backgroundColor: '#e79140',
          color: 'white'
        },
        ':hover': {
          backgroundColor: isSelected ? '#e79140' : '#fbf3eb',
          color: isSelected ? 'white' : '#e79140'
        }
      }
    }
  }

  // Busca valor del Control
  const findValorControl = (args) => {
    var result = '';
    if (Number.isInteger(args)) {
      if (args !== '' && _.find(dataApiControl, ['id', _.toInteger(args)]) !== undefined) {
        result = _.find(dataApiControl, ['id', _.toInteger(args)]).campoA + '. ' + _.find(dataApiControl, ['id', _.toInteger(args)]).nombre;
      }
    } else {
      if (args !== null && _.find(dataApiControl, ['id', _.toInteger(args.value)]) !== undefined) {
        result = _.find(dataApiControl, ['id', _.toInteger(args.value)]).campoA + '. ' + _.find(dataApiControl, ['id', _.toInteger(args.value)]).nombre;
      }
    }
    return result;
  }

  // Busca Disminucion del Control
  const findDisminucionControl = (args) => {
    var result = '';
    if (Number.isInteger(args)) {
      if (args !== '' && _.find(dataApiControl, ['id', _.toInteger(args)]) !== undefined) {
        result = _.find(dataApiControl, ['id', _.toInteger(args)]).campoB;
      }
    } else {
      if (args !== null && _.find(dataApiControl, ['id', _.toInteger(args.value)]) !== undefined) {
        result = _.find(dataApiControl, ['id', _.toInteger(args.value)]).campoB;
      }
    }
    return result;
  }

  // Construye objeto para Select NORMA
  const buildSelectNorma = (i) => {
    var result = null;
    try {
      if (initValues.controles[i] !== null && initValues.controles[i] !== undefined && initValues.controles[i] !== NaN) {
        result = { value: initValues.controles[i]['norma'], label: initValues.controles[i]['norma'] };
      }
    } catch (error) {
      console.error('Error en funcion buildSelectNorma: ', error);
      result = null;
    }
    return result;
  }

  return (
    <Formik initialValues={initValues} validationSchema={formik} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues, setFieldValue }) => (
        <Form>
          <Row className='pt-4'>
            <Col sm='12' md='12' xl='3'>
              <Label>Ponderación Control</Label>
              <Select
                placeholder="Seleccionar"
                onChange={selectedOption => {
                  setFieldValue('controlId', selectedOption.value, false)
                }}
                options={dataApiControl}
                name={'controlId'}
                styles={customStyles}
                defaultValue={initValues.controlId}
                className={(errors.controlId && touched.controlId ? ' is-invalid' : '')}
              />
              <ErrorMessage name="controlId" component="div" className="invalid-feedback" />
            </Col>

            <Col sm='12' md='12' xl='9'>
              <Label className='form-label'>
                Valoración de Control
              </Label>
              <CInputReact
                type={"textarea"}
                id={'controlValoracion'}
                value={findValorControl(values.controlId)}
                disabled={true}
                rows={1}
              />
            </Col>

            <Col sm='12' md='6' xl='6'>
              <Label className='form-label'>
                % Disminución del control
              </Label>
              <CInputReact
                type={"text"}
                id={'controlDisminucion'}
                value={findDisminucionControl(values.controlId)}
                disabled={true}
              />
            </Col>

            <Col sm='12' md='6' xl='6'>
              <Label>Objetivo Control</Label>
              <Select
                placeholder="Seleccionar"
                onChange={selectedOption => {
                  setFieldValue('controlObjetivo', selectedOption.value, false)
                }}
                options={optionsObjetivo}
                name={'controlObjetivo'}
                styles={customStyles}
                defaultValue={initValues.controlObjetivo}
                className={(errors.controlObjetivo && touched.controlObjetivo ? ' is-invalid' : '')}
              />
              <ErrorMessage name="controlObjetivo" component="div" className="invalid-feedback" />
            </Col>


            <Col sm='12' md='6'>
              <Row>
                <Label xs='6' md='6' xl='6' className='text-label'>¿Tiene Controles?</Label>
                <Col xs='6' md='6' xl='6'>
                  <Field type="radio" name="controlesTiene" value="true" className={(errors.controlesTiene && touched.controlesTiene ? ' is-invalid' : '')} />
                  <Label className='px-3'>Si</Label>
                  <Field type="radio" name="controlesTiene" value="false" className={(errors.controlesTiene && touched.controlesTiene ? ' is-invalid' : '')} />
                  <Label className='pl-3'>No</Label>
                  <ErrorMessage name="controlesTiene" component="div" className="invalid-feedback" />
                </Col>
              </Row>
            </Col>

            {values.controlesTiene === 'false' ?
              <Col sm='12' md='6'>
                <Label>Comentario</Label>
                <Field
                  name="controlComentario"
                  as="textarea"
                  className={'form-control' + (errors.controlComentario && touched.controlComentario ? ' is-invalid' : '')}
                />
                <ErrorMessage name="controlComentario" component="div" className="invalid-feedback" />
              </Col>
              : null}

            {values.controlesTiene === 'true' ?
              <Col sm='12' md='6'>
                <Row>
                  <Label xs='6' md='6' xl='6' className='text-label'>Nro. de controles</Label>
                  <Col xs='6' md='6' xl='6'>
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
                </Row>
              </Col>
              : null}
          </Row>

          {values.controlesTiene === 'true' ?
            <FieldArray name="controles">
              {() => (values.controles.map((control, i) => {
                const controlErrors = (errors.controles?.length && errors.controles[i]) || {};
                const controlTouched = (touched.controles?.length && touched.controles[i]) || {};
                return (
                  <div key={i}>
                    <div className='divider divider-left divider-dark'>
                      <div className='divider-text '><span className='text-label'>Control {i + 1}</span></div>
                    </div>
                    <Row>
                      <FormGroup tag={Col} md='6' lg='9' className='mb-2'>
                        <Label>Descripción</Label>
                        <Field
                          name={`controles.${i}.descripcion`}
                          as="textarea"
                          className={'form-control' + (controlErrors.descripcion && controlTouched.descripcion ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name={`controles.${i}.descripcion`} component="div" className="invalid-feedback" />
                      </FormGroup>

                      <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                        {/* <Field
                          name={`controles.${i}.formalizado`}
                          type="checkbox"
                          className={'mr-2' + (controlErrors.formalizado && controlTouched.formalizado ? ' is-invalid' : '')}
                        />
                        <Label>¿Está Formalizado?</Label> */}
                        <Label>¿Está Formalizado?</Label><br />
                        <Field
                          type="radio"
                          name={`controles.${i}.formalizado`}
                          value="true"
                          className={'mr-2' + (controlErrors.formalizado && controlTouched.formalizado ? ' is-invalid' : '')} />
                        <Label className='px-3'>Si</Label>
                        <Field
                          type="radio"
                          name={`controles.${i}.formalizado`}
                          value="false"
                          className={'mr-2' + (controlErrors.formalizado && controlTouched.formalizado ? ' is-invalid' : '')}
                          onChange={ () => {
                            setFieldValue(`controles.${i}.formalizado`, 'false', false);
                            setFieldValue(`controles.${i}.norma`, '', true)
                          }}
                          />
                        <Label className='pl-3'>No</Label>
                        <ErrorMessage name={`controles.${i}.formalizado`} component="div" className="invalid-feedback" />
                      </FormGroup>

                      <FormGroup tag={Col} md='6' lg='6' className='mb-2'>
                        <Label>Norma/procedimiento en la que está formalizado</Label>
                        <Select
                          placeholder="Seleccionar"
                          onChange={selectedOption => {
                            setFieldValue(`controles.${i}.norma`, selectedOption.label, false)
                          }}
                          // onInputChange={e =>{return (control.formalizado=== 'false' || control.formalizado === false)?setFieldValue(`controles.${i}.norma`, null, false):null}}
                          //value={selectedOption =>   console.log('selectedOption: ', selectedOption)                        }
                          options={dataApiProcedimiento}
                          name={`controles.${i}.norma`}
                          styles={customStyles}
                          defaultValue={buildSelectNorma(i)}
                          className={(controlErrors.norma && controlTouched.norma ? ' is-invalid' : '')}
                          //isClearable={true}
                          isDisabled={control.formalizado === 'true' ? false : true}
                        />
                        <ErrorMessage name={`controles.${i}.norma`} component="div" className="invalid-feedback" />
                      </FormGroup>

                      <FormGroup tag={Col} md='6' lg='3' className='mb-2'>
                        <Label>Tipo de control</Label>
                        <Field
                          name={`controles.${i}.tipo`}
                          className={'form-control' + (controlErrors.tipo && controlTouched.tipo ? ' is-invalid' : '')}
                          as={"select"}
                        >
                          <option value="">Seleccionar</option>
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
                          <option value="">Seleccionar</option>
                          {optionsNivelAuto()}
                        </Field>
                        <ErrorMessage name={`controles.${i}.nivel`} component="div" className="invalid-feedback" />
                      </FormGroup>

                    </Row>
                  </div>
                );
              }))}
            </FieldArray>
            : null}

          <div className='d-flex justify-content-between pt-4'>
            <Button
              style={{ width: '130px' }}
              className='text-white'
              color="primary"
              onClick={() => beforeSection(3)}
            >
              <ChevronLeft size={17} className='mr-1' />
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
              <Delete size={17} className='mr-2' />
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
              <ChevronRight size={17} className='ml-1' />
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export default Controles

