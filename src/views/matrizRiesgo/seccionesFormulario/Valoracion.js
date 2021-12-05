import { React, Fragment, useState, useEffect} from 'react'
import { ChevronLeft, Save, Delete, Percent, X, AlertCircle, Check } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { countEstadoPlanes, resultAvance } from 'src/functions/FunctionsMatriz'
import { buildSelectTwo } from 'src/functions/Function'
import BootstrapTable from 'react-bootstrap-table-next'
import { CBadge, CCallout, CProgress } from '@coreui/react'
import { CInputReact } from 'src/reusable/CInputReact'

var _ = require('lodash');

const RiesgoRelacionado = ({ beforeSection, setObject, initValues, isEdit, handleOnSubmmit, dataPlanesAccion }) => {

  const columns = [
    {
      dataField: 'idPlan',
      text: 'Plan',
    }, {
        dataField: 'estrategia',
        text: 'Estrategia para Administrar el Riesgo',
    }, {
        dataField: 'descripcion',
        text: 'Descripción de la acción',
        style: { whiteSpace: 'nowrap' },
    }, {
        dataField: 'cargo',
        text: 'Cargo',
    }, {
        dataField: 'fechaAccion',
        text: 'Fecha plan de acción',
        sort: true,
    }, {
         dataField: 'fechaImpl',
         text: 'Fecha plan de implementación',
         sort: true,
     }, {
        dataField: 'estado',
        text: 'Estado',
        sort: true,
        formatter: colorEstado,
    }
  ]

  function colorEstado(cell, row) {
    if (cell === 'No iniciado') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      );
    }
    if (cell === 'Concluido') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-success-light">{cell}</CBadge>
      );
    }
    if (cell === 'En proceso') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-warning-light">{cell}</CBadge>
      );
    }
  }


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
          <Col xs='12'>
            <BootstrapTable
              style={{th: '50px !important'}}
              classes= {'mt-2'}
              bootstrap4={true}
              sort={{ dataField: 'idPlan', order: 'asc' }}
              noDataIndication={'No hay registros de planes de acción'}
              keyField='idPlan'
              data={dataPlanesAccion}
              columns={columns}
              bordered={false}
              striped={false}
              hover={false}
              condensed={false}
              wrapperClasses="table-responsive"
            />

            <div className='divider divider-left divider-dark'>
              <div className='divider-text '><span className='text-label'>Seguimiento de Riesgos</span></div>
            </div>
          </Col>

          <Col xs='12' md='6' xl='3'>
            <CCallout color="info">
              <div className="text-label">Nro. de Tareas</div>
              <div className="h4">{dataPlanesAccion.length}</div>
            </CCallout>
          </Col>

          <Col xs='12' md='6' xl='3'>
            <CCallout color="danger">
              <div className="text-label">No iniciadas</div>
              <div className="h4">{countEstadoPlanes(dataPlanesAccion, 'No iniciado')}</div>
            </CCallout>
          </Col>

          <Col xs='12' md='6' xl='3'>
            <CCallout color="warning">
              <div className="text-label">En proceso</div>
              <div className="h4">{countEstadoPlanes(dataPlanesAccion, 'En proceso')}</div>
            </CCallout>
          </Col>

          <Col xs='12' md='6' xl='3'>
            <CCallout color="success">
              <div className="text-label">Concluido</div>
              <div className="h4">{countEstadoPlanes(dataPlanesAccion, 'Concluido')}</div>
            </CCallout>
          </Col>

          <Col xs='12' md='6' xl='6' className='pt-3'>
            <div className="progress-group mb-4">
              <div className="progress-group-header">
                <Percent size={15} className='mb-1'/>
                <span className="pl-3 text-label">Avance</span>
                <span className="ml-auto font-weight-bold">
                  {resultAvance(dataPlanesAccion)} <Percent size={15} className='mb-1'/>
                </span>
              </div>
              <div className="progress-group-bars">
                <CProgress
                  className="progress-sm"
                  color={resultAvance(dataPlanesAccion) <= 32? 'danger' : resultAvance(dataPlanesAccion) <= 66? 'warning' : 'success'}
                  value={resultAvance(dataPlanesAccion)}
                />
              </div>
            </div>
          </Col>

          <Col xs='12' md='6' xl='6' className='pt-3'>
            {countEstadoPlanes(dataPlanesAccion, 'Concluido') === 0 ?
              <div>
                <CBadge className='badge-danger-light'><X size={30} className='text-danger'/></CBadge>
                <span className='text-label pl-4'>Estado</span>
                <span className='text-danger text-label pl-5'>Sin progreso</span>
              </div>
            : null}

            {(countEstadoPlanes(dataPlanesAccion, 'Concluido') < dataPlanesAccion.length &&
              countEstadoPlanes(dataPlanesAccion, 'Concluido') !== 0) ?
              <div>
               <CBadge className='badge-warning-light'><AlertCircle size={30} className='text-warning'/></CBadge>
               <span className='text-label pl-4'>Estado</span>
               <span className='text-warning text-label pl-5'>En Proceso</span>
              </div>
            : null}

            {countEstadoPlanes(dataPlanesAccion, 'Concluido') === dataPlanesAccion.length ?
              <div>
                <CBadge className='badge-success-light'><Check size={30} className='text-success'/></CBadge>
                <span className='text-label pl-4'>Estado</span>
                <span className='text-success text-label pl-5'>Concluido</span>
              </div>
            : null}
          </Col>

        </Row>


        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(5)}
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
