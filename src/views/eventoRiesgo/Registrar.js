import { React, useState, useEffect } from 'react'
import ImportesRelacionados from './seccion/ImportesRelacionados'
import RiesgosRelacionados from './seccion/RiesgosRelacionados'
import CategoriaNegocio from './seccion/CategoriaNegocio'
import DatosIniciales from './seccion/DatosIniciales'
import Planes from './seccion/Planes'
import { FileText, Activity, DollarSign, BarChart2, ChevronRight, AlertTriangle, CheckSquare } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, FormGroup, Label, } from 'reactstrap';
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { postEventoRiesgo } from './controller/EventoController';
import { buildSelectTwo } from 'src/functions/Function'
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

var _ = require('lodash');

const EventoRiesgoRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

  // Tipo de evento
  const [dataApiTipoEvento, setDataApiTipoEvento] = useState([])
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiTipoEvento(_.orderBy(options, ['value'], ['asc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiTipoEvento(6);
  }, [])


  const formValueInitialTipoEvento = {
    tipoEvento: null,
  }

  const formik = useFormik({
    initialValues: formValueInitialTipoEvento,
    validationSchema: Yup.object().shape({
      //tipoEvento: Yup.mixed().required('Tipo de Evento de riesgo obligatorio'),
    })
  })

  const formValueInitialDatos = {
    estadoRegistro: '',
    estadoEvento: '',
    fechaIni: '',
    horaIni: null,
    fechaDesc: '',
    horaDesc: null,
    fechaFin: null,
    horaFin: null,
    agenciaId: null,
    ciudadId: null,
    areaID: null,
    unidadId: null,
    entidadAfectada: false,
    comercioAfectado: false,
    entidadId: null,
    cargoId: null,
    estadoReportado: '',
    fuenteInfId: null,
    canalAsfiId: null,
    descripcion: '',
    descripcionCompleta: ''
  }

  const formValueInitialPlanes = {
    areaResponsableId: null,
    cargoResponsableId: null,
    detallePlan: '',
    fechaFinPlan: '',
    descripcionEstado: '',
    estadoPlan: null
  }

  const formValueInitialCategoria = {
    codigoInicial: '',
    subcategorizacionId: null,
    trimestre: '',
    tipoEventoPerdidaId: null,
    subEventoId: null,
    claseEventoId: null,
    otros: '',
    detalleEventoCritico: '',
    factorRiesgoId: null,
    procesoId: null,
    procedimientoId: null,
    eventoCritico: '',

    lineaNegocio: '',
    lineaAsfiId: null,
    operacionId: null,
    efectoPerdidaId: null,
    opeProSerId: null,
    tipoServicioId: null,
    descServicioId: null,
    riesgoRelacionado: '',
    detalleEstado: '',

    listMatrizRiesgo: null
  }

  const formValueInitialImportes = {
    tasaCambioId: null,
    monedaId: null,
    montoPerdida: '',
    gastoAsociado: '',
    montoRecuperado: '',
    impactoId: null,
    coberturaSeguro: '',
    polizaSeguroId: null,
    montoRecuperadoSeguro: '',
    recuperacionActivoId: null,
    perdidaMercado: '',
  }

  const formValueInitialRiesgos = {
    operativoId: null,
    liquidezId: null,
    fraudeId: null,
    legalId: null,
    reputacionalId: null,
    cumplimientoId: null,
    estrategicoId: null,
    gobiernoId: null,
    seguridadId: null,
  }

  const dataResult = {
    ...formValueInitialDatos,
    ...formValueInitialPlanes,
    ...formValueInitialCategoria,
    ...formValueInitialImportes,
    ...formValueInitialRiesgos,
    ...formValueInitialTipoEvento
  }

  const [requestData, setRequestData] = useState(dataResult);
  const [activeTab, setActiveTap] = useState('1');
  //const [spin, setSpin] = useState(false);

  /* manejo de botones siguiente */
  const nextSection = (tab) => {
    if (tab === 1) {
      setActiveTap('2')
    } else if (tab === 2) {
      setActiveTap('3');
    } else if (tab === 3) {
      setActiveTap('4');
    } else if (tab === 4) {
      setActiveTap('5');
    }
  }

  /* manejo de botones atras */
  const beforeSection = (tab) => {
    if (tab === 2) {
      setActiveTap('1');
    } else if (tab === 3) {
      setActiveTap('2');
    } else if (tab === 4) {
      setActiveTap('3');
    } else if (tab === 5) {
      setActiveTap('4');
    }
  }

  const setObject = (result) => {
    console.log("result: ", result)
    const values = {
      ...requestData,
      ...result
    }
    setRequestData(values);
    return values;
  }

  const notificationToast = (type, mensaje) => {
    switch (type) {
      case 'error':
        toast.error(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'success':
        toast.success(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;

      default:
        toast(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
    }
    setTimeout(() => {
      history.push('/eventoRiesgo/Listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmmit = (values) => {
    setSpin(true);
    const dataRequest = setObject(values);
    var request = {}
    if (formik.values.tipoEvento === 'A') {
      request = {
        ...dataRequest,
        tipoEvento: formik.values.tipoEvento
      }
    } else {
      request = {
        ...dataRequest,
        ...formValueInitialImportes,
        tipoEvento: formik.values.tipoEvento
      }
    }

    console.log('Lo que se enviara en el request: ', request)

    postEventoRiesgo(request)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res);
          notificationToast('success', 'Evento de Riesgo registrado exitósamente');
          //history.push("/eventoRiesgo/listar")
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al registrar Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  return (
    <div>
      <CCSpinner show={spin} />
      <Card>
        <CardHeader>
          <CardTitle className='float-left h4 pt-2'>Registrar Evento de Riesgo</CardTitle>
        </CardHeader>
        <CardBody>

          <FormGroup row>
            <Col xs='12' md='6' xl='2'>
              <Label className='form-label font-weight-bold'>
                Tipo de Evento
              </Label>
            </Col>
            <Col xs='12' md='6' xl='4'>
              <CInputRadio
                data={dataApiTipoEvento}
                id={'tipoEvento'}
                value={formik.values.tipoEvento}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                touched={formik.touched.tipoEvento}
                errors={formik.errors.tipoEvento}
                sendValue={false}
              />
            </Col>
          </FormGroup>

          {(formik.values.tipoEvento !== null) ?
            <Row>
              <Col xs="12" md="12" className="mb-4">
                <Nav tabs className='justify-content-center'>

                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })}>
                      <span className={activeTab === '1' ? '' : 'd-none'}></span>
                      <FileText size={20} /><span className='pl-2 h6 font-weight-bold'>Datos iniciales</span>
                      <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })}>
                      <span className={activeTab === '2' ? '' : 'd-none'}></span>
                      <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de acción</span>
                      <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })}>
                      <span className={activeTab === '3' ? '' : 'd-none'}></span>
                      <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Categoria y Línea de negocio</span>
                      <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                    </NavLink>
                  </NavItem>

                  {(formik.values.tipoEvento === 'A') ?
                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '4' })}>
                        <span className={activeTab === '4' ? '' : 'd-none'}></span>
                        <DollarSign size={20} /><span className='pl-2 h6 font-weight-bold'>Importes relacionados</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>
                    : null}

                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '5' })}>
                      <span className={activeTab === '5' ? '' : 'd-none'}></span>
                      <Activity size={20} /><span className='pl-2 h6 font-weight-bold'>Riesgos relacionados</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <DatosIniciales
                      nextSection={nextSection}
                      setObject={setObject}
                      initValues={formValueInitialDatos}
                    />
                  </TabPane>

                  <TabPane tabId="2">
                    <Planes
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialPlanes}
                    />
                  </TabPane>

                  <TabPane tabId="3">
                    <CategoriaNegocio
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialCategoria}
                      tipoEvento={formik.values.tipoEvento}
                      fechaDesc={requestData.fechaDesc}
                    />
                  </TabPane>

                  <TabPane tabId="4">
                    <ImportesRelacionados
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialImportes}
                    />
                  </TabPane>

                  <TabPane tabId="5">
                    <RiesgosRelacionados
                      beforeSection={beforeSection}
                      initValues={formValueInitialRiesgos}
                      tipoEvento={formik.values.tipoEvento}
                      handleOnSubmmit={handleOnSubmmit}
                    />
                  </TabPane>

                </TabContent>
              </Col>
            </Row>
            : <div className='text-danger'><AlertTriangle size={15} /> Debe seleccionar el Tipo de Evento</div>
          }
        </CardBody>
      </Card>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
export default EventoRiesgoRegistrar
