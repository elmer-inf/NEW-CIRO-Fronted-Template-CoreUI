import { React, useState, useEffect } from 'react'
//import ImportesRelacionados from './seccion/ImportesRelacionados'
//import CategoriaNegocio from './seccion/CategoriaNegocio'
import DatosIniciales from './seccionesFormulario/DatosInicialesDefinicion'
import Riesgos from './seccionesFormulario/Riesgos'
import { FileText, Activity, DollarSign, BarChart2, ChevronRight, AlertTriangle, List, CheckSquare, PieChart } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, TabContent, TabPane, NavLink, NavItem, Nav, FormGroup, Label, } from 'reactstrap';
import CInputRadio from 'src/reusable/CInputRadio'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames';
import { postMatrizRiesgo, getTablaDescripcionNivel } from './controller/MatrizRiesgoController';
import { buildSelectTwo } from 'src/functions/Function'

const MatrizRiesgoRegistrar = () => {

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


  const formValueInitialDatosDefinicion = {

    areaId : null,
    unidadId : null,
    procesoId : null,
    procedimientoId : null,
    duenoCargoId : null,
    responsableCargoId : null,
    fechaEvaluacion : '',
    identificadoId : null,
    identificadoOtro : '',

    definicion : '',
    causa : '',
    consecuencia : '',
    defConcatenado : '',
    efectoPerdidaId : null,
    perdidaAsfiId : null,
    monetario : false,
    factorRiesgoId: null
  }

  const formValueInitialRiesgos = {
    probabilidadId: null,
    impactoId : null,
    riesgoInherente : 0,
    valorRiesgoInherente : 0
  }

  const formValueInitialCategoria = {

  }

  const formValueInitialImportes = {
    
  }

 

  const dataResult = {
    ...formValueInitialDatosDefinicion,
    ...formValueInitialRiesgos,
    ...formValueInitialCategoria,
    ...formValueInitialImportes,
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

  const handleOnSubmmit = (values) => {
    const dataRequest = setObject(values);

    console.log('Lo que se enviara en el request: ', dataRequest)

    postMatrizRiesgo(dataRequest)
    .then(res => {
      if (res.status === 200) {
        console.log('Envio el request: ', res)
        history.push("/matrizRiesgo/listar")
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
          <CardTitle className='float-left h4 pt-2'>Registrar Matriz de Riesgo</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" md="12" className="mb-4">
              <Nav tabs className='justify-content-center'>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '1' })}>
                    <span className={activeTab === '1' ? '' : 'd-none'}></span>
                    <FileText size={25} /><span className='pl-2'>Datos iniciales y Definición del riesgo</span>
                    <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '2' })}>
                    <span className={activeTab === '2' ? '' : 'd-none'}></span>
                    <BarChart2 size={25} /><span className='pl-2'>Riesgo inherente y residual</span>
                    <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '3' })}>
                    <span className={activeTab === '3' ? '' : 'd-none'}></span>
                    <CheckSquare size={25} /><span className='pl-2'>Controles actuales</span>
                    <ChevronRight size={17} className='ml-3 d-none d-xl-inline' style={{ color: 'black', opacity: 0.6 }} />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className={classnames({ active: activeTab === '4' })}>
                    <span className={activeTab === '4' ? '' : 'd-none'}></span>
                    <PieChart size={25} /><span className='pl-2'>Valoración cuantitativa</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <DatosIniciales
                    nextSection={nextSection}
                    setObject={setObject}
                    initValues={formValueInitialDatosDefinicion}
                    //isEdit={false}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Riesgos
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialRiesgos}
                    //isEdit={false}
                    //arrayCampoSelected={[]}
                  />
                </TabPane>
                <TabPane tabId="3">
                  {/* <ImportesRelacionados
                    nextSection={nextSection}
                    beforeSection={beforeSection}
                    setObject={setObject}
                    initValues={formValueInitialImportes}
                    //isEdit={true}
                    //arrayColumnaSelected={[]}
                  /> */}
                </TabPane>

                <TabPane tabId="4">
                  {/* <RiesgosRelacionados
                    beforeSection={beforeSection}
                    initValues={formValueInitialRiesgos}
                    tipoEvento={formik.values.tipoEvento}
                    handleOnSubmmit={handleOnSubmmit}
                    //isEdit={true}
                    //arrayColumnaSelected={[]}
                  /> */}
                </TabPane>

              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
export default MatrizRiesgoRegistrar
