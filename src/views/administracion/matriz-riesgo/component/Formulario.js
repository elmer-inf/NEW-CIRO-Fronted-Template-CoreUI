import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Row, Col, Form, Button, Label } from 'reactstrap'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaListaMatrizR } from '../controller/AdminMatrizRController';
import { buildSelectTwo } from 'src/functions/Function'

const AdminFormMatrizRiesgo = ({ initialValuess, handleOnSubmit }) => {

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        campoA: Yup.string().max(1000).nullable(),
        nombre: Yup.string().max(1000).required('Campo obligatorio'),
        campoB: Yup.string().max(1000).nullable(),
        campoC: Yup.string().max(1000).nullable(),
        campoD: Yup.string().max(1000).nullable(),
        campoE: Yup.string().max(1000).nullable(),
        campoF: Yup.string().max(1000).nullable(),
        campoG: Yup.string().max(1000).nullable(),

        tablaId: Yup.mixed().required('Campo obligatorio')
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tablaId: values.tablaId.value
      }
      console.log('datos que se enviaran:', data)
      handleOnSubmit(data)
    }
  })

  /* LISTA LAS TABLAS LISTA DE MATRIZ DE RIESGO*/
  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const callApi = () => {
    getTablaListaMatrizR()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true)
        setTablaListaOptions(options)
      }).catch((error) => {
    })
  }

  useEffect(() => {
    callApi();
  }, [])

  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row className='justify-content-center'>
        <Label sm='3'  lg='3' for='tabla'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          <CSelectReact
            type={"select"}
            id={'tablaId'}
            placeholder={'Seleccionar . . . '}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            options={tablaListaOptions}
          />
        </Col>
      </FormGroup>

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Probabilidad' ||
          formik.values.tablaId.label === 'Impacto de Riesgo' ||
          formik.values.tablaId.label === 'Normas para control' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='campoA'>
            {(formik.values.tablaId.label === 'Probabilidad' || formik.values.tablaId.label === 'Impacto de Riesgo') ? 'Nivel' : null }
            {formik.values.tablaId.label === 'Normas para control' ? 'Código': null }
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Calificación': null }
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
          <Label sm='3'  lg='3' for='nombre'>
            {(formik.values.tablaId.label === 'Pérdida ASFI' ||
              formik.values.tablaId.label === 'Tipo de control' ||
              formik.values.tablaId.label === 'Nivel de automatización' ||
              formik.values.tablaId.label === 'Identificado por' ||
              formik.values.tablaId.label === 'Estrategia para administrar el riesgo') ? 'Nombre' : null }
            {(formik.values.tablaId.label === 'Probabilidad' ||
              formik.values.tablaId.label === 'Impacto de Riesgo') ? 'Descriptivo' : null }
            {formik.values.tablaId.label === 'Controles' ? 'Descripción': null }
            {formik.values.tablaId.label === 'Normas para control' ? 'Título del documento': null }
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Nivel': null }
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
            {formik.values.tablaId.label === 'Probabilidad' ? 'Probabilidad cualitativa' : null }
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto cualitativo' : null}
            {formik.values.tablaId.label === 'Controles' ? 'Ponderación': null }
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Descriptivo': null }
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoB'}
              //placeholder={''}
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
          formik.values.tablaId.label === 'Controles' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3'  lg='3' for='campoC'>
            {formik.values.tablaId.label === 'Probabilidad' ? 'Temporalidad' : null }
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto cuantitativo' : null}
            {formik.values.tablaId.label === 'Controles' ? 'Rango': null }
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Descripción': null }
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
          formik.values.tablaId.label === 'Controles' ||
          formik.values.tablaId.label === 'Nivel de riesgo inherente')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3'  lg='3' for='campoD'>
            {formik.values.tablaId.label === 'Probabilidad' ? 'Prob. temporalidad' : null }
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Impacto resumen' : null}
            {formik.values.tablaId.label === 'Controles' ? 'Porcentaje': null }
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Tolerancia al riesgo (USD)': null }
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoD'}
              //placeholder={''}
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
            {formik.values.tablaId.label === 'Probabilidad' ? '% de ocurrencia' : null }
            {formik.values.tablaId.label === 'Impacto de Riesgo' ? '% de impacto' : null}
            {formik.values.tablaId.label === 'Nivel de riesgo inherente' ? 'Tratamiento': null }
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
        {(formik.values.tablaId !== null && formik.values.tablaId.label === 'Impacto de Riesgo') ?
          <Col xs='12' lg='4'>
            <Row>
              <Label sm='5' for='campoE'>
                {formik.values.tablaId.label === 'Impacto de Riesgo' ? 'Límite inferior (USD)' : null}
              </Label>
              <Col sm='7'>
                <CInputReact
                  type={"number"}
                  id={'campoE'}
                  //placeholder={''}
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
                  //placeholder={''}
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

      <FormGroup className='mb-0 mt-4' row>
        <Col className='d-flex justify-content-center'>
          <Button
            className='mr-4 text-white'
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Guardar
          </Button>

          <Button
            outline color='dark'
            onClick={() => { formik.handleReset() }}
            disabled={!formik.dirty || formik.isSubmitting}
          >
            Limpiar
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )
}
export default AdminFormMatrizRiesgo
