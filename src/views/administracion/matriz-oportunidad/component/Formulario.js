import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Col, Form, Button, Label } from 'reactstrap'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionOportunidadN1 } from '../controller/AdminOportunidadController';
import { buildSelectTwo } from 'src/functions/Function'
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo'

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
      console.log('datos que se enviaran:', data)
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
        console.log('Error: ', error)
      })
  }


  /*
    useEffect(() => {
     if( formik.values.tablaId !== null){
      const idnivel2 = formik.values.tablaId.nivel2;
      callApi2(idnivel2);
      resetValues();
     }
     //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.tablaId])
  */
  /*useEffect(() => {
     if( formik.values.tablaId !== null){
      console.log('efect 2: ',formik.values.tablaId.nivel2 )
      const idnivel2 = formik.values.tablaId.nivel2;
      callApi2(idnivel2);
     }
     //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])*/


  const resetValues = () => {
    /*     formik.setFieldValue('campoA', null, false);
        formik.setFieldValue('nombre', null, false);
        formik.setFieldValue('campoB', null, false);
        formik.setFieldValue('campoC', null, false);
        formik.setFieldValue('campoD', null, false);
        formik.setFieldValue('tablaId', null, false); */
    formik.setFieldValue('nivel2Id', null, false);
  }

  const clearAllDependences = () => {
    resetValues();
    setDataApi([]);
  }

  const getSelectValueLevel2 = (value) => {
    console.log('getSelectValue : ', value);
    if (value.nivel2 !== null && value.nivel2 !== 0) {
      const idnivel2 = value.nivel2;
      callApi2(idnivel2);
    }
  }
  const inputIsClearableLevel2 = (id) => {
    console.log('inputIsClearable aaa: ', id);
    //formik.setFieldValue(id, null, false);
    //clearAllDependences();
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
          {/*      <CSelectReact
            type={"select"}
            id={'tablaId'}
            placeholder={'Seleccionar . . . '}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            options={optionsList.opTabla || []}
          /> */}

          <CSelectReactTwo
            label={""}
            id={'tablaId'}
            placeholder={'Seleccione'}
            value={formik.values.tablaId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            errors={formik.errors.tablaId}
            touched={formik.touched.tablaId}
            //options={tablaIdOptions}optionToSelect.tablaOp
            options={optionsList.opTabla || []}
            obligatorio={true}
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            dependence={true}
            cleareableDependences={clearAllDependences}  //FUNCION PARA LIMPIA LOS VALORES FORMIK...
            getAddValue={true}
            getSelectValue={getSelectValueLevel2} // AGGARA EL EL VALOR DEL SELECT VALUE
            inputIsClearable={inputIsClearableLevel2} // AGGARA EL EL VALOR DEL SELECT VALUE
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
              placeholder={'Seleccionar . . . '}
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

      <FormGroup className='mb-0' row>
        <Col className='d-flex justify-content-center'>
          <Button
            className='mr-4 text-white'
            color="primary"
            type="submit"
          //disabled={formik.isSubmitting}
          //disabled={(formik.values.tablaId !== null && formik.values.tablaId.label === 'Tasa de cambio')? true : false}
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
