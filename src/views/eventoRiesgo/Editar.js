import { React, useState, useEffect } from 'react'
import ImportesRelacionados from './seccion/ImportesRelacionados'
import RiesgosRelacionados from './seccion/RiesgosRelacionados'
import CategoriaNegocio from './seccion/CategoriaNegocio'
import DatosIniciales from './seccion/DatosIniciales'
import Planes from './seccion/Planes'
import { FileText, Activity, DollarSign, BarChart2, ChevronRight, AlertTriangle, CheckSquare } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, FormGroup, Label, Badge } from 'reactstrap';
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { getEventoRiesgoId, putEventoRiesgoId } from './controller/EventoController';
import { buildOptionSelect, buildOptionSelectThree, buildSelectThree, buildSelectTwo } from 'src/functions/Function'
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

var _ = require('lodash');

const UpdateEventoRiesgo = ({ match }) => {

  const history = useHistory();
  const [spin, setSpin] = useState(true);
  //const [getFiles, setGetFiles] = useState(null)
  const [dataApiTipoEvento, setDataApiTipoEvento] = useState([])

  const obtainFiles = (f) => {
    //setGetFiles(f)
  }

  const formValueInitialTipoEvento = {
    tipoEvento: null,
  }

  const formik = useFormik({
    initialValues: formValueInitialTipoEvento,
    validationSchema: Yup.object().shape({
      tipoEvento: Yup.mixed().required('Campo obligatorio'),
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
    codigo: '',
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
    descripcionCompleta: '',
    files: null,
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

    procesoCriticoAsfi: '',

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

  const [formValueInitialDatosSec, setformValueInitialDatosSec] = useState(formValueInitialDatos);
  const [formValueInitialPlanesSec, setformValueInitialPlanesSec] = useState(formValueInitialPlanes);
  const [formValueInitialCategoriaSec, setformValueInitialCategoriaSec] = useState(formValueInitialCategoria);
  const [formValueInitialImportesSec, setformValueInitialImportesSec] = useState(formValueInitialImportes);
  const [formValueInitialRiesgosSec, setformValueInitialRiesgosSec] = useState(formValueInitialRiesgos);

  const dataResult = {
    ...formValueInitialDatosSec,
    ...formValueInitialPlanesSec,
    ...formValueInitialCategoriaSec,
    ...formValueInitialImportesSec,
    ...formValueInitialRiesgosSec,
    ...formValueInitialTipoEvento
  }


  // Tipo de evento
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiTipoEvento(_.orderBy(options, ['value'], ['asc']))
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  const macthedValues = (args) => {

    formik.setFieldValue('tipoEvento', args.tipoEvento, false);

    const datosIniciales = {
      codigo: args.codigo,
      estadoRegistro: args.estadoRegistro,
      estadoEvento: args.estadoEvento,
      fechaIni: args.fechaIni,
      horaIni: args.horaIni,
      fechaDesc: args.fechaDesc,
      horaDesc: args.horaDesc,
      fechaFin: args.fechaFin,
      horaFin: args.horaFin,
      agenciaId: buildOptionSelect(args.agenciaId, 'id', 'nombre', true, 'agenciaId'),// { ...args.agenciaId.id, value: args.agenciaId.id, label: args.agenciaId.nombre ,'agenciaId'},
      ciudadId: buildOptionSelect(args.ciudadId, 'id', 'nombre', true, 'ciudadId'),
      areaID: buildOptionSelect(args.areaID, 'id', 'nombre', true, 'areaID'),
      unidadId: buildOptionSelect(args.unidadId, 'id', 'nombre', true, 'unidadId'),
      entidadAfectada: args.entidadAfectada,
      comercioAfectado: args.comercioAfectado,
      entidadId: buildOptionSelect(args.entidadId, 'id', 'nombre', true, 'entidadId'),
      cargoId: buildOptionSelect(args.cargoId, 'id', 'nombre', true, 'cargoId'),
      estadoReportado: { value: args.estadoReportado, label: args.estadoReportado },
      fuenteInfId: buildOptionSelect(args.fuenteInfId, 'id', 'nombre', true, 'fuenteInfId'),
      canalAsfiId: buildOptionSelect(args.canalAsfiId, 'id', 'nombre', true, 'canalAsfiId'),
      descripcion: args.descripcion,
      descripcionCompleta: args.descripcionCompleta,
      files: null,//buildOptionSelect(args.files, 'id', 'nombre', true),
      responsableElaborador: args.responsableElaborador,
    };
    const planesAccion = {
      areaResponsableId: buildOptionSelect(args.areaResponsableId, 'id', 'nombre', true, 'areaResponsableId'),
      cargoResponsableId: buildOptionSelect(args.cargoResponsableId, 'id', 'nombre', true, 'cargoResponsableId'),
      detallePlan: args.detallePlan,
      fechaFinPlan: args.fechaFinPlan,
      descripcionEstado: args.descripcionEstado,
      estadoPlan: { value: args.estadoPlan, label: args.estadoPlan }
    };
    const categoria = {
      codigoInicial: args.codigoInicial,
      subcategorizacionId: buildOptionSelect(args.subcategorizacionId, 'id', 'nombre', true, 'subcategorizacionId'),
      trimestre: args.trimestre,
      tipoEventoPerdidaId: buildOptionSelect(args.tipoEventoPerdidaId, 'id', 'nombre', true, 'tipoEventoPerdidaId'),
      subEventoId: buildOptionSelect(args.subEventoId, 'id', 'nombre', true, 'subEventoId'),
      claseEventoId: buildOptionSelect(args.claseEventoId, 'id', 'nombre', true, 'claseEventoId'),
      otros: args.otros,
      detalleEventoCritico: args.detalleEventoCritico,
      factorRiesgoId: buildOptionSelect(args.factorRiesgoId, 'id', 'nombre', true, 'factorRiesgoId'),
      procesoId: buildOptionSelect(args.procesoId, 'id', 'nombre', true, 'procesoId'),
      procedimientoId: buildOptionSelect(args.procedimientoId, 'id', 'descripcion', true, 'procedimientoId'),
      eventoCritico: { value: args.eventoCritico, label: args.eventoCritico },

      lineaNegocio: { value: args.lineaNegocio, label: args.lineaNegocio },
      lineaAsfiId: buildOptionSelect(args.lineaAsfiId, 'id', 'nombre', true, 'lineaAsfiId'),
      operacionId: buildOptionSelect(args.operacionId, 'id', 'nombre', true, 'operacionId'),
      efectoPerdidaId: buildOptionSelect(args.efectoPerdidaId, 'id', 'nombre', true, 'efectoPerdidaId'),
      opeProSerId: buildOptionSelect(args.opeProSerId, 'id', 'nombre', true, 'opeProSerId'),
      tipoServicioId: buildOptionSelect(args.tipoServicioId, 'id', 'nombre', true, 'tipoServicioId'),
      descServicioId: buildOptionSelect(args.descServicioId, 'id', 'nombre', true, 'descServicioId'),
      riesgoRelacionado: args.riesgoRelacionado,
      detalleEstado: args.detalleEstado,

      procesoCriticoAsfi: args.procesoCriticoAsfi,

      listMatrizRiesgo: buildSelectThree(args.riesgoRelacionado, 'id', 'codigo', 'definicion', true)
    };
    const importes = {
      tasaCambioId: args.tasaCambioId,
      monedaId: buildOptionSelect(args.monedaId, 'id', 'clave', true, 'monedaId'),
      montoPerdida: args.montoPerdida,
      gastoAsociado: args.gastoAsociado,
      montoRecuperado: args.montoRecuperado,
      impactoId: buildOptionSelect(args.impactoId, 'id', 'nombre', true, 'impactoId'),
      coberturaSeguro: args.coberturaSeguro,
      polizaSeguroId: buildOptionSelect(args.polizaSeguroId, 'id', 'nombre', true, 'polizaSeguroId'),
      montoRecuperadoSeguro: args.montoRecuperadoSeguro,
      recuperacionActivoId: buildOptionSelect(args.recuperacionActivoId, 'id', 'nombre', true, 'recuperacionActivoId'),
      perdidaMercado: args.perdidaMercado,
      cuentaContableId: buildOptionSelect(args.cuentaContableId, 'id', 'nombre', true, 'cuentaContableId'),
      fechaContable: args.fechaContable,
    };
    const riesgos = {
      operativoId: buildOptionSelectThree(args.operativoId, 'id', 'clave', 'nombre', true, 'operativoId'),
      liquidezId: buildOptionSelectThree(args.liquidezId, 'id', 'clave', 'nombre', true, 'liquidezId'),
      fraudeId: buildOptionSelectThree(args.fraudeId, 'id', 'clave', 'nombre', true, 'fraudeId'),
      legalId: buildOptionSelectThree(args.legalId, 'id', 'clave', 'nombre', true, 'legalId'),
      reputacionalId: buildOptionSelectThree(args.reputacionalId, 'id', 'clave', 'nombre', true, 'reputacionalId'),
      cumplimientoId: buildOptionSelectThree(args.cumplimientoId, 'id', 'clave', 'nombre', true, 'cumplimientoId'),
      estrategicoId: buildOptionSelectThree(args.estrategicoId, 'id', 'clave', 'nombre', true, 'estrategicoId'),
      gobiernoId: buildOptionSelectThree(args.gobiernoId, 'id', 'clave', 'nombre', true, 'gobiernoId'),
      seguridadId: buildOptionSelectThree(args.seguridadId, 'id', 'clave', 'nombre', true, 'seguridadId'),
    };

    setformValueInitialDatosSec(datosIniciales);
    setformValueInitialPlanesSec(planesAccion);
    setformValueInitialCategoriaSec(categoria);
    setformValueInitialImportesSec(importes);
    setformValueInitialRiesgosSec(riesgos);
  }

  // Evento de riesgo ID
  const getById = async (idEventoRiesgo) => {
    setSpin(true)
    await getEventoRiesgoId(idEventoRiesgo)
      .then((response) => {
        const res = response.data;
        console.log('Datos a editar de Evento Riesgo: ', res);
        macthedValues(res);
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }

  //Life Cycle
  useEffect(() => {
    callApiTipoEvento(6);
    getById(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [requestData, setRequestData] = useState(dataResult);
  const [activeTab, setActiveTap] = useState('1');

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
    //console.log("result: ", result)
    const values = {
      ...requestData,
      ...result
    }
    //console.log('DATA PARA GUARDAR : ', values);
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
    var request = {
      ...dataRequest,
      tipoEvento: formik.values.tipoEvento
    }
    /* if (formik.values.tipoEvento !== 'A') {
       request = _.omit(request, ['tasaCambioId', 'monedaId', 'montoPerdida', 'gastoAsociado',
         'montoRecuperado', 'impactoId', 'coberturaSeguro', 'polizaSeguroId', 'montoRecuperadoSeguro',
         'recuperacionActivoId', 'perdidaMercado', 'cuentaContableId', 'fechaContable'])
 
     }*/

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


    //console.log('Lo que se enviara en el request: ', request)
    // console.log('JSON.stringify(request) ', JSON.stringify(request))
    //  var formData = new FormData();
    //console.log('REQUEEEST:: ', request);
    // formData.append('eventoRiesgoPostDTO', JSON.stringify(_.omit(request, ['files'])));
    //formData.append('file', getFiles);
    /* if (getFiles !== null) {
       for (let i = 0; i < getFiles.length; i++) {
         formData.append("file", getFiles[i]);
       }
     } else {
       formData.append("file", new Blob([]));
     }*/
    /*

        for (var value of formData.values()) {
           console.log('===========================================')
           console.log('--> ', value);
           console.log('===========================================')
         }*/

    const idEvento = match.params.id;
    putEventoRiesgoId(idEvento, _.omit(request, ['files', 'riesgoRelacionado']))
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res);
          notificationToast('success', 'Evento de Riesgo modificado exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al modificar Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });

    /*   postEventoRiesgoFormData(formData)
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
        }); */


    /*  postEventoRiesgo(request)
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
        });*/
  }

  return (

    <div>
      <CCSpinner show={spin} />
      {
        (spin === false)
          ?
          <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>
                <span className='pr-3'>Editar Evento de Riesgo</span>

                {(formValueInitialDatosSec.estadoRegistro === 'Autorizado') ?
                  <span className='pr-3 text-primary font-weight-bold'>{formValueInitialDatosSec.codigo}</span>
                  : null}

                {(formValueInitialDatosSec.estadoRegistro === 'Autorizado') ?
                  <Badge className="px-4 badge-success-light">{formValueInitialDatosSec.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosSec.estadoRegistro === 'Descartado') ?
                  <Badge className="px-4 badge-danger">{formValueInitialDatosSec.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosSec.estadoRegistro === 'Pendiente') ?
                  <Badge className="px-4 badge-warning-light">{formValueInitialDatosSec.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosSec.estadoRegistro === 'Observado') ?
                  <Badge className="px-4 badge-danger-light">{formValueInitialDatosSec.estadoRegistro}</Badge>
                  : null}
              </CardTitle>
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

              {((formik.values.tipoEvento !== null)) ?
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
                          initValues={formValueInitialDatosSec}
                          obtainFiles={obtainFiles}
                          optionsEstado={optionsEstado}
                          isEdit={true}
                        />
                      </TabPane>

                      <TabPane tabId="2">
                        <Planes
                          nextSection={nextSection}
                          beforeSection={beforeSection}
                          setObject={setObject}
                          initValues={formValueInitialPlanesSec}
                          optionsPlanes={optionEstadoPlanes}
                          isEdit={true}
                        />
                      </TabPane>

                      <TabPane tabId="3">
                        <CategoriaNegocio
                          nextSection={nextSection}
                          beforeSection={beforeSection}
                          setObject={setObject}
                          initValues={formValueInitialCategoriaSec}
                          tipoEvento={formik.values.tipoEvento}
                          fechaDesc={requestData.fechaDesc}
                          optionsCritico={optionsEventoCritico}
                          optionsAsfi={optionsLineaAsfi}
                          optionProcesoAsfi={optionProcesoAsfi}
                          isEdit={true}
                        />
                      </TabPane>

                      <TabPane tabId="4">
                        <ImportesRelacionados
                          nextSection={nextSection}
                          beforeSection={beforeSection}
                          setObject={setObject}
                          initValues={formValueInitialImportesSec}
                          optionsCobertura={optionsCobertura}
                          isEdit={true}
                        />
                      </TabPane>

                      <TabPane tabId="5">
                        <RiesgosRelacionados
                          beforeSection={beforeSection}
                          initValues={formValueInitialRiesgosSec}
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

          : null
      }

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
export default UpdateEventoRiesgo
