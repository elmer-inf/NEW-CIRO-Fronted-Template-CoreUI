/*import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import { User } from 'react-feather'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {/* <CImg
            src={'/avatars/6.jpg'}
            className="c-avatar-img"
            alt=""
          />
          <User size={50}/>
          {/* <Circle size={50}/>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown*/
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
            <span className='font-weight-bolder'>{user.nombre + ' ' + user.primerApellido}</span><User size={28} className='ml-4 text-dark'/>
           {/* <FaSortDown/> */}
          </div>
        </DropdownToggle>
        <DropdownMenu right>

          <DropdownItem onClick={()=> closeModal()}>
            <User size={18} className='text-primary mr-3'/> Perfil
          </DropdownItem>

          <DropdownItem divider />

          <DropdownItem onClick={() => closeSession()}>
          <LogOut size={18} className='text-primary mr-3'/> Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {modal && <ModalProfile profileData={profile} mod={modal} closeModal={closeModal} />}
    </Nav>

  )
}

export default TheHeaderDropdown
