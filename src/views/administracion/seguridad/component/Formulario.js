import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Col, Form, Button, Label, Row } from 'reactstrap'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaListaSeguridad } from '../controller/AdminSeguridadController';
import { buildSelectTwo } from 'src/functions/Function'
import { Delete, Save, XSquare } from 'react-feather'

const AdminFormSeguridad = ({ initialValuess, handleOnSubmit }) => {

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        nombre: Yup.string().required('Campo obligatorio'),
        tablaId: Yup.mixed().required('Campo obligatorio')
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tablaId: values.tablaId.value
      }
      handleOnSubmit(data)
    }
  })

  /* LISTA LAS TABLAS LISTA DE Seguridad */
  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const callApi = () => {
    getTablaListaSeguridad()
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
        <Label sm='3' lg='3' for='tabla'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          <CSelectReact
            type={"select"}
            id={'tablaId'}
            placeholder={'Seleccionar'}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            options={tablaListaOptions}
          />
        </Col>
      </FormGroup>

      {(formik.values.tablaId !== null) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='nombre'>
            {formik.values.tablaId.label === 'Tipo de activo de información' ? 'Nombre del tipo' : null}
            {formik.values.tablaId.label === 'Tratamiento o estado' ? 'Nombre del estado' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'nombre'}
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.nombre}
              errors={formik.errors.nombre}
            />
          </Col>
        </FormGroup>
        : null}

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
            href='#/administracion/seguridad/Listar'
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
export default AdminFormSeguridad
