import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import CInputCheckbox from 'src/reusable/CInputCheckbox'
import CInputRadio from 'src/reusable/CInputRadio'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController'
import { getTablaDescripcionRiesgoN1, getTablaDescripcionRiesgoN2 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import { buildSelectTwo } from 'src/functions/Function'
import { calculaRiesgo, buscaValorLiteralRiesgoI } from 'src/functions/FunctionsMatriz'
import { Messages } from 'src/reusable/variables/Messages'
import CSelectReactTwo from 'src/reusable/CSelectReactTwo'

var _ = require('lodash');

const Riesgos = ({ nextSection, beforeSection, setObject, initValues, optionsMonetario, dataApiRiesgoI, isEdit }) => {

  const formik = useFormik({
    initialValues: { ...initValues, otrosAux2: false },
    validationSchema: Yup.object().shape(
      {
        definicion: Yup.string().required(Messages.required),
        causa: Yup.string().required(Messages.required),
        consecuencia: Yup.string().required(Messages.required),
        efectoPerdidaOtro: Yup.string().nullable().when('otrosAux2', {
          is: (val) => (val === true),
          then: Yup.string().nullable().required(Messages.required),
        }),
        efectoPerdidaId: Yup.mixed().nullable().when('otrosAux2', {
          is: (val) => (val === false),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
        perdidaAsfiId: Yup.mixed().required(Messages.required),
        monetario: Yup.boolean().required(Messages.required),
        factorRiesgoId: Yup.mixed().required(Messages.required),
        probabilidadId: Yup.mixed().required(Messages.required),
        impactoId: Yup.mixed().required(Messages.required),
        // Campos solo para mostrar
        defConcatenado: Yup.string().nullable(),
        otrosAux2: Yup.boolean(),
        riesgoInherente: Yup.number().nullable(),
        valorRiesgoInherente: Yup.string().nullable(),
        probInherente: Yup.string().nullable(),
        probPorcentaje: Yup.string().nullable(),
        probValoracion: Yup.string().nullable(),
        impactoInherente: Yup.string().nullable(),
        impactoPorcentaje: Yup.string().nullable(),
        impactoValoracion: Yup.string().nullable(),

        fraudeInterno: Yup.boolean(),
        tipoFraudeId: Yup.mixed().nullable().when('fraudeInterno', {
          is: (val) => (val === true),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
        subtipoFraudeId: Yup.mixed().nullable().when('fraudeInterno', {
          is: (val) => (val === true),
          then: Yup.mixed().nullable().required(Messages.required),
        }),




        /* definicion : Yup.string().nullable(),
        causa : Yup.string().nullable(),
        consecuencia : Yup.string().nullable(),
        efectoPerdidaOtro: Yup.string().nullable().when('otrosAux2',{
          is:(val) => (val === true),
          then: Yup.string().nullable().required(Messages.required),
        }),
        efectoPerdidaId : Yup.mixed().nullable().when('otrosAux2',{
          is:(val) =>  (val === false),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
        perdidaAsfiId : Yup.mixed().required(Messages.required),
        monetario : Yup.boolean(),
        factorRiesgoId : Yup.mixed().nullable(),
        probabilidadId : Yup.mixed().required(Messages.required),
        impactoId : Yup.mixed().required(Messages.required),
        // Campos solo para mostrar
        defConcatenado : Yup.string().nullable(),
        otrosAux2: Yup.boolean(),
        riesgoInherente : Yup.number().nullable(),
        valorRiesgoInherente : Yup.string().nullable(),
        probInherente : Yup.string().nullable(),
        probPorcentaje : Yup.string().nullable(),
        probValoracion : Yup.string().nullable(),
        impactoInherente : Yup.string().nullable(),
        impactoPorcentaje : Yup.string().nullable(),
        impactoValoracion : Yup.string().nullable(),

        fraudeInterno: Yup.boolean(),
        tipoFraudeId: Yup.mixed().nullable().when('fraudeInterno', {
          is: (val) => (val === true),
          then: Yup.mixed().nullable().required(Messages.required),
        }),
        subtipoFraudeId: Yup.mixed().nullable().when('fraudeInterno', {
          is: (val) => (val === true),
          then: Yup.mixed().nullable().required(Messages.required),
        }),  */
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        efectoPerdidaId: (values.efectoPerdidaId !== null) ? values.efectoPerdidaId.value : 0,
        perdidaAsfiId: (values.perdidaAsfiId !== null) ? values.perdidaAsfiId.value : 0,
        factorRiesgoId: (values.factorRiesgoId !== null) ? values.factorRiesgoId.value : 0,

        probabilidadId: (values.probabilidadId !== null) ? values.probabilidadId.value : 0,
        impactoId: (values.impactoId !== null) ? values.impactoId.value : 0,

        tipoFraudeId: (values.tipoFraudeId !== null) ? values.tipoFraudeId.value : 0,
        subtipoFraudeId: (values.subtipoFraudeId !== null) ? values.subtipoFraudeId.value : 0,
      }
      const dataSelect = _.omit(data, ['defConcatenado', 'probInherente', 'probPorcentaje', 'probValoracion', 'impactoInherente', 'impactoPorcentaje', 'impactoValoracion', 'riesgoInherente', 'valorRiesgoInherente']);
      console.log('datos que se enviaran SECCION 2:', dataSelect)
      setObject(dataSelect, values);
      nextSection(2);
    }
  })

  // Rellena Datos para Editar
  useEffect(() => {
    if (isEdit) {
      formik.setValues({ ...initValues })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues])

  useEffect(() => {
    calculoRiesgoInerente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId, formik.values.impactoId]);

  useEffect(() => {
    if (isEdit) {
      calculoRiesgoInerente();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Efecto de perdida
  const [dataApiEfectoPerdida, setDataApiEfectoPerdida] = useState([])
  const callApiEfectoPerdida = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEfectoPerdida(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Perdida ASFi
  const [dataApiPerdidaAsfi, setDataApiPerdidaAsfi] = useState([])
  const callApiPerdidaAsfi = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiPerdidaAsfi(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Factor de riesgo operativo
  const [dataApiFactorRiesgo, setDataApiFactorRiesgo] = useState([])
  const callApiFactorRiesgo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiFactorRiesgo(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(_.orderBy(options, ['value'], ['desc']))
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Impacto de riesgo
  const [dataApiImpacto, setDataApiImpacto] = useState([])
  const callApiImpacto = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiImpacto(_.orderBy(options, ['value'], ['desc']))
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Tipo de fraude
  const [dataApiTipoFraude, setDataApiTipoFraude] = useState([])
  const callApiTipoFraude = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true);
        setDataApiTipoFraude(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  const clearDependenceOfTipoFraude = () => {
    resetFormikValue('subtipoFraudeId', null);
    setDataApiSubtipoFraude([]);
  }

  const getValueTipoFraude = (value) => {
    if (value !== null) {
      callApiSubtipoFraude(11, value.id);
    }
  }

  const clearInputTipoFraude = (id) => {
    formik.setFieldValue(id, null, false);
    resetFormikValue('subtipoFraudeId', null);
  }

  const resetFormikValue = (field, valueToReset) => {
    formik.setFieldValue(field, valueToReset, false);
  }

  // Subtipo de fraude (Nivel 2), Tipo de fraude
  const [dataApiSubtipoFraude, setDataApiSubtipoFraude] = useState([])
  const callApiSubtipoFraude = (idTablaDes, idNivel2) => {
    getTablaDescripcionRiesgoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false);
        setDataApiSubtipoFraude(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Para el despliegue del select llenado al EDITAR
  useEffect(() => {
    if (isEdit && initValues.tipoFraudeId !== null) {
      callApiSubtipoFraude(11, initValues.tipoFraudeId.id);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    callApiProbabilidad(2);
    callApiImpacto(3);
    callApiEfectoPerdida(19)
    callApiPerdidaAsfi(1)
    callApiFactorRiesgo(26);
    callApiTipoFraude(10) //12
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // Concatena definicion, causa y consecuencia
  useEffect(() => {
    if (formik.values.definicion !== '' && formik.values.causa !== '' && formik.values.consecuencia !== '') {
      formik.setFieldValue('defConcatenado', 'RIESGO POR ' + formik.values.definicion + ' DEBIDO A ' + formik.values.causa + ' PUEDE OCASIONAR ' + formik.values.consecuencia, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.definicion, formik.values.causa, formik.values.consecuencia]);

  // Autocompleta Probabilidad inherente, porcentaje y valoracion
  useEffect(() => {
    if (formik.values.probabilidadId !== null) {
      formik.setFieldValue('probInherente', formik.values.probabilidadId.campoA, false)
      formik.setFieldValue('probPorcentaje', formik.values.probabilidadId.campoG, false)
      formik.setFieldValue('probValoracion', formik.values.probabilidadId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId]);

  // Autocompleta Impacto inherente, porcentaje y valoracion
  useEffect(() => {
    if (formik.values.impactoId !== null) {
      formik.setFieldValue('impactoInherente', formik.values.impactoId.campoA, false)
      formik.setFieldValue('impactoPorcentaje', formik.values.impactoId.campoG, false)
      formik.setFieldValue('impactoValoracion', formik.values.impactoId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.impactoId]);

  // Obtiene el Riesgo inherente y si valoracion (Formula entre Probabilidad e impacto)
  const calculoRiesgoInerente = () => {
    if (formik.values.probabilidadId !== null && formik.values.impactoId !== null) {
      const prob = parseInt(formik.values.probabilidadId.campoA);
      const imp = parseInt(formik.values.impactoId.campoA);
      const riesgo = calculaRiesgo(prob, imp);
      formik.setFieldValue('riesgoInherente', riesgo, false)

      var riesgoValAux = buscaValorLiteralRiesgoI(dataApiRiesgoI, riesgo)
      formik.setFieldValue('valorRiesgoInherente', riesgoValAux, false)
    }
  }

  // Resetea "otros" dependiendo del check
  const resetOtros = () => { formik.setFieldValue('efectoPerdidaOtro', null, false); }
  useEffect(() => {
    if (formik.values.otrosAux2 !== true) {
      resetOtros();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.otrosAux2])


  // Resetea "Tipo fraude Inteno" y "Subtipo fraude interno" dependiendo del check "Fraude interno"

  useEffect(() => {
    if (!formik.values.fraudeInterno) {
      formik.setFieldValue('tipoFraudeId', null, false);
      formik.setFieldValue('subtipoFraudeId', null, false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fraudeInterno])


  // Forzar validación de campos segun el campo fraudeInterno
  useEffect(() => {
    if (formik.values.fraudeInterno) {
      formik.setFieldTouched('tipoFraudeId', true, true);
      formik.setFieldTouched('subtipoFraudeId', true, true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.fraudeInterno]);



  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className='divider divider-left divider-dark pt-3'>
          <div className='divider-text'><span className='text-label'>Definición del Riesgo</span></div>
        </div>
        <Row className="pt-1">
          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>1</b> Definición del Riesgo ¿Qué Riesgos indentifica en su proceso o qué podría salir mal?
              <span className='text-label'> RIESGO DE</span> (contextualizar qué podría pasar) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'definicion'}
              value={formik.values.definicion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.definicion}
              errors={formik.errors.definicion}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>2</b> Causa del Riesgo o debilidad ¿Cuál es la causa para que ocurra el riesgo?
              <span className='text-label'> DEBIDO A</span> (causa por la que ocurriría) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'causa'}
              value={formik.values.causa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.causa}
              errors={formik.errors.causa}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>3</b> Consecuencia si es que pasa el Riesgo ¿Qué consecuencias o qué pasaría si ocurre el riesgo?
              <span className='text-label'> PUEDE OCASIONAR</span> (consecuencia) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'consecuencia'}
              value={formik.values.consecuencia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.consecuencia}
              errors={formik.errors.consecuencia}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              Definición del Riesgo (Riesgo por (<span className='text-label'>EVENTO</span>),
              debido a (<span className='text-label'>CAUSA</span>),
              puede ocasionar (<span className='text-label'>IMPACTO</span>)) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'defConcatenado'}
              value={formik.values.defConcatenado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.defConcatenado}
              errors={formik.errors.defConcatenado}
              disabled={true}
              rows={4}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <br />
            <CInputCheckbox
              id={'fraudeInterno'}
              type={"checkbox"}
              value={formik.values.fraudeInterno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Fraude interno'
              disabled={false}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tipo fraude interno <span className='text-primary h5'><b>{formik.values.fraudeInterno? '*' : ''}</b></span>
            </Label>
            <CSelectReactTwo
              id={'tipoFraudeId'}
              placeholder={'Seleccionar'}
              value={formik.values.tipoFraudeId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.tipoFraudeId}
              touched={formik.touched.tipoFraudeId}
              options={dataApiTipoFraude}
              isClearable={true}
              isSearchable={true}
              isDisabled={formik.values.fraudeInterno ? false : true}
              dependence={true}
              cleareableDependences={clearDependenceOfTipoFraude}
              getAddValue={true}
              getSelectValue={getValueTipoFraude}
              inputIsClearable={clearInputTipoFraude}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Subtipo fraude interno<span className='text-primary h5'><b>{formik.values.fraudeInterno ? '*' : ''}</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'subtipoFraudeId'}
              placeholder={'Seleccionar'}
              value={formik.values.subtipoFraudeId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.subtipoFraudeId}
              touched={formik.touched.subtipoFraudeId}
              options={dataApiSubtipoFraude}
              isDisabled={formik.values.tipoFraudeId === null ? true : false}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tipo de Pérdida {formik.values.otrosAux2 === false ? <span className='text-primary h5'><b>*</b></span> : null}
            </Label>
            <CSelectReact
              type={"select"}
              id={'efectoPerdidaId'}
              placeholder={'Seleccionar'}
              value={formik.values.efectoPerdidaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.efectoPerdidaId}
              touched={formik.touched.efectoPerdidaId}
              options={dataApiEfectoPerdida}
              isDisabled={formik.values.otrosAux2 === true ? true : false}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <br />
            <CInputCheckbox
              id={'otrosAux2'}
              type={"checkbox"}
              value={formik.values.otrosAux2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Otros (Tipo de Pérdida)'
              disabled={formik.values.efectoPerdidaId !== null ? true : false}
            />
          </FormGroup>

          {formik.values.otrosAux2 === true && formik.values.efectoPerdidaId === null ?
            <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
              <Label className='form-label'>
                Otros (Tipo de Pérdida) {formik.values.otrosAux2 === true ? <span className='text-primary h5'><b>*</b></span> : null}
              </Label>
              <CInputReact
                type={"text"}
                id={'efectoPerdidaOtro'}
                placeholder={'Otros'}
                value={formik.values.efectoPerdidaOtro}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.efectoPerdidaOtro}
                errors={formik.errors.efectoPerdidaOtro}
              />
            </FormGroup>
            : null}

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Efecto - Impacto ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'perdidaAsfiId'}
              placeholder={'Seleccionar'}
              value={formik.values.perdidaAsfiId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.perdidaAsfiId}
              touched={formik.touched.perdidaAsfiId}
              options={dataApiPerdidaAsfi}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monetario
            </Label>
            <CInputRadio
              data={optionsMonetario}
              id={'monetario'}
              value={formik.values.monetario}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              touched={formik.touched.monetario}
              errors={formik.errors.monetario}
              sendValue={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Clasificación Factores de Riesgo <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'factorRiesgoId'}
              placeholder={'Seleccionar'}
              value={formik.values.factorRiesgoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.factorRiesgoId}
              touched={formik.touched.factorRiesgoId}
              options={dataApiFactorRiesgo}
            />
          </FormGroup>

        </Row>
        <div className='divider divider-left divider-dark'>
          <div className='divider-text'><span className='text-label'>Riesgo inherente</span></div>
        </div>
        <Row className='pt-1'>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label'>
              Probabilidad - Cuán probable es que el riesgo ocurra <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'probabilidadId'}
              placeholder={'Seleccionar'}
              value={formik.values.probabilidadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.probabilidadId}
              touched={formik.touched.probabilidadId}
              options={dataApiProbabilidad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Probabilidad (Inherente)
            </Label>
            <CInputReact
              type={"text"}
              id={'probInherente'}
              value={formik.values.probInherente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probInherente}
              errors={formik.errors.probInherente}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='2' className='mb-0'>
            <Label className='form-label'>
              % de Ocurrencia
            </Label>
            <CInputReact
              type={"text"}
              id={'probPorcentaje'}
              value={formik.values.probPorcentaje}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probPorcentaje}
              errors={formik.errors.probPorcentaje}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Valoración - Probabilidad (Inherente)
            </Label>
            <CInputReact
              type={"text"}
              id={'probValoracion'}
              value={formik.values.probValoracion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probValoracion}
              errors={formik.errors.probValoracion}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label'>
              Impacto - Monetario o no monerario <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'impactoId'}
              placeholder={'Seleccionar'}
              value={formik.values.impactoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.impactoId}
              touched={formik.touched.impactoId}
              options={dataApiImpacto}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Impacto (Inherente)
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoInherente'}
              value={formik.values.impactoInherente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoInherente}
              errors={formik.errors.impactoInherente}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='2' className='mb-0'>
            <Label className='form-label'>
              % de Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoPorcentaje'}
              value={formik.values.impactoPorcentaje}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoPorcentaje}
              errors={formik.errors.impactoPorcentaje}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Valoración - Impacto (Inherente)
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoValoracion'}
              value={formik.values.impactoValoracion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoValoracion}
              errors={formik.errors.impactoValoracion}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label text-label'>
              Riesgo (Inherente)
            </Label>
            <CInputReact
              type={"number"}
              id={'riesgoInherente'}
              value={formik.values.riesgoInherente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.riesgoInherente}
              errors={formik.errors.riesgoInherente}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label text-label'>
              Valoración Riesgo (Inherente)
            </Label>
            <CInputReact
              type={"text"}
              id={'valorRiesgoInherente'}
              value={formik.values.valorRiesgoInherente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.valorRiesgoInherente}
              errors={formik.errors.valorRiesgoInherente}
              disabled={true}
            />
          </FormGroup>
        </Row>

        <Row className='pt-4'>
          <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
            <Button
              outline
              color="primary"
              block
              onClick={() => beforeSection(2)}
            >
              <ChevronLeft size={17} className='mr-1' />
              Atrás
            </Button>
          </Col>
          <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
            <Button
              color="dark"
              block
              onClick={() => { formik.handleReset(); }}
              disabled={!formik.dirty || formik.isSubmitting}
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
    </Fragment>
  )
}

export default Riesgos
