import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectTwo } from 'src/functions/Function'
import { Messages } from 'src/reusable/variables/Messages'

const PlanesAccion = ({ nextSection, beforeSection, setObject, initValues, isEdit, optionsPlanes }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
      areaResponsableId: Yup.mixed().nullable(),
      cargoResponsableId: Yup.mixed().nullable(),
      detallePlan: Yup.string().nullable(),
      fechaFinPlan: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(new Date('12-31-2500'), Messages.dateValidation4).nullable(),
      descripcionEstado: Yup.string().nullable(),
      estadoPlan: Yup.mixed().nullable(),
    }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        areaResponsableId: (values.areaResponsableId !== null) ? values.areaResponsableId.value : 0,
        cargoResponsableId: (values.cargoResponsableId !== null) ? values.cargoResponsableId.value : 0,
        estadoPlan: (values.estadoPlan !== null) ? values.estadoPlan.value : null,
      }
      //console.log('datos que se enviaran SECCION 2:', data)
      setObject(data);
      nextSection(2);
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

  useEffect(() => {
    callApiArea(3);
    callApiCargo(7);
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>
          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Gerencia responsable
            </Label>
            <CSelectReact
              type={"select"}
              id={'areaResponsableId'}
              placeholder={'Seleccionar'}
              value={formik.values.areaResponsableId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.areaResponsableId}
              touched={formik.touched.areaResponsableId}
              options={dataApiArea}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Cargo responsable
            </Label>
            <CSelectReact
              type={"select"}
              id={'cargoResponsableId'}
              placeholder={'Seleccionar'}
              value={formik.values.cargoResponsableId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.cargoResponsableId}
              touched={formik.touched.cargoResponsableId}
              options={dataApiCargo}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Detalle del plan
            </Label>
            <CInputReact
              type={"textarea"}
              id={'detallePlan'}
              placeholder={'Detalle del plan'}
              value={formik.values.detallePlan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.detallePlan}
              errors={formik.errors.detallePlan}
              rows={3}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Fecha fin del plan
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaFinPlan'}
              value={formik.values.fechaFinPlan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaFinPlan}
              errors={formik.errors.fechaFinPlan}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Estado
            </Label>
            <CSelectReact
              type={"select"}
              id={'estadoPlan'}
              placeholder={'Seleccionar'}
              value={formik.values.estadoPlan}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.estadoPlan}
              touched={formik.touched.estadoPlan}
              options={optionsPlanes}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Descripción del estado
            </Label>
            <CInputReact
              type={"textarea"}
              id={'descripcionEstado'}
              placeholder={'Descripción del estado'}
              value={formik.values.descripcionEstado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcionEstado}
              errors={formik.errors.descripcionEstado}
              rows={3}
            />
          </FormGroup>
        </Row>

        <Row className='pt-4'>
          <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
            <Button
              outline
              color="primary"
              block
              onClick={() => beforeSection(2)}
            >
              <ChevronLeft size={17} className='mr-1' />
              Atrás
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
              color="primary"
              block
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

export default PlanesAccion