import { React, Fragment, useState, useEffect} from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { buildSelectThree } from 'src/functions/Function'
import { getTablaDescripcionOportunidadN1 } from 'src/views/administracion/matriz-oportunidad/controller/AdminOportunidadController';

var _ = require('lodash');

const Descripcion = ({ nextSection, beforeSection, setObject, initValues, isEdit, optionsFactores}) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        definicion : Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').required("Campo obligatorio"),
        causa : Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').required("Campo obligatorio"),
        consecuencia : Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').required("Campo obligatorio"),
        factor : Yup.mixed().required("Campo obligatorio"),
        grupoInteresId: Yup.mixed().required("Campo obligatorio"),
        // Solo para mostrar
        defConcatenado : Yup.string().nullable(),


        /* definicion : Yup.string().nullable(),
        causa : Yup.string().nullable(),
        consecuencia : Yup.string().nullable(),
        factor : Yup.mixed().nullable(),
        grupoInteresId: Yup.mixed().nullable(),
        // Solo para mostrar
        defConcatenado : Yup.string().nullable(), */
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        grupoInteresId : (values.grupoInteresId !== null) ?   values.grupoInteresId.value : 0,
        factor:     (values.factor !== null) ?      values.factor.value : null,
     }
      const dataSelect =  _.omit(data, ['defConcatenado']);
      console.log('datos que se enviaran SECCION 2:', dataSelect)
      setObject(dataSelect);
      nextSection(2);
   }
  })

   // Rellena Datos para Editar
   useEffect(() => {
    if (isEdit) {
      formik.setValues({ ...initValues })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues])

  /*   P  A  R  A  M  E  T  R  O  S   */
  // Grupo de interes
  const [dataApiGrupoInteres, setDataApiGrupoInteres] = useState([])
  const callApiGrupoInteres = (idTablaDes, idNivel2) => {
    getTablaDescripcionOportunidadN1(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'campoA', 'nombre', false)
        setDataApiGrupoInteres(_.orderBy(options, ['value' ], ['asc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiGrupoInteres(3);
  }, [])

  // Concatena definicion, causa y consecuencia
  useEffect(() => {
    if(formik.values.definicion !== '' && formik.values.causa !== '' && formik.values.consecuencia !== ''){
      formik.setFieldValue('defConcatenado', 'OPORTUNIDAD DE ' + formik.values.definicion + ' DEBIDO A ' + formik.values.causa + ' PUEDE OCASIONAR ' + formik.values.consecuencia, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.definicion, formik.values.causa, formik.values.consecuencia]);

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className="pt-4">
          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>1</b> Definición de Oportunidad ¿Qué Oportunidad indentifica en el entorno interno y externo?
              <span className='text-label'> OPORTUNIDAD DE</span> (contextualizar la oportunidad) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'definicion'}
              value={formik.values.definicion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.definicion}
              errors={formik.errors.definicion}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>2</b> Causa de la Oportunidad ¿Cuál es la causa para que ocurra la Oportunidad?
              <span className='text-label'> DEBIDO A</span> (causa por la que ocurriría) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'causa'}
              value={formik.values.causa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.causa}
              errors={formik.errors.causa}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              <b>3</b> Consecuencia o efecto positivo si es que ocurre la Oportunidad
              <span className='text-label'> PUEDE OCASIONAR</span> (consecuencia) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'consecuencia'}
              value={formik.values.consecuencia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.consecuencia}
              errors={formik.errors.consecuencia}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              Definición de la Oportunidad (<span className='text-label'>OPORTUNIDAD</span>),
              debido a (<span className='text-label'>CAUSA</span>),
              puede ocasionar (<span className='text-label'>EFECTO POSITIVO</span>) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'defConcatenado'}
              value={formik.values.defConcatenado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.defConcatenado}
              errors={formik.errors.defConcatenado}
              disabled={true}
              rows={4}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Clasificación Factores (Internos/Externos) <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'factor'}
              placeholder={'Seleccionar'}
              value={formik.values.factor}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.factor}
              touched={formik.touched.factor}
              options={optionsFactores}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Grupo de Interés Relacionado <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'grupoInteresId'}
              placeholder={'Seleccionar'}
              value={formik.values.grupoInteresId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.grupoInteresId}
              touched={formik.touched.grupoInteresId}
              options={dataApiGrupoInteres}
            />
          </FormGroup>

        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(2)}
          >
            <ChevronLeft size={17} className='mr-1'/>
            Atrás
          </Button>
          <Button
            style={{width: '130px'}}
            color="dark"
            outline
            onClick={() => { formik.handleReset()}}
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
            Siguiente
            <ChevronRight size={17} className='ml-1'/>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Descripcion
