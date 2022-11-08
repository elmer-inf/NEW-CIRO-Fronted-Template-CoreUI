import React from 'react'
import { Col, Row, } from 'reactstrap'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';
import { FileText } from 'react-feather';
import RiesgooperativoA from './secciones/RiesgooperativoA';
import CuentasContablesB from './secciones/CuentasContablesB';
import TipoEventoC from './secciones/TipoEventoC';
import PuntoAtencionD from './secciones/PuntoAtencionD';
import CanalE from './secciones/CanalE';
import ProcesoF from './secciones/ProcesoF';
import OperacionG from './secciones/OperacionG';
import LugarH from './secciones/LugarH';
import LineaNegocioI from './secciones/LineaNegocioI';


const ViewReportCIRO = ({ fechaInicio, fechaFin, trimestre }) => {
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
                  <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Linea de negocio</span>
                </CNavLink>
              </CNavItem>

            </CNav>
            <CTabContent>
              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <RiesgooperativoA fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <CuentasContablesB fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <TipoEventoC fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <PuntoAtencionD fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <CanalE fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <ProcesoF fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <OperacionG fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <LugarH fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
                  </Col>
                </Row>
              </CTabPane>

              <CTabPane>
                <Row className='pt-3'>
                  <Col xs='12'>
                    <LineaNegocioI fechaIniTrim={fechaInicio} fechaFinTrim={fechaFin} />
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
