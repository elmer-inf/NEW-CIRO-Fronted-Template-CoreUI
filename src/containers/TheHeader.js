import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
/* import { CardHeader, Row } from 'reactstrap' */
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown
}  from './index'
import TheHeaderDropdownNotif from './TheHeaderDropdownNotif'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader className='mx-3 mx-md-4 mt-4 mb-0 card'>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo"/> */}
        <CIcon
          className="c-sidebar-brand-full text-center"
          src = "/logo/nombre-logo.png"
          name="logo-negative"
          height={15}
        />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <span className='text-primary h4 pl-1 pt-2'>
          <b><i>SISTEMA DE GESTION</i></b>
        </span>
        <span  style={{color: '#009eb2'}} className='h4 pl-1 pt-2'>
          <b><i>DE RIESGOS INTEGRALES</i></b>
        </span>

        {/* <CIcon
          className="c-sidebar-brand-full pl-2"
          src = "/logo/titulo.png"
          name="logo-negative"
          height={20}
        /> */}
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
{/*         <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between" >
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={routes}
          />
            {/* <div className="d-md-down-none mfe-2 c-subheader-nav">
              <CLink className="c-subheader-nav-link"href="#">
                <CIcon name="cil-speech" alt="Settings" />
              </CLink>
              <CLink 
                className="c-subheader-nav-link" 
                aria-current="page" 
                to="/dashboard"
              >
                <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
              </CLink>
              <CLink className="c-subheader-nav-link" href="#">
                <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
              </CLink>
            </div> */}
        </CSubheader>
    </CHeader>
  )
}
export default TheHeader