import React, { useEffect, useState } from 'react'
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Bell, Calendar } from 'react-feather'
import { getDiezDiasAntes, getCincoDiasAntes, getPlanVencido } from 'src/views/eventoRiesgo/controller/EventoController'
import { buildSelectTwo } from 'src/functions/Function'
import { Button, ListGroup, ListGroupItem } from 'reactstrap'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'

const TheHeaderDropdownNotif = () => {

  const history = useHistory();

  // Eventos 10 dias antes de vencer el plan
  const [listDiezDiasAntes, setDiezDiasAntes] = useState([])
  const callApiDiezDiasAntes = () => {
    getDiezDiasAntes()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'codigo', true)
        console.log('options : ', options)
        setDiezDiasAntes(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Eventos 5 dias antes de vencer el plan
  const [listCincoDiasAntes, setCincoDiasAntes] = useState([])
  const callApiCincoDiasAntes = () => {
    getCincoDiasAntes()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'codigo', true)
        console.log('options : ', options)
        setCincoDiasAntes(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Eventos con plan vencido
  const [listPlanVencido, setPlanVencido] = useState([])
  const callApiPlanVencido = () => {
    getPlanVencido()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'codigo', true)
        console.log('options : ', options)
        setPlanVencido(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiDiezDiasAntes();
    callApiCincoDiasAntes();
    callApiPlanVencido();
  }, [])



  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 mr-4"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <Bell size={20} />
        <CBadge shape="pill" color="primary"><span className='text-white'>{listDiezDiasAntes.length + listCincoDiasAntes.length + listPlanVencido.length}</span></CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0" style={{maxHeight: '250px', overflowY: 'scroll'}}>
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listDiezDiasAntes.length} Evento(s) a 10 dias de vencer la fecha fin del Plan de Acción</strong>
        </CDropdownItem>
        {
          listDiezDiasAntes !== null && listDiezDiasAntes.length !== 0?
            <ListGroup flush className='pt-2'>
              {listDiezDiasAntes.map((evento) => {
                return  <ListGroupItem className='py-1' key={evento.value}>
                          <Calendar size={15} className='text-success mr-2'/>
                          {/* <Link to={{ pathname: '/eventoRiesgo/Mostrar/' + evento.id }} className='text-dark'> */}
                            {evento.id} | {evento.codigo !== null ? evento.codigo : <span>Sin código</span>} | {evento.fechaFinPlan}
                          {/* </Link> */}
                        </ListGroupItem>
              })}
            </ListGroup>
            : <CDropdownItem header><i>Sin notificaciones</i></CDropdownItem>
        }
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listCincoDiasAntes.length} Evento(s) a 5 dias de vencer la fecha fin del Plan de Acción</strong>
        </CDropdownItem>
        {
          listCincoDiasAntes !== null && listCincoDiasAntes.length !== 0?
            <ListGroup flush className='pt-2'>
              {listCincoDiasAntes.map((evento) => {
                return  <ListGroupItem className='py-1' key={evento.value}>
                          <Calendar size={15} className='text-primary mr-2'/>
                          {/* <Link to={{ pathname: '/eventoRiesgo/Mostrar/' + evento.id }} className='text-dark'> */}
                            {evento.id} | {evento.codigo !== null ? evento.codigo : <span>Sin código</span>} | {evento.fechaFinPlan}
                          {/* </Link> */}
                        </ListGroupItem>
              })}
            </ListGroup>
            : <CDropdownItem header><i>Sin notificaciones</i></CDropdownItem>
        }
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listPlanVencido.length} Evento(s) que {listPlanVencido.length === 1 ? 'venció' : 'vencieron'} a la fecha fin del Plan de Acción</strong>
        </CDropdownItem>
        {
          listPlanVencido !== null && listPlanVencido.length !== 0?
            <ListGroup flush className='pt-2'>
              {listPlanVencido.map((evento) => {
                return  <ListGroupItem className='py-1' key={evento.value}>
                          {/* <Link to={{ pathname: '/eventoRiesgo/Mostrar/' + evento.id }} className='text-dark'> */}
                            <Calendar size={15} className='text-danger mr-2'/>
                            {evento.id} | {evento.codigo !== null ? evento.codigo : <span>Sin código</span>} | {evento.fechaFinPlan}
                          {/* </Link> */}
                        </ListGroupItem>
              })}
            </ListGroup>
            : <CDropdownItem header><i>Sin notificaciones</i></CDropdownItem>
        }
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif