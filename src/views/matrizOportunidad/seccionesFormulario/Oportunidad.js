import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import { getTablaDescripcionOportunidadN1 } from 'src/views/administracion/matriz-oportunidad/controller/AdminOportunidadController';
import { buildSelectTwo, buildSelectThree } from 'src/functions/Function'
import { calculaRiesgo, buscaValorLiteralRiesgoI } from 'src/functions/FunctionsMatriz'

var _ = require('lodash');

const Oportunidad = ({ nextSection, beforeSection, setObject, initValues, dataApiTratamiento, isEdit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        probabilidadId: Yup.mixed().required("Campo obligatorio"),
        impactoOporId: Yup.mixed().required("Campo obligatorio"),
        // Campos solo para mostrar
        probNivel: Yup.string().nullable(),
        probOcurrencia: Yup.string().nullable(),
        probDescriptivo: Yup.string().nullable(),
        impactoNivel: Yup.string().nullable(),
        impactoOportunidad: Yup.string().nullable(),
        impactoDescriptivo: Yup.string().nullable(),
        nivelOportunidad: Yup.number().nullable(),
        valorOportunidad: Yup.string().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        probabilidadId: (values.probabilidadId !== null) ? values.probabilidadId.value : 0,
        impactoOporId: (values.impactoOporId !== null) ? values.impactoOporId.value : 0,
      }
      const dataSelect = _.omit(data, ['probNivel', 'probOcurrencia', 'probDescriptivo', 'impactoNivel', 'impactoOportunidad', 'impactoDescriptivo', 'nivelOportunidad', 'valorOportunidad']);
      //console.log('datos que se enviaran SECCION 3:', dataSelect)
      setObject(dataSelect);
      nextSection(3);
    }
  });

  useEffect(() => {
    callApiProbabilidad(2);
    callApiImpactoOpor(4);
  }, [])

  // Rellena Datos para Editar
  useEffect(() => {
    if (isEdit) {
      formik.setValues({ ...initValues })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues])

  // Autocompleta Probabilidad, porcentaje y valoracion
  useEffect(() => {
    if (formik.values.probabilidadId !== null) {
      formik.setFieldValue('probNivel', formik.values.probabilidadId.campoA, false)
      formik.setFieldValue('probOcurrencia', formik.values.probabilidadId.campoG, false)
      formik.setFieldValue('probDescriptivo', formik.values.probabilidadId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId]);

  // Autocompleta Impacto, porcentaje y valoracion
  useEffect(() => {
    if (formik.values.impactoOporId !== null) {
      formik.setFieldValue('impactoNivel', formik.values.impactoOporId.campoA, false)
      formik.setFieldValue('impactoOportunidad', formik.values.impactoOporId.campoD, false)
      formik.setFieldValue('impactoDescriptivo', formik.values.impactoOporId.nombre, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.impactoOporId]);

  useEffect(() => {
    calculoRiesgoInerente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.probabilidadId, formik.values.impactoOporId]);

  useEffect(() => {
    if (isEdit) {
      calculoRiesgoInerente();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*   P  A  R  A  M  E  T  R  O  S   */
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

  // Impacto Oportunidad
  const [dataApiImpactoOpor, setDataApiImpactoOpor] = useState([])
  const callApiImpactoOpor = (idTablaDes, idNivel2) => {
    getTablaDescripcionOportunidadN1(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'campoA', 'campoC', true)
        setDataApiImpactoOpor(_.orderBy(options, ['value'], ['desc']))
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Obtiene el Riesgo y su valoracion (Formula entre Probabilidad e impacto)
  const calculoRiesgoInerente = () => {
    if (formik.values.probabilidadId !== null && formik.values.impactoOporId !== null) {
      const prob = parseInt(formik.values.probabilidadId.campoA);
      const imp = parseInt(formik.values.impactoOporId.campoA);
      const riesgo = calculaRiesgo(prob, imp);
      formik.setFieldValue('nivelOportunidad', riesgo, false)
      var riesgoValAux = buscaValorLiteralRiesgoI(dataApiTratamiento, riesgo);
      formik.setFieldValue('valorOportunidad', riesgoValAux, false);
    }
  }
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-3'>
          <FormGroup tag={Col} md='6' xl='8' className='mb-0'>
            <Label className='form-label'>
              Probabilidad Cuán probable es que la Oportunidad ocurra <span className='text-primary h5'><b>*</b></span>
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

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Probabilidad
            </Label>
            <CInputReact
              type={"text"}
              id={'probNivel'}
              value={formik.values.probNivel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probNivel}
              errors={formik.errors.probNivel}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='8' className='mb-0'>
            <Label className='form-label'>
              % de Ocurrencia
            </Label>
            <CInputReact
              type={"text"}
              id={'probOcurrencia'}
              value={formik.values.probOcurrencia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probOcurrencia}
              errors={formik.errors.probOcurrencia}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Valoración - Probabilidad
            </Label>
            <CInputReact
              type={"text"}
              id={'probDescriptivo'}
              value={formik.values.probDescriptivo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probDescriptivo}
              errors={formik.errors.probDescriptivo}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='8' className='mb-0'>
            <Label className='form-label'>
              Impacto Oportunidad Cualitativo <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'impactoOporId'}
              placeholder={'Seleccionar'}
              value={formik.values.impactoOporId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.impactoOporId}
              touched={formik.touched.impactoOporId}
              options={dataApiImpactoOpor}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoNivel'}
              value={formik.values.impactoNivel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoNivel}
              errors={formik.errors.impactoNivel}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='8' className='mb-0'>
            <Label className='form-label'>
              % de Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoOportunidad'}
              value={formik.values.impactoOportunidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoOportunidad}
              errors={formik.errors.impactoOportunidad}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Valoración - Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoDescriptivo'}
              value={formik.values.impactoDescriptivo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoDescriptivo}
              errors={formik.errors.impactoDescriptivo}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label text-label'>
              Nivel Opotunidad
            </Label>
            <CInputReact
              type={"number"}
              id={'nivelOportunidad'}
              value={formik.values.nivelOportunidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.nivelOportunidad}
              errors={formik.errors.nivelOportunidad}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label text-label'>
              Valoración Oportunidad
            </Label>
            <CInputReact
              type={"text"}
              id={'valorOportunidad'}
              value={formik.values.valorOportunidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.valorOportunidad}
              errors={formik.errors.valorOportunidad}
              disabled={true}
            />
          </FormGroup>
        </Row>
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
            onClick={() => { formik.handleReset() }}
            disabled={(!formik.dirty || formik.isSubmitting)}
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
    </Fragment>
  )
}

export default Oportunidad
