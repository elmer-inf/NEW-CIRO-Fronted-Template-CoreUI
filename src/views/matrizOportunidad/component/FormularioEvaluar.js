import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import  CInputRadio  from 'src/reusable/CInputRadio'
import { Row, FormGroup, Col, Form, Button, Label } from 'reactstrap'
import 'src/reusable/drag-and-drop/drag-and-drop.scss'
import { ReactSortable } from 'react-sortablejs'
import { List, AlertTriangle } from 'react-feather'

var _ = require('lodash');

const FormEvaluaRiesgo = ({ initialValuess, handleOnSubmit }) => {

  // Valores de estado para evaluar evento
  const optionEstadoRegistro = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Observado', label: 'Observado' },
    { value: 'Autorizado', label: 'Autorizado' },
    { value: 'Descartado', label: 'Descartado' }
  ]

  //Drag and drop
  const data1 = [
    {
      text: 'Área'
    },{
      text: 'Unidad'
    },{
      text: 'Macroproceso'
    },{
      text: 'Proceso'
    },{
      text: 'Dueño proceso'
    },{
      text: 'Responsable Unidad a cargo'
    },{
      text: 'Fecha evaluación'
    },{
      text: 'FODA'
    },{
      text: 'Detalle FODA'
    }
  ]
  const data2 = [
    {
      text: 'Definición de la Oportunidad'
    },{
      text: 'Causa de la Oportunidad'
    },{
      text: 'Consecuencia si es que ocurre la Oportunidad'
    },{
      text: 'Definición de la Oportunidad (concatenación)'
    },{
      text: 'Clasificación Factores'
    },{
      text: 'Grupo de Interés Relacionado'
    }
  ]
  const data3 = [
    {
      text: 'Probabilidad - Cuán probable es que la Oportunidad ocurra'
    },{
      text: 'Impacto Oportunidad Cualitativo'
    },{
      text: 'Nivel Oportunidad'
    },{
      text: 'Valoración Oportunidad',
    }
  ]
  const data4 = [
    {
      text: 'Ponderación Control/Fortaleza'
    },{
      text: '¿Tiene Controles?'
    },{
      text: 'Lista de Controles'
    }
  ]

  const data5 = [
    {
      text: 'Lista de Planes de acción'
    }
  ]
  const data6 = [
    {
      text: 'Seguimiento de Planes de acción'
    }
  ]

  const dataObservados = []

  const [datosIniciales, setList] = useState(data1)
  const [datosDescripcion, setList2] = useState(data2)
  const [datosOportunidad, setList3] = useState(data3)
  const [datosControles, setList4] = useState(data4)
  const [datosPlanes, setList5] = useState(data5)
  const [datosSeguimiento, setList6] = useState(data6)
  const [observados, setListObservados] = useState(dataObservados)

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        estadoRegistro: Yup.string().required(),
        listaObservacion: Yup.string().nullable(),
        nota: Yup.string().nullable().when('estadoRegistro',{
          is:(val) => (val === 'Observado'),
          then: Yup.string().max(900, 'El campo no debe exceder los 900 caracteres').nullable().required("Campo obligatorio"),
        }),
        estado: Yup.string().nullable()
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        modulo: "Oportunidad",
        listaObservacion: (Object.keys(observados).length !== 0) ? JSON.stringify(_.map(observados, 'text')).replace(/['"[\]]/g, ''): null,
      }
      handleOnSubmit(data)
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit} autoComplete="off">
      <FormGroup>
        <CInputRadio
          data={optionEstadoRegistro}
          id={'estadoRegistro'}
          value={formik.values.estadoRegistro}
          onChange={formik.setFieldValue}
          onBlur={formik.setFieldTouched}
          touched={formik.touched.estadoRegistro}
          errors={formik.errors.estadoRegistro}
          sendValue={true}
        />
      </FormGroup>
      {(formik.values.estadoRegistro === 'Observado') ?
        <div>
          {/* L I S T A  D E  C A M P O S */}
          <Row>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Datos iniciales</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group1'
                list={datosIniciales}
                setList={setList}
                style={{cursor: 'grab'}}
              >
                {datosIniciales.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Descripción</div>
              <ReactSortable
                //tag='ul'
                className='list-group list-group-flush sortable'
                sort={false}
                group='group2'
                list={datosDescripcion}
                setList={setList2}
                style={{cursor: 'grab'}}
              >
                {datosDescripcion.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Oportunidad</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group3'
                list={datosOportunidad}
                setList={setList3}
                style={{cursor: 'grab'}}
              >
                {datosOportunidad.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Controles/Fortalezas actuales</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group4'
                list={datosControles}
                setList={setList4}
                style={{cursor: 'grab'}}
              >
                {datosControles.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Planes de Acción</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group5'
                list={datosPlanes}
                setList={setList5}
                style={{cursor: 'grab'}}
              >
                {datosPlanes.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='4' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15}/> Seguimiento</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group6'
                list={datosSeguimiento}
                setList={setList6}
                style={{cursor: 'grab'}}
              >
                {datosSeguimiento.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0'/>
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
          </Row>

          {/* O B S E R V A C I O N  Y  N O T A S */}
          <Row className='pt-3'>
            <Col xs='12' md='6'>
              <div className='px-3 py-1' style={{border: '2px solid #e55353', borderRadius: '10px', minHeight: '130px'}}>
                <div className='my-1 font-weight-bold'><AlertTriangle size={15} className='text-danger'/> Campos observados</div>
                <ReactSortable
                  //tag='ul'
                  className='list-group list-group-flush sortable'
                  group={{ name: 'shared-badge-group', put: ['group1', 'group2', 'group3', 'group4', 'group5', 'group6'] }}
                  list={observados}
                  setList={setListObservados}
                  style={{cursor: 'grab'}}
                >
                  {observados.map(item => {
                    return (
                      <div className='draggable ' key={item.text}>
                        {item.text}
                        <hr className='my-1'/>
                      </div>
                    )
                  })}
                </ReactSortable>
              </div>
            </Col>

            <Col xs='12' md='6'>
              <Label for='nota' className='font-weight-bold'>
                Nota
              </Label>
              <CInputReact
                type={"textarea"}
                id={'nota'}
                placeholder={'Nota'}
                value={formik.values.nota}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.nota}
                errors={formik.errors.nota}
                rows={4}
              />
            </Col>
          </Row>
        </div>
      : null}

      <FormGroup row className='mt-4 '>
        <Col className='d-flex justify-content-center'>
          <Button
            className='mr-4 text-white'
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Guardar
          </Button>

          <Button
            outline color='dark'
            onClick={() => { formik.handleReset()}}
            disabled={!formik.dirty || formik.isSubmitting}
          >
            Limpiar
          </Button>

        </Col>
      </FormGroup>
    </Form>
  )
}
export default FormEvaluaRiesgo
