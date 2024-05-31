import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Row, Col, Form, Button, Label } from 'reactstrap'
import { getTablaDescripcionRiesgoN1 } from '../controller/AdminRiesgoController';
import { buildSelectTwo } from 'src/functions/Function'
import { Delete, Save, XSquare } from 'react-feather'
import CSelectReactTwo from 'src/reusable/CSelectReactTwo'

const AdminFormMatrizRiesgo = ({ initialValuess, optionToSelect, handleOnSubmit, isEdit }) => {

  const [varListN2, setVarListN2] = useState(optionToSelect.tabla_n2);

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        campoA: Yup.string().nullable(),
        nombre: Yup.string().required('Campo obligatorio'),
        campoB: Yup.string().nullable(),
        campoC: Yup.string().nullable(),
        campoD: Yup.string().nullable(),
        campoE: Yup.string().nullable(),
        campoF: Yup.string().nullable(),
        campoG: Yup.string().nullable(),
        tablaId: Yup.mixed().required('Campo obligatorio'),
        nivel2_id: Yup.mixed()
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tablaId: values.tablaId.value,
        nivel2_id: (values.nivel2_id !== null) ? values.nivel2_id.value : 0,
      }
      handleOnSubmit(data)
    }
  })

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idn2) => {
    getTablaDescripcionRiesgoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setVarListN2(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }


  const resetAllValues = () => {
    formik.setFieldValue('campoA', '', false);
    formik.setFieldValue('nombre', '', false);
    formik.setFieldValue('campoB', '', false);
    formik.setFieldValue('campoC', '', false);
    formik.setFieldValue('campoD', '', false);
    formik.setFieldValue('campoE', '', false);
    formik.setFieldValue('campoF', '', false);
    formik.setFieldValue('campoG', '', false);
    formik.setFieldValue('nivel2_id', null, false);
  }



  /* Get List Level 2v*/
  const clearAllDependences = () => {
    resetAllValues();
    setVarListN2([]);
  }

  const getSelectValueLevel2 = (value) => {
    if (value.nivel2 !== null && value.nivel2 !== 0) {
      const idnivel2 = value.nivel2;
      callApi2(idnivel2);
    }
  }

  const inputIsClearableLevel2 = (id) => {
    //console.log('inputIsClearable aaa: ', id);
    //formik.setFieldValue(id, null, false);
    //clearAllDependences();
  }

  useEffect(() => {
    if (isEdit) {
      setVarListN2(optionToSelect.tabla_n2);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionToSelect]);


  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row className='justify-content-center'>
        <Label sm='3' lg='3' for='tabla'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          <CSelectReactTwo
            //label={""}
            id={'tablaId'}
            placeholder={'Seleccionar'}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            errors={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            options={optionToSelect.tablaOp || []}
            obligatorio={true}
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            dependence={true}
            cleareableDependences={clearAllDependences}
            getAddValue={true}
            getSelectValue={getSelectValueLevel2}
            inputIsClearable={inputIsClearableLevel2}
          />
        </Col>
      </FormGroup>

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Normas para control' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente' ||
          formik.values.tablaId.label === 'Controles')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoA'>
            {(formik.values.tablaId.label === 'Probabilidad' || formik.values.tablaId.label === 'Impacto de Riesgo') ? 'Nivel' : null}
            {formik.values.tablaId.label === 'Normas para control' ? 'Código' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Calificación' : null}
            {formik.values.tablaId.label === 'Controles' ? 'Valoración del control' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'campoA'}
              value={formik.values.campoA}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoA}
              errors={formik.errors.campoA}
            />
          </Col>
        </FormGroup>
        : null
      }

      {formik.values.tablaId !== null ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='nombre'>
            {(formik.values.tablaId.label === 'Pérdida ASFI' ||
              formik.values.tablaId.label === 'Tipo de control' ||
              formik.values.tablaId.label === 'Nivel de automatización' ||
              formik.values.tablaId.label === 'Identificado por' ||
              formik.values.tablaId.label === 'Estrategia para administrar el riesgo' ||
              formik.values.tablaId.label === 'Tipo fraude interno' ||
              formik.values.tablaId.label === 'Subtipo fraude interno') ? 'Nombre' : null}
            {(formik.values.tablaId.label === 'Probabilidad' ||
              formik.values.tablaId.label === 'Impacto de Riesgo') ? 'Descriptivo' : null}
            {formik.values.tablaId.label === 'Controles' ? 'Descripción' : null}
            {formik.values.tablaId.label === 'Normas para control' ? 'Título del documento' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Nivel' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'nombre'}
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.nombre}
              errors={formik.errors.nombre}
              rows={1}
            />
          </Col>
        </FormGroup>
        : null}

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Controles' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoB'>
            {formik.values.tablaId.label === 'Probabilidad' ? 'Probabilidad cualitativa' : null}
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto cualitativo' : null}
            {formik.values.tablaId.label === 'Controles' ? '% Mitigación del riesgo' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Descriptivo' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoB'}
              value={formik.values.campoB}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoB}
              errors={formik.errors.campoB}
              rows={1}
            />
          </Col>
        </FormGroup>
        : null}

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoC'>
            {formik.values.tablaId.label === 'Probabilidad' ? 'Temporalidad' : null}
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto cuantitativo' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Descripción' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoC'}
              //placeholder={''}
              value={formik.values.campoC}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoC}
              errors={formik.errors.campoC}
              rows={1}
            />
          </Col>
        </FormGroup>
        : null}

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoD'>
            {formik.values.tablaId.label === 'Probabilidad' ? 'Prob. temporalidad' : null}
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto resumen' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Tolerancia al riesgo (USD)' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoD'}
              value={formik.values.campoD}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoD}
              errors={formik.errors.campoD}
              rows={1}
            />
          </Col>
        </FormGroup>
        : null}

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoG'>
            {formik.values.tablaId.label === 'Probabilidad' ? '% de ocurrencia' : null}
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? '% de impacto' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Tratamiento' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'campoG'}
              value={formik.values.campoG}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoG}
              errors={formik.errors.campoG}
              rows={1}
            />
          </Col>
        </FormGroup>
        : null}

      <Row className='justify-content-center'>
        {(formik.values.tablaId !== null &&
          (formik.values.tablaId.label === 'Impacto de Riesgo' ||
            formik.values.tablaId.label === 'Probabilidad')) ?
          <Col xs='12' lg='4'>
            <Row>
              <Label sm='5' for='campoE'>
                {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Límite inferior (USD)' : null}
                {formik.values.tablaId.label === 'Probabilidad' ? 'Veces al año' : null}
              </Label>
              <Col sm='7'>
                <CInputReact
                  type={"number"}
                  id={'campoE'}
                  value={formik.values.campoE}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.campoE}
                  errors={formik.errors.campoE}
                />
              </Col>
            </Row>
          </Col>
          : null}

        {(formik.values.tablaId !== null && formik.values.tablaId.label === 'Impacto de Riesgo') ?
          <Col xs='12' lg='4'>
            <Row>
              <Label sm='5' for='campoF'>
                {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Límite superior (USD)' : null}
              </Label>
              <Col sm='7'>
                <CInputReact
                  type={"number"}
                  id={'campoF'}
                  value={formik.values.campoF}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.campoF}
                  errors={formik.errors.campoF}
                />
              </Col>
            </Row>
          </Col>
          : null}

      </Row>

      {
          (formik.values.tablaId !== null && // PARA NIVEL 2
            (formik.values.tablaId.label === 'Subtipo fraude interno'))
            ? <FormGroup row className='justify-content-center'>
              <Label sm='3' lg='3' for='nivel2_id'>
                {formik.values.tablaId.label === 'Subtipo fraude interno' ? 'Tipo de fraude interno' : null}
              </Label>
              <Col sm='9' lg='5'>
                <CSelectReactTwo
                  label={""}
                  id={'nivel2_id'}
                  placeholder={'Seleccione'}
                  value={formik.values.nivel2_id}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  errors={formik.errors.nivel2_id}
                  touched={formik.touched.nivel2_id}
                  options={varListN2}
                  obligatorio={true}
                  isClearable={true}
                  isSearchable={false}
                  isDisabled={false}
                  dependence={false}
                  getAddValue={false}
                />
              </Col>
            </FormGroup>

            : null
        }

      <Row className='pt-4'>
        <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
          <Button
            color="primary"
            className='text-white'
            type="submit"
            block
            disabled={formik.isSubmitting}
          >
            <Save size={17} className='mr-2' /> Guardar
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
            href='#/administracion/matriz-riesgo/Listar'
            color="primary"
            outline
            block
          >
            <XSquare size={17} className='mr-2' />Cancelar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default AdminFormMatrizRiesgo
