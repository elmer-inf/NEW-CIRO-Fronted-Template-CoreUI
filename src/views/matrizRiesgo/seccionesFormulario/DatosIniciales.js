import { React, Fragment, useState, useEffect} from 'react'
import { ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import  CInputCheckbox  from 'src/reusable/CInputCheckbox'
import { getTablaDescripcionNivel, getTablaDescripcionNivel2, getTablaDescripcionMatrizR } from '../controller/MatrizRiesgoController';
import { buildSelectTwo } from 'src/functions/Function'

const DatosIniciales = ({ nextSection, setObject, initValues, isEdit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
      /* areaId : Yup.mixed().required('Campo obligatorio'),
      unidadId : Yup.mixed().required('Campo obligatorio'),
      procesoId : Yup.mixed().required('Campo obligatorio'),
      // Campos solo para mostrar:
      macroNombre : Yup.string().nullable(),
      macroCriticidad : Yup.string().nullable(),
      macroValoracion : Yup.string().nullable(),
      // FIN Campos solo para mostrar:
      procedimientoId : Yup.mixed().required('Campo obligatorio'),
      duenoCargoId : Yup.mixed().required('Campo obligatorio'),
      responsableCargoId : Yup.mixed().required('Campo obligatorio'),
      fechaEvaluacion : Yup.date().required('Campo obligatorio'),
      identificadoId : Yup.mixed().nullable(),
      otrosAux: Yup.string().nullable(),
      identificadoOtro : Yup.string().nullable() */


      areaId : Yup.mixed().nullable(),
      unidadId : Yup.mixed().nullable(),
      procesoId : Yup.mixed().nullable(),
      // Campos solo para mostrar:
      macroNombre : Yup.string().nullable(),
      macroCriticidad : Yup.string().nullable(),
      macroValoracion : Yup.string().nullable(),
      // FIN Campos solo para mostrar:
      procedimientoId : Yup.mixed().nullable(),
      duenoCargoId : Yup.mixed().nullable(),
      responsableCargoId : Yup.mixed().nullable(),
      fechaEvaluacion : Yup.date().nullable(),
      identificadoId : Yup.mixed().nullable(),
      otrosAux: Yup.string().nullable(),
      identificadoOtro : Yup.string().nullable()
      }
    ),

    onSubmit: values => {
       const data = {
        ...values,
        estadoRegistro: 'Pendiente',

        areaId : (values.areaId !== null) ?   values.areaId.value : 0,
        unidadId : (values.unidadId !== null) ?   values.unidadId.value : 0,
        procesoId : (values.procesoId !== null) ?   values.procesoId.value : 0,
        procedimientoId : (values.procedimientoId !== null) ?   values.procedimientoId.value : 0,
        duenoCargoId : (values.duenoCargoId !== null) ?   values.duenoCargoId.value : 0,
        responsableCargoId : (values.responsableCargoId !== null) ?   values.responsableCargoId.value : 0,
        identificadoId : (values.identificadoId !== null) ?   values.identificadoId.value : 0,
      }
      console.log('datos que se enviaran SECCION 1:', data)
      setObject(data);
      nextSection(1);
    }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */

  // Area
  const [dataApiArea, setDataApiArea] = useState([])
  const callApiArea = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiArea(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Unidad (Nivel 2), depende de area
  const [dataApiUnidad, setDataApiUnidad] = useState([])
  const callApiUnidad = (idTablaDes, idNivel2) => {
    getTablaDescripcionNivel2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiUnidad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Macroproceso
  const [dataApiMacroproceso, setDataApiMacro] = useState([])
  const callApiMacro = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiMacro(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Procedimiento (Nivel 2), depende de proceso
  const [dataApiProcedimiento, setDataApiProcedimiento] = useState([])
  const callApiProcedimiento = (idTablaDes, idNivel2) => {
    getTablaDescripcionNivel2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoA', true)
        setDataApiProcedimiento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Cargos
  const [dataApiCargo, setDataApiCargo] = useState([])
  const callApiCargo = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiCargo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Identificado por
  const [dataApiIdentificado, setDataApiIdentificado] = useState([])
  const callApiIdentificado = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiIdentificado(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiArea(3);
    callApiMacro(15);
    callApiCargo(7);
    callApiIdentificado(8)
  }, [])

  // Reset Unidad (nivel 2)
  const resetUnidadId = () => { formik.setFieldValue('unidadId', null, false); }
  useEffect(() => {
    if(formik.values.areaId !== null){
      callApiUnidad(4, formik.values.areaId.id);
      resetUnidadId();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.areaId])

  // Reset Procedimiento (nivel 2)
  const resetProcedimiento = () => { formik.setFieldValue('procedimientoId', null, false);}
  useEffect(() => {
    if(formik.values.procesoId !== null){
      callApiProcedimiento(16, formik.values.procesoId.id);
      resetProcedimiento();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId])

  // Autocompleta nombre, criticidad y valoracion de Macroproceso
  useEffect(() => {
    if(formik.values.procesoId !== null){
      formik.setFieldValue('macroNombre', formik.values.procesoId.clave, false)
      formik.setFieldValue('macroCriticidad', formik.values.procesoId.descripcion, false)
      formik.setFieldValue('macroValoracion', formik.values.procesoId.campoA, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);

  // Resetea "otros" dependiendo del check
  const resetOtros = () => { formik.setFieldValue('identificadoOtro', null, false); }
  useEffect(() => {
    if(formik.values.otrosAux !== true){
      resetOtros();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.otrosAux])

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Área <span className='text-primary h5'><b>*</b></span>
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
            <CSelectReact
              type={"select"}
              id={'procesoId'}
              placeholder={'Seleccionar'}
              value={formik.values.procesoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.procesoId}
              touched={formik.touched.procesoId}
              options={dataApiMacroproceso}
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
              Identificado por:
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
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <CInputCheckbox
              id={'otrosAux'}
              type={"checkbox"}
              value={formik.values.otrosAux}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Otros (Identificado por)'
            />
          </FormGroup>

          {formik.values.otrosAux === true ?
            <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
              <Label className='form-label'>
                Otros (Identificado por)
              </Label>
              <CInputReact
                type={"text"}
                id={'identificadoOtro'}
                placeholder={'Otros'}
                value={formik.values.identificadoOtro}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.identificadoOtro}
                errors={formik.errors.identificadoOtro}
              />
            </FormGroup>
          : null}
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
              style={{width: '130px'}}
              color="primary"
              outline
              // onClick={(e) => { redirect(e) }}
              //href="#/administracion/formularios"
            >
              Cancelar
          </Button>
          <Button
            style={{width: '130px'}}
            color="dark"
            outline
            onClick={() => { formik.handleReset() }}
            disabled={!formik.dirty || formik.isSubmitting}
          >
            <Delete size={17} className='mr-2'/>
            Limpiar
          </Button>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            type="submit"
          >
            Siguiente
            <ChevronRight size={17} className='ml-1'/>
          </Button>
        </div>

      </Form> 
    </Fragment>
  )
}

export default DatosIniciales