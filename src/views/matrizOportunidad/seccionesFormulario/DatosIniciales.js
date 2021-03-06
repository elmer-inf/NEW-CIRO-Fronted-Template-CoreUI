import { React, Fragment, useState, useEffect} from 'react'
import { ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionEventoN1, getTablaDescripcionEventoN2 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController'
import { getTablaDescripcionOportunidadN1, getTablaDescripcionOportunidadN2 } from 'src/views/administracion/matriz-oportunidad/controller/AdminOportunidadController';
import { buildSelectTwo } from 'src/functions/Function'

var _ = require('lodash');

const DatosIniciales = ({ nextSection, setObject, initValues, isEdit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
      areaId : Yup.mixed().required("Campo obligatorio"),
      unidadId : Yup.mixed().required("Campo obligatorio"),
      procesoId : Yup.mixed().required("Campo obligatorio"),
      procedimientoId : Yup.mixed().required("Campo obligatorio"),
      duenoCargoId : Yup.mixed().required("Campo obligatorio"),
      responsableCargoId : Yup.mixed().required("Campo obligatorio"),
      fechaEvaluacion : Yup.date().max(new Date('12-31-3000'), "Año fuera de rango").required("Campo obligatorio"),
      fodaId : Yup.mixed().nullable(),
      fodaDesccripcionId: Yup.mixed().nullable(),
      // Campos solo para mostrar:
      macroNombre : Yup.string().nullable(),


      /* areaId : Yup.mixed().nullable(),
      unidadId : Yup.mixed().nullable(),
      procesoId : Yup.mixed().nullable(),
      procedimientoId : Yup.mixed().nullable(),
      duenoCargoId : Yup.mixed().nullable(),
      responsableCargoId : Yup.mixed().nullable(),
      fechaEvaluacion : Yup.date().max(new Date('12-31-3000'), "Año fuera de rango").nullable(),
      fodaId : Yup.mixed().nullable(),
      fodaDescripcionId: Yup.mixed().nullable(),
      // Campos solo para mostrar:
      macroNombre : Yup.string().nullable(), */
      }
    ),

    onSubmit: values => {
       const data = {
        ...values,
        estadoRegistro: 'Pendiente',

        areaId : (values.areaId !== null) ? values.areaId.value : 0,
        unidadId : (values.unidadId !== null) ? values.unidadId.value : 0,
        procesoId : (values.procesoId !== null) ? values.procesoId.value : 0,
        procedimientoId : (values.procedimientoId !== null) ? values.procedimientoId.value : 0,
        duenoCargoId : (values.duenoCargoId !== null) ?   values.duenoCargoId.value : 0,
        responsableCargoId : (values.responsableCargoId !== null) ? values.responsableCargoId.value : 0,
        fodaId : (values.fodaId !== null) ?   values.fodaId.value : 0,
        fodaDescripcionId : (values.fodaDescripcionId !== null) ? values.fodaDescripcionId.value : 0,
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
    getTablaDescripcionEventoN1(idTablaDes)
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
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
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
    getTablaDescripcionEventoN1(idTablaDes)
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
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoA', true)
        setDataApiProcedimiento(_.uniqBy(options, 'label'))
      }).catch((error) => {
        console.log('Error: ', error)
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
        console.log('Error: ', error)
      })
  }

  // FODA Nivel 1
  const [dataApiFoda, setDataApiFoda] = useState([])
  const callApiFoda = (idTablaDes) => {
    getTablaDescripcionOportunidadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiFoda(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // FODA descripcion Nivel 2, depende de FODA
  const [dataApiFodaDesc, setDataApiFodaDesc] = useState([])
  const callApiFodaDesc = (idTablaDes, idNivel2) => {
    getTablaDescripcionOportunidadN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiFodaDesc(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiFoda(1)
    callApiArea(3);
    callApiMacro(15);
    callApiCargo(7);
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

   // Reset FODA descripcion (nivel 2)
   const resetFodaDescripcion = () => { formik.setFieldValue('fodaDescripcionId', null, false);}
   useEffect(() => {
    if(formik.values.fodaId !== null){
      callApiFodaDesc(2, formik.values.fodaId.value);
      resetFodaDescripcion();
    }
     //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formik.values.fodaId])

  // Autocompleta codigo de Macroproceso
  useEffect(() => {
    if(formik.values.procesoId !== null){
      formik.setFieldValue('macroNombre', formik.values.procesoId.clave, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);

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
              FODA:
            </Label>
            <CSelectReact
              type={"select"}
              id={'fodaId'}
              placeholder={'Seleccionar'}
              value={formik.values.fodaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.fodaId}
              touched={formik.touched.fodaId}
              options={dataApiFoda}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Detalle FODA:
            </Label>
            <CSelectReact
              type={"select"}
              id={'fodaDescripcionId'}
              placeholder={'Seleccionar'}
              value={formik.values.fodaDescripcionId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.fodaDescripcionId}
              touched={formik.touched.fodaDescripcionId}
              options={dataApiFodaDesc}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
              style={{width: '130px'}}
              color="primary"
              outline
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