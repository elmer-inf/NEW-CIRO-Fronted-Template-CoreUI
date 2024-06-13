import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Col, Row } from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import { useHistory } from 'react-router-dom'
import { getEventosRecurrentesPaging } from './controller/EventoRecurrenteController'
import { pagingInit } from 'src/reusable/variables/Variables';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import CPagination from 'src/reusable/pagination/CPagination';
import { getListPagingWithSearch } from 'src/functions/FunctionApi';
import { getParams, hasPermission } from 'src/functions/Function';
import { CFilterDate, CFilterText, handleChildClick, typeFormatter } from 'src/reusable/Component';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify'; 
import { Messages } from 'src/reusable/variables/Messages';

var _ = require('lodash');

const EventoRiesgoListar = () => {

  const valuePathFromContext = React.useContext(PathContext);

  const history = useHistory();
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false); 


  const notificationToast = (type, mensaje) => {
    switch (type) {
      case 'error':
        toast.error(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'success':
        toast.success(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'permission':
        toast.error(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      default:
        toast(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
    }
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: false,
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
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
    }, {
      dataField: 'fechaFin',
      text: 'FECHA FIN',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterDate placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'tipoEvento',
      text: 'TIPO',
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
      text: 'ESTADO R.',
      sort: true,
      formatter: colorEstadoRegistro,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'estadoEvento',
      text: 'ESTADO E.',
      sort: true,
      formatter: colorEstadoEvento,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'xxx1',
      text: 'ACCIONES',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row),
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
    if (cell === 'Solución') {
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
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} allowDelete={false} />
  }

  const detailsRow = (row) => {
    history.push('/eventoRecurrente/mostrar/' + row.id);
  }

  const editRow = (row) => {
    const path = '/eventoRecurrente/editar/:id';
    if (hasPermission(path, valuePathFromContext)) {
      history.push('/eventoRecurrente/editar/' + row.id);
    } else {
      notificationToast('permission', Messages.dontHavePermission);
    }
  }

  /* LISTA TABLA LISTA */
  const [eventosOptions, setEventos] = useState([])

  const callApi = async (page, size) => {
    setSpin(true)
    await getEventosRecurrentesPaging(page, size)
      .then(res => {
        const paging = res.data.paging;
        const toPaging = { ...paging }
        setEventos(res.data.data);
        setpagination(toPaging);
        setSpin(false)
      }).catch((error) => {
        console.error('Error: ', error)
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

    // add exception for "codigo"
    if (fieldName === 'codigo' && !_.isEmpty(event.value)) {
      param['codigo'] = event.value;
    }

    //deleteok
    if (param['fechaFin'] === '' || _.isEmpty(param['fechaFin'])) {
      delete param['fechaFin'];
    }
    if (param['fechaDesc'] === '' || _.isEmpty(param['fechaDesc'])) {
      delete param['fechaDesc'];
    }
    if (param['id'] === '' || _.isEmpty(param['id'])) {
      delete param['id'];
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

    const endpoint = 'v1/eventoRiesgo/eventosrecurrentes/';

    await getListPagingWithSearch(page, size, endpoint, search)
      .then((response) => {
        const paging = response.data.paging;
        const toPaging = { ...paging }
        setEventos(response.data.data);
        setpagination(toPaging);
        setSpin(false);
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false);
      });
  }
  // End search by columns

  return (
    <div className='custom-react-bootstrap-table table-hover-animation'>
      <CCSpinner show={spin} />

      <Fragment>
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs={12} md={{ size: 12, offset: 0 }}>
                    <CardTitle className='float-left h4 pt-2'>Eventos recurrentes - Factor persona</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className='pb-4'>
                <BootstrapTable
                  classes={'mt-2'}
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default EventoRiesgoListar
