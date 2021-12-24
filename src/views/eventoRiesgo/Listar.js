import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import ActionFormatterEvaluar from 'src/reusable/ActionFormatterEvaluar';
import { useHistory } from 'react-router-dom'
import { putEvaluaEvento, getEventosPaging } from './controller/EventoController'
import { pagingInit } from 'src/reusable/variables/Variables';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import CPagination from 'src/reusable/pagination/CPagination';
import { getListPagingWithSearch } from 'src/functions/FunctionApi';
import { getParams } from 'src/functions/Function';
import { CFilterDate, CFilterText, handleChildClick, typeFormatter } from 'src/reusable/Component';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';

var _ = require('lodash');

const EventoRiesgoListar = () => {

  const history = useHistory()
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false);

  const redirect = () => {
    history.push('/eventoRiesgo/Registrar')
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      hidden: false
    }, {
      dataField: 'codigo',
      text: 'CODIGO',
      style: { whiteSpace: 'nowrap' },
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'fechaDesc',
      text: 'FECHA DESC',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterDate placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
      align: 'right',
    }, {
      dataField: 'fechaFin',
      text: 'FECHA FIN',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterDate placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
      align: 'right',

    },/*  {
      dataField: 'descripcionCompleta',
      text: 'DESCRIPCION',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, */ {
      dataField: 'tipoEvento',
      text: 'TIPO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'factorRiesgoId.nombre',
      text: 'FACTOR RIESGO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'procesoId.nombre',
      text: 'MACROPROCESO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'estadoRegistro',
      text: 'ESTADO',
      sort: true,
      formatter: colorEstadoRegistro,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'estadoEvento',
      text: 'EVENTO',
      sort: true,
      formatter: colorEstadoEvento,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'xxx',
      text: 'ACCIONES',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row),
    }, {
      dataField: 'xxx',
      text: 'EVALUAR',
      headerAlign: 'center',
      comun: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatterEvaluar(cell, row)
    }
  ]

  function colorEstadoRegistro(cell) {
    if (cell === 'Observado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      );
    }
    if (cell === 'Autorizado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-success-light">{cell}</CBadge>
      );
    }
    if (cell === 'Pendiente') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-warning-light">{cell}</CBadge>
      );
    }
    if (cell === 'Descartado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger">{cell}</CBadge>
      );
    }
  }

  function colorEstadoEvento(cell) {
    if (cell === 'Solucionado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-success">{cell}</CBadge>
      );
    }
    if (cell === 'Seguimiento') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-warning">{cell}</CBadge>
      );
    }
  }

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    console.log("objeto:", row)
    history.push('/eventoRiesgo/mostrar/' + row.id);
  }

  const editRow = (row) => {
    console.log(row)
   // history.push('./editar/' + row.id);
    history.push('/eventoRiesgo/Editar/' + row.id);
  }

  const actionFormatterEvaluar = (cell, row) => {
    return <ActionFormatterEvaluar cell={cell} row={row} autorizarFunction={autorizaEvento} descartarFunction={descartaEvento} />
  }

  const autorizaEvento = (row) => {
    const data = {
      estadoRegistro: 'Autorizado'
    }
    console.log('data : ', data)
    putEvaluaEvento(row.id, data)
      .then(res => {
        console.log('response : ', res);
        window.location.reload(true);
      }).catch((error) => {
        console.log('Error al obtener datos: ', error);
      });
  }

  const descartaEvento = (row) => {
    const data = {
      estadoRegistro: 'Descartado'
    }
    console.log('data : ', data)
    putEvaluaEvento(row.id, data)
      .then(res => {
        console.log('response : ', res);
        window.location.reload(true);
      }).catch((error) => {
        console.log('Error al obtener datos: ', error);
      });
  }

  /* LISTA TABLA LISTA */
  const [eventosOptions, setEventos] = useState([])

  const callApi = async (page, size) => {
    setSpin(true)
    await getEventosPaging(page, size)
      .then(res => {
        //console.log('El response de tabla: ', res.data)
        const paging = res.data.paging;
        const toPaging = { ...paging }

        setEventos(res.data.data);
        setpagination(toPaging);

        setSpin(false)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApi(pagination.page, pagination.size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // search by columns
  const handleOnFilter = (event) => {
    const param = {
      ...params
    };
    const fieldName = event.name;
    const valueToSearch = _.lowerCase(event.value);;

    //add exception
    if (fieldName === 'fechaFin' && !_.isEmpty(event.value)) {
      param['fechaFin'] = event.value;
    } else if (fieldName === 'fechaDesc' && !_.isEmpty(event.value)) {
      param['fechaDesc'] = event.value;
    } else {
      param[fieldName] = valueToSearch;
    }

    console.log('params:: ', param)
    console.log('param[fechaFin]:: ', param['fechaFin'])

    //deleteok

    if (param['fechaFin'] === '' || _.isEmpty(param['fechaFin'])) {
      delete param['fechaFin'];
    }
    if (param['fechaDesc'] === '' || _.isEmpty(param['fechaDesc'])) {
      delete param['fechaDesc'];
    }


    setParams(param)
    validatePagination(pagination.page, pagination.size, param);
  }

  const validatePagination = async (page, size, toSearch) => {
    setSpin(true)

    var search = getParams(toSearch);
    if (toSearch === 'p') {
      search = getParams(params);
    } else {
      search = getParams(toSearch);
    }

    console.log('TO SEARCH:: ', search);

    const endpoint = 'v1/eventoRiesgo/';

    await getListPagingWithSearch(page, size, endpoint, search)
      .then((response) => {
        const paging = response.data.paging;
        const toPaging = { ...paging }
        setEventos(response.data.data);
        setpagination(toPaging);
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
        setSpin(false)
      });
  }
  // End search by columns


  return (
    <div id='' className='table-hover-animation'>
      <CCSpinner show={spin} />

      <Fragment>
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>Eventos de Riesgo</CardTitle>
                <Button color='primary' onClick={redirect} className='float-right mt-1' style={{ width: '130px' }}>
                  <span className='text-white'>Registrar</span>
                </Button>
              </CardHeader>
              <CardBody className='pb-4'>
                <BootstrapTable
                  classes={'table-hover-animation mt-2'}
                  bootstrap4={true}
                  sort={{ dataField: 'id', order: 'desc' }}
                  noDataIndication={'No se encontraron resultados'}
                  keyField='id'
                  data={eventosOptions}
                  columns={columns}
                  bordered={false}
                  striped={true}
                  hover={false}
                  condensed={false}
                  wrapperClasses="table-responsive"
                  filter={filterFactory()}
                />
                <CPagination
                  page={pagination.page}
                  size={pagination.size}
                  pages={pagination.pages}
                  total={pagination.total}
                  onClick={validatePagination}
                  onChange={validatePagination}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </div>
  )
}

export default EventoRiesgoListar
