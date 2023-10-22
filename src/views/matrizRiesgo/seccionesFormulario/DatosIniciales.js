import { React, Fragment, useState, useEffect } from 'react'
import { ChevronRight, Delete, XSquare } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import CInputCheckbox from 'src/reusable/CInputCheckbox'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import { getTablaDescripcionEventoN1, getTablaDescripcionEventoN2 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController'
import { buildSelectTwo, buildSelectThree } from 'src/functions/Function'
import { getEventos } from 'src/views/eventoRiesgo/controller/EventoController'
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo'
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import { Messages } from 'src/reusable/variables/Messages'

var _ = require('lodash');

const DatosIniciales = ({ nextSection, setObject, initValues, isEdit }) => {

  const [relEventoRiesgo, setRelEventoRiesgo] = useState([]);

  const formik = useFormik({
    initialValues: { ...initValues, otrosAux: false },
    validationSchema: Yup.object().shape({
      areaId: Yup.mixed().required(Messages.required),
      unidadId: Yup.mixed().required(Messages.required),
      procesoId: Yup.mixed().required(Messages.required),

      // Campos solo para mostrar:
      macroNombre: Yup.string().nullable(),
      macroCriticidad: Yup.string().nullable(),
      macroValoracion: Yup.string().nullable(),
      otrosAux: Yup.boolean(),
      eventoFechaAux: Yup.date().nullable(),
      eventoDescAux: Yup.string().nullable(),
      // FIN Campos solo para mostrar:

      procedimientoId: Yup.mixed().required(Messages.required),
      duenoCargoId: Yup.mixed().required(Messages.required),
      responsableCargoId: Yup.mixed().required(Messages.required),
      fechaEvaluacion: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).required(Messages.required),
      identificadoId: Yup.mixed().nullable().when('otrosAux', {
        is: (val) => (val === false),
        then: Yup.mixed().nullable().required(Messages.required),
      }),
      identificadoOtro: Yup.string().nullable().when('otrosAux', {
        is: (val) => (val === true),
        then: Yup.string().nullable().required(Messages.required),
      }),
      eventoRiesgoId: Yup.mixed().nullable(),
      eventoMaterializado: Yup.boolean(),


      /* areaId: Yup.mixed().nullable(),
      unidadId: Yup.mixed().nullable(),
      procesoId: Yup.mixed().required(Messages.required),

      // Campos solo para mostrar:
      macroNombre: Yup.string().nullable(),
      macroCriticidad: Yup.string().nullable(),
      macroValoracion: Yup.string().nullable(),
      otrosAux: Yup.boolean(),
      eventoFechaAux: Yup.date().nullable(),
      eventoDescAux: Yup.string().nullable(),
      // FIN Campos solo para mostrar:

      procedimientoId: Yup.mixed().nullable(),
      duenoCargoId: Yup.mixed().nullable(),
      responsableCargoId: Yup.mixed().nullable(),
      fechaEvaluacion: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).nullable(),
      identificadoId : Yup.mixed().nullable().when('otrosAux',{
        is:(val) =>  (val === false),
        then: Yup.mixed().nullable().required(Messages.required),
      }),
      identificadoOtro: Yup.string().nullable().when('otrosAux',{
        is:(val) => (val === true),
        then: Yup.string().nullable().required(Messages.required),
      }),
      eventoRiesgoId: Yup.mixed().nullable(),
      eventoMaterializado: Yup.boolean(), */
    }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        estadoRegistro: 'Pendiente',

        areaId: (values.areaId !== null) ? values.areaId.value : 0,
        unidadId: (values.unidadId !== null) ? values.unidadId.value : 0,
        procesoId: (values.procesoId !== null) ? values.procesoId.value : 0,
        procedimientoId: (values.procedimientoId !== null) ? values.procedimientoId.value : 0,
        duenoCargoId: (values.duenoCargoId !== null) ? values.duenoCargoId.value : 0,
        responsableCargoId: (values.responsableCargoId !== null) ? values.responsableCargoId.value : 0,
        identificadoId: (values.identificadoId !== null) ? values.identificadoId.value : 0,
        eventoRiesgoId: values.eventoRiesgoId.value // Modificado 02-08-2022
        //eventoMaterializado: values.eventoMaterializado
      }
      //console.log('datos que se enviaran SECCION 1:', data)
      setObject(data, values);
      nextSection(1);
    }
  })

  // Rellena Datos para Editar
  useEffect(() => {
    if (isEdit) {
      formik.setValues({ ...initValues })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues])


  // Para el despliegue del select llenado al EDITAR
  useEffect(() => {
    if (isEdit && initValues.areaId !== null) {
      callApiUnidad(4, initValues.areaId.id);
    }
    if (isEdit && initValues.procesoId !== null) {
      callApiProcedimiento(16, initValues.procesoId.id);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Area
  const [dataApiArea, setDataApiArea] = useState([])
  const callApiArea = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiArea(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Unidad (Nivel 2), depende de area
  const [dataApiUnidad, setDataApiUnidad] = useState([])
  const callApiUnidad = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiUnidad(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Macroproceso
  const [dataApiMacroproceso, setDataApiMacro] = useState([])
  const callApiMacro = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiMacro(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Procedimiento (Nivel 2), depende de proceso
  const [dataApiProcedimiento, setDataApiProcedimiento] = useState([])
  const callApiProcedimiento = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoA', true);/* campoA */
        setDataApiProcedimiento(_.uniqBy(options, 'label'))
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Cargos
  const [dataApiCargo, setDataApiCargo] = useState([])
  const callApiCargo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiCargo(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Identificado por
  const [dataApiIdentificado, setDataApiIdentificado] = useState([])
  const callApiIdentificado = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiIdentificado(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Evento Materializado
  const optionsMaterializado = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' }
  ]

  useEffect(() => {
    callApiArea(3);
    callApiMacro(15);
    callApiCargo(7);
    callApiIdentificado(8);
    getListEventosRiesgo();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */


  // FORMIK RESET VALUE REUTILIZABLE
  const resetFormikValue = (field, valueToReset) => {
    formik.setFieldValue(field, valueToReset, false);
  }

  /*  Values of AREA */
  const clearDependenceOfArea = () => {
    resetFormikValue('unidadId', null);
    setDataApiUnidad([]);
  }
  const getValueArea = (value) => {
    if (value !== null) {
      callApiUnidad(4, value.id);
    }
  }
  const clearInputArea = (id) => {
    formik.setFieldValue(id, null, false);
  }
  /* FIN  Values of AREA */

  /*  Values of MACROPROCESO */
  const clearDependenceOfMacroproceso = () => {
    resetFormikValue('procedimientoId', null);
    setDataApiProcedimiento([]);
  }
  const getValueMacroproceso = (value) => {
    if (value !== null) {
      callApiProcedimiento(16, value.id);
    }
  }
  const clearInputMacroproceso = (id) => {
    formik.setFieldValue(id, null, false);
  }
  /* FIN  Values of MACROPROCESO */


  // Autocompleta codigo, criticidad y valoracion de Macroproceso
  useEffect(() => {
    if (formik.values.procesoId !== null) {
      formik.setFieldValue('macroNombre', formik.values.procesoId.clave, false)
      formik.setFieldValue('macroCriticidad', formik.values.procesoId.descripcion, false)
      formik.setFieldValue('macroValoracion', formik.values.procesoId.campoA, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);

  // Resetea "otros" dependiendo del check
  const resetOtros = () => { formik.setFieldValue('identificadoOtro', null, false); }
  useEffect(() => {
    if (formik.values.otrosAux !== true) {
      resetOtros();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.otrosAux])


  // Autocompleta "Fecha y Descripcion" de Eventos
  useEffect(() => {
    if (formik.values.eventoRiesgoId !== null) {
      formik.setFieldValue('eventoFechaAux', formik.values.eventoRiesgoId.fechaDesc !== null ? formik.values.eventoRiesgoId.fechaDesc : '', false);
      formik.setFieldValue('eventoDescAux', formik.values.eventoRiesgoId.descripcion, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.eventoRiesgoId]);

  // Resetea "Fecha y Descripcion" de Eventos dependiendo del check "Evento Materializado"
  const resetDatosEvento = () => {
    formik.setFieldValue('eventoRiesgoId', '', false);
    formik.setFieldValue('eventoFechaAux', '', false);
    formik.setFieldValue('eventoDescAux', '', false);

  }

  // Reset codigo, criticidad y valoracion de Macroproceso
  useEffect(() => {
    if (formik.values.procesoId === null) {
      formik.setFieldValue('macroNombre', '', false)
      formik.setFieldValue('macroCriticidad', '', false)
      formik.setFieldValue('macroValoracion', '', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);


  useEffect(() => {
    if (formik.values.eventoMaterializado === false) {
      resetDatosEvento();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.eventoMaterializado])


  /**
   * @description Funcion que lista los eventos de riesgo, (relacion de matriz de riesgo a Eventos de riesgo)
   */
  const getListEventosRiesgo = () => {
    getEventos()
      .then(res => {
        var order = _.orderBy(res.data, ['id'], ['desc'])
        const options = buildSelectThree(order, 'id', 'id', 'codigo', true)
        setRelEventoRiesgo(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Redirecciona a Listar
  const history = useHistory();
  const redirect = (e) => {
    history.push('/matrizRiesgo/Listar');
  }


  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Área <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReactTwo
              id={'areaId'}
              placeholder={'Seleccionar'}
              value={formik.values.areaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.areaId}
              touched={formik.touched.areaId}
              options={dataApiArea}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfArea}
              getAddValue={true}
              getSelectValue={getValueArea}
              inputIsClearable={clearInputArea}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Unidad <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'unidadId'}
              placeholder={'Seleccionar'}
              value={formik.values.unidadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.unidadId}
              touched={formik.touched.unidadId}
              options={dataApiUnidad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Macroproceso <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReactTwo
              id={'procesoId'}
              placeholder={'Seleccionar'}
              value={formik.values.procesoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.procesoId}
              touched={formik.touched.procesoId}
              options={dataApiMacroproceso}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfMacroproceso}
              getAddValue={true}
              getSelectValue={getValueMacroproceso}
              inputIsClearable={clearInputMacroproceso}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Código Macroproceso
            </Label>
            <CInputReact
              type={"text"}
              id={'macroNombre'}
              value={formik.values.macroNombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.macroNombre}
              errors={formik.errors.macroNombre}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Proceso <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'procedimientoId'}
              placeholder={'Seleccionar'}
              value={formik.values.procedimientoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.procedimientoId}
              touched={formik.touched.procedimientoId}
              options={dataApiProcedimiento}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Criticidad (Precalificación)
            </Label>
            <CInputReact
              type={"text"}
              id={'macroCriticidad'}
              value={formik.values.macroCriticidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.macroCriticidad}
              errors={formik.errors.macroCriticidad}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Valoración Precalificación
            </Label>
            <CInputReact
              type={"text"}
              id={'macroValoracion'}
              value={formik.values.macroValoracion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.macroValoracion}
              errors={formik.errors.macroValoracion}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Dueño proceso <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'duenoCargoId'}
              placeholder={'Seleccionar'}
              value={formik.values.duenoCargoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.duenoCargoId}
              touched={formik.touched.duenoCargoId}
              options={dataApiCargo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Responsable Unidad a cargo <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'responsableCargoId'}
              placeholder={'Seleccionar'}
              value={formik.values.responsableCargoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.responsableCargoId}
              touched={formik.touched.responsableCargoId}
              options={dataApiCargo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha evaluación <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaEvaluacion'}
              placeholder={'Fecha evaluación'}
              value={formik.values.fechaEvaluacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaEvaluacion}
              errors={formik.errors.fechaEvaluacion}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Identificado por {formik.values.otrosAux === false ? <span className='text-primary h5'><b>*</b></span> : null}
            </Label>
            <CSelectReact
              type={"select"}
              id={'identificadoId'}
              placeholder={'Seleccionar'}
              value={formik.values.identificadoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.identificadoId}
              touched={formik.touched.identificadoId}
              options={dataApiIdentificado}
              isDisabled={formik.values.otrosAux === true ? true : false}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <br />
            <CInputCheckbox
              id={'otrosAux'}
              type={"checkbox"}
              value={formik.values.otrosAux}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Otros (Identificado por)'
              disabled={formik.values.identificadoId !== null ? true : false}
            />
          </FormGroup>

          {formik.values.otrosAux === true && formik.values.identificadoId === null ?
            <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
              <Label className='form-label'>
                Otros (Identificado por) {formik.values.otrosAux === true ? <span className='text-primary h5'><b>*</b></span> : null}
              </Label>
              <CInputReact
                type={"textarea"}
                id={'identificadoOtro'}
                placeholder={'Otros'}
                value={formik.values.identificadoOtro}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.identificadoOtro}
                errors={formik.errors.identificadoOtro}
                rows={1}
              />
            </FormGroup>
            : null}
        </Row>

        <hr />
        <Row>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Evento materializado
            </Label>
            <CInputRadio
              data={optionsMaterializado}
              id={'eventoMaterializado'}
              value={formik.values.eventoMaterializado}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              touched={formik.touched.eventoMaterializado}
              errors={formik.errors.eventoMaterializado}
              sendValue={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              Código de Evento de riesgo
            </Label>
            <CSelectReact
              type={"select"}
              id={'eventoRiesgoId'}
              placeholder={'Seleccionar'}
              value={formik.values.eventoRiesgoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.eventoRiesgoId}
              touched={formik.touched.eventoRiesgoId}
              options={relEventoRiesgo}
              isDisabled={formik.values.eventoMaterializado === true ? false : true}
            />
          </FormGroup>

          {/* Campos autocompletados del evento de riesgo seleccionado */}
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha descubrimiento del Evento
            </Label>
            <CInputReact
              type={"date"}
              id={'eventoFechaAux'}
              value={formik.values.eventoFechaAux}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.eventoFechaAux}
              errors={formik.errors.eventoFechaAux}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='12' className='mb-0'>
            <Label className='form-label'>
              Descripción resumida del Evento
            </Label>
            <CInputReact
              type={"textarea"}
              id={'eventoDescAux'}
              value={formik.values.eventoDescAux}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.eventoDescAux}
              errors={formik.errors.eventoDescAux}
              disabled={true}
            />
          </FormGroup>
          {/* FIN Campos autocompletados del evento de riesgo seleccionado */}
        </Row>


        <Row className='pt-4'>
          <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
            <Button
              color="primary"
              outline
              block
              onClick={(e) => { redirect(e) }}
            >
              <XSquare size={17} className='mr-2' />Cancelar
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
              className='text-white'
              block
              color="primary"
              type="submit"
            >
              Siguiente
              <ChevronRight size={17} className='ml-1' />
            </Button>
          </Col>
        </Row>

      </Form>
    </Fragment>
  )
}

export default DatosIniciales