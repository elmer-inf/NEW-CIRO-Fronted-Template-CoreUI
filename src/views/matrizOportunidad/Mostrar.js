import { React, useState, useEffect } from 'react'
import { FileText, BarChart2, Trello, CheckSquare, Percent, X, AlertCircle, Check, Columns } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, ListGroup, ListGroupItem} from 'reactstrap';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs, CButton, CCollapse, CCard, CModal, CModalBody, CModalHeader, CModalTitle, CBadge, CCallout, CProgress} from '@coreui/react'
import { getOportunidadId, getUltimaObservacion, putEvaluaOportunidad } from './controller/OportunidadController';
import { getTablaDescripcionOportunidadN1 } from 'src/views/administracion/matriz-oportunidad/controller/AdminOportunidadController';
import FormularioEvaluar from './component/FormularioEvaluar'
import BootstrapTable from 'react-bootstrap-table-next';
import { calculaRiesgo, buscaValorLiteralRiesgoI, countEstadoPlanes, resultAvance } from 'src/functions/FunctionsMatriz'
import { buildSelectTwo } from 'src/functions/Function'

var _ = require('lodash');

const MatrizOportunidad = ({ match }) => {

  // Obtiene Matriz de oportunidad por el ID
  const [dataApi, setDataApi] = useState({})

  useEffect(() => {
    getById();
    getByIdObservacion();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsControles = [
    {
      dataField: 'nroControl',
      text: 'Control',
    }, {
        dataField: 'descripcion',
        text: 'Descripción',
    }
  ]

  const columnsPlanes = [
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
        sort: true,
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

  const columnsSeguimiento = [
    {
      dataField: 'nroPlan',
      text: 'Plan',
    }, {
        dataField: 'fechaSeg',
        text: 'Fecha seguimiento',
    }, {
        dataField: 'comenConcluido',
        text: 'Comentarios: Tareas Concluidas',
    }, {
        dataField: 'comenEnProceso',
        text: 'Comentarios: Tareas en Proceso',
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

  const getById = async () => {
    const idOportunidad = match.params.id;
    await getOportunidadId(idOportunidad)
    .then((response) => {
      const res = response.data;
      console.log('Res : ', res);
      setDataApi(res)
    }).catch((error) => {
      console.log("Error: ", error);
    });
  }

  /* CALCULO RIESGOS */

  // Tratamiento
  const [dataApiTratamiento, setDataApiTratamiento] = useState([])
  const callApiTratamiento = (idTablaDes, idNivel2) => {
    getTablaDescripcionOportunidadN1(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoB', true)
        setDataApiTratamiento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiTratamiento(5);
  }, [])

  const riesgo = (prob, imp) => {
    var riesgo = 0;
    riesgo = calculaRiesgo(parseInt(prob), parseInt(imp));
    return riesgo;
  }

  const valorRiesgo = (prob, imp) => {
    var valorRiesgo = '';
    valorRiesgo = buscaValorLiteralRiesgoI(dataApiTratamiento, riesgo(prob, imp));
    return valorRiesgo;
  }

  /* FIN CALCULO RIESGOS */

  // Obtiene la ultima observacion del evento
  const [dataUltimaObservacion, setDataUltimaObs] = useState({})

  const getByIdObservacion = async () => {
    const idRiesgo = match.params.id;
    await getUltimaObservacion(idRiesgo)
    .then((response) => {
      const res = response.data;
      //console.log('Datos ultima observacion : ', res);
      setDataUltimaObs(res)
    }).catch((error) => {
      console.log("Error: ", error);
      //notificationToast('error', Messages.notification.notOk)
    });
  }

  // Collapse
  const [collapse, setCollapse] = useState(false)
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  // Modal
  const [danger, setDanger] = useState(false)

  // Form Evaluar evento
  const dataEstadoRegistro = dataApi.estadoRegistro;

  const formValueInitial = {
      estadoRegistro: dataEstadoRegistro,
      listaObservacion: '',
      nota: '',
      estado: '',
      modulo: ''
  }

  const handleOnSubmit = (dataToRequest) =>{
    const idOportunidad = match.params.id
    console.log('ID Oportunidad para evaluar: ', idOportunidad)
    console.log('data antes de enviar: ', dataToRequest)
    putEvaluaOportunidad(idOportunidad, dataToRequest)
    .then(res => {
      console.log('response : ', res);
      window.location.reload(true);
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

  // Lista las observaciones
  const listaObservaciones = String(dataUltimaObservacion.listaObservacion);
  const dataListaObservaciones = listaObservaciones.split(',');

  return (
    <div className='table-hover-animation'>
      {
        (!_.isEmpty(dataApi))?
          <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Matriz de Oportunidad</span>
                  {(dataApi.estadoRegistro === 'Autorizado')?
                    <span className='pr-3 text-primary font-weight-bold'>{dataApi.codigo}</span>
                  : null}

                  {(dataApi.estadoRegistro === 'Autorizado')?
                    <Badge className="px-4 badge-success-light">{dataApi.estadoRegistro}</Badge>
                  :null}
                  {(dataApi.estadoRegistro === 'Descartado')?
                    <Badge className="px-4 badge-danger">{dataApi.estadoRegistro}</Badge>
                  :null}
                  {(dataApi.estadoRegistro === 'Pendiente')?
                    <Badge className="px-4 badge-warning-light">{dataApi.estadoRegistro}</Badge>
                  :null}
                  {(dataApi.estadoRegistro === 'Observado')?
                    <Badge className="px-4 badge-danger-light">{dataApi.estadoRegistro}</Badge>
                  :null}

                  {(dataApi.estadoRegistro === 'Observado')?
                    <Button color="danger" size='sm' outline onClick={() => setDanger(!danger)} className="ml-4 float-right">
                      Ver última observación
                    </Button>
                  : null}

                  <CModal
                    show={danger}
                    onClose={() => setDanger(!danger)}
                    color="danger"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>Última observación</CModalTitle>
                    </CModalHeader>
                    <CModalBody className='h6 pb-2'>
                      <div className='text-label'>Campos observados: </div>
                      {dataUltimaObservacion.listaObservacion !== null ?
                        <ListGroup className='pt-2'>
                          {dataListaObservaciones.map((value, index) => {
                            return <ListGroupItem className='py-2' key={index}>{value}</ListGroupItem>
                          })}
                        </ListGroup>
                      : <i>Sin registro</i>}

                      <div className='text-label pt-3'>Nota: </div>
                      <div className='text-data pt-2'>{dataUltimaObservacion.nota !== null ? dataUltimaObservacion.nota : <i>Sin registro</i>}</div>

                      <Button color="dark" outline className="mt-4 px-4 mb-xl-0 float-right" onClick={() => setDanger(!danger)}>
                        Cerrar
                      </Button>
                    </CModalBody>
                  </CModal>

                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" className="mb-4">
                  <CTabs>
                    <CNav variant="tabs" className='justify-content-center font-weight-bold h6'>
                      <CNavItem>
                        <CNavLink>
                          <FileText size={20}/><span className='pl-1 pr-2 h6 font-weight-bold'>Datos iniciales</span>
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink>
                          <Columns size={20}/><span className='pl-1 pr-2 h6 font-weight-bold'>Descripción</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <BarChart2 size={20}/><span className='pl-1 pr-2 h6 font-weight-bold'>Oportunidad</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <Trello size={20}/><span className='pl-1 pr-2 h6 font-weight-bold'>Controles</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <CheckSquare size={20}/><span className='pl-1 pr-2 h6 font-weight-bold'>Planes de Acción y Seguimiento</span>
                        </CNavLink>
                      </CNavItem>

                    </CNav>
                    <CTabContent>
                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Área: </div>
                            <div className='text-data'>{dataApi.areaId !== null ? dataApi.areaId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Unidad: </div>
                            <div className='text-data'>{dataApi.unidadId !== null ? dataApi.unidadId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Macroproceso: </div>
                            <div className='text-data'>{dataApi.procesoId !== null ? dataApi.procesoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Código Macroproceso: </div>
                            <div className='text-data'>{dataApi.procesoId !== null ? dataApi.procesoId.clave : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Proceso: </div>
                            <div className='text-data'>{dataApi.procedimientoId !== null ? dataApi.procedimientoId.descripcion : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Dueño proceso: </div>
                            <div className='text-data'>{dataApi.duenoCargoId !== null ? dataApi.duenoCargoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Responsable Unidad a cargo: </div>
                            <div className='text-data'>{dataApi.responsableCargoId !== null ? dataApi.responsableCargoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Fecha evaluación: </div>
                            <div className='text-data'>{dataApi.fechaEvaluacion !== null ? dataApi.fechaEvaluacion : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>FODA: </div>
                            <div className='text-data'>{dataApi.fodaId !== null ? dataApi.fodaId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Detalle FODA: </div>
                            <div className='text-data'>{dataApi.fodaDescripcionId !== null ? dataApi.fodaDescripcionId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' md='12' className='pt-1'>
                            <div className='text-label'>1 Definición de Oportunidad ¿Qué Oportunidad indentifica en el entorno interno y externo? OPORTUNIDAD DE (contextualizar la oportunidad)</div>
                            <div className='text-data'>{dataApi.definicion !== null ? dataApi.definicion : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='12' className='pt-3'>
                            <div className='text-label'>2 Causa de la Oportunidad ¿Cuál es la causa para que ocurra la Oportunidad? DEBIDO A (causa por la que ocurriría)</div>
                            <div className='text-data'>{dataApi.causa !== null ? dataApi.causa : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='12' className='pt-3'>
                            <div className='text-label'>3 Consecuencia o efecto positivo si es que ocurre la Oportunidad PUEDE OCASIONAR (consecuencia) </div>
                            <div className='text-data'>{dataApi.consecuencia !== null ? dataApi.consecuencia : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='12' className='pt-3'>
                            <div className='text-label'>Definición de la Oportunidad (OPORTUNIDAD), debido a (CAUSA), puede ocasionar (EFECTO POSITIVO)</div>
                            <div className='text-data'>
                              OPORTUNIDAD DE {dataApi.definicion !== null ? dataApi.definicion : ''} DEBIDO A
                              {dataApi.causa !== null ? ' ' + dataApi.causa : ''} PUEDE OCASIONAR
                              {dataApi.consecuencia !== null ? ' ' + dataApi.consecuencia : ''}
                            </div>
                          </Col>

                          <Col xs='12' sm='6' className='pt-3'>
                            <div className='text-label'>Clasificación Factores (Internos/Externos) : </div>
                            <div className='text-data'>{dataApi.factor !== null ? dataApi.factor : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' className='pt-3'>
                            <div className='text-label'>Grupo de Interés Relacionado: </div>
                            <div className='text-data'>{dataApi.grupoInteresId !== null ? dataApi.grupoInteresId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                            <Col xs='12' sm='6' md='6' xl='8' className='pt-2'>
                            <div className='text-label'>Probabilidad Cuán probable es que la Oportunidad ocurra : </div>
                            <div className='text-data'>{dataApi.probabilidadId.campoD}</div>
                          </Col>

                          <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                            <div className='text-label'>Probabilidad: </div>
                            <div className='text-data'>{dataApi.probabilidadId.campoA}</div>
                          </Col>

                          <Col xs='12' sm='6' md='6' xl='8' className='pt-2'>
                            <div className='text-label'>% de Ocurrencia: </div>
                            <div className='text-data'>{dataApi.probabilidadId.campoG}</div>
                          </Col>

                          <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                            <div className='text-label'>Valoración - Probabilidad: </div>
                            <div className='text-data'>{dataApi.probabilidadId.nombre}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='8' className='pt-2'>
                            <div className='text-label'>Impacto Oportunidad Cualitativo: </div>
                            <div className='text-data'>{dataApi.impactoOporId.campoA} {dataApi.impactoOporId.campoC}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                            <div className='text-label'>Impacto: </div>
                            <div className='text-data'>{dataApi.impactoOporId.campoA}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='8' className='pt-2'>
                            <div className='text-label'>% de Impacto: </div>
                            <div className='text-data'>{dataApi.impactoOporId.campoD}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                            <div className='text-label'>Valoración - Impacto: </div>
                            <div className='text-data'>{dataApi.impactoOporId.nombre}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                            <div className='text-label'>Nivel de Oportunidad: </div>
                            <div className='text-data'>
                              {riesgo(dataApi.probabilidadId.campoA, dataApi.impactoOporId.campoA)}
                            </div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Valoración Oportunidad: </div>
                            <div className='text-data'>
                              {valorRiesgo(dataApi.probabilidadId.campoA, dataApi.impactoOporId.campoA)}
                            </div>
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' md='3' className='pt-2'>
                            <div className='text-label'>Ponderación Control/Fortaleza: </div>
                            <div className='text-data'>{dataApi.fortalezaId !== null ? dataApi.fortalezaId.campoA : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='9' className='pt-2'>
                            <div className='text-label'>Valoración de la Fortaleza Actual: </div>
                            <div className='text-data'>{dataApi.fortalezaId !== null ? (dataApi.fortalezaId.campoA +'. '+ dataApi.fortalezaId.nombre) : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>¿Tiene Controles? </div>
                            {dataApi.controlesTiene === true?
                            <div className='text-data'>Si</div>
                            :
                            <div className='text-data'>No</div>
                            }
                          </Col>

                          {dataApi.controlesTiene === false?
                            <Col xs='12' sm='6' md='8' className='pt-2'>
                              <div className='text-label'>Comentario: </div>
                              <div className='text-data'>{dataApi.controlComentario !== '' ? dataApi.controlComentario : <i>Sin registro</i>}</div>
                            </Col>
                          : null }

                          {dataApi.controlesTiene === true?
                            <Col xs='12' className='pt-2'>
                              <BootstrapTable
                                classes= {'table-hover-animation mt-2'}
                                bootstrap4={true}
                                sort={ { dataField: 'nroControl', order: 'asc' } }
                                noDataIndication={'No hay registros de Controles/Fortalezas actuales'}
                                keyField='nroControl'
                                data={JSON.parse(dataApi.controles)}
                                columns={columnsControles}
                                bordered={false}
                                striped={true}
                                hover={false}
                                condensed={false}
                                wrapperClasses="table-responsive"
                              />
                            </Col>
                          : null }
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <div className='divider divider-left divider-dark pt-2'>
                          <div className='divider-text '><span className='text-label'>Planes de acción</span></div>
                        </div>
                        <Row>
                          <Col xs='12'>
                            <BootstrapTable
                              classes= {'table-hover-animation'}
                              bootstrap4={true}
                              sort={ { dataField: 'nroPlan', order: 'asc' } }
                              noDataIndication={'No hay registros de Planes de acción'}
                              keyField='nroPlan'
                              data={JSON.parse(dataApi.planesAccion)}
                              columns={columnsPlanes}
                              bordered={false}
                              striped={true}
                              hover={false}
                              condensed={false}
                              wrapperClasses="table-responsive"
                            />
                          </Col>
                        </Row>

                        <Row className='pt-3'>
                          <Col xs='12' md='6' xl='3'>
                            <CCallout color="info">
                              <div className="text-label">Nro. de Tareas</div>
                              <div className="h4">{JSON.parse(dataApi.planesAccion).length}</div>
                            </CCallout>
                          </Col>

                          <Col xs='12' md='6' xl='3'>
                            <CCallout color="danger">
                              <div className="text-label">No iniciadas</div>
                              <div className="h4">{countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'No iniciado')}</div>
                            </CCallout>
                          </Col>

                          <Col xs='12' md='6' xl='3'>
                            <CCallout color="warning">
                              <div className="text-label">En proceso</div>
                              <div className="h4">{countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'En proceso')}</div>
                            </CCallout>
                          </Col>

                          <Col xs='12' md='6' xl='3'>
                            <CCallout color="success">
                              <div className="text-label">Concluido</div>
                              <div className="h4">{countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido')}</div>
                            </CCallout>
                          </Col>

                          <Col xs='12' md='6' xl='6' className='pt-3'>
                            <div className="progress-group mb-4">
                              <div className="progress-group-header">
                                <Percent size={15} className='mb-1'/>
                                <span className="pl-3 text-label">Avance</span>
                                <span className="ml-auto font-weight-bold">
                                  {resultAvance(JSON.parse(dataApi.planesAccion))} <Percent size={15} className='mb-1'/>
                                </span>
                              </div>
                              <div className="progress-group-bars">
                                <CProgress
                                  className="progress-sm"
                                  color={resultAvance(JSON.parse(dataApi.planesAccion)) <= 32? 'danger' : resultAvance(JSON.parse(dataApi.planesAccion)) <= 66? 'warning' : 'success'}
                                  value={resultAvance(JSON.parse(dataApi.planesAccion))}
                                />
                              </div>
                            </div>
                          </Col>

                          <Col xs='12' md='6' xl='6' className='pt-3'>
                            {countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') === 0 ?
                              <div>
                                <CBadge className='badge-danger-light'><X size={30} className='text-danger'/></CBadge>
                                <span className='text-label pl-4'>Estado</span>
                                <span className='text-danger text-label pl-5'>Sin progreso</span>
                              </div>
                            : null}

                            {(countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') < JSON.parse(dataApi.planesAccion).length &&
                              countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') !== 0) ?
                              <div>
                              <CBadge className='badge-warning-light'><AlertCircle size={30} className='text-warning'/></CBadge>
                              <span className='text-label pl-4'>Estado</span>
                              <span className='text-warning text-label pl-5'>En Proceso</span>
                              </div>
                            : null}

                            {countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') === JSON.parse(dataApi.planesAccion).length && JSON.parse(dataApi.planesAccion).length !==0 ?
                              <div>
                                <CBadge className='badge-success-light'><Check size={30} className='text-success'/></CBadge>
                                <span className='text-label pl-4'>Estado</span>
                                <span className='text-success text-label pl-5'>Concluido</span>
                              </div>
                            : null}
                          </Col>
                        </Row>

                        <div className='divider divider-left divider-dark'>
                          <div className='divider-text '><span className='text-label'>Seguimiento</span></div>
                        </div>
                        <Row>
                          <Col xs='12'>
                            <BootstrapTable
                              classes= {'table-hover-animation'}
                              bootstrap4={true}
                              sort={ { dataField: 'nroPlan', order: 'asc' } }
                              noDataIndication={'No hay registros de Seguimiento de Planes de acción'}
                              keyField='nroPlan'
                              data={JSON.parse(dataApi.planesAccion)}
                              columns={columnsSeguimiento}
                              bordered={false}
                              striped={true}
                              hover={false}
                              condensed={false}
                              wrapperClasses="table-responsive"
                            />
                          </Col>
                        </Row>

                      </CTabPane>

                    </CTabContent>
                  </CTabs>
                  </Col>

                  <Col xs='12'>
                    <CButton
                      color="primary"
                      onClick={toggle}
                      className={'mb-1 text-white'}
                      disabled={(dataApi.estadoRegistro === 'Autorizado' ||  dataApi.estadoRegistro === 'Descartado')? true : false}
                    >Evaluar Riesgo
                    </CButton>
                    <CCollapse show={collapse}>
                      <CCard className='p-3'>
                        <FormularioEvaluar
                          initialValuess={formValueInitial}
                          handleOnSubmit={handleOnSubmit}
                        />
                      </CCard>
                    </CCollapse>
                  </Col>

                </Row>
              </CardBody>
            </Card>
          </div>
          : null
        }
    </div>
  )
}

export default MatrizOportunidad
