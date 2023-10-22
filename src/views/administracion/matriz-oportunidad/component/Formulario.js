import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { CInputReact } from 'src/reusable/CInputReact';
import { FormGroup, Col, Form, Button, Label, Row } from 'reactstrap';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { getTablaDescripcionOportunidadN1 } from '../controller/AdminOportunidadController';
import { buildSelectTwo } from 'src/functions/Function';
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo';
import { Delete, Save, XSquare } from 'react-feather';

const AdminFormMatrizRiesgo = ({ initialValuess, handleOnSubmit, optionsList, isEdit }) => {
  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        campoA: Yup.string().nullable(),
        nombre: Yup.string().required('Campo obligatorio'),
        campoB: Yup.string().nullable(),
        campoC: Yup.string().nullable(),
        campoD: Yup.string().nullable(),
        tablaId: Yup.mixed().required('Campo obligatorio'),
        nivel2Id: Yup.mixed(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        tablaId: values.tablaId.value,
        nivel2Id: (values.nivel2Id !== null) ? values.nivel2Id.value : 0,
      }
      handleOnSubmit(data)
    }
  })

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const [dataApi2, setDataApi] = useState(optionsList.opLebel2List);
  const callApi2 = (idTablaDes) => {
    getTablaDescripcionOportunidadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true);
        setDataApi(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  const resetValues = () => {
    formik.setFieldValue('nivel2Id', null, false);
  }

  const clearAllDependences = () => {
    resetValues();
    setDataApi([]);
  }

  const getSelectValueLevel2 = (value) => {
    if (value.nivel2 !== null && value.nivel2 !== 0) {
      const idnivel2 = value.nivel2;
      callApi2(idnivel2);
    }
  }
  const inputIsClearableLevel2 = (id) => {
    //console.log('inputIsClearable aaa: ', id);
  }

  useEffect(() => {
    if (isEdit) {
      setDataApi(optionsList.opLebel2List)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsList]);


  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row className='justify-content-center'>
        <Label sm='3' lg='3' for='tabla' className='font-weight-bold'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          <CSelectReactTwo
            label={""}
            id={'tablaId'}
            placeholder={'Seleccione'}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            errors={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            options={optionsList.opTabla || []}
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
        (formik.values.tablaId.label === 'Matriz FODA - Listado' ||
          formik.values.tablaId.label === 'Grupos de interés' ||
          formik.values.tablaId.label === 'Impacto de oportunidad' ||
          formik.values.tablaId.label === 'Tratamiento - oportunidad' ||
          formik.values.tablaId.label === 'Fortaleza - oportunidad')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaId.label === 'Matriz FODA - Listado' ? 'Código' : null}
            {formik.values.tablaId.label === 'Grupos de interés' ? 'Int/Ext' : null}
            {formik.values.tablaId.label === 'Impacto de oportunidad' ? 'Nivel' : null}
            {formik.values.tablaId.label === 'Tratamiento - oportunidad' ? 'Calificación' : null}
            {formik.values.tablaId.label === 'Fortaleza - oportunidad' ? 'Ponderación' : null}
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
            {formik.values.tablaId.label === 'Matriz FODA' ? 'Nombre' : null}
            {formik.values.tablaId.label === 'Matriz FODA - Listado' ||
              formik.values.tablaId.label === 'Fortaleza - oportunidad' ? 'Descripción' : null}
            {formik.values.tablaId.label === 'Grupos de interés' ? 'Parte interesada' : null}
            {formik.values.tablaId.label === 'Impacto de oportunidad' ? 'Descriptivo' : null}
            {formik.values.tablaId.label === 'Tratamiento - oportunidad' ? 'Nivel' : null}
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
              rows={2}
            />
          </Col>
        </FormGroup>
        : null}


      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Impacto de oportunidad' ||
          formik.values.tablaId.label === 'Tratamiento - oportunidad')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaId.label === 'Impacto de oportunidad' ? 'Descriptivo 2' : null}
            {formik.values.tablaId.label === 'Tratamiento - oportunidad' ? 'Descriptivo' : null}
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
              rows={2}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Impacto de oportunidad' ||
          formik.values.tablaId.label === 'Tratamiento - oportunidad')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaId.label === 'Impacto de oportunidad' ? 'Impacto-oportunidad' : null}
            {formik.values.tablaId.label === 'Tratamiento - oportunidad' ? 'Descripción' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoC'}
              value={formik.values.campoC}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoC}
              errors={formik.errors.campoC}
              rows={2}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaId !== null &&
        (formik.values.tablaId.label === 'Impacto de oportunidad' ||
          formik.values.tablaId.label === 'Tratamiento - oportunidad')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaId.label === 'Impacto de oportunidad' ? '% de Impacto-oportunidad' : null}
            {formik.values.tablaId.label === 'Tratamiento - oportunidad' ? 'Tratamiento' : null}
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
              rows={2}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaId !== null && // PARA NIVEL 2
        formik.values.tablaId.label === 'Matriz FODA - Listado') ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='nivel2Id'>
            Matriz FODA
          </Label>
          <Col sm='9' lg='5'>
            <CSelectReact
              type={"select"}
              id={'nivel2Id'}
              placeholder={'Seleccionar'}
              value={formik.values.nivel2Id}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.nivel2Id}
              touched={formik.touched.nivel2Id}
              options={dataApi2}
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
            href='#/administracion/matriz-oportunidad/Listar'
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
