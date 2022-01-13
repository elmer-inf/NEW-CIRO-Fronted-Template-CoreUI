import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { FormGroup, Col, Form, Button, Label, Row } from 'reactstrap'
import { getTablaDescripcionEventoN1 } from '../controller/AdminEventoController';
import { buildSelectTwo } from 'src/functions/Function'
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo'
import { CSelectReact } from 'src/reusable/CSelectReact'

/* var _ = require('lodash'); */

/**
 * @param handleOnSubmit : function
 * @description handleOnSubmit es una funcionm que se recibe del prop y es usada para realizar el post request (guardar registros)
 * @returns
 */

const AdminFormEvento = ({ initialValuess, handleOnSubmit, isEdit, optionToSelect }) => {

  //console.log('opt:: ', optionToSelect);

  const [varListN2, setVarListN2] = useState(optionToSelect.tabla_n2);
  const [varListN3, setVarListN3] = useState(optionToSelect.tabla_n3);

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        tablaLista: Yup.mixed().required('Campo obligatorio'),
        clave: Yup.string().min(1).max(40).nullable(),
        nombre: Yup.string().min(1).max(1000).required('Campo obligatorio'),

        descripcion: Yup.mixed().nullable(),

        campoA: Yup.string().min(1).max(1000).nullable(),
        campoB: Yup.string().min(1).max(1000).nullable(),

        campoC: Yup.mixed().nullable(),

        campoD: Yup.string().min(1).max(1000).nullable(),
        codigoAsfi: Yup.string().min(1).max(40).nullable(),
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
        campoC: (values.tablaLista.label=== 'Responsable') ? values.campoC.value : values.campoC,
      }
      console.log('datos que se enviaran:', values)
      console.log('datos que se data:', data)
      handleOnSubmit(data)
    }
  })

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  //const [dataApi2, setDataApi] = useState([])
  const callApi2 = (idn2) => {
    console.log('llego callapi2:: ', ' idn2: ', idn2);
    getTablaDescripcionEventoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        //console.log('options : ', options)
        setVarListN2(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  //const [dataApi3, setDataApi3] = useState([])
  const callApi3 = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setVarListN3(options)
      }).catch((error) => {
        console.log('Error: ', error)
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
    console.log('getSelectValue : ', value);
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
    console.log('inputIsClearable aaa: ', id);
    //formik.setFieldValue(id, null, false);
    //clearAllDependences();
  }
  //console.log('varListN2: ', varListN2);
  //console.log('varListN3: ', varListN3);

  //Life Cycle
  useEffect(() => {
    //console.log('optxxxx:: ', optionToSelect);
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
  /* const [dataApiCargo, setDataApiCargo] = useState([])
  const callApiCargo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiCargo(options)
        //setDataApiCargo(_.filter(options, ['nombre', 'Riesgos']));
      }).catch((error) => {
        console.log('Error: ', error)
      })
  } */

  // Opciones Select Tipo de Responsable
  const optionsTipoRes = [
    { value: 'Elaborador', label: 'Elaborador' },
    { value: 'Revisor', label: 'Revisor' },
    { value: 'Aprobador', label: 'Aprobador' }
  ]

  /* useEffect(() => {
    callApiCargo(7);
  }, []) */
  // F I N   P A R A M E T R O S


  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup row className='justify-content-center'>
        <Label sm='3' lg='3' for='tabla' className='font-weight-bold'>
          Tabla
        </Label>
        <Col sm='9' lg='5'>
          {/* <CSelectReact
            type={"select"}
            id={'tablaLista'}
            placeholder={'Seleccionar . . . '}
            value={formik.values.tablaLista}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.tablaLista}
            touched={formik.touched.tablaLista}
            options={tablaListaOptions}
          /> */}
          <CSelectReactTwo
            //label={""}
            id={'tablaLista'}
            placeholder={'Seleccione'}
            value={formik.values.tablaLista}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            errors={formik.errors.tablaLista}
            touched={formik.touched.tablaLista}
            //options={tablaListaOptions}optionToSelect.tablaOp
            options={optionToSelect.tablaOp || []}
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
                formik.values.tablaLista.label === 'Seguridad de la información') ? 'Descriptivo' : formik.values.tablaLista.label === 'Recuperación activo' ? 'Descripción' : 'Nombre'}
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
          formik.values.tablaLista.label === 'Seguridad de la información'||
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
                  rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable')? 1: 3}
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
              rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable')? 3: 1}
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
          <Label sm='3' lg={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable')? '3': '8'} for='clave'>
            {formik.values.tablaLista.label === 'Fraude' ? 'Impacto - severidad' : null}
            {formik.values.tablaLista.label === 'Responsable' ? 'Tipo' : null}
          </Label>
          <Col sm='9' lg={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable')? '5': '8'}>
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
                  rows={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Responsable')? 1: 3}
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
          formik.values.tablaLista.label === 'Recuperación activo')) ?
        <FormGroup row className='justify-content-center'>
          <Label sm='3' lg='3' for='clave'>
            Código ASFI
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
              {/*   <CSelectReact
                // type={"select"}
                placeholder={'Seleccionaaaaar . . . '}
                value={formik.values.nivel2_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.nivel2_id}
                touched={formik.touched.nivel2_id}
                id={'nivel2_id'}
                label={'ddeddddd'}
                options={varListN2}
              /> */}

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
                //cleareableDependences={clearDependencesN2}  //FUNCION PARA LIMPIA LOS VALORES FORMIK...
                getAddValue={false}
              //getSelectValue={getSelectValueLevel3} // AGGARA EL EL VALOR DEL SELECT VALUE
              //inputIsClearable={inputIsClearableLevel3} // AGGARA EL EL VALOR DEL SELECT VALUE
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
              {/* <CSelectReact
                type={"select"}
                id={'nivel2_id'}
                placeholder={'sssSeleccionar . . . '}
                value={formik.values.nivel2_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.nivel2_id}
                touched={formik.touched.nivel2_id}
                options={varListN2}
              /> */}
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
                //cleareableDependences={clearDependencesN2}  //FUNCION PARA LIMPIA LOS VALORES FORMIK...
                getAddValue={false}
              // getSelectValue={getSelectValueLevel3} // AGGARA EL EL VALOR DEL SELECT VALUE
              //  inputIsClearable={inputIsClearableLevel3} // AGGARA EL EL VALOR DEL SELECT VALUE
              />

            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Label sm='3' lg='3' for='nivel3'>
              {formik.values.tablaLista.label === 'Clase Evento - Basilea' ? 'Sub evento - Basilea' : null}
              {formik.values.tablaLista.label === 'Descripción de servicio' ? 'Tipo de servicio' : null}
            </Label>
            <Col sm='9' lg='5'>
              {/*  <CSelectReact
                type={"select"}
                id={'nivel3_id'}
                placeholder={'Seleccionar . . . '}
                value={formik.values.nivel3_id}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.nivel3_id}
                touched={formik.touched.nivel3_id}
                options={varListN3}
              /> */}


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
                //cleareableDependences={cleareableDependences}  //FUNCION PARA LIMPIA LOS VALORES FORMIK...
                getAddValue={false}
              // getSelectValue={getSelectValue} // AGGARA EL EL VALOR DEL SELECT VALUE
              // inputIsClearable={inputIsClearable} // AGGARA EL EL VALOR DEL SELECT VALUE
              />
            </Col>
          </Row>

        </FormGroup>
        : null
      }

      <FormGroup className='mb-0' row>
        <Col className='d-flex justify-content-center'>
          <Button
            className='mr-4 text-white'
            color="primary"
            type="submit"
          //disabled={formik.isSubmitting}
          //disabled={(formik.values.tablaLista !== null && formik.values.tablaLista.label === 'Tasa de cambio')? true : false}
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
