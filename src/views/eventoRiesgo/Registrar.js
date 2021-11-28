import { React, useState, useEffect } from 'react'
import ImportesRelacionados from './seccion/ImportesRelacionados'
import RiesgosRelacionados from './seccion/RiesgosRelacionados'
import CategoriaNegocio from './seccion/CategoriaNegocio'
import DatosIniciales from './seccion/DatosIniciales'
import { FileText, Activity, DollarSign, BarChart2, ChevronRight, AlertTriangle } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, FormGroup, Label, } from 'reactstrap';
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { postEventoRiesgo, getTablaDescripcionNivel } from './controller/EventoController';
import { buildSelectTwo } from 'src/functions/Function'

import { useFormik } from "formik"
import * as Yup from "yup"

const EventoRiesgoRegistrar = () => {

  const history = useHistory()

  // Tipo de evento
  const [dataApiTipoEvento, setDataApiTipoEvento] = useState([])
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionNivel(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'clave', false)
        setDataApiTipoEvento(options)
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
    }
    ),

    /*  onSubmit: values => {
        const data = {
         ...values,
       }
       console.log('Tipo de evento:', data)
       setObject(data);
     } */
  })

  const formValueInitialDatos = {
    estadoRegistro: '',
    fechaIni: '',
    horaIni: '',
    fechaDesc: '',
    horaDesc: '',
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
    detalleEstado: ''
  }

  const formValueInitialImportes = {
    tasaCambioId: null,
    monedaId: null,
    montoPerdida: '',
    montoPerdidaRiesgo: '',
    gastoAsociado: '',
    montoRecuperado: '',
    impactoId: null,
    coberturaSeguro: '',
    polizaSeguroId: null,
    montoRecuperadoSeguro: '',
    recuperacionActivo: '',
    perdidaMercado: '',
    totalPerdida: ''
  }

  const formValueInitialRiesgos = {
    operativoId: null,
    liquidezId: null,
    fraudeId: null,
    legalId: null,
    reputacionalId: null,
    cumplimientoId: null,
    estrategicoId: null,
    gobiernoId: null
    /* seguridadId: null,
    lgiId: null, */
  }

  const dataResult = {
    ...formValueInitialDatos,
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

  // Recupera fechaDesc para enviar a Seccion Categoria (Generar trimestre)
  const fechaD = requestData.fechaDesc;

  const handleOnSubmmit = (values) => {
    //setSpin(true);
    const dataRequest = setObject(values);

    var request = {}

    if(formik.values.tipoEvento === 'A'){
      request = {
        ...dataRequest,
        tipoEvento: formik.values.tipoEvento
       }
      }else{
        request = {
          ...dataRequest,
          ...formValueInitialImportes,
          tipoEvento: formik.values.tipoEvento
        }
      }

    console.log('Lo que se enviara en el request: ', request)

    postEventoRiesgo(request)
      .then(res => {
        if (res.status === 200) {
          console.log('Envio el request: ', res)
          history.push("/eventoRiesgo/listar")
        } else {
          console.log('Hubo un  error ', res)
        }
      }).catch((error) => {
        console.log('Error al obtener datos: ', error)
      });
  }

  return (
    <div>
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

          {(formik.values.tipoEvento !== null)?
            <Row>
              <Col xs="12" md="12" className="mb-4">
                <Nav tabs className='justify-content-center'>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                    >
                      <span className={activeTab === '1' ? '' : 'd-none'}></span>
                      <FileText size={25} /><span className='pl-2'>Datos iniciales</span>
                      <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' })}
                    >
                      <span className={activeTab === '2' ? '' : 'd-none'}></span>
                      <BarChart2 size={25} /><span className='pl-2'>Categoria y Línea de negocio</span>
                      <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                    </NavLink>
                  </NavItem>

                  {(formik.values.tipoEvento === 'A')?
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === '3' })}
                      >
                        <span className={activeTab === '3' ? '' : 'd-none'}></span>
                        <DollarSign size={25} /><span className='pl-2'>Importes relacionados</span>
                        <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                      </NavLink>
                    </NavItem>
                  : null}

                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '4' })}
                    >
                      <span className={activeTab === '4' ? '' : 'd-none'}></span>
                      <Activity size={25} /><span className='pl-2'>Riesgos relacionados</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <DatosIniciales
                      nextSection={nextSection}
                      setObject={setObject}
                      initValues={formValueInitialDatos}
                      //isEdit={false}

                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <CategoriaNegocio
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialCategoria}
                      tipoEvento={formik.values.tipoEvento}
                      fechaDesc={fechaD}
                      //isEdit={false}
                      //arrayCampoSelected={[]}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <ImportesRelacionados
                      nextSection={nextSection}
                      beforeSection={beforeSection}
                      setObject={setObject}
                      initValues={formValueInitialImportes}
                      //isEdit={true}
                      //arrayColumnaSelected={[]}
                    />
                  </TabPane>

                  <TabPane tabId="4">
                    <RiesgosRelacionados
                      beforeSection={beforeSection}
                      initValues={formValueInitialRiesgos}
                      tipoEvento={formik.values.tipoEvento}
                      handleOnSubmmit={handleOnSubmmit}
                      //isEdit={true}
                      //arrayColumnaSelected={[]}
                    />
                  </TabPane>

                </TabContent>
              </Col>
            </Row>
          : <div className='text-danger'><AlertTriangle size={15}/> Debe seleccionar el Tipo de Evento</div>
          }
        </CardBody>
      </Card>
    </div>
  )
}
export default EventoRiesgoRegistrar
