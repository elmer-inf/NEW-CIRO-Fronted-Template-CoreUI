import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { CInputReact } from 'src/reusable/CInputReact';
import { FormGroup, Col, Form, Button, Label, Row } from 'reactstrap';
import { getTablaDescripcionEventoN1 } from '../controller/AdminEventoController';
import { buildSelectTwo } from 'src/functions/Function';
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Delete, Save, XSquare } from 'react-feather';

const AdminFormEvento = ({ initialValuess, handleOnSubmit, isEdit, optionToSelect }) => {

  const [varListN2, setVarListN2] = useState(optionToSelect.tabla_n2);
  const [varListN3, setVarListN3] = useState(optionToSelect.tabla_n3);

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        tablaLista: Yup.mixed().required('Campo obligatorio'),
        clave: Yup.string().min(1).nullable(),
        nombre: Yup.string().min(1).required('Campo obligatorio'),
        descripcion: Yup.mixed().nullable(),
        campoA: Yup.string().min(1).nullable(),
        campoB: Yup.string().min(1).nullable(),
        campoC: Yup.mixed().nullable(),
        campoD: Yup.string().min(1).nullable(),
        codigoAsfi: Yup.string().min(1).nullable(),
        nivel2_id: Yup.mixed(),
        nivel3_id: Yup.mixed(),
      }
    ),
    onSubmit: values => {
      const data = {
        ...values,
        tablaLista: values.tablaLista.value,
        nivel2_id: (values.nivel2_id !== null) ? values.nivel2_id.value : 0,
        nivel3_id: (values.nivel3_id !== null) ? values.nivel3_id.value : 0,
        descripcion: (values.tablaLista.label === 'Responsable') ? values.descripcion.value : values.descripcion,
        campoC: (values.tablaLista.label === 'Responsable') ? values.campoC.value : values.campoC,
      }
      handleOnSubmit(data)
    }
  })

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idn2) => {
    getTablaDescripcionEventoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setVarListN2(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  const callApi3 = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setVarListN3(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  const resetAllValues = () => {
    formik.setFieldValue('clave', '', false);
    formik.setFieldValue('nombre', '', false);
    formik.setFieldValue('descripcion', '', false);
    formik.setFieldValue('campoA', '', false);
    formik.setFieldValue('campoB', '', false);
    formik.setFieldValue('campoC', '', false);
    formik.setFieldValue('campoD', '', false);
    formik.setFieldValue('cadigoAsfi', '', false);
    formik.setFieldValue('nivel2_id', null, false);
    formik.setFieldValue('nivel3_id', null, false);
  }

  /* Get List Level 2v*/
  const clearAllDependences = () => {
    resetAllValues();
    setVarListN2([]);
  }

  const getSelectValueLevel2 = (value) => {
    if (value.nivel2 !== null && value.nivel2 !== 0) {
      const idnivel2 = value.nivel2;
      callApi2(idnivel2);
    }
    if (value.nivel3 !== null && value.nivel3 !== 0) {
      const idnivel3 = value.nivel3;
      callApi3(idnivel3);
    }
  }

  const inputIsClearableLevel2 = (id) => {
    //console.log('inputIsClearable aaa: ', id);
    //formik.setFieldValue(id, null, false);
    //clearAllDependences();
  }

  //Life Cycle
  useEffect(() => {
    if (isEdit) {
      setVarListN2(optionToSelect.tabla_n2)
      setVarListN3(optionToSelect.tabla_n3)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionToSelect]);

  // P A R A M E T R O S
  // Cargos
  const dataApiCargo = [
    { value: 'Gerente de Riesgos Integrales', label: 'Gerente de Riesgos Integrales' },
    { value: 'Subgerente de Riesgos', label: 'Subgerente de Riesgos' },
    { value: 'Analista de Riesgos', label: 'Analista de Riesgos' },
    { value: 'Asistente de Riesgos', label: 'Asistente de Riesgos' },
  ]

  // Opciones Select Tipo de Responsable
  const optionsTipoRes = [
    { value: 'Elaborador', label: 'Elaborador' },
    { value: 'Revisor', label: 'Revisor' },
    { value: 'Aprobador', label: 'Aprobador' }
  ]
  // F I N   P A R A M E T R O S

  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row className='justify-content-center'>
        <Label sm='3' lg='3' for='tabla' className='font-weight-bold'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          <CSelectReactTwo
            //label={""}
            id={'tablaLista'}
            placeholder={'Seleccionar'}
            value={formik.values.tablaLista}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            errors={formik.errors.tablaLista}
            touched={formik.touched.tablaLista}
            options={optionToSelect.tablaOp || []}
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

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Área' ||
          formik.values.tablaLista.label === 'Unidad' ||
          formik.values.tablaLista.label === 'Entidad' ||
          formik.values.tablaLista.label === 'Tipo de evento' ||
          formik.values.tablaLista.label === 'Macroproceso' ||
          formik.values.tablaLista.label === 'Proceso' ||
          formik.values.tablaLista.label === 'Moneda' ||
          formik.values.tablaLista.label === 'Póliza ATC' ||
          formik.values.tablaLista.label === 'Reputacional' ||
          formik.values.tablaLista.label === 'Legal' ||
          formik.values.tablaLista.label === 'Cumplimiento' ||
          formik.values.tablaLista.label === 'Estratégico' ||
          formik.values.tablaLista.label === 'Gobierno' ||
          formik.values.tablaLista.label === 'Fraude' ||
          formik.values.tablaLista.label === 'Liquidez' ||
          formik.values.tablaLista.label === 'Operativo' ||
          formik.values.tablaLista.label === 'Seguridad de la información'
        ))
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {(formik.values.tablaLista.label === 'Área' ||
              formik.values.tablaLista.label === 'Unidad' ||
              formik.values.tablaLista.label === 'Macroproceso') ? 'Código' : null}
            {formik.values.tablaLista.label === 'Proceso' ? 'Tipo documento' : null}
            {(formik.values.tablaLista.label === 'Entidad' ||
              formik.values.tablaLista.label === 'Tipo de evento') ? 'Sigla' : null}
            {formik.values.tablaLista.label === 'Moneda' ? 'Abreviatura' : null}
            {formik.values.tablaLista.label === 'Póliza ATC' ? 'Nro' : null}
            {(formik.values.tablaLista.label === 'Reputacional' ||
              formik.values.tablaLista.label === 'Legal' ||
              formik.values.tablaLista.label === 'Cumplimiento' ||
              formik.values.tablaLista.label === 'Estratégico' ||
              formik.values.tablaLista.label === 'Gobierno' ||
              formik.values.tablaLista.label === 'Fraude' ||
              formik.values.tablaLista.label === 'Liquidez' ||
              formik.values.tablaLista.label === 'Operativo') ? 'Nivel' : null}
            {formik.values.tablaLista.label === 'Seguridad de la información' ? 'Calificación' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'clave'}
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

      {formik.values.tablaLista !== null
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='nombre'>
            {formik.values.tablaLista.label === 'Proceso' ? 'Código documento' :
              (formik.values.tablaLista.label === 'Reputacional' ||
                formik.values.tablaLista.label === 'Legal' ||
                formik.values.tablaLista.label === 'Cumplimiento' ||
                formik.values.tablaLista.label === 'Estratégico' ||
                formik.values.tablaLista.label === 'Gobierno' ||
                formik.values.tablaLista.label === 'Fraude' ||
                formik.values.tablaLista.label === 'Liquidez' ||
                formik.values.tablaLista.label === 'Operativo' ||
                formik.values.tablaLista.label === 'Seguridad de la información') ?
                'Descriptivo' : (formik.values.tablaLista.label === 'Recuperación activo' || formik.values.tablaLista.label === 'Cuenta contable') ? 'Descripción' : 'Nombre'}
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
        : null
      }

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Categoria de tipo de Evento' ||
          formik.values.tablaLista.label === 'Efecto de pérdida' ||
          formik.values.tablaLista.label === 'Impacto' ||
          formik.values.tablaLista.label === 'Reputacional' ||
          formik.values.tablaLista.label === 'Estratégico' ||
          formik.values.tablaLista.label === 'Operativo' ||
          formik.values.tablaLista.label === 'Legal' ||
          formik.values.tablaLista.label === 'Cumplimiento' ||
          formik.values.tablaLista.label === 'Gobierno' ||
          formik.values.tablaLista.label === 'Fraude' ||
          formik.values.tablaLista.label === 'Liquidez' ||
          formik.values.tablaLista.label === 'Macroproceso' ||
          formik.values.tablaLista.label === 'Proceso' ||
          formik.values.tablaLista.label === 'Seguridad de la información' ||
          formik.values.tablaLista.label === 'Responsable'))
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='descripcion'>
            {(formik.values.tablaLista.label === 'Categoria de tipo de Evento' ||
              formik.values.tablaLista.label === 'Efecto de pérdida' ||
              formik.values.tablaLista.label === 'Impacto' ||
              formik.values.tablaLista.label === 'Reputacional' ||
              formik.values.tablaLista.label === 'Estratégico' ||
              formik.values.tablaLista.label === 'Operativo' ||
              formik.values.tablaLista.label === 'Seguridad de la información') ? 'Descripción' : null}
            {(formik.values.tablaLista.label === 'Legal' || formik.values.tablaLista.label === 'Liquidez') ? 'Impacto regulatorio' : null}
            {formik.values.tablaLista.label === 'Cumplimiento' ? 'Impacto de cumplimiento' : null}
            {formik.values.tablaLista.label === 'Gobierno' ? 'Nivel de gobernabilidad #' : null}
            {formik.values.tablaLista.label === 'Fraude' ? 'Importe reportado fraude (USD)' : null}
            {formik.values.tablaLista.label === 'Macroproceso' ? 'Nivel' : null}
            {formik.values.tablaLista.label === 'Proceso' ? 'Nombre documento' : null}
            {formik.values.tablaLista.label === 'Responsable' ? 'Cargo' : null}
          </Label>
          <Col sm='9' lg='5'>
            {formik.values.tablaLista.label === 'Responsable'
              ? <CSelectReact
                type={"select"}
                id={'descripcion'}
                placeholder={'Seleccionar'}
                value={formik.values.descripcion}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.descripcion}
                touched={formik.touched.descripcion}
                options={dataApiCargo}
              />
              : <CInputReact
                type={"textarea"}
                id={'descripcion'}
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.descripcion}
                errors={formik.errors.descripcion}
                rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable') ? 1 : 3}
              />
            }
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Macroproceso' ||
          formik.values.tablaLista.label === 'Proceso' ||
          formik.values.tablaLista.label === 'Gobierno' ||
          formik.values.tablaLista.label === 'Fraude' ||
          formik.values.tablaLista.label === 'Liquidez' ||
          formik.values.tablaLista.label === 'Seguridad de la información' ||
          formik.values.tablaLista.label === 'Responsable'))
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaLista.label === 'Macroproceso' ? 'Valoración' : null}
            {formik.values.tablaLista.label === 'Gobierno' ? 'Nivel de gobernabilidad' : null}
            {formik.values.tablaLista.label === 'Fraude' ? 'Fraude a ventas (USD)' : null}
            {formik.values.tablaLista.label === 'Liquidez' ? 'Liquidez' : null}
            {formik.values.tablaLista.label === 'Proceso' ? 'Proceso' : null}
            {formik.values.tablaLista.label === 'Seguridad de la información' ? 'Plazo de atención hasta' : null}
            {formik.values.tablaLista.label === 'Responsable' ? 'Descripción' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"textarea"}
              id={'campoA'}
              value={formik.values.campoA}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoA}
              errors={formik.errors.campoA}
              rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable') ? 3 : 1}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Proceso' ||
          formik.values.tablaLista.label === 'Gobierno' ||
          formik.values.tablaLista.label === 'Fraude' ||
          formik.values.tablaLista.label === 'Liquidez' ||
          formik.values.tablaLista.label === 'Responsable'))
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            {formik.values.tablaLista.label === 'Proceso' ? 'Gerencia' : null}
            {formik.values.tablaLista.label === 'Gobierno' ? 'Puntuación Autoevaluación' : null}
            {formik.values.tablaLista.label === 'Fraude' ? 'Importe reportado fraude 2 (USD)' : null}
            {formik.values.tablaLista.label === 'Liquidez' ? 'Capital de trabajo' : null}
            {formik.values.tablaLista.label === 'Responsable' ? 'Usuario' : null}
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'campoB'}
              value={formik.values.campoB}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoB}
              errors={formik.errors.campoB}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Fraude' ||
          formik.values.tablaLista.label === 'Responsable'))
        ? <FormGroup row className='justify-content-center'>
          <Label sm='3' lg={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable') ? '3' : '8'} for='clave'>
            {formik.values.tablaLista.label === 'Fraude' ? 'Impacto - severidad' : null}
            {formik.values.tablaLista.label === 'Responsable' ? 'Tipo' : null}
          </Label>
          <Col sm='9' lg={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable') ? '5' : '8'}>
            {formik.values.tablaLista.label === 'Responsable'
              ? <CSelectReact
                type={"select"}
                id={'campoC'}
                placeholder={'Seleccionar'}
                value={formik.values.campoC}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.campoC}
                touched={formik.touched.campoC}
                options={optionsTipoRes}
              />
              : <CInputReact
                type={"textarea"}
                id={'campoC'}
                value={formik.values.campoC}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.campoC}
                errors={formik.errors.campoC}
                rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable') ? 1 : 3}
              />
            }
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Fraude') ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='8' for='clave'>
            {formik.values.tablaLista.label === 'Fraude' ? 'Impacto - severidad 2' : null}
          </Label>
          <Col sm='9' lg='8'>
            <CInputReact
              type={"textarea"}
              id={'campoD'}
              value={formik.values.campoD}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.campoD}
              errors={formik.errors.campoD}
              rows={3}
            />
          </Col>
        </FormGroup>
        : null
      }

      {(formik.values.tablaLista !== null &&
        (formik.values.tablaLista.label === 'Ciudad' ||
          formik.values.tablaLista.label === 'Tipo de evento' ||
          formik.values.tablaLista.label === 'Canal ASFI' ||
          formik.values.tablaLista.label === 'Clase Evento - Basilea' ||
          formik.values.tablaLista.label === 'Factor de riesgo' ||
          formik.values.tablaLista.label === 'Proceso' ||
          formik.values.tablaLista.label === 'Línea de negocio ASFI' ||
          formik.values.tablaLista.label === 'Operaciones ASFI' ||
          formik.values.tablaLista.label === 'Moneda' ||
          formik.values.tablaLista.label === 'Recuperación activo' ||
          formik.values.tablaLista.label === 'Cuenta contable' ||
          formik.values.tablaLista.label === 'Macroproceso')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            { formik.values.tablaLista.label === 'Macroproceso' ? 'Código ASFI (proceso)' : 'Código ASFI' }
          </Label>
          <Col sm='9' lg='5'>
            <CInputReact
              type={"text"}
              id={'codigoAsfi'}
              value={formik.values.codigoAsfi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.codigoAsfi}
              errors={formik.errors.codigoAsfi}
            />
          </Col>
        </FormGroup>
        : null
      }

      {
        (formik.values.tablaLista !== null && // PARA NIVEL 2
          (formik.values.tablaLista.label === 'Ciudad' ||
            formik.values.tablaLista.label === 'Unidad' ||
            formik.values.tablaLista.label === 'Sub evento - Basilea' ||
            formik.values.tablaLista.label === 'Proceso' ||
            formik.values.tablaLista.label === 'Sub factor de riesgo' ||
            formik.values.tablaLista.label === 'Descripción de servicio'))
          ? <FormGroup row className='justify-content-center'>
            <Label sm='3' lg='3' for='nivel2_id'>
              {formik.values.tablaLista.label === 'Ciudad' ? 'Agencia' : null}
              {formik.values.tablaLista.label === 'Unidad' ? 'Área' : null}
              {formik.values.tablaLista.label === 'Sub evento - Basilea' ? 'Categoria de tipo de Evento' : null}
              {formik.values.tablaLista.label === 'Proceso' ? 'Macroproceso' : null}
              {formik.values.tablaLista.label === 'Sub factor de riesgo' ? 'Factor de riesgo' : null}
              {formik.values.tablaLista.label === 'Descripción de servicio' ? 'Tipo de servicio' : null}
            </Label>
            <Col sm='9' lg='5'>
              <CSelectReactTwo
                label={""}
                id={'nivel2_id'}
                placeholder={'Seleccione'}
                value={formik.values.nivel2_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                errors={formik.errors.nivel2_id}
                touched={formik.touched.nivel2_id}
                options={varListN2}
                obligatorio={true}
                isClearable={true}
                isSearchable={false}
                isDisabled={false}
                dependence={false}
                getAddValue={false}
              />
            </Col>
          </FormGroup>
          : null
      }

      {(formik.values.tablaLista !== null && // PARA NIVEL 2 Y 3
        formik.values.tablaLista.label === 'Clase Evento - Basilea')
        ?
        <FormGroup>
          <Row className='justify-content-center'>
            <Label sm='3' lg='3' for='nivel2_id'>
              {formik.values.tablaLista.label === 'Clase Evento - Basilea' ? 'Categoria de tipo de Evento' : null}
            </Label>
            <Col sm='9' lg='5'>
              <CSelectReactTwo
                label={""}
                id={'nivel2_id'}
                placeholder={'Seleccione'}
                value={formik.values.nivel2_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                errors={formik.errors.nivel2_id}
                touched={formik.touched.nivel2_id}
                options={varListN2}
                obligatorio={true}
                isClearable={true}
                isSearchable={false}
                isDisabled={false}
                dependence={false}
                getAddValue={false}
              />

            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Label sm='3' lg='3' for='nivel3'>
              {formik.values.tablaLista.label === 'Clase Evento - Basilea' ? 'Sub evento - Basilea' : null}
              {formik.values.tablaLista.label === 'Descripción de servicio' ? 'Tipo de servicio' : null}
            </Label>
            <Col sm='9' lg='5'>
              <CSelectReactTwo
                label={""}
                id={'nivel3_id'}
                placeholder={'Seleccione'}
                value={formik.values.nivel3_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                errors={formik.errors.nivel3_id}
                touched={formik.touched.nivel3_id}
                options={varListN3}
                obligatorio={false}
                isClearable={true}
                isSearchable={true}
                isDisabled={false}
                dependence={false}
                getAddValue={false}
              />
            </Col>
          </Row>

        </FormGroup>
        : null
      }

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
            href='#/administracion/evento-riesgo/Listar'
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
export default AdminFormEvento
