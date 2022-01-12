import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
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
      <Modal isOpen={modal} toggle={toggle} className={'modal-primary'} backdrop={backdrop} keyboard={keyboard}>
        <ModalHeader toggle={toggle}>Perfil</ModalHeader>
        <ModalBody>
          <Table size="md" borderless bordered className='mt-2'>
            <tbody>
              <tr>
                <td className='text-label'>Usuario:</td>
                <td className='text-data'>{profileData.sub}</td>
              </tr>
              <tr>
                <td className='text-label'>Nombre</td>
                <td className='text-data'>{profileData.usuario.nombre}</td>
              </tr>
              <tr>
                <td className='text-label'>Apellido:</td>
                <td className='text-data'>{profileData.usuario.primerApellido}</td>
              </tr>
              <tr>
                <td className='text-label'>Entidad:</td>
                <td className='text-data'>{profileData.entidad.name}</td>
              </tr>
              <tr>
                <td className='text-label'>Rol:</td>
                <td className='text-data'>{showRolString(profileData.roles)}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" outline onClick={toggle}>Cerrar</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  )
}

export default ModalProfile
