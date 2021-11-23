import { React, Fragment, useState, useEffect} from 'react'
import { ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'

import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from '../../../reusable/CInputReact'
import { CSelectReact } from '../../../reusable/CSelectReact'
import  CInputCheckbox  from '../../../reusable/CInputCheckbox'
import { getTablaDescripcionNivel, getTablaDescripcionNivel2 } from '../controller/EventoController';
import { buildSelectTwo } from '../../../functions/Function'

const DatosIniciales = ({ nextSection, setObject, initValues, isEdit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
        fechaIni: Yup.date().required('Campo obligatorio'),
        horaIni: Yup.string().required('Campo obligatorio'),
        fechaDesc: Yup.date().required('Campo obligatorio'),
        horaDesc: Yup.string().required('Campo obligatorio'),
        agenciaId: Yup.mixed().nullable(),
        ciudadId: Yup.mixed().nullable(),
        areaID:  Yup.mixed().required('Campo obligatorio'),
        unidadId: Yup.mixed().nullable(),
        entidadAfectada: Yup.string().nullable(),
        comercioAfectado: Yup.string().nullable(),
        entidadId: Yup.mixed().nullable(),
        cargoId: Yup.mixed().required('Campo obligatorio'),
        estadoReportado: Yup.mixed().nullable(),
        fuenteInfId: Yup.mixed().nullable(),
        canalAsfiId: Yup.mixed().required('Campo obligatorio'),
        descripcion: Yup.string().required('Campo obligatorio'),
        descripcionCompleta: Yup.string().nullable()

        /* fechaIni: Yup.date().nullable(),
        horaIni: Yup.string().nullable(),
        fechaDesc: Yup.date().nullable(),
        horaDesc: Yup.string().nullable(),
        agenciaId: Yup.mixed().nullable(),
        ciudadId: Yup.mixed().nullable(),
        areaID:  Yup.mixed().nullable(),
        unidadId: Yup.mixed().nullable(),
        entidadAfectada: Yup.string().nullable(),
        comercioAfectado: Yup.string().nullable(),
        entidadId: Yup.mixed().nullable(),
        cargoId: Yup.mixed().nullable(),
        estadoReportado: Yup.mixed().nullable(),
        fuenteInfId: Yup.mixed().nullable(),
        canalAsfiId: Yup.mixed().nullable(),
        descripcion: Yup.string().nullable(),
        descripcionCompleta: Yup.string().nullable() */
      }
    ),

    onSubmit: values => {
       const data = {
        ...values,
        estadoRegistro: 'Pendiente',

        horaIni:    (values.horaIni !== null) ?  values.horaIni + ':00': null,
        horaDesc:   (values.horaDesc !== null) ?  values.horaDesc + ':00': null,

        agenciaId:  (values.agenciaId !== null) ?   values.agenciaId.value : 0,
        ciudadId:   (values.ciudadId !== null) ?    values.ciudadId.value : 0,
        areaID:     (values.areaID !== null) ?      values.areaID.value : 0,
        unidadId:   (values.unidadId !== null) ?    values.unidadId.value : 0,
        entidadId:  (values.entidadId !== null) ?   values.entidadId.value : 0,
        cargoId:    (values.cargoId !== null) ?     values.cargoId.value : 0,
        fuenteInfId:(values.fuenteInfId !== null) ? values.fuenteInfId.value : 0,
        canalAsfiId:(values.canalAsfiId !== null) ? values.canalAsfiId.value : 0,

        estadoReportado: (values.estadoReportado !== null) ? values.estadoReportado.value : 0,
      }
      console.log('datos que se enviaran SECCION 1:', data)
      setObject(data);
      nextSection(1);
    }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */
  /* Agencia */
  const [dataApiAgencia, setDataApiAgencia] = useState([])
  const callApiAgencia = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiAgencia(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  /* Ciudad (Nivel 2), depende de agencia */
  const [dataApiCiudad, setDataApiCiudad] = useState([])
  const callApiCiudad = (idTablaDes, idNivel2) => {
    getTablaDescripcionNivel2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiCiudad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

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

  // Entidades
  const [dataApiEntidad, setDataApiEntidad] = useState([])
  const callApiEntidad = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEntidad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo de evento
  /* const [dataApiTipoEvento, setDataApiTipoEvento] = useState([])
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiTipoEvento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  } */

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

  // Estado de evento
  const optionsEstado = [
    { value: 'Reportado', label: 'Reportado' },
    { value: 'No reportado', label: 'No reportado' }
  ]

  // Fuente de informacion
  const [dataApiFuente, setDataApiFuente] = useState([])
  const callApiFuente = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiFuente(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Canal Asfi
  const [dataApiCanal, setDataApiCanal] = useState([])
  const callApiCanal = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiCanal(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiAgencia(1);
    callApiArea(3);
    callApiEntidad(5);
    //callApiTipoEvento(6);
    callApiCargo(7);
    callApiFuente(8);
    callApiCanal(9);
  }, [])

  const resetCiudadId = () => { formik.setFieldValue('ciudadId', null, false); }
  useEffect(() => {
    if(formik.values.agenciaId !== null){
      callApiCiudad(2, formik.values.agenciaId.id);
      resetCiudadId();
    }
  }, [formik.values.agenciaId])

  const resetUnidadId = () => { formik.setFieldValue('unidadId', null, false); }
  useEffect(() => {
    if(formik.values.areaID !== null){
      callApiUnidad(4, formik.values.areaID.id);
      resetUnidadId();
    }
  }, [formik.values.areaID])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
     {/*  <div className='content-header'>
        <h5 className='mb-0'>Datos Iniciales</h5>
      </div> */}
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'> 
              Fecha Inicio <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaIni'}
              placeholder={'Fecha inicio'}
              value={formik.values.fechaIni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaIni}
              errors={formik.errors.fechaIni}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Hora inicio <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"time"}
              id={'horaIni'}
              placeholder={'Hora inicio'}
              value={formik.values.horaIni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.horaIni}
              errors={formik.errors.horaIni}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha descubrimiento <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaDesc'}
              placeholder={'Fecha descubrimiento'}
              value={formik.values.fechaDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaDesc}
              errors={formik.errors.fechaDesc}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Hora descubrimiento <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"time"}
              id={'horaDesc'}
              placeholder={'Hora descubrimiento'}
              value={formik.values.horaDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.horaDesc}
              errors={formik.errors.horaDesc}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Agencia
            </Label>
            <CSelectReact
              type={"select"}
              id={'agenciaId'}
              placeholder={'Seleccionar'}
              value={formik.values.agenciaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.agenciaId}
              touched={formik.touched.agenciaId}
              options={dataApiAgencia}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Ciudad
            </Label>
            <CSelectReact
              type={"select"}
              id={'ciudadId'}
              placeholder={'Seleccionar'}
              value={formik.values.ciudadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.ciudadId}
              touched={formik.touched.ciudadId}
              options={dataApiCiudad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Área <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'areaID'}
              placeholder={'Seleccionar'}
              value={formik.values.areaID}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.areaID}
              touched={formik.touched.areaID}
              options={dataApiArea}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Unidad
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

          <FormGroup tag={Col} md='6' lg='3' className='mb-0' style={{position: 'sticky'}}>
            <CInputCheckbox
              type={"checkbox"}
              id={'comercioAfectado'}
              value={formik.values.comercioAfectado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Comercio afectado'
              //checked={}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0' style={{position: 'sticky'}}>
            <CInputCheckbox
              type={"checkbox"}
              id={'entidadAfectada'}
              value={formik.values.entidadAfectada}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Entidad afectada'
              //checked={}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Entidad
            </Label>
            <CSelectReact
              type={"select"}
              id={'entidadId'}
              placeholder={'Seleccionar'}
              value={formik.values.entidadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.entidadId}
              touched={formik.touched.entidadId}
              options={dataApiEntidad}
              isDisabled={(formik.values.entidadAfectada === true) ? false : true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Cargo persona afectada ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'cargoId'}
              placeholder={'Seleccionar'}
              value={formik.values.cargoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.cargoId}
              touched={formik.touched.cargoId}
              options={dataApiCargo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Estado
            </Label>
            <CSelectReact
              type={"select"}
              id={'estadoReportado'}
              placeholder={'Seleccionar'}
              value={formik.values.estadoReportado}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.estadoReportado}
              touched={formik.touched.estadoReportado}
              options={optionsEstado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fuente de información
            </Label>
            <CSelectReact
              type={"select"}
              id={'fuenteInfId'}
              placeholder={'Seleccionar'}
              value={formik.values.fuenteInfId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.fuenteInfId}
              touched={formik.touched.fuenteInfId}
              options={dataApiFuente}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Canales ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'canalAsfiId'}
              placeholder={'Seleccionar'}
              value={formik.values.canalAsfiId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.canalAsfiId}
              touched={formik.touched.canalAsfiId}
              options={dataApiCanal}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Descripción <span className='text-primary h5'><b>*</b></span>
            </Label> 
            <CInputReact
              type={"textarea"}
              id={'descripcion'}
              placeholder={'Descripción'}
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcion}
              errors={formik.errors.descripcion}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Descripción completa
            </Label>
            <CInputReact
              type={"textarea"}
              id={'descripcionCompleta'}
              placeholder={'Descripción completa'}
              value={formik.values.descripcionCompleta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcionCompleta}
              errors={formik.errors.descripcionCompleta}
              rows={1}
            />
          </FormGroup>
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