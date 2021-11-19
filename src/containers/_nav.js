import React from 'react'
//import CIcon from '@coreui/icons-react'
import { Edit, Circle, Calendar } from 'react-feather'

const _nav =  [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Administración',
    route: '/administracion',
    icon: <Edit size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Eventos de riesgo',
        icon: <Circle size={10} className='mr-2'/>,
        to: '/administracion/evento-riesgo/listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de riesgos',
        icon: <Circle size={10} className='mr-2'/>,
        to: '/administracion/matriz-riesgo/listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de oportunidades',
        icon: <Circle size={10} className='mr-2'/>,
        to: '/administracion/matriz-oportunidad/listar',
      }
    ],
  },{

    _tag: 'CSidebarNavDropdown',
    name: 'Eventos de Riesgo',
    route: '/eventoRiesgo',
    icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listar',
        icon: <Circle size={10} className='mr-2'/>,
        //icon: 'cil-circle',
        to: '/eventoRiesgo/listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Registrar',
        icon: <Circle size={10} className='mr-2'/>,
        //icon: 'cil-circle',
        to: '/eventoRiesgo/registrar',
      }
    ],
  }
]

export default _nav
