import React from 'react'
import { CDropdown, CDropdownMenu, CDropdownToggle, CDropdownItem, CTooltip } from '@coreui/react';
import { XCircle, CheckCircle, MoreVertical } from 'react-feather'

const ActionFormatterEvaluar = ({ cell, row, autorizarFunction, descartarFunction }) => {

  return (
    <div>
      <CDropdown className="pb-2">
        <CTooltip content="Más opciones" placement="left" >
          <CDropdownToggle className='icon-btn hide-arrow' color='transparent' size="sm">
            <MoreVertical size={15} className='text-dark'/>
          </CDropdownToggle>
        </CTooltip>
        <CDropdownMenu placement="right">
          <CDropdownItem href="#" onClick={() => {
            autorizarFunction(row)
          }} >
            <CheckCircle size={15} className='mr-2 text-success'/>Autorizar
          </CDropdownItem>
          <CDropdownItem href="#" onClick={() => {
            descartarFunction(row)
          }} >
            <XCircle size={15} className='mr-2 text-danger'/>Descartar
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}
export default ActionFormatterEvaluar
