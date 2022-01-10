import { React, useState, useEffect } from 'react'
import { FileText, BarChart2, Trello, CheckSquare, PieChart, TrendingUp, Percent, X, AlertCircle, Check } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs, CButton, CCollapse, CCard, CModal, CModalBody, CModalHeader, CModalTitle, CBadge, CCallout, CProgress } from '@coreui/react'
import { getRiesgoId, getUltimaObservacion, putEvaluaRiesgo, getGeneraCodigo } from './controller/RiesgoController';
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';
import FormularioEvaluar from './component/FormularioEvaluar'
import BootstrapTable from 'react-bootstrap-table-next';
import { calculaRiesgo, buscaValorLiteralRiesgoI, buscaValorLiteral, reduceProbabilidadImpacto, countEstadoPlanes, resultAvance, obtieneRiesgoIntervalo, obtieneValorRiesgoIntervalo } from 'src/functions/FunctionsMatriz'
import { buildSelectTwo } from 'src/functions/Function'
import Swal from 'sweetalert2'

var _ = require('lodash');

const MatrizRiesgo = ({ match }) => {

  // Configuracion sweetalert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary px-4',
      cancelButton: 'btn btn-outline-primary px-4 mr-4',
    },
    buttonsStyling: false
  })

  // Genera posible codigo al Autorizar Evento
  const [codigo, setGeneraCodigo] = useState({})
  const getCodigo = async () => {
    const idEvento = match.params.id;
    await getGeneraCodigo(idEvento)
      .then((response) => {
        setGeneraCodigo(response.data)
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }

  useEffect(() => {
    getById();
    getByIdObservacion();
    getCodigo();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columnsControles = [
    {
      dataField: 'nroControl',
      text: 'Control',
    }, {
      dataField: 'descripcion',
      text: 'Descripción',
    }, {
      dataField: 'formalizado',
      text: '¿Formalizado?',
      formatter: valorLiteral,
    }, {
      dataField: 'norma',
      text: 'Norma/procedimiento',
      sort: true,
    }, {
      dataField: 'tipo',
      text: 'Tipo',
      sort: true,
    }, {
      dataField: 'nivel',
      text: 'Nivel Automatización',
      sort: true,
    }
  ]

  function valorLiteral(cell) {
    if (cell === 'true') {
      return (
        <span>Si</span>
      )
    } else {
      return (
        <span>No</span>
      )
    }
  }

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
      dataField: 'comenPropuesta',
      text: 'Comentarios: Tareas Propuestas',
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

  // Obtiene Matriz de riesgo por el ID
  const [dataApi, setDataApi] = useState({})

  const getById = async () => {
    const idRiesgo = match.params.id;
    await getRiesgoId(idRiesgo)
      .then((response) => {
        const res = response.data;
        console.log('Res : ', res);
        setDataApi(res)
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }

  /* CALCULO RIESGOS */
  // Nivel de riesgosinherente Aux
  const [dataApiRiesgoI, setDataApiRiesgoI] = useState([])
  const callApiRiesgoI = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiRiesgoI(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Impacto de riesgo
  const [dataApiImpacto, setDataApiImpacto] = useState([])
  const callApiImpacto = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiImpacto(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiRiesgoI(9);
    callApiProbabilidad(2);
    callApiImpacto(3);
  }, [])

  const probabilidadResidual = () => {
    var probabilidadR = 0;
    var disminucion = dataApi.controlId.campoB;
    if (dataApi.controlObjetivo === 'Ambos' || dataApi.controlObjetivo === 'Probabilidad')
      probabilidadR = reduceProbabilidadImpacto(dataApi.probabilidadId.campoA, parseInt(disminucion));
    else
      probabilidadR = dataApi.probabilidadId.campoA;
    return probabilidadR;
  }

  const valorProbabilidad = () => {
    var valorProb = '';
    if (dataApi.controlObjetivo === 'Ambos' || dataApi.controlObjetivo === 'Probabilidad')
      valorProb = buscaValorLiteral(dataApiProbabilidad, probabilidadResidual())
    else
      valorProb = buscaValorLiteral(dataApiProbabilidad, dataApi.probabilidadId.campoA)
    return valorProb;
  }

  const impactoResidual = () => {
    var impactoR = 0;
    var disminucion = dataApi.controlId.campoB;
    if (dataApi.controlObjetivo === 'Ambos' || dataApi.controlObjetivo === 'Impacto')
      impactoR = reduceProbabilidadImpacto(dataApi.impactoId.campoA, parseInt(disminucion));
    else
      impactoR = dataApi.impactoId.campoA;
    return impactoR;
  }

  const valorImpacto = () => {
    var valorImp = '';
    if (dataApi.controlObjetivo === 'Ambos' || dataApi.controlObjetivo === 'Impacto')
      valorImp = buscaValorLiteral(dataApiImpacto, impactoResidual());
    else
      valorImp = buscaValorLiteral(dataApiImpacto, dataApi.impactoId.campoA);
    return valorImp;
  }

  const riesgo = (prob, imp) => {
    var riesgo = 0;
    riesgo = calculaRiesgo(parseInt(prob), parseInt(imp));
    return riesgo;
  }

  const valorRiesgo = (prob, imp) => {
    var valorRiesgoI = '';
    valorRiesgoI = buscaValorLiteralRiesgoI(dataApiRiesgoI, riesgo(prob, imp));
    return valorRiesgoI;
  }

  const calculaMontoRiesgo = () => {
    return _.find(dataApiProbabilidad, ['campoA', probabilidadResidual() + '']).campoE * dataApi.impactoUSD;
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

  // Evalua Riesgo: Autorizar, Pendiente, Observado y Descartado
  const handleOnSubmit = (dataToRequest) => {
    const idRiesgo = match.params.id

    swalWithBootstrapButtons.fire({
      title: '',
      text: dataToRequest.estadoRegistro === 'Autorizado' ? 'Al autorizar el registro se asignará el siguiente código: ' + codigo + ' ¿Está seguro de generarlo?' :
            dataToRequest.estadoRegistro === 'Observado' ? '¿Está seguro de modificar el estado de registro a Observado?' :
            dataToRequest.estadoRegistro === 'Pendiente' ? '¿Está seguro de modificar el estado de registro a Pendiente?' :
            dataToRequest.estadoRegistro === 'Descartado' ? '¿Está seguro de modificar el estado de registro a Descartado?' : '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      position: 'top',
      closeOnConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {
        putEvaluaRiesgo(idRiesgo, dataToRequest)
          .then(res => {
            swalWithBootstrapButtons.fire({
              title: '',
              text: 'Operación realizada exitósamente',
              icon: 'success',
              position: 'top',
            }).then(okay => {
              if (okay) {
                window.location.reload();
              }
            })
          }).catch((error) => {
            console.log('Error al obtener datos: ', error);
          });

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: '',
          text: 'Operación cancelada',
          icon: 'error',
          position: 'top'
        }).then(okay => {
          if (okay) {
            window.location.reload();
          }
        })
      }
    })
  }
  // FIN Evalua Riesgo: Autorizar, Pendiente, Observado y Descartado

  // Lista las observaciones
  const listaObservaciones = String(dataUltimaObservacion.listaObservacion);
  const dataListaObservaciones = listaObservaciones.split(',');

  return (
    <div className='table-hover-animation'>
      {
        (!_.isEmpty(dataApi)) ?
          <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Matriz de Riesgo</span>
                  {(dataApi.estadoRegistro === 'Autorizado') ?
                    <span className='pr-3 text-primary font-weight-bold'>{dataApi.codigo}</span>
                    : null}

                  {(dataApi.estadoRegistro === 'Autorizado') ?
                    <Badge className="px-4 badge-success-light">{dataApi.estadoRegistro}</Badge>
                    : null}
                  {(dataApi.estadoRegistro === 'Descartado') ?
                    <Badge className="px-4 badge-danger">{dataApi.estadoRegistro}</Badge>
                    : null}
                  {(dataApi.estadoRegistro === 'Pendiente') ?
                    <Badge className="px-4 badge-warning-light">{dataApi.estadoRegistro}</Badge>
                    : null}
                  {(dataApi.estadoRegistro === 'Observado') ?
                    <Badge className="px-4 badge-danger-light">{dataApi.estadoRegistro}</Badge>
                    : null}

                  {(dataApi.estadoRegistro === 'Observado') ?
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
                            <FileText size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Datos</span>
                          </CNavLink>
                        </CNavItem>
                        <CNavItem>
                          <CNavLink>
                            <BarChart2 size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Definición y Riesgo inherente</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <Trello size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Controles</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <TrendingUp size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Riesgo residual</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <CheckSquare size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Planes de Acción y Seguimiento</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <PieChart size={20} /><span className='pl-1 h6 font-weight-bold'>Valoración cuantitativa</span>
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
                              <div className='text-data'>{dataApi.procedimientoId !== null ? dataApi.procedimientoId.campoA : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Criticidad (Precalificación): </div>
                              <div className='text-data'>{dataApi.procesoId !== null ? dataApi.procesoId.descripcion : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Valoración Precalificación: </div>
                              <div className='text-data'>{dataApi.procesoId !== null ? dataApi.procesoId.campoA : <i>Sin registro</i>}</div>
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
                              <div className='text-label'>{dataApi.identificadoId !== null ? 'Identificado por:' : 'Identificado por: (Otro)'} </div>
                              <div className='text-data'>{dataApi.identificadoId !== null ? dataApi.identificadoId.nombre : dataApi.identificadoOtro}</div>
                            </Col>
                          </Row>

                          <hr />

                          <Row>
                            <Col xs='12' sm='6' md='4' className='pt-2'>
                              <div className='text-label'>Evento materializado: </div>
                              {(dataApi.eventoMaterializado === true) ?
                                <div className='text-data'>Si</div>
                                :
                                <div className='text-data'>No</div>
                              }
                            </Col>

                            <Col xs='12' sm='6' md='4' className='pt-2'>
                              <div className='text-label'>Código de Evento de riesgo: </div>
                              <div className='text-data'>{dataApi.eventoRiesgoId !== null ? dataApi.eventoRiesgoId.codigo : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' className='pt-2'>
                              <div className='text-label'>Fecha descubrimiento del Evento: </div>
                              <div className='text-data'>{dataApi.eventoRiesgoId !== null ? dataApi.eventoRiesgoId.fechaDesc : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' className='pt-2'>
                              <div className='text-label'>Descripción resumida del Evento: </div>
                              <div className='text-data'>{dataApi.eventoRiesgoId !== null ? dataApi.eventoRiesgoId.descripcion : <i>Sin registro</i>}</div>
                            </Col>

                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <div className='divider divider-left divider-dark pt-3'>
                            <div className='divider-text '><span className='text-label'>Definición del Riesgo</span></div>
                          </div>
                          <Row>
                            <Col xs='12' md='12' className='pt-1'>
                              <div className='text-label'>1 Definición del Riesgo ¿Qué Riesgos indentifica en su proceso o qué podría salir mal? RIESGO DE (contextualizar qué podría pasar)</div>
                              <div className='text-data'>{dataApi.definicion !== null ? dataApi.definicion : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='12' className='pt-3'>
                              <div className='text-label'>2 Causa del Riesgo o debilidad ¿Cuál es la causa para que ocurra el riesgo? DEBIDO A (causa por la que ocurriría)</div>
                              <div className='text-data'>{dataApi.causa !== null ? dataApi.causa : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='12' className='pt-3'>
                              <div className='text-label'>3 Consecuencia si es que pasa el Riesgo ¿Qué consecuencias o qué pasaría si ocurre el riesgo? PUEDE OCASIONAR (consecuencia)</div>
                              <div className='text-data'>{dataApi.consecuencia !== null ? dataApi.consecuencia : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='12' className='pt-3'>
                              <div className='text-label'>Definición del Riesgo (Riesgo por (EVENTO), debido a (CAUSA), puede ocasionar (IMPACTO))</div>
                              <div className='text-data'>{dataApi.defConcatenado !== null ? dataApi.defConcatenado : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>{dataApi.efectoPerdidaId !== null ? 'Tipo de Pérdida' : 'Tipo de Pérdida (Otro)'} </div>
                              <div className='text-data'>{dataApi.efectoPerdidaId !== null ? dataApi.efectoPerdidaId.nombre : dataApi.efectoPerdidaOtro}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Efecto - Impacto ASFI: </div>
                              <div className='text-data'>{dataApi.perdidaAsfiId !== null ? dataApi.perdidaAsfiId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monetario / No monetario: </div>
                              {(dataApi.monetario === true) ?
                                <div className='text-data'>Si</div>
                                :
                                <div className='text-data'>No</div>
                              }
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Clasificación Factores de Riesgo: </div>
                              <div className='text-data'>{dataApi.factorRiesgoId !== null ? dataApi.factorRiesgoId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                          </Row>
                          <div className='divider divider-left divider-dark'>
                            <div className='divider-text '><span className='text-label'>Riesgo inherente</span></div>
                          </div>
                          <Row>
                            <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                              <div className='text-label'>Probabilidad - Cuán probable es que el riesgo ocurra: </div>
                              <div className='text-data'>{dataApi.probabilidadId.campoD}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Probabilidad (Inherente): </div>
                              <div className='text-data'>{dataApi.probabilidadId.campoA}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='2' className='pt-2'>
                              <div className='text-label'>% de Ocurrencia: </div>
                              <div className='text-data'>{dataApi.probabilidadId.campoG}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Valoración - Probabilidad (Inherente): </div>
                              <div className='text-data'>{dataApi.probabilidadId.nombre}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                              <div className='text-label'>Impacto - Monetario o no monerario: </div>
                              <div className='text-data'>{dataApi.impactoId.campoD}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Impacto (Inherente): </div>
                              <div className='text-data'>{dataApi.impactoId.campoA}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='2' className='pt-2'>
                              <div className='text-label'>% de Impacto: </div>
                              <div className='text-data'>{dataApi.impactoId.campoG}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Valoración - Impacto (Inherente): </div>
                              <div className='text-data'>{dataApi.impactoId.nombre}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='4' className='pt-2'>
                              <div className='text-label'>Riesgo (Inherente): </div>
                              <div className='text-data'>
                                {riesgo(dataApi.probabilidadId.campoA, dataApi.impactoId.campoA)}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Valoración Riesgo (Inherente): </div>
                              <div className='text-data'>
                                {valorRiesgo(dataApi.probabilidadId.campoA, dataApi.impactoId.campoA)}
                              </div>
                            </Col>
                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' md='3' className='pt-2'>
                              <div className='text-label'>Ponderación Control: </div>
                              <div className='text-data'>{dataApi.controlId !== null ? dataApi.controlId.campoA : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='9' className='pt-2'>
                              <div className='text-label'>Valoración de Control: </div>
                              <div className='text-data'>{dataApi.controlId !== null ? dataApi.controlId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>% Disminución del control: </div>
                              <div className='text-data'>{dataApi.controlId !== null ? dataApi.controlId.campoB : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Objetivo Control: </div>
                              <div className='text-data'>{dataApi.controlObjetivo !== null ? dataApi.controlObjetivo : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>¿Tiene Controles? </div>
                              {dataApi.controlesTiene === true ?
                                <div className='text-data'>Si</div>
                                :
                                <div className='text-data'>No</div>
                              }
                            </Col>

                            {dataApi.controlesTiene === false ?
                              <Col xs='12' sm='6' md='8' className='pt-2'>
                                <div className='text-label'>Comentario </div>
                                <div className='text-data'>{dataApi.controlComentario !== '' ? dataApi.controlComentario : <i>Sin registro</i>}</div>
                              </Col>
                              : null}

                            {dataApi.controlesTiene === true ?
                              <Col xs='12' className='pt-2'>
                                <BootstrapTable
                                  classes={'table-hover-animation mt-2'}
                                  bootstrap4={true}
                                  sort={{ dataField: 'nroControl', order: 'asc' }}
                                  noDataIndication={'No hay registros de Controles actuales'}
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
                              : null}

                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Probabilidad (Residual): </div>
                              <div className='text-data'>{probabilidadResidual()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Valoración - Probabilidad (Residual): </div>
                              <div className='text-data'>{valorProbabilidad()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Impacto (Residual): </div>
                              <div className='text-data'>{impactoResidual()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Valoración - Impacto (Residual): </div>
                              <div className='text-data'>{valorImpacto()}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Riesgo (Residual): </div>
                              <div className='text-data'>
                                {riesgo(probabilidadResidual(), impactoResidual())}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Valoración Riesgo (Residual): </div>
                              <div className='text-data'>
                                {valorRiesgo(probabilidadResidual(), impactoResidual())}
                              </div>
                            </Col>
                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <div className='divider divider-left divider-dark pt-2'>
                            <div className='divider-text '><span className='text-label'>Planes de acción</span></div>
                          </div>
                          <Row>
                            <Col xs='12'>
                              <BootstrapTable
                                classes={'table-hover-animation'}
                                bootstrap4={true}
                                sort={{ dataField: 'nroPlan', order: 'asc' }}
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
                                  <Percent size={15} className='mb-1' />
                                  <span className="pl-3 text-label">Avance</span>
                                  <span className="ml-auto font-weight-bold">
                                    {resultAvance(JSON.parse(dataApi.planesAccion))} <Percent size={15} className='mb-1' />
                                  </span>
                                </div>
                                <div className="progress-group-bars">
                                  <CProgress
                                    className="progress-sm"
                                    color={resultAvance(JSON.parse(dataApi.planesAccion)) <= 32 ? 'danger' : resultAvance(JSON.parse(dataApi.planesAccion)) <= 66 ? 'warning' : 'success'}
                                    value={resultAvance(JSON.parse(dataApi.planesAccion))}
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col xs='12' md='6' xl='6' className='pt-3'>
                              {countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') === 0 ?
                                <div>
                                  <CBadge className='badge-danger-light'><X size={30} className='text-danger' /></CBadge>
                                  <span className='text-label pl-4'>Estado</span>
                                  <span className='text-danger text-label pl-5'>Sin progreso</span>
                                </div>
                                : null}

                              {(countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') < JSON.parse(dataApi.planesAccion).length &&
                                countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') !== 0) ?
                                <div>
                                  <CBadge className='badge-warning-light'><AlertCircle size={30} className='text-warning' /></CBadge>
                                  <span className='text-label pl-4'>Estado</span>
                                  <span className='text-warning text-label pl-5'>En Proceso</span>
                                </div>
                                : null}

                              {countEstadoPlanes(JSON.parse(dataApi.planesAccion), 'Concluido') === JSON.parse(dataApi.planesAccion).length && JSON.parse(dataApi.planesAccion).length !== 0 ?
                                <div>
                                  <CBadge className='badge-success-light'><Check size={30} className='text-success' /></CBadge>
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
                                classes={'table-hover-animation'}
                                bootstrap4={true}
                                sort={{ dataField: 'nroPlan', order: 'asc' }}
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

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Tipo de Pérdida: </div>
                              <div className='text-data'>{dataApi.efectoPerdidaId !== null ? dataApi.efectoPerdidaId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Efecto - Impacto ASFI: </div>
                              <div className='text-data'>{dataApi.perdidaAsfiId !== null ? dataApi.perdidaAsfiId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Criterio para la valoración de Impacto: </div>
                              <div className='text-data'>{dataApi.criterioImpacto !== null ? dataApi.criterioImpacto : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Criterio de cálculo Probabilidad: </div>
                              <div className='text-data'>{dataApi.criterioprobabilidad !== null ? dataApi.criterioprobabilidad : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Numero dias (veces) en relación a un año Probabilidad: </div>
                              <div className='text-data'>
                                {_.find(dataApiProbabilidad, ['campoA', probabilidadResidual() + '']).campoD}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Probabilidad: </div>
                              <div className='text-data'>{probabilidadResidual()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Valoración - Probabilidad: </div>
                              <div className='text-data'>{valorProbabilidad()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' className='pt-2'>
                              <div className='text-label'>Veces al año - Probabilidad: </div>
                              <div className='text-data'>
                                {_.find(dataApiProbabilidad, ['campoA', probabilidadResidual() + '']).campoE}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Impacto por cada vez que ocurre el evento (USD): </div>
                              <div className='text-data'>{dataApi.impactoUSD !== null ? dataApi.impactoUSD : 0}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Impacto: </div>
                              <div className='text-data'>{impactoResidual()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Valoración - Impacto: </div>
                              <div className='text-data'>{valorImpacto()}</div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Monto Riesgo de Pérdida (Anual): </div>
                              <div className='text-data'>
                                {calculaMontoRiesgo()}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Valoración Riesgo (Matriz de Riesgo): </div>
                              <div className='text-data'>
                                {obtieneValorRiesgoIntervalo(dataApiImpacto, calculaMontoRiesgo())}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='6' xl='4' className='pt-2'>
                              <div className='text-label'>Riesgo (Matriz de Riesgo): </div>
                              <div className='text-data'>
                                {obtieneRiesgoIntervalo(dataApiImpacto, calculaMontoRiesgo())}
                              </div>
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
                      disabled={(dataApi.estadoRegistro === 'Autorizado' || dataApi.estadoRegistro === 'Descartado') ? true : false}
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

export default MatrizRiesgo
