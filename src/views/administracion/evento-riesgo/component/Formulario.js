import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from '../../../../reusable/CInputReact'
import { FormGroup, Col, Form, Button, Label } from 'reactstrap'
import { CSelectReact } from '../../../../reusable/CSelectReact'
import { getTablaLista, getTablaDescripcionNivel } from '../controller/AdminEventoController';
import { buildSelectTwo } from '../../../../functions/Function'

/**
 * @param handleOnSubmit : function 
 * @description handleOnSubmit es una funcionm que se recibe del prop y es usada para realizar el post request (guardar registros)
 * @returns 
 */

const AdminFormEvento = ({ initialValuess, handleOnSubmit }) => {

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        tablaLista: Yup.mixed().required('Campo obligatorio'),
        clave: Yup.string().min(1).max(50).nullable(),
        nombre: Yup.string().min(2).max(500).required('Campo obligatorio'),
        descripcion: Yup.string().min(2).max(1000).nullable(),
        nivel2_id: Yup.mixed(),
        nivel3_id: Yup.mixed(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tablaLista: values.tablaLista.value,
        nivel2_id: (values.nivel2_id !== null) ? values.nivel2_id.value : 0,
        nivel3_id: (values.nivel3_id !== null) ? values.nivel3_id.value : 0
      }
      console.log('datos que se enviaran:', values)
      console.log('datos que se data:', data)
      handleOnSubmit(data)
    }
  })

  /* LISTA LAS TABLAS LISTA*/
  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const callApi = () => {
    getTablaLista()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true)
        //console.log('El response de tabla: ', res.data)
        //console.log('options : ', options)
        setTablaListaOptions(options)
      }).catch((error) => {
        //console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
    callApi();
  }, [])


  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const [dataApi2, setDataApi] = useState([])

  const callApi2 = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        //console.log('El response de tabla call api 2: ', res.data)
        //console.log('options : ', options)
        setDataApi(options)
      }).catch((error) => {
        //console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  const resetValues = () => {
    formik.setFieldValue('nivel2_id', null, false);
    formik.setFieldValue('nivel3_id', null, false)
  }

  useEffect(() => {
   if( formik.values.tablaLista !== null){
    const idnivel2 = formik.values.tablaLista.nivel2;
    callApi2(idnivel2);
    resetValues();
   }
  }, [formik.values.tablaLista])

  useEffect(() => {
    if( formik.values.tablaLista !== null){
     console.log('efect 2: ',formik.values.tablaLista.nivel2 )
     const idnivel2 = formik.values.tablaLista.nivel2;
     callApi2(idnivel2);
    }
   }, [])


  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  const [dataApi3, setDataApi3] = useState([])

  const callApi3 = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        //console.log('El response de tabla: ', res.data)
        //console.log('options : ', options)
        setDataApi3(options)
      }).catch((error) => {
        //console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
   if( formik.values.tablaLista !== null){
    const idnivel3 = formik.values.tablaLista.nivel3;
    callApi3(idnivel3);
    resetValues();
   }
  }, [formik.values.tablaLista])


  // Style Select
  const customStyles =  {
    control: (styles,) => ({
        ...styles,
        boxShadow: 'none'
    }),
    option: (styles, { isDisabled, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? '#e79140' : 'white',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
            backgroundColor: '#e79140',
            color: 'white'
        },
        ':hover':{
            backgroundColor: isSelected ? '#e79140' : '#fbf3eb',
            color: isSelected ? 'white' : '#e79140'
        }
      }
    }
  }

  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row>
        <Label sm='3' for='tabla'>
          Tabla
        </Label>
        <Col sm='9'>
          <CSelectReact
            type={"select"}
            id={'tablaLista'}
            placeholder={'Seleccionar . . . '}
            value={formik.values.tablaLista}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.tablaLista}
            touched={formik.touched.tablaLista}
            options={tablaListaOptions}
            //styles={customStyles}
          />
        </Col>
      </FormGroup>

      { (formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Área' ||
        formik.values.tablaLista.label === 'Unidad' ||
        formik.values.tablaLista.label === 'Entidad' ||
        formik.values.tablaLista.label === 'Tipo de evento' ||
        formik.values.tablaLista.label === 'Canal ASFI' ||
        formik.values.tablaLista.label === 'Proceso' ||
        formik.values.tablaLista.label === 'Moneda' ||
        formik.values.tablaLista.label === 'Póliza ATC')) ?
        <FormGroup row>
          <Label sm='3' for='clave'>
            {(formik.values.tablaLista.label === 'Área' ||
              formik.values.tablaLista.label === 'Unidad' ||
              formik.values.tablaLista.label === 'Canal ASFI' ||
              formik.values.tablaLista.label === 'Proceso') ? 'Código': null }
            {(formik.values.tablaLista.label === 'Entidad' ||
              formik.values.tablaLista.label === 'Tipo de evento') ? 'Sigla': null }
            {formik.values.tablaLista.label === 'Moneda' ? 'Abreviatura': null }
            {formik.values.tablaLista.label === 'Póliza ATC' ? 'Nro': null }

          </Label>
          <Col sm='9'>
            <CInputReact
              type={"text"}
              id={'clave'}
              placeholder={'Clave'}
              value={formik.values.clave}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.clave}
              errors={formik.errors.clave}
            />
          </Col>
        </FormGroup>
      : null
      }


      <FormGroup row>
        <Label sm='3' for='nombre'>
          Nombre
        </Label>
        <Col sm='9'>
          <CInputReact
            type={"text"}
            id={'nombre'}
            placeholder={'Nombre'}
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.nombre}
            errors={formik.errors.nombre}
          />
        </Col>
      </FormGroup>

      { (formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Categoria de tipo de Evento' ||
        formik.values.tablaLista.label === 'Efecto de pérdida' ||
        formik.values.tablaLista.label === 'Impacto')) ?
        <FormGroup row>
          <Label sm='3' for='descripcion'>
            Descripción
          </Label>
          <Col sm='9'>
            <CInputReact
              type={"textarea"}
              id={'descripcion'}
              placeholder={'Descripción'}
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcion}
              errors={formik.errors.descripcion}
              rows={5}
            />
          </Col>
        </FormGroup>
      : null
      }

      { (formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Ciudad' ||
          formik.values.tablaLista.label === 'Unidad' ||
          formik.values.tablaLista.label === 'Sub evento - Basilea' ||
          formik.values.tablaLista.label === 'Procedimiento' ||
          formik.values.tablaLista.label === 'Tipo de servicio')) ? // Para nivel 2
        <FormGroup row>
          <Label sm='3' for='nivel2_id'>
            {formik.values.tablaLista.label === 'Ciudad' ? 'Agencia': null }
            {formik.values.tablaLista.label === 'Unidad' ? 'Área': null }
            {formik.values.tablaLista.label === 'Sub evento - Basilea' ? 'Categoria de tipo de Evento': null }
            {formik.values.tablaLista.label === 'Procedimiento' ? 'Proceso': null }
            {formik.values.tablaLista.label === 'Tipo de servicio' ? 'Operación, producto, servicio': null }
          </Label>
          <Col sm='9'>
            <CSelectReact
              type={"select"}
              id={'nivel2_id'}
              placeholder={'Seleccionar . . . '}
              value={formik.values.nivel2_id}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.nivel2_id}
              touched={formik.touched.nivel2_id}
              options={dataApi2}
            />
          </Col>
        </FormGroup>
      : null }

      { (formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Clase Evento - Basilea' ||
          formik.values.tablaLista.label === 'Descripción de servicio')) ? // para  nivel 2 y 3
        <FormGroup row>
          <Label sm='3' for='nivel2_id'>
            {formik.values.tablaLista.label === 'Clase Evento - Basilea' ? 'Categoria de tipo de Evento': null }
            {formik.values.tablaLista.label === 'Descripción de servicio' ? 'Operaciones, productos, servicios': null }
          </Label>
          <Col sm='9'>
            <CSelectReact
              type={"select"}
              id={'nivel2_id'}
              placeholder={'Seleccionar . . . '}
              value={formik.values.nivel2_id}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.nivel2_id}
              touched={formik.touched.nivel2_id}
              options={dataApi2}
            />
          </Col>

          <Label sm='3' for='nivel3'>
            {formik.values.tablaLista.label === 'Clase Evento - Basilea' ? 'Sub evento - Basilea': null }
            {formik.values.tablaLista.label === 'Descripción de servicio' ? 'Tipo de servicio': null }
          </Label>
          <Col sm='9'>
            <CSelectReact
              type={"select"}
              id={'nivel3_id'}
              placeholder={'Seleccionar . . . '}
              value={formik.values.nivel3_id}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.nivel3_id}
              touched={formik.touched.nivel3_id}
              options={dataApi3}
            />
          </Col>
        </FormGroup>
      : null }


      <FormGroup className='mb-0' row>
        <Col className='d-flex' md={{ size: 9, offset: 3 }}>
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
export default AdminFormEvento
