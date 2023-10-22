import { React, useState, useEffect } from 'react'
import { FileText, Activity, DollarSign, BarChart2, CheckSquare } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs, CButton, CCollapse, CCard, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { getEventoRiesgoId, getUltimaObservacion, putEvaluaEvento, getGeneraCodigo, getArchivosByEvento } from './controller/EventoController';
import FormularioEvaluar from './component/FormularioEvaluar'
import { formatSizeUnits, formatDate } from 'src/functions/FunctionEvento'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react';

var _ = require('lodash');

const EventoRiesgo = ({ match }) => {

  const [dataArchivos, setDataArchivo] = useState([]);

  // Configuracion sweetalert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary px-4',
      cancelButton: 'btn btn-outline-primary px-4 mr-4',
    },
    buttonsStyling: false
  })

  const getArchivos = (idEvento) => {
    getArchivosByEvento(idEvento)
      .then(res => {
        setDataArchivo(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Genera posible codigo al Autorizar Evento
  const [codigo, setGeneraCodigo] = useState({})
  const getCodigo = async () => {
    const idEvento = match.params.id;
    await getGeneraCodigo(idEvento)
      .then((response) => {
        setGeneraCodigo(response.data)
      }).catch((error) => {
        console.error("Error: ", error);
      });
  }

  useEffect(() => {
    getById();
    getByIdObservacion();
    getCodigo();
    getArchivos(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obtiene Evento de riesgo por el ID
  const [dataApi, setDataApi] = useState({})

  const getById = async () => {
    const idEvento = match.params.id;
    await getEventoRiesgoId(idEvento)
      .then((response) => {
        const res = response.data;
        setDataApi(res)
      }).catch((error) => {
        console.error("Error: ", error);
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
        setDataUltimaObs(res)
      }).catch((error) => {
        console.error("Error: ", error);
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

  const formValueInitial = {
    estadoRegistro: dataApi.estadoRegistro,
    listaObservacion: '',
    nota: '',
    estado: '',
    modulo: ''
  }

  // Evalua Evento: Autorizar, Pendiente, Observado y Descartado
  const handleOnSubmit = (dataToRequest) => {
    const idEvento = match.params.id;

    swalWithBootstrapButtons.fire({
      title: '',
      text: dataToRequest.estadoRegistro === 'Autorizado' ? 'Al autorizar el registro se asignará el siguiente código para ASFI: ' + codigo + ' ¿Está seguro de generarlo?' :
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
        putEvaluaEvento(idEvento, dataToRequest)
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
            console.error('Error al obtener datos: ', error);
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
  // FIN Evalua Evento: Autorizar, Pendiente, Observado y Descartado

  // Lista las observaciones
  const listaObservaciones = String(dataUltimaObservacion.listaObservacion);
  const dataListaObservaciones = listaObservaciones.split(',');

  // Calcula "Monto de perdida" en bs en "Valor contable - monto perdida"
  const calculaCambio = () => {
    var result = 0;
    if (dataApi.monedaId !== null && (dataApi.monedaId.clave === 'BOB' || dataApi.monedaId.clave === 'Bs')) {
      result = dataApi.montoPerdida;
    } else {
      if (dataApi.monedaId !== null && (dataApi.monedaId.clave === 'USD' || dataApi.monedaId.clave === '$')) {
        result = dataApi.montoPerdida * dataApi.tasaCambioId;
      } else {
        result = 0;
      }
    }
    return result;
  }

  // Calcula Monto total recuperado
  const totalRecuperado = () => {
    return dataApi.montoRecuperado + dataApi.gastoAsociado + dataApi.montoRecuperadoSeguro;
  }

  // Lista Matriz de riesgos relacionados
  const renderRiesgoRelacionado = (list) => {
    var build = list.map((item) => {
      return (
        <li>{item.codigo}</li>
      )
    })
    return build
  }

  function base64toPDF(data) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    var data2 = window.URL.createObjectURL(blobStore);
    var pdfWindow = window.open();
    var link = document.createElement('a');
    document.body.appendChild(link);
    pdfWindow.location.href = data2;
    link.click();
    window.URL.revokeObjectURL(data2);
    link.remove();
  }

  function base64ToArrayBuffer(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

  return (
    <div>
      {
        (!_.isEmpty(dataApi))
          ? <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Evento de Riesgo</span>
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
                <span className='float-right'>
                  {(dataApi.estadoEvento === 'Solución') ?
                    <Badge className='mt-2 py-2 px-3 h6 font-weight-bold badge-success'>{dataApi.estadoEvento}</Badge>
                    : null}

                  {(dataApi.estadoEvento === 'Seguimiento') ?
                    <Badge className="mt-2 py-2 px-3 h6 font-weight-bold badge-warning">{dataApi.estadoEvento}</Badge>
                    : null}
                </span>
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
                            <FileText size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Datos iniciales</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <CheckSquare size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Planes de acción</span>
                          </CNavLink>
                        </CNavItem>

                        <CNavItem>
                          <CNavLink>
                            <BarChart2 size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Categoria y Línea de negocio</span>
                          </CNavLink>
                        </CNavItem>

                        {(dataApi.tipoEvento === 'A') ?
                          <CNavItem>
                            <CNavLink>
                              <DollarSign size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Importes relacionados</span>
                            </CNavLink>
                          </CNavItem>
                          : null}

                        <CNavItem>
                          <CNavLink>
                            <Activity size={20} /><span className='pl-1 h6 font-weight-bold'>Riesgos relacionados</span>
                          </CNavLink>
                        </CNavItem>
                      </CNav>
                      <CTabContent>
                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Fecha inicio: </div>
                              <div className='text-data'>{dataApi.fechaIni !== null ? dataApi.fechaIni : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Hora inicio: </div>
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
                              <div className='text-label'>Fecha fin: </div>
                              <div className='text-data'>{dataApi.fechaFin !== null ? dataApi.fechaFin : <i>Sin registro</i>}</div>
                            </Col>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Hora fin: </div>
                              <div className='text-data'>{dataApi.horaFin !== null ? dataApi.horaFin : <i>Sin registro</i>}</div>
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
                              {(dataApi.comercioAfectado === true) ?
                                <div className='text-data'>Si</div>
                                :
                                <div className='text-data'>No</div>
                              }
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Entidad afectada: </div>
                              {(dataApi.entidadAfectada === true) ?
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
                              <div className='text-data'>{dataApi.estadoReportado !== null ? dataApi.estadoReportado : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Fuente de información: </div>
                              <div className='text-data'>{dataApi.fuenteInfId !== null ? dataApi.fuenteInfId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Canales ASFI: </div>
                              <div className='text-data'>{dataApi.canalAsfiId !== null ? dataApi.canalAsfiId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' className='pt-2'>
                              <div className='text-label'>Descripción: </div>
                              <div className='text-data'>{dataApi.descripcion !== '' ? dataApi.descripcion : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' className='pt-2'>
                              <div className='text-label'>Descripción completa: </div>
                              <div className='text-data'>{dataApi.descripcionCompleta !== '' ? dataApi.descripcionCompleta : <i>Sin registro</i>}</div>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs='12' md='6' className='pt-2'>
                              <div className='text-label'>Archivo(s) adjunto(s): </div>
                              {(dataArchivos !== null && !_.isEmpty(dataArchivos)) ?
                                <Table responsive size="sm" borderless="false" className='mt-2'>
                                  <thead>
                                    <tr>
                                      <th className='pl-3'>Nombre</th>
                                      <th>Tamaño</th>
                                      <th>Fecha registro</th>
                                      <th>Archivo</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dataArchivos.map((archivo) => {
                                      return (
                                        <tr key={archivo.id}>
                                          <td className='pl-3'>{archivo.nombreArchivo}</td>
                                          <td>{formatSizeUnits(archivo.size)}</td>
                                          <td>{formatDate(archivo.updated)}</td>
                                          <td>
                                            <CButton onClick={() => base64toPDF(archivo.archivoBase64)}>
                                              <CIcon
                                                className="mb-2"
                                                src="/icon/pdf.png"
                                                height={30}
                                              />
                                            </CButton>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </Table>
                                : <i>Sin Archivos</i>}
                            </Col>
                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' className='pt-2'>
                              <div className='text-label'>Gerencia responsable: </div>
                              <div className='text-data'>{dataApi.areaResponsableId !== null ? dataApi.areaResponsableId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' className='pt-2'>
                              <div className='text-label'>Cargo responsable: </div>
                              <div className='text-data'>{dataApi.cargoResponsableId !== null ? dataApi.cargoResponsableId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='12' className='pt-2'>
                              <div className='text-label'>Detalle del plan: </div>
                              <div className='text-data'>{dataApi.detallePlan !== '' ? dataApi.detallePlan : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' className='pt-2'>
                              <div className='text-label'>Fecha fin del plan: </div>
                              <div className='text-data'>{dataApi.fechaFinPlan !== null ? dataApi.fechaFinPlan : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' className='pt-2'>
                              <div className='text-label'>Estado: </div>
                              <div className='text-data'>{dataApi.estadoPlan !== null ? dataApi.estadoPlan : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='6' className='pt-2'>
                              <div className='text-label'>Descripción del estado: </div>
                              <div className='text-data'>{dataApi.descripcionEstado !== '' ? dataApi.descripcionEstado : <i>Sin registro</i>}</div>
                            </Col>
                          </Row>
                        </CTabPane>

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='4' xl='6' className='pt-2'>
                              <div className='text-label'>Código inicial: </div>
                              <div className='text-data'>{dataApi.codigoInicial !== '' || dataApi.codigoInicial !== null ? dataApi.codigoInicial : <i>Sin registro</i>}</div>
                            </Col>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Sub categorización: </div>
                              <div className='text-data'>{dataApi.subcategorizacionId !== null ? dataApi.subcategorizacionId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Trimestre: </div>
                              <div className='text-data'>{dataApi.trimestre !== '' ? dataApi.trimestre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Tipo de evento de pérdida: </div>
                              <div className='text-data'>{dataApi.tipoEventoPerdidaId !== null ? dataApi.tipoEventoPerdidaId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Sub evento - Basilea: </div>
                              <div className='text-data'>{dataApi.subEventoId !== null ? dataApi.subEventoId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='6' className='pt-2'>
                              <div className='text-label'>Clase evento - Basilea - ASFI: </div>
                              <div className='text-data'>
                                {(dataApi.claseEventoId !== null && dataApi.claseEventoId.nombre !== 'Otros') ?
                                  dataApi.claseEventoId.nombre : (dataApi.claseEventoId !== null && dataApi.claseEventoId.nombre === 'Otros') ?
                                    <span className='text-label'>{dataApi.claseEventoId.nombre}</span> : null}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='6' className='pt-2'>
                              <div className='text-label'>Detalle evento crítico: </div>
                              <div className='text-data'>{dataApi.detalleEventoCritico !== '' ? dataApi.detalleEventoCritico : <i>Sin registro</i>}</div>
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

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Riesgo(s) relacionado(s): </div>
                              <div className='text-data'>
                                {(dataApi.riesgoRelacionado !== null && !_.isEmpty(dataApi.riesgoRelacionado)) ? renderRiesgoRelacionado(dataApi.riesgoRelacionado) : <i>Sin registro</i>}
                              </div>
                            </Col>

                          </Row>
                          <hr />
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

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Proceso crítico ASFI: </div>
                              <div className='text-data'>{dataApi.procesoCriticoAsfi !== null ? dataApi.procesoCriticoAsfi : <i>Sin registro</i>}</div>
                            </Col>


                            <Col xs='12' md='6' className='pt-2'>
                              <div className='text-label'>Operaciones ASFI: </div>
                              <div className='text-data'>{dataApi.operacionId !== null ? dataApi.operacionId.nombre : <i>Sin registro</i>}</div>
                            </Col>

                            <Col xs='12' md='6' className='pt-2'>
                              <div className='text-label'>Detalle estado del evento: </div>
                              <div className='text-data'>{dataApi.detalleEstado !== '' ? dataApi.detalleEstado : <i>Sin registro</i>}</div>
                            </Col>
                          </Row>
                        </CTabPane>

                        {dataApi.tipoEvento === 'A' ?
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
                                <div className='text-data'>{dataApi.montoPerdida !== null ? _.round(dataApi.montoPerdida, 2) : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Valor contable - Monto de pérdida (BOB){/* Monto de pérdida por riesgo operativo (USD) */}: </div>
                                <div className='text-data'>
                                  {_.round(calculaCambio(), 2)}
                                </div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Gastos asociados: </div>
                                <div className='text-data'>{dataApi.gastoAsociado !== null ? _.round(dataApi.gastoAsociado, 2) : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Monto recuperado: </div>
                                <div className='text-data'>{dataApi.montoRecuperado !== null ? _.round(dataApi.montoRecuperado, 2) : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Impacto: </div>
                                <div className='text-data'>{dataApi.impactoId !== null ? dataApi.impactoId.nombre : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Cobertura seguro: </div>
                                {(dataApi.coberturaSeguro === true) ?
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
                                <div className='text-data'>{dataApi.montoRecuperadoSeguro !== null ? _.round(dataApi.montoRecuperadoSeguro, 2) : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Recuperación activo: </div>
                                <div className='text-data'>{dataApi.recuperacionActivoId !== null ? dataApi.recuperacionActivoId.nombre : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Pérdida de valor de mercado: </div>
                                <div className='text-data'>{dataApi.perdidaMercado !== null ? _.round(dataApi.perdidaMercado, 2) : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Monto total recuperado: </div>
                                <div className='text-data'>
                                  {_.round(totalRecuperado(), 2)}
                                </div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Monto total de pérdida: </div>
                                <div className='text-data'>
                                  {_.round(calculaCambio() - totalRecuperado(), 2)}
                                </div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Cuenta contable: </div>
                                <div className='text-data'>{dataApi.cuentaContableId !== null ? dataApi.cuentaContableId.nombre : <i>Sin registro</i>}</div>
                              </Col>

                              <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                                <div className='text-label'>Fecha de registro de la cuenta contable: </div>
                                <div className='text-data'>{dataApi.fechaContable !== null ? dataApi.fechaContable : <i>Sin registro</i>}</div>
                              </Col>
                            </Row>
                          </CTabPane>
                          : null}

                        <CTabPane>
                          <Row className='pt-3'>
                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Operativo: </div>
                              <div className='text-data'>
                                {dataApi.operativoId !== null ? dataApi.operativoId.clave + ' - ' + dataApi.operativoId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Seguridad de la información: </div>
                              <div className='text-data'>
                                {dataApi.seguridadId !== null ? dataApi.seguridadId.clave + ' - ' + dataApi.seguridadId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Liquidez y mercado: </div>
                              <div className='text-data'>
                                {dataApi.liquidezId !== null ? dataApi.liquidezId.clave + ' - ' + dataApi.liquidezId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Fraude con medios de pago electrónico: </div>
                              <div className='text-data'>
                                {dataApi.fraudeId !== null ? dataApi.fraudeId.clave + ' - ' + dataApi.fraudeId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Legal y regulatorio: </div>
                              <div className='text-data'>
                                {dataApi.legalId !== null ? dataApi.legalId.clave + ' - ' + dataApi.legalId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Reputacional: </div>
                              <div className='text-data'>
                                {dataApi.reputacionalId !== null ? dataApi.reputacionalId.clave + ' - ' + dataApi.reputacionalId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Cumplimiento: </div>
                              <div className='text-data'>
                                {dataApi.cumplimientoId !== null ? dataApi.cumplimientoId.clave + ' - ' + dataApi.cumplimientoId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Estratégico: </div>
                              <div className='text-data'>
                                {dataApi.estrategicoId !== null ? dataApi.estrategicoId.clave + ' - ' + dataApi.estrategicoId.nombre : <i>Sin registro</i>}
                              </div>
                            </Col>

                            <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                              <div className='text-label'>Gobierno corporativo: </div>
                              <div className='text-data'>
                                {dataApi.gobiernoId !== null ? dataApi.gobiernoId.clave + ' - ' + dataApi.gobiernoId.nombre : <i>Sin registro</i>}
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
