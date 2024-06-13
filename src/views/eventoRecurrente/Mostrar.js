import { React, useState, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge} from 'reactstrap';
import { CButton} from '@coreui/react'
import { getEventoRiesgoId } from '../eventoRiesgo/controller/EventoController';
import { base64toPDF, formatSizeUnits, getFileIcon } from 'src/functions/FunctionEvento'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react';

var _ = require('lodash');

const EventoRecurrente = ({ match }) => {

  const [dataArchivos, setDataArchivo] = useState([]);

  const columns = [{
    dataField: 'nombreArchivo',
    text: 'Nombre',
    sort: true
  }, {
    dataField: 'size',
    text: 'Tamaño',
    formatter: (cell,) => formatSizeUnits(cell),
    style: {
      whiteSpace: 'nowrap'
    }
  }, {
    dataField: 'archivoBase64',
    text: 'Archivo',
    formatter: (cell, row) => (
      <CButton onClick={() => base64toPDF(row.archivoBase64, row.nombreArchivo, row.tipo)}>
        <CIcon
          className="mb-2"
          src={getFileIcon(row.tipo)}
          height={30}
        />
      </CButton>
    )
  }];


  // Configuracion sweetalert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary px-4',
      cancelButton: 'btn btn-outline-primary px-4 mr-4',
    },
    buttonsStyling: false
  })

  /* const getArchivos = (idEvento) => {
    getArchivosByEvento(idEvento)
      .then(res => {
        setDataArchivo(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  } */

  useEffect(() => {
    getById();
    //getArchivos(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obtiene Evento de riesgo por el ID
  const [dataApi, setDataApi] = useState({})

  const getById = async () => {
    const idEvento = match.params.id;
    await getEventoRiesgoId(idEvento)
      .then((response) => {
        
        console.log('res: ', response.data);
        setDataApi(response.data)
      }).catch((error) => {
        console.error("Error: ", error);
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

  const formValueInitial = {
    estadoRegistro: dataApi.estadoRegistro,
    listaObservacion: '',
    nota: '',
    estado: '',
    modulo: ''
  }



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

  // Lista cargos
  const renderListCargos = (list) => {
    var build = list.map((item) => {
      return (
        <li>{item.nombre}</li>
      )
    })
    return build
  }

  /* {(dataApi.tipoEvento === 'A') ?
  <CNavItem>
    <CNavLink>
      <DollarSign size={20} /><span className='pl-1 pr-2 h6 font-weight-bold'>Importes relacionados</span>
    </CNavLink>
  </CNavItem>
  : null} */


  return (
    <div>
      {
        (!_.isEmpty(dataApi))
          ? <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Evento recurrente - Factor persona</span>
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

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Fecha de descubrimiento: </div>
                    <div className='text-data'>{dataApi.fechaDesc !== null ? dataApi.fechaDesc : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Fecha de finalización: </div>
                    <div className='text-data'>{dataApi.fechaFin !== null ? dataApi.fechaFin : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Área involucrada: </div>
                    <div className='text-data'>{dataApi.areaID !== null ? dataApi.areaID.nombre : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Unidad: </div>
                    <div className='text-data'>{dataApi.unidadId !== null ? dataApi.unidadId.nombre : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Cargos involucrados: </div>
                    <div className='text-data'>
                      {(dataApi.cargoId !== null && !_.isEmpty(dataApi.cargoId)) ? renderListCargos(dataApi.cargoId) : <i>Sin registro</i>}
                    </div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='9' className='pt-2'>
                    <div className='text-label'>Descripción: </div>
                    <div className='text-data'>{dataApi.descripcion !== '' ? dataApi.descripcion : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' className='pt-2'>
                    <div className='text-label'>Descripción completa: </div>
                    <div className='text-data'>{dataApi.descripcionCompleta !== '' ? dataApi.descripcionCompleta : <i>Sin registro</i>}</div>
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
                    <div className='text-label'>Proceso crítico: </div>
                    <div className='text-data'>{dataApi.procesoId !== null? dataApi.procesoId.campoA : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Monto total de pérdida: </div>
                    <div className='text-data'>
                      {dataApi.tipoEvento === 'A' ? _.round(calculaCambio() - totalRecuperado(), 2) : 'NA'}
                    </div>
                  </Col>
                      
                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Comité de sanciones: </div>
                    <div className='text-data'>{dataApi.comiteSanciones !== null ? dataApi.comiteSanciones : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Tiene acta de comité: </div>
                    <div className='text-data'>{dataApi.comiteActa !== null ? dataApi.comiteActa : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='9' className='pt-2'>
                    <div className='text-label'>Determinación del comité: </div>
                    <div className='text-data'>{dataApi.comiteDeterminacion !== null ? dataApi.comiteDeterminacion : <i>Sin registro</i>}</div>
                  </Col>

                  {/* <Row>
                            <Col sm={12} md={{ size: 6, order: 0, offset: 3 }} className='pt-2'>
                              <div className='text-label pb-4'>Archivo(s) adjunto(s): </div>
                              <BootstrapTable
                                bootstrap4={true}
                                keyField="id"
                                data={dataArchivos}
                                columns={columns}
                                noDataIndication={() => 'Sin Archivos'}
                                bordered={false}
                                striped={true}
                                hover={false}
                                condensed={true}
                                wrapperClasses="table-responsive"
                              />
                            </Col>
                          </Row> */}

                </Row>
              </CardBody>
            </Card>
          </div>
          : null
      }
    </div>
  )
}

export default EventoRecurrente
