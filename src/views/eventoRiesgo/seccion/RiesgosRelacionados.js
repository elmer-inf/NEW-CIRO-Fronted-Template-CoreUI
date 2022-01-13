import { React, Fragment, useState, useEffect} from 'react'
import { ChevronLeft, Save, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionEventoN1} from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectThree } from 'src/functions/Function'

var _ = require('lodash');

const RiesgoRelacionado = ({ beforeSection, initValues, isEdit, handleOnSubmmit, tipoEvento }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        operativoId: Yup.mixed().nullable(),
        liquidezId: Yup.mixed().nullable(),
        fraudeId: Yup.mixed().nullable(),
        legalId: Yup.mixed().nullable(),
        reputacionalId: Yup.mixed().nullable(),
        cumplimientoId: Yup.mixed().nullable(),
        estrategicoId: Yup.mixed().nullable(),
        gobiernoId: Yup.mixed().nullable(),
        seguridadId: Yup.mixed().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
       ...values,
        operativoId:    (values.operativoId !== null) ?     values.operativoId.value : 0,
        liquidezId:     (values.liquidezId !== null) ?      values.liquidezId.value : 0,
        fraudeId:       (values.fraudeId !== null) ?        values.fraudeId.value : 0,
        legalId:        (values.legalId !== null) ?         values.legalId.value : 0,
        reputacionalId: (values.reputacionalId !== null) ?  values.reputacionalId.value : 0,
        cumplimientoId: (values.cumplimientoId !== null) ?  values.cumplimientoId.value : 0,
        estrategicoId:  (values.estrategicoId !== null) ?   values.estrategicoId.value : 0,
        gobiernoId:     (values.gobiernoId !== null) ?      values.gobiernoId.value : 0,
        seguridadId:    (values.seguridadId !== null) ?     values.seguridadId.value : 0
     }
     console.log('datos que se enviaran SECCION 5:', data)
     handleOnSubmmit(data)
   }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */

  // Reputacional
  const [dataApiReputacional, setDataApiReputacional] = useState([])
  const callApiReputacional = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiReputacional(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Legal
  const [dataApiLegal, setDataApiLegal] = useState([])
  const callApiLegal = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiLegal(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Cumplimiento
  const [dataApiCumplimiento, setDataApiCumplimiento] = useState([])
  const callApiCumplimiento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiCumplimiento(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Estrategico
  const [dataApiEstrategico, setDataApiEstrategico] = useState([])
  const callApiEstrategico = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiEstrategico(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Gobierno
  const [dataApiGobierno, setDataApiGobierno] = useState([])
  const callApiGobierno = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiGobierno(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Fraude
  const [dataApiFraude, setDataApiFraude] = useState([])
  const callApiFraude = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiFraude(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Liquidez
  const [dataApiLiquidez, setDataApiLiquidez] = useState([])
  const callApiLiquidez = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiLiquidez(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Operativo
  const [dataApiOperativo, setDataApiOperativo] = useState([])
  const callApiOperativo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiOperativo(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Seguridad
  const [dataApiSeguridad, setDataApiSeguridad] = useState([])
  const callApiSeguridad = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', false)
        setDataApiSeguridad(_.orderBy(options, ['value' ], ['desc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiReputacional(28);
    callApiLegal(29);
    callApiCumplimiento(30);
    callApiEstrategico(31);
    callApiGobierno(32);
    callApiFraude(33);
    callApiLiquidez(34);
    callApiOperativo(35);
    callApiSeguridad(36);
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Operativo
            </Label>
            <CSelectReact
              type={"select"}
              id={'operativoId'}
              placeholder={'Seleccionar'}
              value={formik.values.operativoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.operativoId}
              touched={formik.touched.operativoId}
              options={dataApiOperativo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Seguridad de la información
            </Label>
            <CSelectReact
              type={"select"}
              id={'seguridadId'}
              placeholder={'Seleccionar'}
              value={formik.values.seguridadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.seguridadId}
              touched={formik.touched.seguridadId}
              options={dataApiSeguridad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Liquidez y mercado
            </Label>
            <CSelectReact
              type={"select"}
              id={'liquidezId'}
              placeholder={'Seleccionar'}
              value={formik.values.liquidezId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.liquidezId}
              touched={formik.touched.liquidezId}
              options={dataApiLiquidez}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fraude con medios de pago electrónico
            </Label>
            <CSelectReact
              type={"select"}
              id={'fraudeId'}
              placeholder={'Seleccionar'}
              value={formik.values.fraudeId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.fraudeId}
              touched={formik.touched.fraudeId}
              options={dataApiFraude}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Legal y regulatorio
            </Label>
            <CSelectReact
              type={"select"}
              id={'legalId'}
              placeholder={'Seleccionar'}
              value={formik.values.legalId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.legalId}
              touched={formik.touched.legalId}
              options={dataApiLegal}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Reputacional
            </Label>
            <CSelectReact
              type={"select"}
              id={'reputacionalId'}
              placeholder={'Seleccionar'}
              value={formik.values.reputacionalId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.reputacionalId}
              touched={formik.touched.reputacionalId}
              options={dataApiReputacional}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Cumplimiento
            </Label>
            <CSelectReact
              type={"select"}
              id={'cumplimientoId'}
              placeholder={'Seleccionar'}
              value={formik.values.cumplimientoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.cumplimientoId}
              touched={formik.touched.cumplimientoId}
              options={dataApiCumplimiento}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Estratégico
            </Label>
            <CSelectReact
              type={"select"}
              id={'estrategicoId'}
              placeholder={'Seleccionar'}
              value={formik.values.estrategicoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.estrategicoId}
              touched={formik.touched.estrategicoId}
              options={dataApiEstrategico}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Gobierno corporativo
            </Label>
            <CSelectReact
              type={"select"}
              id={'gobiernoId'}
              placeholder={'Seleccionar'}
              value={formik.values.gobiernoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.gobiernoId}
              touched={formik.touched.gobiernoId}
              options={dataApiGobierno}
            />
          </FormGroup>

        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => (tipoEvento ==='A')? beforeSection(5) : beforeSection(4) }
          >
            <ChevronLeft size={17} className='mr-1'/>
            Atrás
          </Button>
          <Button
            style={{width: '130px'}}
            color="dark"
            outline
            onClick={() => { formik.handleReset()/* ; this.reset() */ }}
            disabled={(!formik.dirty || formik.isSubmitting)}
          >
            <Delete size={17} className='mr-2'/>
            Limpiar
          </Button>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            type="submit"
            //disabled={formik.isSubmitting}
          >
            <Save size={17} className='mr-2'/>
            GUARDAR
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default RiesgoRelacionado
