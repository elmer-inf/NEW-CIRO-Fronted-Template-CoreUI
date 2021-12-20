import { React, useState, useEffect } from 'react'
import { FileText, Activity, DollarSign, BarChart2 } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, ListGroup, ListGroupItem} from 'reactstrap';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs, CButton, CCollapse, CCard, CModal, CModalBody, CModalHeader, CModalTitle} from '@coreui/react'
import { getEventoRiesgoId, getUltimaObservacion, putEvaluaEvento } from './controller/EventoController';
import FormularioEvaluar from './component/FormularioEvaluar'
var _ = require('lodash');

const EventoRiesgo = ({ match }) => {
  // Obtiene Evento de riesgo por el ID
  const [dataApi, setDataApi] = useState({})

  useEffect(() => {
    getById();
    getByIdObservacion();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getById = async () => {
    const idEvento = match.params.id;
    await getEventoRiesgoId(idEvento)
    .then((response) => {
      const res = response.data;
      //console.log('Res : ', res);
      setDataApi(res)
    }).catch((error) => {
      console.log("Error: ", error);
      //notificationToast('error', Messages.notification.notOk)
    });
  }

  // Obtiene la ultima observacion del evento
  const [dataUltimaObservacion, setDataUltimaObs] = useState({})

  const getByIdObservacion = async () => {
    const idEvento = match.params.id;
    await getUltimaObservacion(idEvento)
    .then((response) => {
      const res = response.data;
      console.log('Datos ultima observacion : ', res);
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
    const idEvento = match.params.id
    //console.log('ID evento para evaluar: ', idEvento)
    //console.log('data antes de enviar: ', dataToRequest)
    putEvaluaEvento(idEvento, dataToRequest)
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
    <div>
      {
        (!_.isEmpty(dataApi))?
          <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Evento de Riesgo</span>
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
                    {/* <CModalFooter> */}
                    {/* </CModalFooter> */}
                  </CModal>

                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <span className='font-weight-bold'>Tipo de Evento: </span>
                    <span className='pl-4'>{dataApi.tipoEvento}</span>
                  </Col>
                </Row>

                <Row>
                  <Col xs="12" className="mb-4">
                  <CTabs>
                    <CNav variant="tabs" className='justify-content-center'>
                      <CNavItem>
                        <CNavLink>
                          <FileText size={25}/><span className='pl-2 pr-3'>Datos iniciales</span>
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink>
                          <BarChart2 size={25}/><span className='pl-2 pr-3'>Categoria y Línea de negocio</span>
                        </CNavLink>
                      </CNavItem>

                      {(dataApi.tipoEvento === 'A')?
                        <CNavItem>
                          <CNavLink>
                            <DollarSign size={25}/><span className='pl-2 pr-3'>Importes relacionados</span>
                          </CNavLink>
                        </CNavItem>
                      :null}

                      <CNavItem>
                        <CNavLink>
                          <Activity size={25}/><span className='pl-2'>Riesgos relacionados</span>
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Fecha Inicio: </div>
                            <div className='text-data'>{dataApi.fechaIni !== null ? dataApi.fechaIni : <i>Sin registro</i>}</div>
                          </Col>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Hora Inicio: </div>
                            <div className='text-data'>{dataApi.horaIni !== null ? dataApi.horaIni : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Fecha descubrimiento: </div>
                            <div className='text-data'>{dataApi.fechaDesc !== null ? dataApi.fechaDesc : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Hora descubrimiento: </div>
                            <div className='text-data'>{dataApi.horaDesc !== null ? dataApi.horaDesc : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Agencia: </div>
                            <div className='text-data'>{dataApi.agenciaId !== null ? dataApi.agenciaId.nombre : <i>Sin registro</i>}</div>
                          </Col> 

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Ciudad: </div>
                            <div className='text-data'>{dataApi.ciudadId !== null ? dataApi.ciudadId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Área: </div>
                            <div className='text-data'>{dataApi.areaID !== null ? dataApi.areaID.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Unidad: </div>
                            <div className='text-data'>{dataApi.unidadId !== null ? dataApi.unidadId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Comercio afectado: </div>
                            {(dataApi.comercioAfectado === true)?
                            <div className='text-data'>Si</div>
                            :
                            <div className='text-data'>No</div>
                            }
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Entidad afectada: </div>
                            {(dataApi.entidadAfectada === true)?
                            <div className='text-data'>Si</div>
                            :
                            <div className='text-data'>No</div>
                            }
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Entidad: </div>
                            <div className='text-data'>{dataApi.entidadId !== null ? dataApi.entidadId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Cargo persona afectada ASFI: </div>
                            <div className='text-data'>{dataApi.cargoId !== null ? dataApi.cargoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Estado: </div>
                            <div className='text-data'>{dataApi.estadoReportado !== null ? dataApi.estadoReportado.nombre : <i>Sin registro</i>}</div>
                          </Col> 

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Fuente de información: </div>
                            <div className='text-data'>{dataApi.fuenteInfId !== null ? dataApi.fuenteInfId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Canales ASFI: </div>
                            <div className='text-data'>{dataApi.canalAsfiId !== null ? dataApi.canalAsfiId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='6' className='pt-2'>
                            <div className='text-label'>Descripción: </div>
                            <div className='text-data'>{dataApi.descripcion !== null ? dataApi.descripcion : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='6' className='pt-2'>
                            <div className='text-label'>Descripción completa: </div>
                            <div className='text-data'>{dataApi.descripcionCompleta !== null ? dataApi.descripcionCompleta : <i>Sin registro</i>}</div>
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Código inicial: </div>
                            <div className='text-data'>{dataApi.codigoInicial !== null ? dataApi.codigoInicial : <i>Sin registro</i>}</div>
                          </Col>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Sub categorización: </div>
                            <div className='text-data'>{dataApi.subcategorizacionId !== null ? dataApi.subcategorizacionId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Trimestre: </div>
                            <div className='text-data'>{dataApi.trimestre !== null ? dataApi.trimestre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Tipo de evento de pérdida: </div>
                            <div className='text-data'>{dataApi.tipoEventoPerdidaId !== null ? dataApi.tipoEventoPerdidaId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Sub evento - Basilea: </div>
                            <div className='text-data'>{dataApi.subEventoId !== null ? dataApi.subEventoId.nombre : <i>Sin registro</i>}</div>
                          </Col> 

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Clase evento - Basilea - ASFI: </div>
                            <div className='text-data'>{dataApi.claseEventoId !== null ? dataApi.claseEventoId.nombre : <i>Sin registro</i>}</div>
                          </Col>
                          {dataApi.otros !== null ?
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Otros (Clase evento - Basilea - ASFI): </div>
                              <div className='text-data'>{dataApi.otros}</div>
                            </Col>
                          : null}

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Detalle evento crítico: </div>
                            <div className='text-data'>{dataApi.detalleEventoCritico !== null ? dataApi.detalleEventoCritico : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Factor de riesgo operativo: </div>
                            <div className='text-data'>{dataApi.factorRiesgoId !== null ? dataApi.factorRiesgoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Proceso: </div>
                            <div className='text-data'>{dataApi.procesoId !== null ? dataApi.procesoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Procedimiento: </div>
                            <div className='text-data'>{dataApi.procedimientoId !== null ? dataApi.procedimientoId.descripcion : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Evento crítico ASFI: </div>
                            <div className='text-data'>{dataApi.eventoCritico !== null ? dataApi.eventoCritico : <i>Sin registro</i>}</div>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Línea de negocio: </div>
                            <div className='text-data'>{dataApi.lineaNegocio !== null ? dataApi.lineaNegocio : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Línea de negocio ASFI: </div>
                            <div className='text-data'>{dataApi.lineaAsfiId !== null ? dataApi.lineaAsfiId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Efectos de pérdida: </div>
                            <div className='text-data'>{dataApi.efectoPerdidaId !== null ? dataApi.efectoPerdidaId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Riesgo relacionado: </div>
                            <div className='text-data'>{dataApi.riesgoRelacionado !== null ? dataApi.riesgoRelacionado : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Operación, producto o servicio afectado: </div>
                            <div className='text-data'>{dataApi.opeProSerId !== null ? dataApi.opeProSerId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Tipo de servicio: </div>
                            <div className='text-data'>{dataApi.tipoServicioId !== null ? dataApi.tipoServicioId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Descripción de servicio: </div>
                            <div className='text-data'>{dataApi.descServicioId !== null ? dataApi.descServicioId.nombre : <i>Sin registro</i>}</div>
                          </Col>


                          <Col xs='12' md='6' className='pt-2'>
                            <div className='text-label'>Operaciones ASFI: </div>
                            <div className='text-data'>{dataApi.operacionId !== null ? dataApi.operacionId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' md='6' className='pt-2'>
                            <div className='text-label'>Detalle estado del evento: </div>
                            <div className='text-data'>{dataApi.detalleEstado !== null ? dataApi.detalleEstado : <i>Sin registro</i>}</div>
                          </Col>
                        </Row>
                      </CTabPane>

                      {dataApi.tipoEvento === 'A'?
                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Tasa de cambio: </div>
                              <div className='text-data'>{dataApi.tasaCambioId !== null ? dataApi.tasaCambioId : <i>Sin registro</i>}</div>
                            </Col>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Moneda: </div>
                              <div className='text-data'>{dataApi.monedaId !== null ? dataApi.monedaId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monto de pérdida: </div>
                              <div className='text-data'>{dataApi.montoPerdida !== null ? dataApi.montoPerdida : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monto de pérdida por riesgo operativo (USD): </div>
                              <div className='text-data'>{dataApi.montoPerdidaRiesgo !== null ? dataApi.montoPerdidaRiesgo : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Gastos asociados: </div>
                              <div className='text-data'>{dataApi.gastoAsociado !== null ? dataApi.gastoAsociado : <i>Sin registro</i>}</div>
                            </Col> 

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monto recuperado: </div>
                              <div className='text-data'>{dataApi.montoRecuperado !== null ? dataApi.montoRecuperado : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Impacto: </div>
                              <div className='text-data'>{dataApi.impactoId !== null ? dataApi.impactoId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Cobertura seguro: </div>
                              {(dataApi.coberturaSeguro === true)?
                              <div className='text-data'>Si</div>
                              :
                              <div className='text-data'>No</div>
                              }
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Póliza de seguro: </div>
                              <div className='text-data'>{dataApi.polizaSeguroId !== null ? dataApi.polizaSeguroId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monto recuperado del seguro: </div>
                              <div className='text-data'>{dataApi.montoRecuperadoSeguro !== null ? dataApi.montoRecuperadoSeguro : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Recuperación activo: </div>
                              <div className='text-data'>{dataApi.recuperacionActivo !== null ? dataApi.recuperacionActivo : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Pérdida de valor de mercado: </div>
                              <div className='text-data'>{dataApi.perdidaMercado !== null ? dataApi.perdidaMercado : <i>Sin registro</i>}</div>
                            </Col> 

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Monto total de pérdida: </div>
                              <div className='text-data'>{dataApi.totalPerdida !== null ? dataApi.totalPerdida : <i>Sin registro</i>}</div>
                            </Col>
                          </Row>
                        </CTabPane>
                      : null }

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Operativo: </div>
                            <div className='text-data'>{dataApi.operativoId !== null ? dataApi.operativoId.nombre : <i>Sin registro</i>}</div>
                          </Col>
                          {/* <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Seguridad de la información: </div>
                            <div className='text-data'>{dataApi.seguridadId !== null ? dataApi.seguridadId.nombre : <i>Sin registro</i>}</div>
                          </Col> */}

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Liquidez y mercado: </div>
                            <div className='text-data'>{dataApi.liquidezId !== null ? dataApi.liquidezId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          {/* <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>LGI FT y/o DP: </div>
                            <div className='text-data'>{dataApi.lgiId !== null ? dataApi.lgiId.nombre : <i>Sin registro</i>}</div>
                          </Col> */}

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Fraude con medios de pago electrónico: </div>
                            <div className='text-data'>{dataApi.fraudeId !== null ? dataApi.fraudeId.nombre : <i>Sin registro</i>}</div>
                          </Col> 

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Legal y regulatorio: </div>
                            <div className='text-data'>{dataApi.legalId !== null ? dataApi.legalId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Reputacional: </div>
                            <div className='text-data'>{dataApi.reputacionalId !== null ? dataApi.reputacionalId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Cumplimiento: </div>
                            <div className='text-data'>{dataApi.cumplimientoId !== null ? dataApi.cumplimientoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Estratégico: </div>
                            <div className='text-data'>{dataApi.estrategicoId !== null ? dataApi.estrategicoId.nombre : <i>Sin registro</i>}</div>
                          </Col>

                          <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                            <div className='text-label'>Gobierno corporativo: </div>
                            <div className='text-data'>{dataApi.gobiernoId !== null ? dataApi.gobiernoId.nombre : <i>Sin registro</i>}</div>
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
                    >Evaluar Evento
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

export default EventoRiesgo
