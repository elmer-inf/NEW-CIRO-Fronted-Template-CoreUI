import { React, useEffect, useState } from 'react'
import DatosIniciales from './seccionesFormulario/DatosIniciales'
import DefinicionRiesgos from './seccionesFormulario/DefinicionRiesgos'
import Controles from './seccionesFormulario/Controles'
import RiesgoResidual from './seccionesFormulario/RiesgoResidual'
import PlanesSeguimiento from './seccionesFormulario/PlanesSeguimiento'
import Valoracion from './seccionesFormulario/Valoracion'
import { FileText, BarChart2, ChevronRight, CheckSquare, PieChart, Trello, TrendingUp } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, Badge } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { putRiesgoId } from './controller/RiesgoController';
import { ToastContainer, toast } from 'react-toastify';
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { getRiesgoId } from './controller/RiesgoController';
import { buildOptionSelect, buildOptionSelectThree, buildSelectTwo } from 'src/functions/Function'
import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController';

var _ = require('lodash');

const MatrizRiesgoEditar = ({ match }) => {

  const history = useHistory();
  const [spin, setSpin] = useState(true);

  // Options Monetario
  const optionsMonetario = [
    { value: true, label: 'Si' },
    { value: false, label: 'No' }
  ]

  // Options Objetivo
  const optionsObjetivo = [
    { value: 'Probabilidad', label: 'Probabilidad' },
    { value: 'Impacto', label: 'Impacto' },
    { value: 'Ambos', label: 'Ambos' },
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
    identificadoId: null,
    identificadoOtro: '',
    eventoRiesgoId: null,
    eventoMaterializado: ''
  }

  const formValueInitialDefinicionRiesgos = {
    definicion: '',
    causa: '',
    consecuencia: '',
    efectoPerdidaOtro: '',
    efectoPerdidaId: null,
    perdidaAsfiId: null,
    monetario: false,
    factorRiesgoId: null,

    probabilidadId: null,
    impactoId: null
  }

  const formValueInitialControles = {
    controlId: '',
    controlObjetivo: '',
    controlComentario: '',

    controlesTiene: 'false',
    nroControles: '',
    controles: []
  }

  const formValueInitialRiesgoResidual = {}

  const formValueInitialPlanesSeguimiento = {
    nroPlanes: '',
    planesAccion: []
  }

  const formValueInitialValoracion = {
    criterioImpacto: '',
    criterioprobabilidad: '',
    impactoUSD: 0
  }

  const [formValueInitialDatosToEdit, setformValueInitialDatosToEdit] = useState(formValueInitialDatosIniciales);
  const [formValueInitialDefinicionToEdit, setformValueInitialDefinicionToEdit] = useState(formValueInitialDefinicionRiesgos);
  const [formValueInitialControlesToEdit, setformValueInitialControlesToEdit] = useState(formValueInitialControles);
  const [formValueInitialPlanesToEdit, setformValueInitialPlanesToEdit] = useState(formValueInitialPlanesSeguimiento);
  const [formValueInitialValorToEdit, setformValueInitialValorToEdit] = useState(formValueInitialValoracion);

  const dataResult = {
    ...formValueInitialDatosToEdit,
    ...formValueInitialDefinicionToEdit,
    ...formValueInitialControlesToEdit,
    ...formValueInitialRiesgoResidual,
    ...formValueInitialPlanesToEdit,
    ...formValueInitialValorToEdit
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
      identificadoId: buildOptionSelect(args.identificadoId, 'id', 'nombre', true, 'identificadoId'),
      identificadoOtro: args.identificadoOtro,
      eventoRiesgoId: buildOptionSelectThree(args.eventoRiesgoId, 'id', 'id', 'codigo', true, 'eventoRiesgoId'),
      eventoMaterializado: args.eventoMaterializado,
    };

    const definicionRiesgos = {
      definicion: args.definicion,
      causa: args.causa,
      consecuencia: args.consecuencia,
      efectoPerdidaOtro: args.efectoPerdidaOtro,
      efectoPerdidaId: buildOptionSelect(args.efectoPerdidaId, 'id', 'nombre', true, 'efectoPerdidaId'),
      perdidaAsfiId: buildOptionSelect(args.perdidaAsfiId, 'id', 'nombre', true, 'perdidaAsfiId'),
      monetario: args.monetario,
      factorRiesgoId: buildOptionSelect(args.factorRiesgoId, 'id', 'nombre', true, 'factorRiesgoId'),

      probabilidadId: buildOptionSelect(args.probabilidadId, 'id', 'campoD', true, 'probabilidadId'),
      impactoId: buildOptionSelect(args.impactoId, 'id', 'campoD', true, 'impactoId'),
    };

    const controles = {
      controlId: buildOptionSelect(args.controlId, 'id', 'campoA', false, 'controlId'),
      controlObjetivo: { value: args.controlObjetivo, label: args.controlObjetivo },
      controlComentario: args.controlComentario,

      controlesTiene: (args.controlesTiene === true) ? 'true' : (args.controlesTiene === false) ? 'false' : '',
      nroControles: (JSON.parse(args.controles).length !== 0) ? JSON.parse(args.controles).length : '',
      controles: JSON.parse(args.controles)
    };

    const planesAccion = {
      nroPlanes: (JSON.parse(args.planesAccion).length !== 0) ? JSON.parse(args.planesAccion).length : '',
      planesAccion: JSON.parse(args.planesAccion)
    };

    const valoracion = {
      criterioImpacto: args.criterioImpacto,
      criterioprobabilidad: args.criterioprobabilidad,
      impactoUSD: args.impactoUSD
    };

    setformValueInitialDatosToEdit(datosIniciales);
    setformValueInitialDefinicionToEdit(definicionRiesgos);
    setformValueInitialControlesToEdit(controles);
    setformValueInitialPlanesToEdit(planesAccion);
    setformValueInitialValorToEdit(valoracion);
  }

  // Matriz de Riesgo ID
  const getById = async (idEventoRiesgo) => {
    setSpin(true)
    await getRiesgoId(idEventoRiesgo)
      .then((response) => {
        const res = response.data;
        console.log('Datos a editar de  Matriz Riesgo: ', res);
        macthedValues(res);
        callApiRiesgoI(9);
        callApiControl(5);
        callApiProbabilidad(2);
        //setSpin(false)
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

  // Para almacenar Datos Auxiliares de seccion a otra seccion
  const [dataAuxSeccion1, setDataAuxSeccion1] = useState([])
  const [dataAuxSeccion2, setDataAuxSeccion2] = useState([])
  const [dataAuxSeccion3, setDataAuxSeccion3] = useState([])
  const [dataAuxSeccion4, setDataAuxSeccion4] = useState([])

  const setObject = (result, realValues) => {
    //console.log("result: ", result)
    const values = {
      ...requestData,
      ...result
    }

    // Obtiene label Proceso para busqueda en Seccion Controles: Select Proceso
    if (activeTab === '1' && realValues !== undefined) {
      const dataAuxSeccion1 = {
        procedimientoAux: realValues.procedimientoId.label,
      }
      setDataAuxSeccion1(dataAuxSeccion1)
    }
    // FIN Obtiene data Proceso para busqueda en Seccion Controles: Select Proceso

    // Obtiene valores auxiliares de "Definicion y Riesgo inherente" para "Valoracion cuantitativa y Riesgo residual"
    if (activeTab === '2' && realValues !== undefined) {
      const dataAuxSeccion2 = {
        efectPerdidaAux: realValues.efectoPerdidaId !== null ? realValues.efectoPerdidaId.label : realValues.efectoPerdidaOtro,
        perdidaAsfiAux: realValues.perdidaAsfiId.label,

        probabilidaNivelAux: realValues.probabilidadId.campoA,
        impactoNivelAux: realValues.impactoId.campoA,
      }
      setDataAuxSeccion2(dataAuxSeccion2)
    }
    // FIN Obtiene valores auxiliares de "Definicion y Riesgo inherente" para "Valoracion cuantitativa y Riesgo residual"

    // Obtiene valores auxiliares de "Controles" para "Riesgo residual"
    if (activeTab === '3' && realValues !== undefined) {
      const dataAuxSeccion3 = {
        controlIdAux: (typeof realValues.controlId === 'object') ? realValues.controlId.value : realValues.controlId,
        controlObjetivoAux: (typeof realValues.controlObjetivo === 'object') ? realValues.controlObjetivo.value : realValues.controlObjetivo,
      }
      setDataAuxSeccion3(dataAuxSeccion3)
    }
    // FIN Obtiene valores auxiliares de "Controles" para "Riesgo residual"

    // Obtiene valores auxiliares de "Riesgo residual" para "Valoracion cuantitativa"
    if (activeTab === '4' && realValues !== undefined) {
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
    //setSpin(true);
    const dataRequest = setObject(values);
    const dataValues = {
      ...dataRequest,
      controles: JSON.stringify(dataRequest.controles),
      planesAccion: JSON.stringify(dataRequest.planesAccion)
    }

    //console.log('Lo que se enviara en el request: ', dataValues);

    const idRiesgo = match.params.id;
    putRiesgoId(idRiesgo, dataValues)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res)
          notificationToast('success', 'Matriz de Riesgo modificada exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al obtener datos: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  // Nivel de riesgo inherente
  const [dataApiRiesgoI, setDataApiRiesgoI] = useState([])
  const callApiRiesgoI = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true);
        setDataApiRiesgoI(options);
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Control
  const [dataApiControl, setDataApiControl] = useState([])
  const callApiControl = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoA', true);
        setDataApiControl(_.orderBy(options, ['value'], ['desc']));
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(options);
        setSpin(false);
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
                <span className='pr-3'>Editar Matriz de Riesgo</span>

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
                        <FileText size={20} /><span className='pl-2 h6 font-weight-bold'>Datos</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '2' })}>
                        <span className={activeTab === '2' ? '' : 'd-none'}></span>
                        <BarChart2 size={20} /><span className='pl-2 h6 font-weight-bold'>Definición y Riesgo inherente</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '3' })}>
                        <span className={activeTab === '3' ? '' : 'd-none'}></span>
                        <Trello size={20} /><span className='pl-2 h6 font-weight-bold'>Controles</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '4' })}>
                        <span className={activeTab === '4' ? '' : 'd-none'}></span>
                        <TrendingUp size={20} /><span className='pl-2 h6 font-weight-bold'>Riesgo residual</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={classnames({ active: activeTab === '5' })}>
                        <span className={activeTab === '5' ? '' : 'd-none'}></span>
                        <CheckSquare size={20} /><span className='pl-2 h6 font-weight-bold'>Planes de Acción y Seguimiento</span>
                        <ChevronRight size={17} className='ml-1 d-none d-xl-inline arrow-right-secondary' />
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
                        initValues={formValueInitialDatosToEdit}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="2">
                      <DefinicionRiesgos
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialDefinicionToEdit}
                        optionsMonetario={optionsMonetario}
                        dataApiRiesgoI={dataApiRiesgoI}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="3">
                      <Controles
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialControlesToEdit}
                        dataAux={dataAuxSeccion1}
                        dataApiControl={dataApiControl}
                        optionsObjetivo={optionsObjetivo}
                        isEdit={true}
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
                        dataApiControl={dataApiControl}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="5">
                      <PlanesSeguimiento
                        nextSection={nextSection}
                        beforeSection={beforeSection}
                        setObject={setObject}
                        initValues={formValueInitialPlanesToEdit}
                        isEdit={true}
                      />
                    </TabPane>

                    <TabPane tabId="6">
                      <Valoracion
                        beforeSection={beforeSection}
                        initValues={formValueInitialValorToEdit}
                        dataAux={dataAuxSeccion2}
                        dataAux2={dataAuxSeccion4}
                        dataApiProbabilidad={dataApiProbabilidad}
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
export default MatrizRiesgoEditar
