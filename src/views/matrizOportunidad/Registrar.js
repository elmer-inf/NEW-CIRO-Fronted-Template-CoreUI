import { React, useState } from 'react'
import DatosIniciales from './seccionesFormulario/DatosIniciales'
import Descripcion from './seccionesFormulario/Descripcion'
import Oportunidad from './seccionesFormulario/Oportunidad'
import Controles from './seccionesFormulario/Controles'
import PlanesSeguimiento from './seccionesFormulario/PlanesSeguimiento'
import { FileText, BarChart2, ChevronRight, CheckSquare, Trello, Columns } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav} from 'reactstrap';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { postOportunidad } from './controller/OportunidadController';
import { ToastContainer, toast } from 'react-toastify'
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
    fodaId : null,
    fodaDescripcionId : null,
  }

  const formValueInitialDescripcion = {
    definicion : '',
    causa : '',
    consecuencia : '',
    factor : '',
    grupoInteresId : null,
  }

  const formValueInitialOportunidad = {
    probabilidadId : null,
    impactoOporId : null
  }

  const formValueInitialControles = {
    controlesTiene : false,
    controlComentario: '',
    fortalezaId: '',
    nroControles: '',
    controles: []
  }

  const formValueInitialPlanesSeguimiento = {
    nroPlanes: '',
    planesAccion: []
  }

  const dataResult = {
    ...formValueInitialDatosIniciales,
    ...formValueInitialDescripcion,
    ...formValueInitialOportunidad,
    ...formValueInitialControles,
    ...formValueInitialPlanesSeguimiento
  }

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

  const setObject = (result, realValues) => {
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
        history.push('/matrizOportunidad/Listar');
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

    postOportunidad(dataValues)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        console.log('Envio el request: ', res)
        notificationToast('success', 'Matriz de Oportunidad registrada exit??samente');
        // history.push("/matrizOportunidad/listar")
      } else {
        console.log('Hubo un  error ', res);
        notificationToast('error', 'Algo sali?? mal, intente nuevamente');
      }
    }).catch((error) => {
      console.log('Error al obtener datos: ', error);
      notificationToast('error', 'Algo sali?? mal, intente nuevamente');
    });
  }

  return (
    <div>
      <CCSpinner show={spin} />
      <Card>
        <CardHeader>
          <CardTitle className='float-left h4 pt-2'>Registrar Matriz de Oportunidad</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs className='justify-content-center'>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '1' })}>
                    <span className={activeTab === '1' ? '' : 'd-none'}></span>
                    <FileText size={20} /><span className='pl-2 h6 font-weight-bold'>Datos iniciales</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '2' })}>
                    <span className={activeTab === '2' ? '' : 'd-none'}></span>
                    <Columns size={20} /><span className='pl-2 h6 font-weight-bold'>Descripcion</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '3' })}>
                    <span className={activeTab === '3' ? '' : 'd-none'}></span>
                    <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Oportunidad</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '4' })}>
                    <span className={activeTab === '4' ? '' : 'd-none'}></span>
                    <Trello size={20} /><span className='pl-2 h6 font-weight-bold'>Controles</span>
                    <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary'/>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '5' })}>
                    <span className={activeTab === '5' ? '' : 'd-none'}></span>
                    <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de Acci??n y Seguimiento</span>
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
                  <Descripcion
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialDescripcion}
                    //isEdit={false}
                  />
                </TabPane>

                <TabPane tabId="3">
                  <Oportunidad
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialOportunidad}
                    //isEdit={true}
                  />
                </TabPane>

                <TabPane tabId="4">
                  <Controles
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialControles}
                    //isEdit={true}
                  />
                </TabPane>

                <TabPane tabId="5">
                  <PlanesSeguimiento
                    beforeSection={beforeSection}
                    initValues={formValueInitialPlanesSeguimiento}
                    handleOnSubmmit={handleOnSubmmit}
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
