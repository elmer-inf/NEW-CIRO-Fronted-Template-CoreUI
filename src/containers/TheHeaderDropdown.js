import React, { useState, useEffect } from 'react'
import { DropdownItem, DropdownMenu, Dropdown, DropdownToggle, Nav } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import AuthService from 'src/views/authentication/AuthService';
import ModalProfile from './ModalProfile';
import { LogOut, User } from 'react-feather';

const TheHeaderDropdown = () => {

  const [dropdownOpen2, setdropdownOpen2] = useState(false)
  const history = useHistory();
  const [modal, setModal] = useState(false)

  const Auth = new AuthService();
  const profile = Auth.getProfile();
  const user = profile.usuario;

  const toggle2 = () => {
    setdropdownOpen2(!dropdownOpen2);
  }
  const closeModal = () => setModal(!modal);

  const askIfIsLoggedIn = () => {
    if (!Auth.loggedIn()) {
      history.push('/login')
      Auth.logout();
    }
  }

  const closeSession = () => {
    Auth.logout();
    history.push('/login')
  }
  
  // Cycle life
  useEffect(() => {
    askIfIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });


  return (
    <Nav className="ml-auto" navbar>
      <Dropdown isOpen={dropdownOpen2} toggle={toggle2} >
        <DropdownToggle nav>
          <div>
            <span className='font-weight-bolder'>{user.nombre + ' ' + user.primerApellido}</span><User size={28} className='ml-4 text-dark' />
            {/* <FaSortDown/> */}
          </div>
        </DropdownToggle>
        <DropdownMenu right>

          <DropdownItem onClick={() => closeModal()}>
            <User size={18} className='text-primary mr-3' /> Perfil
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem onClick={() => closeSession()}>
            <LogOut size={18} className='text-primary mr-3' /> Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {modal && <ModalProfile profileData={profile} mod={modal} closeModal={closeModal} />}
    </Nav>

  )
}
export default TheHeaderDropdown
