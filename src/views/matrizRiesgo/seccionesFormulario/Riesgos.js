import { React, Fragment, useState, useEffect} from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'

import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import  CInputCheckbox  from 'src/reusable/CInputCheckbox'
import { getTablaDescripcionMatrizR } from '../controller/MatrizRiesgoController';
import { buildSelectTwo } from 'src/functions//Function'

const CategoriaNegocio = ({ nextSection, beforeSection, setObject, initValues, isEdit}) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        probabilidadId : Yup.mixed().nullable(),
        impactoId : Yup.mixed().nullable(),
        riesgoInherente : Yup.number().positive().nullable(),
        valorRiesgoInherente : Yup.string().nullable(),

        // Campos solo para mostrar
        probInherente : Yup.string().nullable(),
        probPorcentaje : Yup.string().nullable(),
        probValoracion : Yup.string().nullable(),
        impactoInherente : Yup.string().nullable(),
        impactoPorcentaje : Yup.string().nullable(),
        impactoValoracion : Yup.string().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        probabilidadId:(values.probabilidadId !== null) ? values.probabilidadId.value : 0,
        impactoId:(values.impactoId !== null) ? values.impactoId.value : 0,
     }
      console.log('datos que se enviaran SECCION 2:', data)
      setObject(data);
      nextSection(2);
   }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Impacto de riesgo
  const [dataApiImpacto, setDataApiImpacto] = useState([])
  const callApiImpacto = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiImpacto(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiProbabilidad(2);
    callApiImpacto(3);
  }, [])

  // Autocompleta Probabilidad inherente, porcentaje y valoracion
  useEffect(() => {
    if(formik.values.probabilidadId !== null){
      formik.setFieldValue('probInherente', formik.values.probabilidadId.campoA, false)
      formik.setFieldValue('probPorcentaje', formik.values.probabilidadId.campoG, false)
      formik.setFieldValue('probValoracion', formik.values.probabilidadId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId]);

  // Autocompleta Impacto inherente, porcentaje y valoracion
  useEffect(() => {
    if(formik.values.impactoId !== null){
      formik.setFieldValue('impactoInherente', formik.values.impactoId.campoA, false)
      formik.setFieldValue('impactoPorcentaje', formik.values.impactoId.campoG, false)
      formik.setFieldValue('impactoValoracion', formik.values.impactoId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.impactoId]);


  const calculaRiesgo = (prob, imp) =>{
    var riesgo = 0;
    if(prob === 1 && (imp === 1 || imp === 2))
      riesgo = 1
    if(prob === 2 && imp === 1)
      riesgo = 1

    if(prob === 1 && imp === 3)
      riesgo = 2
    if(prob === 2 && imp === 2)
      riesgo = 2
    if(prob === 3 && (imp === 1 || imp === 2))
      riesgo = 2
    if(prob === 4 && imp === 1)
      riesgo = 2

    if(prob === 1 && (imp === 4 || imp === 5))
      riesgo = 3
    if(prob === 2 && (imp === 3 || imp === 4))
      riesgo = 3
    if(prob === 3 && imp === 3)
      riesgo = 3
    if(prob === 4 && (imp === 2 || imp === 3))
      riesgo = 3
    if(prob === 5 && (imp === 1 || imp === 2))
      riesgo = 3

    if(prob === 2 && imp === 5)
      riesgo = 4
    if(prob === 3 && (imp === 4 || imp === 5))
      riesgo = 4
    if(prob === 4 && imp === 4)
      riesgo = 4
    if(prob === 5 && imp === 3)
      riesgo = 4

    if(prob === 4 && imp === 5)
      riesgo = 5
    if(prob === 5 && (imp === 4 || imp === 5))
      riesgo = 5

    return riesgo
  }

  // Obtiene el riesgo (Formula entre Probabilidad e impacto)

  const calculoRiesgoInerente = () =>{
    if(formik.values.probabilidadId !== null && formik.values.impactoId !== null){
      const prob = parseInt(formik.values.probabilidadId.campoA);
      const imp = parseInt(formik.values.impactoId.campoA);
      const riesgo = calculaRiesgo(prob, imp);
      formik.setFieldValue('riesgoInherente', riesgo, false)
    }
  }

  useEffect(() => {
    calculoRiesgoInerente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId,formik.values.impactoId]);


  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Probabilidad - Cuán probable es que el riesgo ocurra
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

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
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

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
            Impacto - Impacto monetario o no monerario
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
              Impacto Inherente
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

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
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

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
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

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(2)}
          >
            <ChevronLeft size={17} className='mr-1'/>
            Atrás
          </Button>
          <Button
            style={{width: '130px'}}
            color="dark"
            outline
            onClick={() => { formik.handleReset()/* ; this.reset() */ }}
            disabled={(!formik.dirty || formik.isSubmitting)}
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
    </Fragment>
  )
}

export default CategoriaNegocio
