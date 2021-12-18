import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row} from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import ActionFormatterEvaluar from 'src/reusable/ActionFormatterEvaluar';
import { useHistory } from 'react-router-dom'
import { putEvaluaRiesgo, getRiesgos } from './controller/RiesgoController'

const MatrizRiesgoListar = () => {

  const history = useHistory()

  const redirect = () => {
    history.push('./registrar')
  }

  const columns = [
    {
        dataField: 'id',
        text: 'ID',
        sort: true,
        //hidden: true
    }, {
        dataField: 'codigo',
        text: 'CODIGO',
        style: { whiteSpace: 'nowrap' },
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter,
    }, {
        dataField: 'fechaEvaluacion',
        text: 'FECHA EVAL',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
        dataField: 'procesoId.clave',
        text: 'COD MACRO',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
         dataField: 'procesoId.nombre',
         text: 'MACROPROCESO',
         sort: true,
        /*  filter: textFilter({
             className: 'test-classname',
             placeholder: 'Buscar',
         }),
         align: 'right', */
         //headerFormatter: typeFormatter
     }, {
        dataField: 'unidadId.nombre',
        text: 'UNIDAD',
        sort: true,
       /*  filter: textFilter({
            className: 'test-classname',
            placeholder: 'Buscar',
        }),
        align: 'right', */
        //headerFormatter: typeFormatter
    }, {
      dataField: 'duenoCargoId.nombre',
      text: 'DUEÑO PROCESO',
      sort: true,
     /*  filter: textFilter({
          className: 'test-classname',
          placeholder: 'Buscar',
      }),
      align: 'right', */
      //headerFormatter: typeFormatter
    },{
        dataField: 'estadoRegistro',
        text: 'ESTADO',
        sort: true,
        formatter: colorEstado
       /*  filter: textFilter({
            className: 'test-classname',
            placeholder: 'Buscar',
        }),
        align: 'right', */
        //headerFormatter: typeFormatter
    }, {
        dataField: 'acciones',
        text: 'ACCIONES',
        headerAlign: 'center',
        style: { textAlign: 'center' },
        formatter: (cell, row) => actionFormatter(cell, row),
    }, {
        dataField: 'evaluar',
        text: 'EVALUAR',
        headerAlign: 'center',
        comun: { textAlign: 'center' },
        formatter: (cell, row) => actionFormatterEvaluar(cell, row)
    }
  ]

  function colorEstado(cell, row) {
    if (cell === 'Observado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger-light">{ cell }</CBadge>
      );
    }
    if (cell === 'Autorizado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-success-light">{ cell }</CBadge>
      );
    }
    if (cell === 'Pendiente') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-warning-light">{ cell }</CBadge>
      );
    }
    if (cell === 'Descartado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger">{ cell }</CBadge>
      );
    }
  }

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    history.push('/matrizRiesgo/mostrar/' + row.id);
  }

  const editRow = (row) => {
    console.log(row)
    history.push('./editar/' + row.id);
  }

  const actionFormatterEvaluar = (cell, row) => {
    return <ActionFormatterEvaluar cell={cell} row={row} autorizarFunction={autorizaRiesgo} descartarFunction={descartaRiesgo}/>
  }

  const autorizaRiesgo = (row) => {
    const data = {
      estadoRegistro: 'Autorizado'
    }
    putEvaluaRiesgo(row.id, data)
    .then(res => {
      //console.log('response : ', res);
      window.location.reload(true);
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

  const descartaRiesgo = (row) => {
    const data = {
      estadoRegistro: 'Descartado'
    }
    console.log('data : ', data)
    putEvaluaRiesgo(row.id, data)
    .then(res => {
      console.log('response : ', res);
      window.location.reload(true);
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

   /* LISTA TABLA LISTA */
  const [listaMatrices, setListaMatrices] = useState([])

  const callApi = () => {
    getRiesgos()
    .then(res => {
      //console.log('El response de tabla: ', res.data)
      setListaMatrices(res.data)
    }).catch((error) => {
      console.log('Error: ', error)
    })
  }

  useEffect(() => {
    callApi()
  }, [])

  /* LISTA TABLA DESCRIPCION despendiento de seleccion tabla lista*/
  //const [dataApi, setDAtaApi] = useState([])
/*   const handleSelectOnChange = (result) => {
    console.log('select:  ', result)
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionNivel(idTabla)
    .then(res => {
      console.log('nivel 1: ', res.data)
      setDAtaApi(res.data)
    }).catch((error) => {
      console.log('Error: ', error)
      //notificationToast('error', Messages.notification.notOk)
    })
  } */
  return (
    <div id='' className='table-hover-animation'>
      <Fragment>
        <Row>
          <Col sm='12'>
            <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>Matriz de Riesgos</CardTitle>
              <Button color='primary' onClick={redirect} className='float-right mt-1' style={{width: '130px'}}>
                <span className='text-white'>Registrar</span>
              </Button>
            </CardHeader>
              <CardBody className='pb-4'>
                <BootstrapTable
                  classes= {'table-hover-animation mt-2'}
                  bootstrap4={true}
                  sort={ { dataField: 'id', order: 'desc' } }
                  noDataIndication={'No se encontraron resultados'}
                  keyField='id'
                  data={listaMatrices}
                  columns={columns}
                  bordered={false}
                  striped={true}
                  hover={false}
                  condensed={false}
                  wrapperClasses="table-responsive"
                  //filter={filterFactory()}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </div>
  )
}

export default MatrizRiesgoListar
