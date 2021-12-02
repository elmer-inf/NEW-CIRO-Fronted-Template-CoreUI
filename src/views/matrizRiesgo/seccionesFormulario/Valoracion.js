import { React, Fragment, useState, useEffect} from 'react'
import { ChevronLeft, Save, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact'
//import { getTablaDescripcionNivel } from '../controller/EventoController';
import { buildSelectTwo } from 'src/functions/Function'

const RiesgoRelacionado = ({ beforeSection, setObject, initValues, isEdit, handleOnSubmmit, tipoEvento }) => {

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
        gobiernoId: Yup.mixed().nullable()
        /* seguridadId: Yup.mixed().nullable(),
        lgiId: Yup.mixed().nullable(), */
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
        /* seguridadId:    (values.seguridadId !== null) ?     values.seguridadId.value : 0,
        lgiId:          (values.lgiId !== null) ?           values.lgiId.value : 0, */
     }
     console.log('datos que se enviaran SECCION 4:', data)
     handleOnSubmmit(data)
   }
  })

  /*   P  A  R  A  M  E  T  R  O  S   */

  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      {/* <div className='content-header'>
        <h5 className='mb-0'>Categoria</h5>
      </div> */}
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

         

          

        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(4)}
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
            disabled={formik.isSubmitting}
            //onClick={() => onSubmmit()}
            //disabled={!columnasList.length > 0}
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
