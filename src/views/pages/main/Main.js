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
                                        <Col md="4" sm="4"></Col>
                                        <Col md="4" sm="4" style={{ display: 'flex',textAlign: 'center', paddingTop:'5%', paddingBottom:'5%'}}>
                                            <CIcon
                                                className="c-sidebar-brand-minimized"
                                                name="sygnet"
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
