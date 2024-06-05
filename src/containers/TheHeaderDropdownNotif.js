import React, { useEffect, useState } from 'react'
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Bell, Calendar } from 'react-feather'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { getPlanesCincoDiasVencer, getPlanesDiezDiasVencer, getPlanesVencidos } from 'src/views/matrizRiesgo/controller/RiesgoController'

const TheHeaderDropdownNotif = () => {

  // Planes de Riesgo 10 dias antes de vencer
  const [listDiezDiasAntes, setDiezDiasAntes] = useState([]);
  const [listCincoDiasAntes, setCincoDiasAntes] = useState([]);
  const [listPlanesVencidos, setPlanesVencidos] = useState([]);

  const callApiDiezDiasAntes = () => {
    getPlanesDiezDiasVencer()
      .then(res => {
        setDiezDiasAntes(res.data);
      }).catch((error) => {
        console.error('Error: ', error);
      })
  }

  // Planes de Riesgo 5 dias antes de vencer
  const callApiCincoDiasAntes = () => {
    getPlanesCincoDiasVencer()
      .then(res => {
        setCincoDiasAntes(res.data);
      }).catch((error) => {
        console.error('Error: ', error);
      })
  }

  // Planes de Riesgo vencidos
  const callApiPlanVencido = () => {
    getPlanesVencidos()
      .then(res => {
        setPlanesVencidos(res.data);
        console.log('res.data: ', res.data);
      }).catch((error) => {
        console.error('Error: ', error);
      })
  }

  useEffect(() => {
    callApiDiezDiasAntes();
    callApiCincoDiasAntes();
    callApiPlanVencido();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2 mr-4"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <Bell size={20} />
        <CBadge shape="pill" color="primary"><span className='text-white'>{listDiezDiasAntes.length + listCincoDiasAntes.length + listPlanesVencidos.length}</span></CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0" style={{ maxHeight: '250px', overflowY: 'scroll', marginTop: '10px' }}>
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listDiezDiasAntes.length} Riesgos(s) a 10 dias de vencer la fecha de implementación</strong>
        </CDropdownItem>
        {
          listDiezDiasAntes !== null && listDiezDiasAntes.length !== 0 ?
            <ListGroup flush className='pt-2'>
              {listDiezDiasAntes.map((riesgo) => {
                return  <ListGroupItem className='py-1' key={riesgo.descripcion}>
                          <Calendar size={15} className='text-primary mr-2' />
                          {riesgo.idRiesgo} | {riesgo.codigo !== null ? riesgo.codigo : <span>Sin código</span>} | {riesgo.fechaImpl} | 
                          Informado: <CBadge className={riesgo.informadoPorCorreo==='SI'? "ml-1 badge-success px-2" : "ml-1 badge-danger px-1"} >{riesgo.informadoPorCorreo}</CBadge>
                        </ListGroupItem>
              })}
            </ListGroup>
            : <CDropdownItem header><i>Sin notificaciones</i></CDropdownItem>
        }
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listCincoDiasAntes.length} Riesgos(s) a 5 dias de vencer la fecha de implementación</strong>
        </CDropdownItem>
        {
          listCincoDiasAntes !== null && listCincoDiasAntes.length !== 0 ?
            <ListGroup flush className='pt-2'>
              {listCincoDiasAntes.map((riesgo) => {
                return  <ListGroupItem className='py-1' key={riesgo.descripcion}>
                          <Calendar size={15} className='text-primary mr-2' />
                          {riesgo.idRiesgo} | {riesgo.codigo !== null ? riesgo.codigo : <span>Sin código</span>} | {riesgo.fechaImpl} |
                          Informado: <CBadge className={riesgo.informadoPorCorreo==='SI'? "ml-1 badge-success px-2" : "ml-1 badge-danger px-1"} >{riesgo.informadoPorCorreo}</CBadge>
                        </ListGroupItem>
              })}
            </ListGroup>
            : <CDropdownItem header><i>Sin notificaciones</i></CDropdownItem>
        }
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>{listPlanesVencidos.length} Riesgos(s) que {listPlanesVencidos.length === 1 ? 'venció' : 'vencieron'} la fecha de implementación</strong>
        </CDropdownItem>
        {
          listPlanesVencidos !== null && listPlanesVencidos.length !== 0 ?
            <ListGroup flush className='pt-2'>
              {listPlanesVencidos.map((riesgo) => {
                return  <ListGroupItem className='py-1' key={riesgo.descripcion}>
                          <Calendar size={15} className='text-danger mr-2' />
                          {riesgo.idRiesgo} | {riesgo.codigo !== null ? riesgo.codigo : <span>Sin código</span>} | {riesgo.fechaImpl} |
                          Informado: <CBadge className={riesgo.informadoPorCorreo==='SI'? "ml-1 badge-success px-2" : "ml-1 badge-danger px-1"} >{riesgo.informadoPorCorreo}</CBadge>
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