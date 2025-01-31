import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTooltip } from '@coreui/react';
import React from 'react';
import { Edit3, FileText, MoreVertical, Trash2 } from 'react-feather';
import Swal from 'sweetalert2';

const ActionFormatterEvento = ({ row, detailFunction, editFunction, deleteFunction, allowDelete }) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary text-white',
      cancelButton: 'btn btn-outline-primary',
    },
    buttonsStyling: false
  });

  const confirmDelete = () => {
    if (row.codigo !== null && row.estadoRegistro === 'Autorizado') {
      swalWithBootstrapButtons.fire({
        title: '',
        text: 'El registro está Autorizado y no puede ser eliminado.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        position: 'top'
      });
    } else {
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: 'No podrás deshacer esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
        position: 'top',
        customClass: {
          confirmButton: 'btn btn-primary text-white',
          cancelButton: 'btn btn-outline-primary ml-4',
        },
      }).then((result) => {
        if (result.isConfirmed && deleteFunction) {
          deleteFunction(row);
        }
      });
    }
  };


  return (
    <div>
      <CDropdown className='pb-2'>
        <CTooltip content='Más opciones' placement='left'>
          <CDropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
            <MoreVertical size={15} className='text-dark' />
          </CDropdownToggle>
        </CTooltip>
        <CDropdownMenu className='mt-4' placement='left'>
          <CDropdownItem onClick={() => detailFunction(row)}>
            <FileText size={15} className='mr-2 text-primary' /> Mostrar
          </CDropdownItem>
          <CDropdownItem href='#' onClick={() => editFunction(row)}>
            <Edit3 size={15} className='mr-2 text-primary' /> Editar
          </CDropdownItem>
          {allowDelete ? (
          <CDropdownItem href='#' onClick={confirmDelete}>
            <Trash2 size={15} className='mr-2 text-primary' /> Eliminar
          </CDropdownItem>
        ) : null}
        </CDropdownMenu>
      </CDropdown>
    </div>
  );
};

export default ActionFormatterEvento;
