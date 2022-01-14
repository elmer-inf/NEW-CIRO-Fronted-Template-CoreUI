/* import React from 'react'
//import { Edit, Circle, Calendar } from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCalendarMinus, faChartLine, faChartBar, faShieldAlt, faShieldVirus, faUserShield, faPrint } from '@fortawesome/free-solid-svg-icons';

const _nav = [
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Administración',
    route: '/administracion',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faEdit} />,
    //icon: <Edit size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Eventos de riesgo',
        //icon: <Circle size={10} className='mr-2'/>,
        to: '/administracion/evento-riesgo/Listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de riesgos',
        to: '/administracion/matriz-riesgo/Listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Matriz de oportunidades',
        to: '/administracion/matriz-oportunidad/Listar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Seguridad',
        to: '/administracion/seguridad/Listar',
      }
    ],
  }, {
    _tag: 'CSidebarNavDropdown',
    name: 'Eventos de Riesgo',
    route: '/eventoRiesgo',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faCalendarMinus} />,
    //icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Eventos',
        to: '/eventoRiesgo/Listar',
      }
    ],
  }, {
    _tag: 'CSidebarNavDropdown',
    name: 'Matriz de Riesgo',
    route: '/matrizRiesgo',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faChartLine} />,
    //icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Riesgos',
        to: '/matrizRiesgo/Listar',
      }
    ],
  }, {
    _tag: 'CSidebarNavDropdown',
    name: 'Matriz de Oportunidad',
    route: '/matrizOportunidad',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faChartBar} />,
    //icon: <Calendar size={20} className='mr-3'/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Oportunidades',
        to: '/matrizOportunidad/Listar',
      }
    ],
  }, {
    _tag: 'CSidebarNavDropdown',
    name: 'Módulo de Seguridad',
    route: '/seguridad',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faShieldAlt} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Seguridad',
        to: '/seguridad/Listar',
      }//,
      //{
       // _tag: 'CSidebarNavItem',
       // name: 'Control',
        //to: '/seguridad/Control',
      //}
    ]
  }, {
    _tag: 'CSidebarNavDropdown',
    name: 'Módulo de Reportes',
    route: '/reporte',
    icon: <FontAwesomeIcon style={{ flex: '0 0 56px', marginLeft: '-1rem', fontSize: '18px' }} icon={faPrint} />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Reporte Eventos',
        to: '/reporte/evento-riesgo',
      }
    ]
  }
]

export default _nav
 */