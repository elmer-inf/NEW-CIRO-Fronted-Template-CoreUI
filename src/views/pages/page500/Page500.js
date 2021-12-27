import React from 'react'
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'



const Page500 = () => {
  const history = useHistory();

  const closeSession = () => {
    //Auth.logout();
    history.push('/login')
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">Error</h1>
              <h4 className="pt-3">Permisos no asignados</h4>
              <p className="text-muted float-left">Favor validar que el rol al que su usuario esta asociado cuente con permisos para acceder al Sistema.</p>
            </span>

            <Button
              color="primary"
              onClick={() => closeSession()}
              block
              outline
            >
              Iniciar sesión
            </Button>
          </CCol>

        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
