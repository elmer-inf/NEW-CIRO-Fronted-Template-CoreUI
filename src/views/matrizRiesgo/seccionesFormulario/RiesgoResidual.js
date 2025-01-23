import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import { buildSelectTwo } from 'src/functions/Function'
import { buscaValorLiteral, buscaValorLiteralRiesgoI, calculaRiesgo, reduceProbabilidadImpacto } from 'src/functions/FunctionsMatriz'

var _ = require('lodash');

const Riesgos = ({ nextSection, beforeSection, setObject, initValues, dataAux, dataAux2, dataApiControl, isEdit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        probabilidadResidual: Yup.number().nullable(),
        probabilidadVal: Yup.string().nullable(),
        impactoResidual: Yup.number().nullable(),
        impactoVal: Yup.string().nullable(),
        riesgo: Yup.number().nullable(),
        riesgoVal: Yup.string().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values
      }
      //console.log('datos que se enviaran SECCION 4:', data)
      setObject(data, values);
      nextSection(4);
    }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(options)
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
        setDataApiImpacto(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Nivel de riesgo inherente
  const [dataApiRiesgoI, setDataApiRiesgoI] = useState([])
  const callApiRiesgoI = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiRiesgoI(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    callApiProbabilidad(2);
    callApiImpacto(3);
    callApiRiesgoI(9);
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // calcula "Probabilidad e impactoresidual" del valor "Probabilidad inherente"
  const disminucionAux = (dataAux.controlIdAux !== undefined && _.find(dataApiControl, ['id', _.toInteger(dataAux.controlIdAux)]) !== null) ? _.find(dataApiControl, ['id', _.toInteger(dataAux.controlIdAux)]).campoB : null;
  const probInherenteAux = parseInt(dataAux2.probabilidaNivelAux);
  const impactoInherenteAux = parseInt(dataAux2.impactoNivelAux);
  useEffect(() => {
    if (dataAux.controlObjetivoAux === 'Ambos') {
      formik.setFieldValue('probabilidadResidual', reduceProbabilidadImpacto(probInherenteAux, parseInt(disminucionAux)), false);
      formik.setFieldValue('impactoResidual', reduceProbabilidadImpacto(impactoInherenteAux, parseInt(disminucionAux)), false);
    } else if (dataAux.controlObjetivoAux === 'Probabilidad') {
      formik.setFieldValue('probabilidadResidual', reduceProbabilidadImpacto(probInherenteAux, parseInt(disminucionAux)), false);
      formik.setFieldValue('impactoResidual', impactoInherenteAux, false);
    } else if (dataAux.controlObjetivoAux === 'Impacto') {
      formik.setFieldValue('impactoResidual', reduceProbabilidadImpacto(impactoInherenteAux, parseInt(disminucionAux)), false);
      formik.setFieldValue('probabilidadResidual', probInherenteAux, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAux, dataAux2]);

  // Campo "probabilidadVal" Toma el valor literal de "Probabilidad residual" y Campo "impactoVal" Toma el valor literal de "Impacto residual"
  useEffect(() => {
    var probValoracionAux = buscaValorLiteral(dataApiProbabilidad, formik.values.probabilidadResidual)
    formik.setFieldValue('probabilidadVal', probValoracionAux, false)

    var impactoValoracionAux = buscaValorLiteral(dataApiImpacto, formik.values.impactoResidual)
    formik.setFieldValue('impactoVal', impactoValoracionAux, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadResidual, formik.values.impactoResidual])


  // Obtiene el Riesgo inherente y su valoracion (Formula entre Probabilidad res e impacto res )
  const calculoRiesgoResidual = () => {
    if (formik.values.probabilidadResidual !== null && formik.values.impactoResidual !== null) {
      const prob = parseInt(formik.values.probabilidadResidual);
      const imp = parseInt(formik.values.impactoResidual);
      const riesgoCalculado = calculaRiesgo(prob, imp);
      formik.setFieldValue('riesgo', riesgoCalculado, false)
    }
  }

  useEffect(() => {
    calculoRiesgoResidual();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadResidual, formik.values.impactoResidual]);

  useEffect(() => {
    var riesgoValAux = buscaValorLiteralRiesgoI(dataApiRiesgoI, formik.values.riesgo)
    //const riesgoValAux = (_.find(dataApiRiesgoI, ['campoA', formik.values.riesgo + '']) !== undefined) ? _.find(dataApiRiesgoI, ['campoA', formik.values.riesgo + '']).campoB : null
    formik.setFieldValue('riesgoVal', riesgoValAux, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.riesgo])


  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Probabilidad (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'probabilidadResidual'}
              value={formik.values.probabilidadResidual}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probabilidadResidual}
              errors={formik.errors.probabilidadResidual}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Valoración - Probabilidad (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'probabilidadVal'}
              value={formik.values.probabilidadVal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probabilidadVal}
              errors={formik.errors.probabilidadVal}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Impacto (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoResidual'}
              value={formik.values.impactoResidual}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoResidual}
              errors={formik.errors.impactoResidual}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Valoración - Impacto (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoVal'}
              value={formik.values.impactoVal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoVal}
              errors={formik.errors.impactoVal}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Riesgo (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'riesgo'}
              value={formik.values.riesgo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.riesgo}
              errors={formik.errors.riesgo}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Valoración Riesgo (Residual)
            </Label>
            <CInputReact
              type={"text"}
              id={'riesgoVal'}
              value={formik.values.riesgoVal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.riesgoVal}
              errors={formik.errors.riesgoVal}
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
              onClick={() => beforeSection(4)}
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
              disabled={true}
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
    </Fragment>
  )
}

export default Riesgos
