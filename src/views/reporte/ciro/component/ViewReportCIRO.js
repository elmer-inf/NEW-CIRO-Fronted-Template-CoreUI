import { Col, Row, } from 'reactstrap'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import { FileText } from 'react-feather';
import RiesgooperativoA from '../RiesgooperativoA';
import CuentasContablesB from '../CuentasContablesB';
import TipoEventoC from '../TipoEventoC';
import PuntoAtencionD from '../PuntoAtencionD';
import ProcesoF from '../ProcesoF';
import OperacionG from '../OperacionG';
import LugarH from '../LugarH';
import LineaNegocioI from '../LineaNegocioI';
import CanalE from '../CanalE';


const ViewReportCIRO = ({ fechaInicio, fechaFin, loadDataCiro }) => {

  return (
    <div>
      <Row>
        <Col xs="12" className="mb-4 mt-2">
          <CTabs>
            <CNav variant="tabs" className='justify-content-center font-weight-bold h6'>
              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Riesgo operativo</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Cuentas contables</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Tipo evento</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>{'Punto de Atención \n Financiera (PAF)'}</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Canal</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Proceso</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Operación</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Lugar</span>
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink>
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Línea de negocio</span>
                </CNavLink>
              </CNavItem>

            </CNav>
            <CTabContent>
              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <RiesgooperativoA fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro}/>
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <CuentasContablesB fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <TipoEventoC fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <PuntoAtencionD fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <CanalE fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <ProcesoF fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <OperacionG fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <LugarH fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <LineaNegocioI fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} loadDataCiro={loadDataCiro} />
                  </Col>
                </Row>
              </CTabPane>

            </CTabContent>
          </CTabs>
        </Col>
      </Row>

    </div>
  )
}

export default ViewReportCIRO
