import React from 'react'
import { CDropdown, CDropdownMenu, CDropdownToggle, CDropdownItem, CTooltip } from '@coreui/react';
import { Edit3, MoreVertical, Trash2 } from 'react-feather'

const ActionFormatter = ({ row, editFunction, deleteFunction }) => {

  return (
    <div>
      <CDropdown className='pb-2'>
        <CTooltip content="Más opciones" placement="left" >
          <CDropdownToggle className='icon-btn hide-arrow' color='transparent' size="sm">
            <MoreVertical size={15} className='text-dark'/>
          </CDropdownToggle>
        </CTooltip>
        <CDropdownMenu placement="left">
          <CDropdownItem href="#" onClick={() => {
            editFunction(row)
          }} >
            <Edit3 size={15} className='mr-2 text-primary'/>Editar
          </CDropdownItem>

          <CDropdownItem href="#" onClick={() => {
            deleteFunction(row)
          }} >
            <Trash2 size={15} className='mr-2 text-primary'/>Eliminar
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}
export default ActionFormatter