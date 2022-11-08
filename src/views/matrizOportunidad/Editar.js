import { React, useEffect, useState } from 'react'
import DatosIniciales from './seccionesFormulario/DatosIniciales'
import Descripcion from './seccionesFormulario/Descripcion'
import Oportunidad from './seccionesFormulario/Oportunidad'
import Controles from './seccionesFormulario/Controles'
import PlanesSeguimiento from './seccionesFormulario/PlanesSeguimiento'
import { FileText, BarChart2, ChevronRight, CheckSquare, Trello, Columns } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, Badge } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { getOportunidadId, putOportunidadId } from './controller/OportunidadController';
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { buildOptionSelect, buildOptionSelectThree, buildSelectTwo } from 'src/functions/Function'
import { getTablaDescripcionOportunidadN1 } from 'src/views/administracion/matriz-oportunidad/controller/AdminOportunidadController';
var _ = require('lodash');

const MatrizOportunidadEditar = ({ match }) => {

  const history = useHistory();
  const [spin, setSpin] = useState(true);

  // Clasificacion de factores
  const optionsFactores = [
    { value: '1. Interno', label: '1. Interno' },
    { value: '2. Externo', label: '2. Externo' }
  ]

  const formValueInitialDatosIniciales = {
    codigo: '',
    estadoRegistro: '',
    areaId: null,
    unidadId: null,
    procesoId: null,
    procedimientoId: null,
    duenoCargoId: null,
    responsableCargoId: null,
    fechaEvaluacion: '',
    fodaId: null,
    fodaDescripcionId: null,
  }

  const formValueInitialDescripcion = {
    definicion: '',
    causa: '',
    consecuencia: '',
    factor: '',
    grupoInteresId: null,
  }

  const formValueInitialOportunidad = {
    probabilidadId: null,
    impactoOporId: null
  }

  const formValueInitialControles = {
    controlesTiene: 'false',
    controlComentario: '',
    fortalezaId: '',
    nroControles: '',
    controles: []
  }

  const formValueInitialPlanesSeguimiento = {
    nroPlanes: '',
    planesAccion: []
  }

  const [formValueInitialDatosToEdit, setformValueInitialDatos] = useState(formValueInitialDatosIniciales)
  const [formValueInitialDescripcionToEdit, setformValueInitialDescripcion] = useState(formValueInitialDescripcion)
  const [formValueInitialOportunidadToEdit, setformValueInitialOportunidad] = useState(formValueInitialOportunidad)
  const [formValueInitialControlesToEdit, setformValueInitialControles] = useState(formValueInitialControles)
  const [formValueInitialPlanesToEdit, setformValueInitialPlanes] = useState(formValueInitialPlanesSeguimiento)

  const dataResult = {
    ...formValueInitialDatosToEdit,
    ...formValueInitialDescripcionToEdit,
    ...formValueInitialOportunidadToEdit,
    ...formValueInitialControlesToEdit,
    ...formValueInitialPlanesToEdit
  }

  const macthedValues = (args) => {
    const datosIniciales = {
      codigo: args.codigo,
      estadoRegistro: args.estadoRegistro,
      areaId: buildOptionSelect(args.areaId, 'id', 'nombre', true, 'areaId'),
      unidadId: buildOptionSelect(args.unidadId, 'id', 'nombre', true, 'unidadId'),
      procesoId: buildOptionSelect(args.procesoId, 'id', 'nombre', true, 'procesoId'),
      procedimientoId: buildOptionSelect(args.procedimientoId, 'id', 'campoA', true, 'procedimientoId'),
      duenoCargoId: buildOptionSelect(args.duenoCargoId, 'id', 'nombre', true, 'duenoCargoId'),
      responsableCargoId: buildOptionSelect(args.responsableCargoId, 'id', 'nombre', true, 'responsableCargoId'),
      fechaEvaluacion: args.fechaEvaluacion,
      fodaId: buildOptionSelect(args.fodaId, 'id', 'nombre', true, 'fodaId'),
      fodaDescripcionId: buildOptionSelect(args.fodaDescripcionId, 'id', 'nombre', true, 'fodaDescripcionId'),
    };
    const descripcion = {
      definicion: args.definicion,
      causa: args.causa,
      consecuencia: args.consecuencia,
      factor: { value: args.factor, label: args.factor },
      grupoInteresId: buildOptionSelectThree(args.grupoInteresId, 'id', 'campoA', 'nombre', true, 'grupoInteresId'),
    };
    const oportunidad = {
      probabilidadId: buildOptionSelect(args.probabilidadId, 'id', 'campoD', true, 'probabilidadId'),
      impactoOporId: buildOptionSelectThree(args.impactoOporId, 'id', 'campoA', 'campoC', true, 'impactoOporId')
    };
    const controles = {
      controlesTiene: (args.controlesTiene === true) ? 'true' : (args.controlesTiene === false) ? 'false' : '',
      controlComentario: args.controlComentario,
      fortalezaId: buildOptionSelect(args.fortalezaId, 'id', 'campoA', false, 'fortalezaId'),
      nroControles: (JSON.parse(args.controles).length !== 0) ? JSON.parse(args.controles).length : '',
      controles: JSON.parse(args.controles)
    };
    const planes = {
      nroPlanes: (JSON.parse(args.planesAccion).length !== 0) ? JSON.parse(args.planesAccion).length : '',
      planesAccion: JSON.parse(args.planesAccion)
    };

    setformValueInitialDatos(datosIniciales);
    setformValueInitialDescripcion(descripcion);
    setformValueInitialOportunidad(oportunidad);
    setformValueInitialControles(controles);
    setformValueInitialPlanes(planes);
  }

  // Matriz de Oportunidad ID
  const getById = async (idOportunidad) => {
    setSpin(true)
    await getOportunidadId(idOportunidad)
      .then((response) => {
        const res = response.data;
        console.log('Datos a editar de Matriz de Oportunidad: ', res);
        macthedValues(res);
        callApiTratamiento(5);
        callApiFortaleza(6);
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }

  //Life Cycle
  useEffect(() => {
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
    //setSpin(true);
    const dataRequest = setObject(values);
    const dataValues = {
      ...dataRequest,
      controles: JSON.stringify(dataRequest.controles),
      planesAccion: JSON.stringify(dataRequest.planesAccion)
    }
    //console.log('Lo que se enviara en el request: ', dataValues);
    const idOportunidad = match.params.id;
    putOportunidadId(idOportunidad, dataValues)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res)
          notificationToast('success', 'Matriz de Oportunidad modificada exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al obtener datos: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  // Tratamiento
  const [dataApiTratamiento, setDataApiTratamiento] = useState([])
  const callApiTratamiento = (idTablaDes, idNivel2) => {
    getTablaDescripcionOportunidadN1(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoB', true)
        setDataApiTratamiento(options)

      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo Control
  const [dataApiFortaleza, setDataApiFortaleza] = useState([])
  const callApiFortaleza = (idTablaDes) => {
    getTablaDescripcionOportunidadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoA', true)
        setDataApiFortaleza(_.orderBy(options, ['value'], ['desc']))
        setSpin(false)
      }).catch((error) => {
        console.log('Error: ', error)
      })
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
                <span className='pr-3'>Editar Matriz de Oportunidad</span>

                {(formValueInitialDatosToEdit.estadoRegistro === 'Autorizado') ?
                  <span className='pr-3 text-primary font-weight-bold'>{formValueInitialDatosToEdit.codigo}</span>
                  : null}

                {(formValueInitialDatosToEdit.estadoRegistro === 'Autorizado') ?
                  <Badge className="px-4 badge-success-light">{formValueInitialDatosToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosToEdit.estadoRegistro === 'Descartado') ?
                  <Badge className="px-4 badge-danger">{formValueInitialDatosToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosToEdit.estadoRegistro === 'Pendiente') ?
                  <Badge className="px-4 badge-warning-light">{formValueInitialDatosToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialDatosToEdit.estadoRegistro === 'Observado') ?
                  <Badge className="px-4 badge-danger-light">{formValueInitialDatosToEdit.estadoRegistro}</Badge>
                  : null}
              </CardTitle>
            </CardHeader>
            <CardBody>
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
                        <Columns size={20} /><span className='pl-2 h6 font-weight-bold'>Descripcion</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '3' })}>
                        <span className={activeTab === '3' ? '' : 'd-none'}></span>
                        <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Oportunidad</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '4' })}>
                        <span className={activeTab === '4' ? '' : 'd-none'}></span>
                        <Trello size={20} /><span className='pl-2 h6 font-weight-bold'>Controles</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '5' })}>
                        <span className={activeTab === '5' ? '' : 'd-none'}></span>
                        <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de Acción y Seguimiento</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <DatosIniciales
                        nextSection={nextSection}
                        setObject={setObject}
                        initValues={formValueInitialDatosToEdit}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="2">
                      <Descripcion
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialDescripcionToEdit}
                        optionsFactores={optionsFactores}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="3">
                      <Oportunidad
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialOportunidadToEdit}
                        dataApiTratamiento={dataApiTratamiento}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="4">
                      <Controles
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialControlesToEdit}
                        dataApiFortaleza={dataApiFortaleza}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="5">
                      <PlanesSeguimiento
                        beforeSection={beforeSection}
                        initValues={formValueInitialPlanesToEdit}
                        handleOnSubmmit={handleOnSubmmit}
                        isEdit={true}
                      />
                    </TabPane>

                  </TabContent>
                </Col>
              </Row>
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
export default MatrizOportunidadEditar
