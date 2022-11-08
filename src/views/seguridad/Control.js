import React, { Fragment } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap';

const SeguridadListar = () => {

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>Control de Riesgo en Seguridad</CardTitle>
              {/* <Button color='primary' onClick={redirect} className='float-right mt-1' style={{ width: '130px' }}>
                <span className='text-white'>Registrar</span>
              </Button> */}
            </CardHeader>
            <CardBody className='pb-4'>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default SeguridadListar
