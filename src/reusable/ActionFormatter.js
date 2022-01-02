import React from 'react'
import { CDropdown, CDropdownMenu, CDropdownToggle, CDropdownItem, CTooltip } from '@coreui/react';
import { Edit3, Trash2, MoreVertical } from 'react-feather'

const ActionFormatter = ({ cell, row, detailFunction, editFunction }) => {

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
          {/* <CDropdownItem onClick={() => {
            // props.deleteRow(props.row)
            detailFunction(row)
          }} >
            <Trash2 size={15} className='mr-2 text-primary'/>Eliminar
          </CDropdownItem> */}
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}
export default ActionFormatter