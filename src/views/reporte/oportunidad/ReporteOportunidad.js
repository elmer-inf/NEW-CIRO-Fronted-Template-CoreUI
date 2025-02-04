import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import ReporteConfigurable from './components/ReporteConfigurable';
import MapaInherente from './components/MapaInherente';
import { getTablaDescripcionEventoN1 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectThree } from 'src/functions/Function';

const ReporteOportunidades = () => {

  const [dataProceso, setDataProceso] = useState([]);

  const getProceso = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'clave', 'nombre', true);
        setDataProceso(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    getProceso(15);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Reporte de Matriz de Oportunidades</CardTitle>
          </CardHeader>
          <CardBody>

            <div className='divider divider-left pt-4'>
              <div className='divider-text'><span className='text-label h5'>MAPA DE OPORTUNIDAD</span></div>
            </div>
            <MapaInherente optionsProceso={dataProceso}/>

            <div className='divider divider-left pt-4'>
              <div className='divider-text'><span className='text-label h5'>CONFIGURAR REPORTE DE MATRIZ DE OPORTUNIDADES</span></div>
            </div>
            <ReporteConfigurable />

          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default ReporteOportunidades
