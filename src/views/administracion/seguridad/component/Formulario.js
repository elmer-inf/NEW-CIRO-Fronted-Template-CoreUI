import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Col, Form, Button, Label } from 'reactstrap'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaListaSeguridad } from '../controller/AdminSeguridadController';
import { buildSelectTwo } from 'src/functions/Function'

const AdminFormSeguridad = ({ initialValuess, handleOnSubmit }) => {

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        nombre: Yup.string().max(1000).required('Campo obligatorio'),
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
export default AdminFormSeguridad
