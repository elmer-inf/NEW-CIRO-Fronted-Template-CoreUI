import { React, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Row, Col, FormGroup, Label, Button, } from 'reactstrap'
import * as Yup from "yup"
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { CInputReact } from 'src/reusable/CInputReact'
import Select from "react-select";

var _ = require('lodash');

const Controles = ({ nextSection, beforeSection, setObject, initValues, dataApiFortaleza, isEdit }) => {

  const formik = Yup.object().shape({
    fortalezaId: Yup.mixed().nullable(),
    // campos solo para mostrar
    fortalezaValoracion: Yup.string().nullable(),

    controlComentario: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').nullable(),
    controlesTiene: Yup.string().required('Campo obligatorio'),
    nroControles : Yup.string().nullable().when('controlesTiene',{
      is:(val) =>  (val === 'true'),
      then: Yup.string().nullable().required("Campo obligatorio"),
    }),
    controles: Yup.array().of(
      Yup.object().shape({
        nroControl: Yup.number().nullable(),
        descripcion: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').nullable(),
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
        controles.push({ nroControl: i + 1, descripcion: '' });
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
      fortalezaId: (values.fortalezaId !== null)
        ? (Number.isInteger(values.fortalezaId))
          ? values.fortalezaId
          : values.fortalezaId.value
        : 0,
    }

    // display form field values on success
    //alert(JSON.stringify(_.omit(data, ['nroControles']), null, 10));
    console.log('datos que se enviaran SECCION 4:', _.omit(data, ['nroControles']))
    setObject(_.omit(data, ['nroControles']), values);
    nextSection(4);
  }

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

  // Busca valor literal de Fortaleza
  const findValueFortaleza = (args) => {
    var result = '';
    if (Number.isInteger(args)) {
      if (args !== '' && _.find(dataApiFortaleza, ['id', _.toInteger(args)]) !== undefined) {
        result = _.find(dataApiFortaleza, ['id', _.toInteger(args)]).campoA + '. ' + _.find(dataApiFortaleza, ['id', _.toInteger(args)]).nombre
      }
    } else {
      if (args !== null && _.find(dataApiFortaleza, ['id', _.toInteger(args.value)]) !== undefined) {
        result = _.find(dataApiFortaleza, ['id', _.toInteger(args.value)]).campoA + '. ' + _.find(dataApiFortaleza, ['id', _.toInteger(args.value)]).nombre
      }
    }
    return result;
  }


  return (
    <Formik initialValues={initValues} validationSchema={formik} onSubmit={onSubmit}>
      {({ errors, values, touched, setValues, setFieldValue }) => (
        <Form>
          <Row className='pt-4'>
            <Col sm='12' md='12' xl='3'>
              <Label>Ponderación Control/Fortaleza</Label>
              <Select
                placeholder="Seleccionar"
                onChange={selectedOption => {
                  setFieldValue('fortalezaId', selectedOption.value, false)
                }}
                options={dataApiFortaleza}
                name={'fortalezaId'}
                styles={customStyles}
                defaultValue={initValues.fortalezaId}
                className={(errors.fortalezaId && touched.fortalezaId ? ' is-invalid' : '')}
              />
              <ErrorMessage name="fortalezaId" component="div" className="invalid-feedback" />
            </Col>

            <Col sm='12' md='12' xl='9'>
              <Label className='form-label'>
                Valoración de la Fortaleza Actual
              </Label>
              <CInputReact
                type={"textarea"}
                id={'fortalezaValoracion'}
                value={findValueFortaleza(values.fortalezaId)}
                disabled={true}
                rows={2}
              />
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
                          <option value="">Seleccionar</option>
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
                /* console.log('Console log control: ', control); */
                const controlErrors = (errors.controles?.length && errors.controles[i]) || {};
                const controlTouched = (touched.controles?.length && touched.controles[i]) || {};
                return (
                  <div key={i}>
                    <div className='divider divider-left divider-dark'>
                      <div className='divider-text '><span className='text-label'>Control o Fortaleza {i + 1}</span></div>
                    </div>
                    <Row>
                      <FormGroup tag={Col} md='12' className='mb-2'>
                        <Label>Descripción</Label>
                        <Field
                          name={`controles.${i}.descripcion`}
                          as="textarea"
                          className={'form-control' + (controlErrors.descripcion && controlTouched.descripcion ? ' is-invalid' : '')}
                        />
                        <ErrorMessage name={`controles.${i}.descripcion`} component="div" className="invalid-feedback" />
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
              onClick={() => beforeSection(4)}
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

