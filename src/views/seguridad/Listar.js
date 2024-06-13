import React, { Fragment, useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap';
import { CBadge } from '@coreui/react';
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import { useHistory } from 'react-router-dom';
import { getListSeguridadPaging } from './controller/SeguridadController';
import { pagingInit } from 'src/reusable/variables/Variables';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import CPagination from 'src/reusable/pagination/CPagination';
import { getListPagingWithSearch } from 'src/functions/FunctionApi';
import { getParams } from 'src/functions/Function';
import { CFilterDate, CFilterText, handleChildClick, typeFormatter } from 'src/reusable/Component';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from 'src/reusable/variables/Messages';
import { hasPermission } from 'src/functions/Function';
import { PlusSquare } from 'react-feather';
var _ = require('lodash');

const SeguridadListar = () => {

  //useContext
  const valuePathFromContext = React.useContext(PathContext);

  const history = useHistory()
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false);

  const redirect = (e) => {
    e.preventDefault();
    const path = '/seguridad/Registrar';
    if (hasPermission(path, valuePathFromContext)) {
      history.push(path);
    } else {
      notificationToast();
    }
  }

  const notificationToast = () => {
    toast.error(Messages.dontHavePermission, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
  }

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
      hidden: true
    }, {
      dataField: 'fechaRegistro',
      text: 'REGISTRO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterDate placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'tipoActivoId.nombre',
      text: 'TIPO ACTIVO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'nivelRiesgoId.campoB',
      text: 'NIVEL DE RIESGO',
      sort: true,
      formatter: colorNivel,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'descripcionRiesgo',
      text: 'DESCRIPCION',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'areaId.clave',
      text: 'AREA',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'estadoId.nombre',
      text: 'ESTADO',
      sort: true,
      formatter: colorEstado,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      text: 'ACCIONES',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row),
    }
  ]

  function colorEstado(cell) {
    var cellBuscar = _.lowerCase(cell);
    if (cellBuscar === 'asumido' || cellBuscar === 'en validacion') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-warning-light">{cell}</CBadge>
      );
    }
    if (cellBuscar === 'en plazo' || cellBuscar === 'mitigado') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-success-light">{cell}</CBadge>
      );
    }
    if (cellBuscar === 'pendiente') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      );
    }
  }

  function colorNivel(cell) {
    var cellBuscar = _.lowerCase(cell);
    if (cellBuscar === 'alto') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger">{cell}</CBadge>
      );
    }
    if (cellBuscar === 'medio alto') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-danger-light">{cell}</CBadge>
      );
    }
    if (cellBuscar === 'medio') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-warning-light">{cell}</CBadge>
      );
    }
    if (cellBuscar === 'medio bajo') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-yellow-light">{cell}</CBadge>
      )
    }
    if (cellBuscar === 'bajo') {
      return (
        <CBadge className="mr-1 px-2 py-1 badge-success-light">{cell}</CBadge>
      )
    }
  }

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    history.push('/seguridad/Mostrar/' + row.id);
  }

  const editRow = (row) => {
    const path = '/seguridad/Editar/:id';
    if (hasPermission(path, valuePathFromContext)) {
      history.push('/seguridad/Editar/' + row.id);
    } else {
      notificationToast();
    }
  }

  /* Lista de Seguridad */
  const [listSeguridad, setSeguridad] = useState([])

  const callApi = async (page, size) => {
    setSpin(true)
    await getListSeguridadPaging(page, size)
      .then(res => {
        const paging = res.data.paging;
        const toPaging = { ...paging }

        setSeguridad(res.data.data);
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
  const handleOnFilter = (security) => {
    const param = {
      ...params
    };
    const fieldName = security.name;
    const valueToSearch = _.lowerCase(security.value);

    //add exception
    if (fieldName === 'fechaRegistro' && !_.isEmpty(security.value)) {
      param['fechaRegistro'] = security.value;
    } else {
      param[fieldName] = valueToSearch;
    }

    //deleteok
    if (param['fechaRegistro'] === '' || _.isEmpty(param['fechaRegistro'])) {
      delete param['fechaRegistro'];
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

    const endpoint = 'v1/seguridad/';

    await getListPagingWithSearch(page, size, endpoint, search)
      .then((response) => {
        const paging = response.data.paging;
        const toPaging = { ...paging }
        setSeguridad(response.data.data);
        setpagination(toPaging);
        setSpin(false)
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false)
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
                  <Col xs={12} md={{ size: 6, offset: 0 }}>
                    <CardTitle className='float-left h4 pt-2'>Riesgos en Seguridad</CardTitle>
                  </Col>
                  <Col xs={4} md={{ size: 2, offset: 4 }}>
                    <Button block onClick={(e) => { redirect(e) }} color="primary" className='text-white'>
                      <PlusSquare size={15} className='mr-2' /> Registrar
                    </Button>
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
                  data={listSeguridad}
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

export default SeguridadListar
