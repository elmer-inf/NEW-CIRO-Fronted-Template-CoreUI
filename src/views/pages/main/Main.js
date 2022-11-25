import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap';
import CIcon from '@coreui/icons-react';

const Main = () => {

  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col sm="12" className='d-flex justify-content-center my-5'>
              <CIcon
                src="/avatars/logo.png"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default Main
