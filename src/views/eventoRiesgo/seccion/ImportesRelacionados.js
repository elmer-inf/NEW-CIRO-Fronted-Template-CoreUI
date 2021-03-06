import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'

import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import CInputRadio from 'src/reusable/CInputRadio'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectTwo } from 'src/functions/Function'

var _ = require('lodash');

const ImportesRelacionados = ({ nextSection, beforeSection, setObject, initValues, isEdit }) => {

  const formik = useFormik({
    initialValues: {...initValues, totalPerdida: 0},
    validationSchema: Yup.object().shape(
      {
        monedaId: Yup.mixed().nullable(),
        montoPerdida: Yup.number().required('Campo obligatorio'),
        gastoAsociado: Yup.number().required('Campo obligatorio'),
        montoRecuperado: Yup.number().required('Campo obligatorio'),
        impactoId: Yup.mixed().nullable(),
        coberturaSeguro: Yup.string().nullable(),
        polizaSeguroId: Yup.mixed().nullable(),
        montoRecuperadoSeguro: Yup.number().nullable(),
        recuperacionActivoId: Yup.mixed().required('Campo obligatorio'),
        perdidaMercado: Yup.number().required('Campo obligatorio'),
        // Solo para mostrar
        montoPerdidaRiesgo: Yup.number().nullable(),
        totalPerdida: Yup.number().nullable(),
        totalRecuperado: Yup.number().nullable()


        /* monedaId: Yup.mixed().nullable(),
        montoPerdida: Yup.number().nullable(),
        gastoAsociado: Yup.number().nullable(),
        montoRecuperado: Yup.number().nullable(),
        impactoId: Yup.mixed().nullable(),
        coberturaSeguro: Yup.string().nullable(),
        polizaSeguroId: Yup.mixed().nullable(),
        montoRecuperadoSeguro: Yup.number().nullable(),
        recuperacionActivoId: Yup.mixed().nullable(),
        perdidaMercado: Yup.number().nullable(),
        // Solo para mostrar
        montoPerdidaRiesgo: Yup.number().nullable(),
        totalPerdida: Yup.number().nullable(),
        totalRecuperado: Yup.number().nullable() */
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tasaCambioId: tasaCambio,
        monedaId: (values.monedaId !== null) ? values.monedaId.value : 0,
        impactoId: (values.impactoId !== null) ? values.impactoId.value : 0,
        polizaSeguroId: (values.polizaSeguroId !== null) ? values.polizaSeguroId.value : 0,
        recuperacionActivoId: (values.recuperacionActivoId !== null) ? values.recuperacionActivoId.value : 0
      }
      const dataSelect =  _.omit(data, ['montoPerdidaRiesgo', 'totalPerdida', 'totalRecuperado']);

      console.log('datos que se enviaran SECCION 4:', dataSelect)
      setObject(dataSelect);
      nextSection(4);
    }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Tasa de cambio
  const [tasaCambio, setLabelTasaCambio] = useState('')

  const [dataApiTasaCambio, setDataApiTasaCambio] = useState('')
  const callApiTasaCambio = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        //console.log('tasa cambio: ', options)
        setLabelTasaCambio(options[0].label)
        setDataApiTasaCambio(options[0].label)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Moneda
  const [dataApiMoneda, setDataApiMoneda] = useState([])
  const callApiMoneda = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiMoneda(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Impacto
  const [dataApiImpacto, setDataApiImpacto] = useState([])
  const callApiImpacto = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiImpacto(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Poliza
  const [dataApiPoliza, setDataApiPoliza] = useState([])
  const callApiPoliza = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiPoliza(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // RecuperacionActivo
  const [dataApiRecuperacionActivo, setDataApiRecuperacionActivo] = useState([])
  const callApiRecuperacionActivo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiRecuperacionActivo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Cobertura seguro
  const optionCobertura = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' }
  ]

  useEffect(() => {
    callApiMoneda(23);
    callApiImpacto(24);
    callApiPoliza(25);
    callApiTasaCambio(14);
    callApiRecuperacionActivo(37);
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // Resetea "Poliza de seguro" y "Monto recuperado del seguro" dependiendo del check Cobertura seguro
  const resetPoliza = () => {
    formik.setFieldValue('polizaSeguroId', null, false);
    formik.setFieldValue('montoRecuperadoSeguro', '', false);
  }
  useEffect(() => {
    if (formik.values.coberturaSeguro !== true) {
      resetPoliza();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.coberturaSeguro])

  // Calcula "Monto de perdida" en bs en "Valor contable - monto perdida"
  useEffect(() => {
    if (formik.values.monedaId !== null) {
      if (formik.values.monedaId.label === 'BOB' || formik.values.monedaId.label === 'Bs') {
        formik.setFieldValue('montoPerdidaRiesgo', formik.values.montoPerdida, false)
      } else {
        if (formik.values.monedaId.label === 'USD' || formik.values.monedaId.label === '$') {
          formik.setFieldValue('montoPerdidaRiesgo', formik.values.montoPerdida * dataApiTasaCambio, false)
        } else {
          formik.setFieldValue('montoPerdidaRiesgo', 0, false)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.monedaId, formik.values.montoPerdida]);

  // Calcula "Monto total recuperado"
  useEffect(() => {
    var a = _.toNumber(formik.values.montoRecuperado);
    var b = _.toNumber(formik.values.montoRecuperadoSeguro);
    var c = _.toNumber(formik.values.gastoAsociado);
    var total = a + b + c;
    formik.setFieldValue('totalRecuperado', total, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.montoRecuperado, formik.values.montoRecuperadoSeguro, formik.values.gastoAsociado]);

  // Calcula "Monto total de perdida"
  useEffect(() => {
    var a = _.toNumber(formik.values.montoPerdidaRiesgo);
    var b = _.toNumber(formik.values.totalRecuperado);
    if(!_.isNaN(a - b))
      formik.setFieldValue('totalPerdida', a - b, false)

    else
      formik.setFieldValue('totalPerdida', 0, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.montoPerdidaRiesgo, formik.values.totalRecuperado]);

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tasa de cambio
            </Label>
            <CInputReact
              type={"number"}
              id={'tasaCambioId'}
              placeholder={dataApiTasaCambio}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Moneda
            </Label>
            <CSelectReact
              type={"select"}
              id={'monedaId'}
              placeholder={'Seleccionar'}
              value={formik.values.monedaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.monedaId}
              touched={formik.touched.monedaId}
              options={dataApiMoneda}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monto de p??rdida <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"number"}
              id={'montoPerdida'}
              placeholder={'Monto de p??rdida'}
              value={formik.values.montoPerdida}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.montoPerdida}
              errors={formik.errors.montoPerdida}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Valor contable - Monto de p??rdida (BOB){/* Monto de p??rdida por riesgo operativo (USD) */} <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"number"}
              id={'montoPerdidaRiesgo'}
              placeholder={'Valor contable - Monto de p??rdida (BOB)'}
              value={formik.values.montoPerdidaRiesgo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.montoPerdidaRiesgo}
              errors={formik.errors.montoPerdidaRiesgo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Gastos asociados <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"number"}
              id={'gastoAsociado'}
              placeholder={'Gasto asociado'}
              value={formik.values.gastoAsociado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.gastoAsociado}
              errors={formik.errors.gastoAsociado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monto recuperado <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"number"}
              id={'montoRecuperado'}
              placeholder={'Monto recuperado'}
              value={formik.values.montoRecuperado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.montoRecuperado}
              errors={formik.errors.montoRecuperado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Impacto
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
              Cobertura seguro
            </Label>
            <CInputRadio
              data={optionCobertura}
              id={'coberturaSeguro'}
              value={formik.values.coberturaSeguro}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              touched={formik.touched.coberturaSeguro}
              errors={formik.errors.coberturaSeguro}
              sendValue={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              P??liza de seguro
            </Label>
            <CSelectReact
              type={"select"}
              id={'polizaSeguroId'}
              placeholder={'Seleccionar'}
              value={formik.values.polizaSeguroId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.polizaSeguroId}
              touched={formik.touched.polizaSeguroId}
              options={dataApiPoliza}
              isDisabled={(formik.values.coberturaSeguro === true) ? false : true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monto recuperado del seguro
            </Label>
            <CInputReact
              type={"number"}
              id={'montoRecuperadoSeguro'}
              placeholder={'Monto recuperado del seguro'}
              value={formik.values.montoRecuperadoSeguro}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.montoRecuperadoSeguro}
              errors={formik.errors.montoRecuperadoSeguro}
              disabled={(formik.values.coberturaSeguro === true) ? false : true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Recuperaci??n activo <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'recuperacionActivoId'}
              placeholder={'Seleccionar'}
              value={formik.values.recuperacionActivoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.recuperacionActivoId}
              touched={formik.touched.recuperacionActivoId}
              options={dataApiRecuperacionActivo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              P??rdida de valor de mercado <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"number"}
              id={'perdidaMercado'}
              placeholder={'P??rdida de valor de mercado'}
              value={formik.values.perdidaMercado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.perdidaMercado}
              errors={formik.errors.perdidaMercado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monto total recuperado
            </Label>
            <CInputReact
              type={"number"}
              id={'totalRecuperado'}
              placeholder={'Monto total recuperado'}
              value={formik.values.totalRecuperado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.totalRecuperado}
              errors={formik.errors.totalRecuperado}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Monto total de p??rdida
            </Label>
            <CInputReact
              type={"number"}
              id={'totalPerdida'}
              placeholder={'Monto total de p??rdida'}
              value={formik.values.totalPerdida}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.totalPerdida}
              errors={formik.errors.totalPerdida}
              disabled={true}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{ width: '130px' }}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(4)}
          >
            <ChevronLeft size={17} className='mr-1' />
            Atr??s
          </Button>
          <Button
            style={{ width: '130px' }}
            color="dark"
            outline
            onClick={() => { formik.handleReset()/* ; this.reset() */ }}
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
          >
            Siguiente
            <ChevronRight size={17} className='ml-1' />
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default ImportesRelacionados
