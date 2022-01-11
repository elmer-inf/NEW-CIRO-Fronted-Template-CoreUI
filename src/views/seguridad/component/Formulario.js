import React, { useState, useEffect, Fragment } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Row, Col, Form, Button, Label } from 'reactstrap'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { buildSelectTwo, buildSelectThree } from 'src/functions/Function'
import { getTablaDescripcionSeguridadN1 } from 'src/views/administracion/seguridad/controller/AdminSeguridadController'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController'
import { Delete, Save } from 'react-feather'
import { useHistory } from 'react-router-dom'

const FormSeguridad = ({ initialValuess, handleOnSubmit }) => {

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        fechaRegistro: Yup.date().nullable(),
        ipUrl: Yup.string().nullable(),
        activoInformacion: Yup.string().nullable(),
        red: Yup.mixed().nullable(),
        descripcionRiesgo: Yup.string().nullable(),
        recomendacion: Yup.string().nullable(),
        fechaSolucion: Yup.date().nullable(),
        fechaLimite: Yup.date().nullable(),
        planTrabajo: Yup.string().nullable(),
        informeEmitido: Yup.string().nullable(),
        ciSeguimiento: Yup.string().nullable(),
        comentario: Yup.string().nullable(),

        tipoActivoId: Yup.mixed().nullable(),
        nivelRiesgoId: Yup.mixed().required('Campo obligatorio'),
        estadoId: Yup.mixed().required('Campo obligatorio'),
        areaId: Yup.mixed().nullable()
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tipoActivoId: (values.tipoActivoId !== null) ? values.tipoActivoId.value : 0,
        nivelRiesgoId: (values.nivelRiesgoId !== null) ? values.nivelRiesgoId.value : 0,
        estadoId: (values.estadoId !== null) ? values.estadoId.value : 0,
        areaId: (values.areaId !== null) ? values.areaId.value : 0,
        red: (values.red !== null) ? values.red.value : null
      }
      console.log('datos que se enviaran:', data)
      handleOnSubmit(data)
    }
  })

  //  P  A  R  A  M  E  T  R  O  S
  // TipoActivo
  const [dataApiTipoActivo, setDataApiTipoActivo] = useState([])
  const callApiTipoActivo = (idTablaDes) => {
    getTablaDescripcionSeguridadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiTipoActivo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Estado
  const [dataApiEstado, setDataApiEstado] = useState([])
  const callApiEstado = (idTablaDes) => {
    getTablaDescripcionSeguridadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEstado(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Nivel Riesgo
  const [dataApiNivelRiesgo, setDataApiNivelRiesgo] = useState([])
  const callApiNivelRiesgo = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'campoA', 'campoB', false)
        setDataApiNivelRiesgo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Area
  const [dataApiArea, setDataApiArea] = useState([])
  const callApiArea = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiArea(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // RED
  const optionsRed = [
    { value: 'CORP', label: 'CORP' },
    { value: 'PCI', label: 'PCI' }
  ]

  useEffect(() => {
    callApiTipoActivo(1);
    callApiEstado(2);
    callApiNivelRiesgo(9);
    callApiArea(3);
  }, [])
  // F  I  N     P  A  R  A  M  E  T  R  O  S

  const history = useHistory();
  const redirect = (e) => {
      history.push('/seguridad/Listar');
  }

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha Registro {/* <span className='text-primary h5'><b>*</b></span> */}
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaRegistro'}
              value={formik.values.fechaRegistro}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaRegistro}
              errors={formik.errors.fechaRegistro}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tipo de activo de información
            </Label>
            <CSelectReact
              type={"select"}
              id={'tipoActivoId'}
              placeholder={'Seleccionar'}
              value={formik.values.tipoActivoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.tipoActivoId}
              touched={formik.touched.tipoActivoId}
              options={dataApiTipoActivo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              IP o URL activo de información
            </Label>
            <CInputReact
              type={"text"}
              id={'ipUrl'}
              placeholder={'IP / URL'}
              value={formik.values.ipUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.ipUrl}
              errors={formik.errors.ipUrl}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Nombre activo de información
            </Label>
            <CInputReact
              type={"text"}
              id={'activoInformacion'}
              placeholder={'Nombre activo de información'}
              value={formik.values.activoInformacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.activoInformacion}
              errors={formik.errors.activoInformacion}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Red
            </Label>
            <CSelectReact
              type={"select"}
              id={'red'}
              placeholder={'Seleccionar'}
              value={formik.values.red}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.red}
              touched={formik.touched.red}
              options={optionsRed}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Nivel de riesgo
            </Label>
            <CSelectReact
              type={"select"}
              id={'nivelRiesgoId'}
              placeholder={'Seleccionar'}
              value={formik.values.nivelRiesgoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.nivelRiesgoId}
              touched={formik.touched.nivelRiesgoId}
              options={dataApiNivelRiesgo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
            <Label className='form-label'>
              Descripción del riesgo (Vulnerabilidad + amenaza + impacto)
            </Label>
            <CInputReact
              type={"textarea"}
              id={'descripcionRiesgo'}
              placeholder={'Descripción del riesgo (Vulnerabilidad + amenaza + impacto)'}
              value={formik.values.descripcionRiesgo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcionRiesgo}
              errors={formik.errors.descripcionRiesgo}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
            <Label className='form-label'>
              Recomendación
            </Label>
            <CInputReact
              type={"textarea"}
              id={'recomendacion'}
              placeholder={'Recomendación'}
              value={formik.values.recomendacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.recomendacion}
              errors={formik.errors.recomendacion}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha de solución
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaSolucion'}
              placeholder={'Fecha descubrimiento'}
              value={formik.values.fechaSolucion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaSolucion}
              errors={formik.errors.fechaSolucion}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha límite de atención
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaLimite'}
              value={formik.values.fechaLimite}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaLimite}
              errors={formik.errors.fechaLimite}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              Área
            </Label>
            <CSelectReact
              type={"select"}
              id={'areaId'}
              placeholder={'Seleccionar'}
              value={formik.values.areaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.areaId}
              touched={formik.touched.areaId}
              options={dataApiArea}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              Tratamiento o estado
            </Label>
            <CSelectReact
              type={"select"}
              id={'estadoId'}
              placeholder={'Seleccionar'}
              value={formik.values.estadoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.estadoId}
              touched={formik.touched.estadoId}
              options={dataApiEstado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
            <Label className='form-label'>
              Plan de trabajo
            </Label>
            <CInputReact
              type={"textarea"}
              id={'planTrabajo'}
              placeholder={'Plan de trabajo'}
              value={formik.values.planTrabajo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.planTrabajo}
              errors={formik.errors.planTrabajo}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
            <Label className='form-label'>
              Informe emitido
            </Label>
            <CInputReact
              type={"textarea"}
              id={'informeEmitido'}
              placeholder={'Informe emitido'}
              value={formik.values.informeEmitido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.informeEmitido}
              errors={formik.errors.informeEmitido}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              CI. de seguimiento
            </Label>
            <CInputReact
              type={"textarea"}
              id={'ciSeguimiento'}
              placeholder={'CI. de seguimiento'}
              value={formik.values.ciSeguimiento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.ciSeguimiento}
              errors={formik.errors.ciSeguimiento}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              Comentarios SGSI & TIC
            </Label>
            <CInputReact
              type={"textarea"}
              id={'comentario'}
              placeholder={'Comentarios SGSI & TIC'}
              value={formik.values.comentario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.comentario}
              errors={formik.errors.comentario}
              rows={2}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{ width: '130px' }}
            color="primary"
            outline
            onClick={(e) => {redirect(e)}}
          >
            Cancelar
          </Button>
          <Button
            style={{ width: '130px' }}
            color="dark"
            outline
            onClick={() => { formik.handleReset() }}
            disabled={!formik.dirty || formik.isSubmitting}
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
            <Save size={17} className='mr-2'/>
            GUARDAR
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}
export default FormSeguridad
