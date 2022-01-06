import { React, useState } from 'react'
import DatosIniciales from './seccionesFormulario/DatosIniciales'
import DefinicionRiesgos from './seccionesFormulario/DefinicionRiesgos'
import Controles from './seccionesFormulario/Controles'
import RiesgoResidual from './seccionesFormulario/RiesgoResidual'
import PlanesSeguimiento from './seccionesFormulario/PlanesSeguimiento'
import Valoracion from './seccionesFormulario/Valoracion'
import { FileText, BarChart2, ChevronRight, CheckSquare, PieChart, Trello, List, TrendingUp } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav} from 'reactstrap';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { postRiesgo } from './controller/RiesgoController';
import { ToastContainer, toast } from 'react-toastify';
import CCSpinner from 'src/reusable/spinner/CCSpinner'

const MatrizRiesgoRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

  const formValueInitialDatosIniciales = {
    areaId : null,
    unidadId : null,
    procesoId : null,
    procedimientoId : null,
    duenoCargoId : null,
    responsableCargoId : null,
    fechaEvaluacion : '',
    identificadoId : null,
    identificadoOtro : '',
    eventoRiesgoId: null,
    eventoMaterializado: ''
  }

  const formValueInitialDefinicionRiesgos = {
    definicion : '',
    causa : '',
    consecuencia : '',
    defConcatenado : '',
    efectoPerdidaOtro : '',
    efectoPerdidaId : null,
    perdidaAsfiId : null,
    monetario : false,
    factorRiesgoId: null,

    probabilidadId: null,
    impactoId : null
  }

  const formValueInitialControles = {
    controlId: '',
    controlObjetivo: '',
    controlComentario: '',

    controlesTiene : false,
    nroControles: '',
    controles: []
  }

  const formValueInitialRiesgoResidual = {

  }

  const formValueInitialPlanesSeguimiento = {
    nroPlanes: '',
    planesAccion: []
  }

  const formValueInitialValoracion = {
    criterioImpacto: '',
    criterioprobabilidad: '',
    impactoUSD: 0
  }

  const dataResult = {
    ...formValueInitialDatosIniciales,
    ...formValueInitialDefinicionRiesgos,
    ...formValueInitialControles,
    ...formValueInitialPlanesSeguimiento,
    ...formValueInitialValoracion
  }

  const [requestData, setRequestData] = useState(dataResult);
  const [activeTab, setActiveTap] = useState('5');
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
    } else if (tab === 5) {
      setActiveTap('6');
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
    } else if (tab === 6) {
      setActiveTap('5');
    }
  }

  const [dataAuxSeccion1, setDataAuxSeccion1] = useState([])
  const [dataAuxSeccion2, setDataAuxSeccion2] = useState([])
  const [dataAuxSeccion3, setDataAuxSeccion3] = useState([])
  const [dataAuxSeccion4, setDataAuxSeccion4] = useState([])

  const setObject = (result, realValues) => {
    console.log("result: ", result)
    const values = {
      ...requestData,
      ...result
    }

    // Obtiene label Proceso para busqueda en Seccion Controles: Select Proceso
    if(activeTab === '1' && realValues !== undefined){
      const dataAuxSeccion1 = {
        procedimientoAux : realValues.procedimientoId.label,
      }
      setDataAuxSeccion1(dataAuxSeccion1)
    }
    // FIN Obtiene data Proceso para busqueda en Seccion Controles: Select Proceso

    // Obtiene valores auxiliares de "Definicion y Riesgo inherente" para "Valoracion cuantitativa y Riesgo residual"
    if(activeTab === '2' && realValues !== undefined){
      const dataAuxSeccion2 = {
        efectPerdidaAux: realValues.efectoPerdidaId !== null? realValues.efectoPerdidaId.label : realValues.efectoPerdidaOtro,
        perdidaAsfiAux: realValues.perdidaAsfiId.label,

        probabilidaNivelAux : realValues.probabilidadId.campoA,
        impactoNivelAux : realValues.impactoId.campoA,
      }
      setDataAuxSeccion2(dataAuxSeccion2)
    }
    // FIN Obtiene valores auxiliares de "Definicion y Riesgo inherente" para "Valoracion cuantitativa y Riesgo residual"

    // Obtiene valores auxiliares de "Controles" para "Riesgo residual"
    if(activeTab === '3' && realValues !== undefined){
      const dataAuxSeccion3 = {
        controlIdAux: realValues.controlId,
        controlObjetivoAux: realValues.controlObjetivo,
      }
      setDataAuxSeccion3(dataAuxSeccion3)
    }
    // FIN Obtiene valores auxiliares de "Controles" para "Riesgo residual"

    // Obtiene valores auxiliares de "Riesgo residual" para "Valoracion cuantitativa"
    if(activeTab === '4' && realValues !== undefined){
      const dataAuxSeccion4 = {
        probabilidadAux: realValues.probabilidad,
        probabilidadValAux: realValues.probabilidadVal,
        impactoAux: realValues.impacto,
        impactoValAux: realValues.impactoVal,
        riesgoAux: realValues.riesgo,
        riesgoValAux: realValues.riesgoVal,
      }
      setDataAuxSeccion4(dataAuxSeccion4)
    }
    // FIN Obtiene valores auxiliares de "Riesgo residual" para "Valoracion cuantitativa"

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
        history.push('/matrizRiesgo/Listar');
        setSpin(false);
    }, 5000);
  }

  const handleOnSubmmit = (values) => {
    setSpin(true);
    const dataRequest = setObject(values);
    console.log('dataRequest: ', dataRequest)
    const dataValues = {
      ...dataRequest,
      controles: JSON.stringify(dataRequest.controles),
      planesAccion: JSON.stringify(dataRequest.planesAccion)
    }

    console.log('Lo que se enviara en el request: ', dataValues)

    postRiesgo(dataValues)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        console.log('Envio el request: ', res);
        notificationToast('success', 'Matriz de Riesgo registrada exitósamente');
        //history.push("/matrizRiesgo/listar")
      } else {
        console.log('Hubo un  error ', res);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      }
    }).catch((error) => {
      console.log('Error al obtener datos: ', error);
      notificationToast('error', 'Algo salió mal, intente nuevamente');
    });
  }

  return (
    <div>
      <CCSpinner show={spin} />
      <Card>
        <CardHeader>
          <CardTitle className='float-left h4 pt-2'>Registrar Matriz de Riesgo</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs className='justify-content-center'>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '1' })}>
                    <span className={activeTab === '1' ? '' : 'd-none'}></span>
                    <FileText size={20} /><span className='pl-2 h6 font-weight-bold'>Datos</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '2' })}>
                    <span className={activeTab === '2' ? '' : 'd-none'}></span>
                    <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Definición y Riesgo inherente</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '3' })}>
                    <span className={activeTab === '3' ? '' : 'd-none'}></span>
                    <Trello size={20} /><span className='pl-2 h6 font-weight-bold'>Controles</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '4' })}>
                    <span className={activeTab === '4' ? '' : 'd-none'}></span>
                    <TrendingUp size={20} /><span className='pl-2 h6 font-weight-bold'>Riesgo residual</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '5' })}>
                    <span className={activeTab === '5' ? '' : 'd-none'}></span>
                    <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de Acción y Seguimiento</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '6' })}>
                    <span className={activeTab === '6' ? '' : 'd-none'}></span>
                    <PieChart size={20} /><span className='pl-2 h6 font-weight-bold'>Valoración cuantitativa</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <DatosIniciales
                    nextSection={nextSection}
                    setObject={setObject}
                    initValues={formValueInitialDatosIniciales}
                    //isEdit={false}
                  />
                </TabPane>

                <TabPane tabId="2">
                  <DefinicionRiesgos
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialDefinicionRiesgos}
                    //isEdit={false}
                    //arrayCampoSelected={[]}
                  />
                </TabPane>

                <TabPane tabId="3">
                  <Controles
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialControles}
                    dataAux={dataAuxSeccion1}
                    //isEdit={true}
                    //arrayColumnaSelected={[]}
                  />
                </TabPane>

                <TabPane tabId="4">
                  <RiesgoResidual
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialRiesgoResidual}
                    dataAux={dataAuxSeccion3}
                    dataAux2={dataAuxSeccion2}
                    //isEdit={true}
                    //arrayColumnaSelected={[]}
                  />
                </TabPane>

                <TabPane tabId="5">
                  <PlanesSeguimiento
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialPlanesSeguimiento}
                    //isEdit={true}
                    //arrayColumnaSelected={[]}
                  />
                </TabPane>

                <TabPane tabId="6">
                  <Valoracion
                    beforeSection={beforeSection}
                    initValues={formValueInitialValoracion}
                    handleOnSubmmit={handleOnSubmmit}
                    dataAux={dataAuxSeccion2}
                    dataAux2={dataAuxSeccion4}
                    //isEdit={true}
                  />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
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
export default MatrizRiesgoRegistrar
