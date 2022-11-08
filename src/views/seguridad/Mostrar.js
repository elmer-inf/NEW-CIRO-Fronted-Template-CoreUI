import { React, useState, useEffect } from 'react'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge } from 'reactstrap';
import { getSeguridadId } from './controller/SeguridadController';

var _ = require('lodash');

const Seguridad = ({ match }) => {
  // Obtiene Evento de riesgo por el ID
  const [dataApi, setDataApi] = useState({})

  useEffect(() => {
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getById = async () => {
    const idSeguridad = match.params.id;
    await getSeguridadId(idSeguridad)
      .then((response) => {
        const res = response.data;
        //console.log('Res : ', res);
        setDataApi(res)
      }).catch((error) => {
        console.log("Error: ", error);
        //notificationToast('error', Messages.notification.notOk)
      });
  }

  const estadoBuscar = () => {
    var valor = '';
    if (dataApi.estadoId.nombre !== null)
      valor = _.lowerCase(dataApi.estadoId.nombre);
    return valor;
  }

  const nivelBuscar = () => {
    var valor = '';
    if (dataApi.nivelRiesgoId.nombre !== null)
      valor = _.lowerCase(dataApi.nivelRiesgoId.campoB);
    return valor;
  }

  return (
    <div>
      {
        (!_.isEmpty(dataApi))
          ? <div>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>
                  <span className='pr-3'>Riesgo en Seguridad</span>
                </CardTitle>
                {/* <span className='float-right'>
                  {(estadoBuscar() === 'asumido' || estadoBuscar() === 'en validacion') ?
                    <Badge className='mt-2 py-2 px-3 h6 font-weight-bold badge-warning-light'>{dataApi.estadoId.nombre}</Badge>
                    : null}
                  {(estadoBuscar() === 'en plazo' || estadoBuscar() === 'mitigado') ?
                    <Badge className="mt-2 py-2 px-3 h6 font-weight-bold badge-success-light">{dataApi.estadoId.nombre}</Badge>
                    : null}
                  {(estadoBuscar() === 'pendiente') ?
                    <Badge className='mt-2 py-2 px-3 h6 font-weight-bold badge-danger-light'>{dataApi.estadoId.nombre}</Badge>
                    : null}
                </span> */}
              </CardHeader>
              <CardBody>
                <Row className='pt-3 pb-4'>
                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Fecha Registro : </div>
                    <div className='text-data'>{dataApi.fechaRegistro !== null ? dataApi.fechaRegistro : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Tipo de activo de información: </div>
                    <div className='text-data'>{dataApi.tipoActivoId !== null ? dataApi.tipoActivoId.nombre : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>IP o URL activo de información: </div>
                    <div className='text-data'>{dataApi.ipUrl !== '' ? dataApi.ipUrl : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Nombre activo de información: </div>
                    <div className='text-data'>{dataApi.activoInformacion !== '' ? dataApi.activoInformacion : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Red: </div>
                    <div className='text-data'>{dataApi.red !== null ? dataApi.red : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' md='4' xl='3' className='pt-2'>
                    <div className='text-label'>Nivel de riesgo: </div>
                    {/* <div className='text-data'>{dataApi.nivelRiesgoId !== null ? dataApi.nivelRiesgoId.campoB : <i>Sin registro</i>}</div> */}
                    <div>
                      {(nivelBuscar() === 'alto') ?
                        <Badge className='p-1 px-2 badge-danger'>{dataApi.nivelRiesgoId.campoB}</Badge>
                        : null}
                      {(nivelBuscar() === 'medio alto') ?
                        <Badge className="p-1 px-2 badge-danger-light">{dataApi.nivelRiesgoId.campoB}</Badge>
                        : null}
                      {(nivelBuscar() === 'medio') ?
                        <Badge className='p-1 px-2 badge-warning-light'>{dataApi.nivelRiesgoId.campoB}</Badge>
                        : null}
                      {(nivelBuscar() === 'medio bajo') ?
                        <Badge className="p-1 px-2 badge-yellow-light">{dataApi.nivelRiesgoId.campoB}</Badge>
                        : null}
                      {(nivelBuscar() === 'bajo') ?
                        <Badge className='p-1 px-2 badge-success-light'>{dataApi.nivelRiesgoId.campoB}</Badge>
                        : null}
                    </div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Descripción del riesgo (Vulnerabilidad + amenaza + impacto): </div>
                    <div className='text-data'>{dataApi.descripcionRiesgo !== '' ? dataApi.descripcionRiesgo : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Recomendación: </div>
                    <div className='text-data'>{dataApi.recomendacion !== '' ? dataApi.recomendacion : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='3' className='pt-2'>
                    <div className='text-label'>Fecha de solución: </div>
                    <div className='text-data'>{dataApi.fechaSolucion !== null ? dataApi.fechaSolucion : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='3' className='pt-2'>
                    <div className='text-label'>Fecha límite de atención: </div>
                    <div className='text-data'>{dataApi.fechaLimite !== null ? dataApi.fechaLimite : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Área: </div>
                    <div className='text-data'>{dataApi.areaId !== null ? dataApi.areaId.clave + ' - ' + dataApi.areaId.nombre : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Tratamiento o estado: </div>
                    {/* <div className='text-data'>{dataApi.estadoId !== null ? dataApi.estadoId.nombre : <i>Sin registro</i>}</div> */}
                    <div>
                      {(estadoBuscar() === 'asumido' || estadoBuscar() === 'en validacion') ?
                        <Badge className='p-1 px-2 font-weight-bold badge-warning-light'>{dataApi.estadoId.nombre}</Badge>
                        : null}
                      {(estadoBuscar() === 'en plazo' || estadoBuscar() === 'mitigado') ?
                        <Badge className="p-1 px-2 font-weight-bold badge-success-light">{dataApi.estadoId.nombre}</Badge>
                        : null}
                      {(estadoBuscar() === 'pendiente') ?
                        <Badge className='p-1 px-2 font-weight-bold badge-danger-light'>{dataApi.estadoId.nombre}</Badge>
                        : null}
                    </div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Plan de trabajo: </div>
                    <div className='text-data'>{dataApi.planTrabajo !== '' ? dataApi.planTrabajo : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Informe emitido: </div>
                    <div className='text-data'>{dataApi.informeEmitido !== '' ? dataApi.informeEmitido : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>CI. de seguimiento: </div>
                    <div className='text-data'>{dataApi.ciSeguimiento !== '' ? dataApi.ciSeguimiento : <i>Sin registro</i>}</div>
                  </Col>

                  <Col xs='12' sm='6' xl='6' className='pt-2'>
                    <div className='text-label'>Comentarios SGSI & TIC: </div>
                    <div className='text-data'>{dataApi.comentario !== '' ? dataApi.comentario : <i>Sin registro</i>}</div>
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

export default Seguridad
