import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Card, CardBody, Col, Row, Table } from 'reactstrap';
import { backdrop, keyboard } from 'src/reusable/variables/Variables';

const ModalProfile = ({ profileData, mod, closeModal }) => {
    const [modal, setModal] = useState(mod);

    const toggle = () => { setModal(!modal); closeModal() }

    const showRolString = (array) => {
        var role = array;
        var rol = '';
        for (var i = 0; i < role.length; i++) {
            rol = rol + ' ' + role[i] + ', ';
        }
        return rol;
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={'modal-info'} backdrop={backdrop} keyboard={keyboard}>
                <ModalHeader toggle={toggle}>Perfil</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Table size="sm" striped>
                                                <tbody>
                                                    <tr>
                                                        <th>Usuario:</th>
                                                        <td>{profileData.sub}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <td>{profileData.usuario.nombre}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Apellido:</th>
                                                        <td>{profileData.usuario.primerApellido}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Entidad:</th>
                                                        <td>{profileData.entidad.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rol</th>
                                                        <td>{showRolString(profileData.roles)}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                {/*  <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </div>
    )
}

export default ModalProfile
