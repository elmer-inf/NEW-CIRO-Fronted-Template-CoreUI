import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import { useHistory } from 'react-router-dom'
import { getListSeguridadPaging } from './controller/SeguridadController'
import { pagingInit } from 'src/reusable/variables/Variables';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import CPagination from 'src/reusable/pagination/CPagination';
import { getListPagingWithSearch } from 'src/functions/FunctionApi';
import { getParams } from 'src/functions/Function';
import { CFilterDate, CFilterText, handleChildClick, typeFormatter } from 'src/reusable/Component';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
/* import { getTablaDescripcionRiesgoN1 } from 'src/views/administracion/matriz-riesgo/controller/AdminRiesgoController'
import { getTablaDescripcionSeguridadN1 } from 'src/views/administracion/seguridad/controller/AdminSeguridadController'
import { buildSelectTwo } from 'src/functions/Function' */

var _ = require('lodash');

const SeguridadListar = () => {

  const history = useHistory()
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false);

  const redirect = () => {
    history.push('/seguridad/Registrar')
  }

  //  P  A  R  A  M  E  T  R  O  S
  // Estado
  /* const [dataApiEstado, setDataApiEstado] = useState([])
  const callApiEstado = (idTablaDes) => {
    getTablaDescripcionSeguridadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEstado(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Nivel Riesgo
  const [dataApiNivelRiesgo, setDataApiNivelRiesgo] = useState([])
  const callApiNivelRiesgo = (idTablaDes) => {
    getTablaDescripcionRiesgoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoB', false)
        setDataApiNivelRiesgo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiEstado(2);
    callApiNivelRiesgo(9);
  }, []) */
  // F  I  N     P  A  R  A  M  E  T  R  O  S

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
    /* var b = _.find(dataApiEstado, ['nombre', cell]);
    console.log('data: ', cell); */
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
    console.log(row)
    history.push('/seguridad/Editar/' + row.id);
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
        console.log('Error: ', error)
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

    console.log('TO SEARCH:: ', search);

    const endpoint = 'v1/seguridad/';

    await getListPagingWithSearch(page, size, endpoint, search)
      .then((response) => {
        const paging = response.data.paging;
        const toPaging = { ...paging }
        setSeguridad(response.data.data);
        setpagination(toPaging);
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
        setSpin(false)
      });
  }
  // End search by columns

  return (
    <div className='table-hover-animation'>
      <CCSpinner show={spin} />
      <Fragment>
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>Riesgo en Seguridad</CardTitle>
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
    </div>
  )
}

export default SeguridadListar
