import React from 'react'
import CIcon from '@coreui/icons-react'
//import { Edit, Circle, Calendar } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalendarMinus, faChartLine } from '@fortawesome/free-solid-svg-icons';

const _nav =  [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Administración',
    route: '/administracion',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px'}} icon={faEdit}/>,
    //icon: <Edit size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Eventos de riesgo',
        //icon: <Circle size={10} className='mr-2'/>,
        to: '/administracion/evento-riesgo/listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de riesgos',
        to: '/administracion/matriz-riesgo/listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de oportunidades',
        to: '/administracion/matriz-oportunidad/listar',
      }
    ],
  },{

    _tag: 'CSidebarNavDropdown',
    name: 'Eventos de Riesgo',
    route: '/eventoRiesgo',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px'}} icon={faCalendarMinus}/>,
    //icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Lista de Eventos',
        to: '/eventoRiesgo/listar',
      }
    ],
  },{

    _tag: 'CSidebarNavDropdown',
    name: 'Matriz de Riesgo',
    route: '/matrizRiesgo',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px'}} icon={faChartLine}/>,
    //icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Lista de Matrices',
        to: '/matrizRiesgo/listar',
      },
      /* {
        _tag: 'CSidebarNavItem',
        name: 'Registrar',
        icon: <Circle size={10} className='mr-2'/>,
        //icon: 'cil-circle',
        to: '/eventoRiesgo/registrar',
      } */
    ],
  }
]

export default _nav
