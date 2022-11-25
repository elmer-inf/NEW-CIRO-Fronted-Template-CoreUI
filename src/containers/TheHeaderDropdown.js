import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthService from 'src/views/authentication/AuthService';
import ModalProfile from './ModalProfile';
import { LogOut, User } from 'react-feather';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';

const TheHeaderDropdown = () => {

  const history = useHistory();
  const [modal, setModal] = useState(false)

  const Auth = new AuthService();
  const profile = Auth.getProfile();
  const user = profile.usuario;

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

  useEffect(() => {
    askIfIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <span className='font-weight-bolder system-tittle text-primary'>{user.nombre + ' ' + user.primerApellido}</span>
        <User size={28} className='ml-4 text-dark' />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => closeModal()}>
          <User size={18} className='text-primary mr-3' /> Perfil
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={() => closeSession()}>
          <LogOut size={18} className='text-primary mr-3' /> Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
      {modal &&
        <ModalProfile profileData={profile} mod={modal} closeModal={closeModal} />
      }
    </CDropdown>

  )
}
export default TheHeaderDropdown
