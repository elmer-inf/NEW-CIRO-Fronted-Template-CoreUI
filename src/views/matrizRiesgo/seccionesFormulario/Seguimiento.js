import { React, Fragment } from 'react'
import { ChevronLeft, Delete, Percent, X, AlertCircle, Check, ChevronRight } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { countEstadoPlanes, resultAvance } from 'src/functions/FunctionsMatriz'
import BootstrapTable from 'react-bootstrap-table-next'
import { CBadge, CCallout, CProgress } from '@coreui/react'
import { CInputReact } from 'src/reusable/CInputReact'

const SeguimientoRiesgos = ({ nextSection, beforeSection, setObject, initValues, isEdit, dataPlanesAccion }) => {

  const columns = [
    {
        dataField: 'nroPlan',
        text: 'Plan',
    }, {
        dataField: 'estrategia',
        text: 'Estrategia',
    }, {
        dataField: 'descripcion',
        text: 'Descripción',
    }, {
        dataField: 'cargo',
        text: 'Cargo',
    }, {
        dataField: 'fechaAccion',
        text: 'Fecha acción',
        style: { whiteSpace: 'nowrap' },
    }, {
        dataField: 'fechaImpl',
        text: 'Fecha implementación',
        style: { whiteSpace: 'nowrap' },
     }, {
        dataField: 'estado',
        text: 'Estado',
        formatter: colorEstado,
    }
  ]

  function colorEstado(cell) {
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
        seguimientoFecha: Yup.date().max(new Date('12-31-3000'), "Año fuera de rango").nullable(),
        seguimientoObs: Yup.string().nullable(),
        seguimientoComen: Yup.string().nullable()
      }
    ),

      onSubmit: values => {
        const data = {
        ...values
      }
      console.log('datos que se enviaran SECCION 6:', data)
      setObject(data);
      nextSection(6);
   }
  })

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4 table-hover-animation'>
          <Col xs='12'>
            <BootstrapTable
              classes= {'table-hover-animation mt-2'}
              bootstrap4={true}
              sort={{ dataField: 'nroPlan', order: 'asc' }}
              noDataIndication={'No hay registros de Planes de acción'}
              keyField='nroPlan'
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

            {countEstadoPlanes(dataPlanesAccion, 'Concluido') === dataPlanesAccion.length && dataPlanesAccion.length !==0 ?
              <div>
                <CBadge className='badge-success-light'><Check size={30} className='text-success'/></CBadge>
                <span className='text-label pl-4'>Estado</span>
                <span className='text-success text-label pl-5'>Concluido</span>
              </div>
            : null}
          </Col>

          <FormGroup tag={Col} md='6' lg='4' className='mb-0'>
            <Label className='form-label'>
              Fecha Seguimiento
            </Label>
            <CInputReact
              type={"date"}
              id={'seguimientoFecha'}
              value={formik.values.seguimientoFecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.seguimientoFecha}
              errors={formik.errors.seguimientoFecha}
            />
          </FormGroup>

          <FormGroup tag={Col} xs='12' className='mb-0'>
            <Label className='form-label'>
              Observaciones a tareas propuestas
            </Label>
            <CInputReact
              type={"textarea"}
              id={'seguimientoObs'}
              value={formik.values.seguimientoObs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.seguimientoObs}
              errors={formik.errors.seguimientoObs}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} xs='12' className='mb-0'>
            <Label className='form-label'>
              Comentarios tareas en Proceso
            </Label>
            <CInputReact
              type={"textarea"}
              id={'seguimientoComen'}
              value={formik.values.seguimientoComen}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.seguimientoComen}
              errors={formik.errors.seguimientoComen}
              rows={1}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(6)}
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

export default SeguimientoRiesgos
