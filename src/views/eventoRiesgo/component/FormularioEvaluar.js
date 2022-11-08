import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import CInputRadio from 'src/reusable/CInputRadio'
import { Row, FormGroup, Col, Form, Button, Label } from 'reactstrap'
import 'src/reusable/drag-and-drop/drag-and-drop.scss'
import { ReactSortable } from 'react-sortablejs'
import { List, AlertTriangle } from 'react-feather'

var _ = require('lodash');

const FormEvaluaEvento = ({ initialValuess, handleOnSubmit }) => {

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
      text: 'Fecha Inicio'
    }, {
      text: 'Hora Inicio'
    }, {
      text: 'Fecha descubrimiento'
    }, {
      text: 'Hora descubrimiento'
    }, {
      text: 'Agencia'
    }, {
      text: 'Ciudad'
    }, {
      text: 'Área'
    }, {
      text: 'Unidad'
    }, {
      text: 'Comercio afectado'
    }, {
      text: 'Entidad afectada'
    }, {
      text: 'Entidad'
    }, {
      text: 'Cargo persona afectada ASFI'
    }, {
      text: 'Estado'
    }, {
      text: 'Fuente de información'
    }, {
      text: 'Canales ASFI'
    }, {
      text: 'Descripción'
    }, {
      text: 'Descripción completa'
    }
  ]
  const data2 = [
    {
      text: 'Código inicial'
    }, {
      text: 'Sub categorización'
    }, {
      text: 'Trimestre'
    }, {
      text: 'Tipo de evento de pérdida'
    }, {
      text: 'Sub evento - Basilea'
    }, {
      text: 'Clase evento - Basilea - ASFI'
    }, {
      text: 'Detalle evento crítico'
    }, {
      text: 'Factor de riesgo operativo'
    }, {
      text: 'Proceso'
    }, {
      text: 'Procedimiento'
    }, {
      text: 'Evento crítico ASFI'
    }, {
      text: 'Línea de negocio'
    }, {
      text: 'Línea de negocio ASFI'
    }, {
      text: 'Efectos de pérdida'
    }, {
      text: 'Riesgo relacionado'
    }, {
      text: 'Operación - producto o servicio afectado'
    }, {
      text: 'Tipo de servicio'
    }, {
      text: 'Descripción de servicio'
    }, {
      text: 'Operaciones ASFI'
    }, {
      text: 'Detalle estado del evento'
    }
  ]
  const data3 = [
    {
      text: 'Tasa de cambio'
    }, {
      text: 'Moneda'
    }, {
      text: 'Monto de pérdida'
    }, {
      text: 'Monto de pérdida por riesgo operativo (USD)',
    }, {
      text: 'Gastos asociados'
    }, {
      text: 'Monto recuperado'
    }, {
      text: 'Impacto'
    }, {
      text: 'Cobertura seguro'
    }, {
      text: 'Póliza de seguro'
    }, {
      text: 'Monto recuperado del seguro'
    }, {
      text: 'Recuperación activo'
    }, {
      text: 'Pérdida de valor de mercado'
    }, {
      text: 'Monto total de pérdida'
    }
  ]
  const data4 = [
    {
      text: 'Operativo'
    }, {
      text: 'Seguridad de la información'
    }, {
      text: 'Liquidez y mercado'
    }, {
      text: 'LGI FT y/o DP'
    }, {
      text: 'Fraude con medios de pago electrónico'
    }, {
      text: 'Legal y regulatorio'
    }, {
      text: 'Reputacional'
    }, {
      text: 'Cumplimiento'
    }, {
      text: 'Estratégico'
    }, {
      text: 'Gobierno corporativo'
    }
  ]

  const dataObservados = []

  const [datosIniciales, setList] = useState(data1)
  const [datosCategoria, setList2] = useState(data2)
  const [datosImportes, setList3] = useState(data3)
  const [datosRiesgos, setList4] = useState(data4)
  const [observados, setListObservados] = useState(dataObservados)

  const formik = useFormik({
    initialValues: initialValuess,
    validationSchema: Yup.object().shape(
      {
        estadoRegistro: Yup.string().required(),
        listaObservacion: Yup.string().nullable(),
        nota: Yup.string().nullable().when('estadoRegistro', {
          is: (val) => (val === 'Observado'),
          then: Yup.string().max(900, 'El campo no debe exceder los 900 caracteres').nullable().required("Campo obligatorio"),
        }),
        estado: Yup.string().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values,
        modulo: "Evento",
        listaObservacion: (Object.keys(observados).length !== 0) ? JSON.stringify(_.map(observados, 'text')).replace(/['"[\]]/g, '') : null,
      }
      handleOnSubmit(data)
    }
  })

  /* var string = JSON.stringify(_.map(observados, 'text'));
  console.log('observados string : ', string);
  console.log('observados json  convert : ', JSON.parse(string)) ; */

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
            <Col xs='6' xl='3' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15} /> Datos iniciales</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group1'
                list={datosIniciales}
                setList={setList}
                style={{ cursor: 'grab' }}
              >
                {datosIniciales.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0' />
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='3' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15} /> Categoria y Línea de negocio</div>
              <ReactSortable
                //tag='ul'
                className='list-group list-group-flush sortable'
                sort={false}
                group='group2'
                list={datosCategoria}
                setList={setList2}
                style={{ cursor: 'grab' }}
              >
                {datosCategoria.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0' />
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='3' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15} /> Importes relacionados</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group3'
                list={datosImportes}
                setList={setList3}
                style={{ cursor: 'grab' }}
              >
                {datosImportes.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0' />
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
            <Col xs='6' xl='3' className='pt-2'>
              <div className='my-1 font-weight-bold'><List size={15} /> Riesgos Relacionados</div>
              <ReactSortable
                className='list-group list-group-flush sortable'
                sort={false}
                group='group4'
                list={datosRiesgos}
                setList={setList4}
                style={{ cursor: 'grab' }}
              >
                {datosRiesgos.map(item => {
                  return (
                    <div className='draggable' key={item.text}>
                      <small>- {item.text}</small>
                      <hr className='my-0' />
                    </div>
                  )
                })}
              </ReactSortable>
            </Col>
          </Row>

          {/* O B S E R V A C I O N  Y  N O T A S */}
          <Row className='pt-3'>
            <Col xs='12' md='6'>
              <div className='px-3 py-1' style={{ border: '2px solid #e55353', borderRadius: '10px', minHeight: '130px' }}>
                <div className='my-1 font-weight-bold'><AlertTriangle size={15} className='text-danger' /> Campos observados</div>
                <ReactSortable
                  //tag='ul'
                  className='list-group list-group-flush sortable'
                  group={{ name: 'shared-badge-group', put: ['group1', 'group2', 'group3', 'group4'] }}
                  list={observados}
                  setList={setListObservados}
                  style={{ cursor: 'grab' }}
                >
                  {observados.map(item => {
                    return (
                      <div className='draggable ' key={item.text}>
                        {item.text}
                        <hr className='my-1' />
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
export default FormEvaluaEvento
