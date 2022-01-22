import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';
import CIcon from '@coreui/icons-react';

const Main = () => {
  //const [spin, setSpin] = useState(false);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>
                <Col sm="12" className='d-flex justify-content-center my-5'>
                  <CIcon
                    src="/avatars/logo.png"
                  // height={35}
                  />
                  {/*     <h4 style={{ textAlign: 'center' }}> Bienvenido {this.state.user.usuario.nombre + ' ' + this.state.user.usuario.primerApellido + ' '}</h4> */}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Main
