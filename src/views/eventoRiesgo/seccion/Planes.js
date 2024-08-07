import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, Save } from 'react-feather'
import { Row, Col, Form, Button } from 'reactstrap'
import { postListRiesgosByIds } from 'src/views/matrizRiesgo/controller/RiesgoController'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next'

const PlanesAccion = ({ beforeSection, tipoEvento, handleOnSubmmit, dataAuxListRiesgos }) => {

  const [listRiesgos, setListRiesgos] = useState([]);

  const columnsPlanes = [
    {
      dataField: 'nroPlan',
      text: 'Plan',
    }, {
      dataField: 'descripcion',
      text: 'Descripción',
    }, {
      dataField: 'cargo',
      text: 'Cargo',
    }, {
      dataField: 'fechaImpl',
      text: 'Fecha implementación',
      sort: true,
    }, {
      dataField: 'estado',
      text: 'Estado',
      sort: true,
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
    if (cell === 'Vencido') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      )
    }
    if (cell === 'No aplicable') {
      return (
        <CBadge className="mt-1 mb-2 mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      )
    }
  }

  // Lista de Riesgos:
  const listRiesgosByIds = (filter) => {
    postListRiesgosByIds(filter)
      .then(res => {
        setListRiesgos(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    listRiesgosByIds(dataAuxListRiesgos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuxListRiesgos])

  const ListaRiesgos = ({ listRiesgos }) => {
    if (listRiesgos.length === 0) {
      return <div className='text-data text-center py-4'>No existen Riesgos relacionados a este Evento de Riesgo.</div>;
    }
    return (
      <div>
        {listRiesgos.map((dataApi, index) => (
          <div key={index} className='custom-react-bootstrap-table table-hover-animation'>
            <div className='divider divider-left divider-dark pt-2'>
              <div className='divider-text'><span className='text-label'>{dataApi.codigo !== null ? 'Riesgo relacionado: ' + dataApi.codigo : ''}</span></div>
            </div>
            <Row>
              <Col xs='12' className='pb-2'>
                <span className='text-label'>Gerencia responsable: </span>
                <span className='text-data'>{dataApi.areaId !== null ? dataApi.areaId.nombre : <i>Sin registro</i>}</span>
              </Col>
              <Row>
              </Row>
              <Col xs='12'>
                <BootstrapTable
                  classes={''}
                  bootstrap4={true}
                  sort={{ dataField: 'nroPlan', order: 'asc' }}
                  noDataIndication={'No hay registros de Planes de acción'}
                  keyField='nroPlan'
                  data={dataApi.planesAccion ? JSON.parse(dataApi.planesAccion) : []}
                  columns={columnsPlanes}
                  bordered={false}
                  striped={true}
                  hover={false}
                  condensed={false}
                  wrapperClasses="table-responsive"
                />
              </Col>
            </Row>
          </div>
        ))}
      </div>
    );
  }


  return (
    <Fragment>
      <Form onSubmit={e => {e.preventDefault(); handleOnSubmmit({}) }} autoComplete="off">
        <Row className='pt-4'>
          <Col xs={12}>
            <ListaRiesgos listRiesgos={listRiesgos || []} />
          </Col>
        </Row>

        <Row className='pt-4'>
          <Col xs={4} md={{ size: 2, order: 0, offset: 4 }}>
            <Button
              color="primary"
              outline
              block
              onClick={() => beforeSection(5)}
            >
              <ChevronLeft size={17} className='mr-1' />
              Atrás
            </Button>
          </Col>
          
          <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
            <Button
              className='text-white'
              block
              color="primary"
              type="submit"
            >
              <Save size={17} className='mr-2' />
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default PlanesAccion