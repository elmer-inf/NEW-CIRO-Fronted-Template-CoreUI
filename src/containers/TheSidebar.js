import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CCreateElement, CSidebar, CSidebarBrand, CSidebarNav, CSidebarNavDivider, CSidebarNavTitle, CSidebarMinimizer, CSidebarNavDropdown, CSidebarNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react';

const TheSidebar = ({ navigation }) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      {/*  <CCSpinner show={spin} /> */}

      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src="/logo/logo.png"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          src="/logo/logo-atc.png"
          name="sygnet"
          height={30}
        />

      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
