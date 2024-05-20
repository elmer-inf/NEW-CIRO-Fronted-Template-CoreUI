import { React, useState, useEffect } from 'react'
import ImportesRelacionados from './seccion/ImportesRelacionados'
import RiesgosRelacionados from './seccion/RiesgosRelacionados'
import CategoriaNegocio from './seccion/CategoriaNegocio'
import DatosIniciales from './seccion/DatosIniciales'
import Planes from './seccion/Planes'
import { FileText, Activity, DollarSign, BarChart2, ChevronRight, AlertTriangle, CheckSquare } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, FormGroup, Label } from 'reactstrap';
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { postEventoRiesgoFormData } from './controller/EventoController';
import { buildSelectTwo } from 'src/functions/Function'
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

var _ = require('lodash');

const EventoRiesgoRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);
  const [getFiles, setGetFiles] = useState(null)
  // Tipo de evento
  const [dataApiTipoEvento, setDataApiTipoEvento] = useState([])
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiTipoEvento(_.orderBy(options, ['value'], ['asc']))
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  const obtainFiles = (f) => {
    setGetFiles(f)
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

  // Estado de evento - SECCION 1
  const optionsEstado = [
    { value: 'Reportado', label: 'Reportado' },
    { value: 'No reportado', label: 'No reportado' }
  ]

  // Estado de Planes de accion - SECCION 2
  const optionEstadoPlanes = [
    { value: 'No iniciado', label: 'No iniciado' },
    { value: 'En proceso', label: 'En proceso' },
    { value: 'Concluido', label: 'Concluido' }
  ]

  // Evento critico - SECCION 3
  const optionsEventoCritico = [
    { value: 'Crítico', label: 'Crítico' },
    { value: 'No crítico', label: 'No crítico' }
  ]

  // Línea de negocio - SECCION 3
  const optionsLineaAsfi = [
    { value: '1. Línea de Negocio Emisor', label: '1. Línea de Negocio Emisor' },
    { value: '2. Línea de Negocio Adquirente', label: '2. Línea de Negocio Adquirente' }
  ]

  // Proceso critico ASFI - SECCION 3
  const optionProcesoAsfi = [
    { value: 1, label: 1 },
    { value: 2, label: 2 }
  ]

  // Cobertura seguro - SECCION 4
  const optionsCobertura = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' }
  ]

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
    cargoId: [],
    estadoReportado: '',
    fuenteInfId: null,
    canalAsfiId: null,
    descripcion: '',
    descripcionCompleta: '',
    files: [],
    responsableElaborador: ''
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

    procesoCriticoAsfi: 2,

    listMatrizRiesgo: null
  }

  const formValueInitialImportes = {
    tasaCambioId: null,
    monedaId: null,
    montoPerdida: '',
    gastoAsociado: '',
    montoRecuperado: '',
    impactoId: null,
    coberturaSeguro: false,
    polizaSeguroId: null,
    montoRecuperadoSeguro: '',
    recuperacionActivoId: null,
    perdidaMercado: '',
    cuentaContableId: null,
    fechaContable: ''
  }

  const formValueInitialRiesgos = {
    operativoId: 0,
    liquidezId: 0,
    lgiId: 0,
    fraudeId: 0,
    legalId: 0,
    reputacionalId: 0,
    cumplimientoId: 0,
    estrategicoId: 0,
    gobiernoId: 0,
    seguridadId: 0,
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
  const [dataAuxListRiesgos, setDataAuxListRiesgos] = useState([])

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
    const values = {
      ...requestData,
      ...result
    }

    if (activeTab === '2' && result !== undefined) {
      setDataAuxListRiesgos(result.listMatrizRiesgo);
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

    var formData = new FormData();

    formData.append('eventoRiesgoPostDTO', JSON.stringify(_.omit(request, ['files'])));

    if (getFiles !== null) {
      for (let i = 0; i < getFiles.length; i++) {
        formData.append("file", getFiles[i]);
      }
    } else {
      formData.append("file", new Blob([]));
    }

    for (let [key, value] of formData.entries()) {
      console.log("key reg: ", key);
      console.log("value reg: ", value);
    }


    postEventoRiesgoFormData(formData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Evento de Riesgo registrado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al registrar Evento de Riesgo: ', error);
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
                      <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Categoria y Línea de negocio</span>
                      <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                    </NavLink>
                  </NavItem>

                  {(formik.values.tipoEvento === 'A') ?
                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '3' })}>
                        <span className={activeTab === '3' ? '' : 'd-none'}></span>
                        <DollarSign size={20} /><span className='pl-2 h6 font-weight-bold'>Importes relacionados</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>
                    : null}

                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '4' })}>
                      <span className={activeTab === '4' ? '' : 'd-none'}></span>
                      <Activity size={20} /><span className='pl-2 h6 font-weight-bold'>Riesgos relacionados</span>
                      <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                    </NavLink>
                  </NavItem>


                  <NavItem>
                    <NavLink className={classnames({ active: activeTab === '5' })}>
                      <span className={activeTab === '5' ? '' : 'd-none'}></span>
                      <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de acción</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <DatosIniciales
                      nextSection={nextSection}
                      setObject={setObject}
                      initValues={formValueInitialDatos}
                      obtainFiles={obtainFiles}
                      optionsEstado={optionsEstado}
                      isEdit={false}
                    />
                  </TabPane>

                  <TabPane tabId="2">
                    <CategoriaNegocio
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialCategoria}
                      tipoEvento={formik.values.tipoEvento}
                      fechaDesc={requestData.fechaDesc}
                      optionsCritico={optionsEventoCritico}
                      optionsAsfi={optionsLineaAsfi}
                      optionProcesoAsfi={optionProcesoAsfi}
                      isEdit={false}
                    />
                  </TabPane>

                  <TabPane tabId="3">
                    <ImportesRelacionados
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialImportes}
                      optionsCobertura={optionsCobertura}
                      isEdit={false}
                    />
                  </TabPane>

                  <TabPane tabId="4">
                    <RiesgosRelacionados
                      nextSection={nextSection}
                      setObject={setObject}
                      beforeSection={beforeSection}
                      initValues={formValueInitialRiesgos}
                      tipoEvento={formik.values.tipoEvento}
                    />
                  </TabPane>

                  <TabPane tabId="5">
                    <Planes    
                      beforeSection={beforeSection}
                      initValues={formValueInitialPlanes}
                      optionsPlanes={optionEstadoPlanes}
                      tipoEvento={formik.values.tipoEvento}
                      handleOnSubmmit={handleOnSubmmit}
                      dataAuxListRiesgos={dataAuxListRiesgos}
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
