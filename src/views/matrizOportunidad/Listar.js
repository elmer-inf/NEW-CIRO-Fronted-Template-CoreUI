import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import ActionFormatterEvaluar from 'src/reusable/ActionFormatterEvaluar';
import { useHistory } from 'react-router-dom'
import { putEvaluaOportunidad, getOportunidadPaging, getGeneraCodigo } from './controller/OportunidadController'
import { CFilterDate, CFilterText, handleChildClick, typeFormatter } from 'src/reusable/Component';
import filterFactory, { customFilter } from 'react-bootstrap-table2-filter';
import CPagination from 'src/reusable/pagination/CPagination';
import { pagingInit } from 'src/reusable/variables/Variables';
import { getParams, hasPermission } from 'src/functions/Function';
import { getListPagingWithSearch } from 'src/functions/FunctionApi';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from 'src/reusable/variables/Messages';
import Swal from 'sweetalert2'

var _ = require('lodash');

const MatrizOportunidadListar = () => {

  // Configuracion sweetalert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary px-4',
      cancelButton: 'btn btn-outline-primary px-4 mr-4',
    },
    buttonsStyling: false
  })

  //useContext
  const valuePathFromContext = React.useContext(PathContext);

  const history = useHistory()
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false);


  const redirect = (e) => {
    history.push('/matrizOportunidad/Registrar');
    /* e.preventDefault();
    const path = '/matrizOportunidad/Registrar';
    if (hasPermission(path, valuePathFromContext)) {
      history.push(path);

    } else {
      notificationToast();
    } */
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
      hidden: false,
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
      dataField: 'fechaEvaluacion',
      text: 'FECHA EVAL',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterDate placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'procesoId.clave',
      text: 'COD MACRO',
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
    }, /* {
      dataField: 'unidadId.nombre',
      text: 'UNIDAD',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, */ {
      dataField: 'duenoCargoId.nombre',
      text: 'DUEÑO PROCESO',
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, {
      dataField: 'estadoRegistro',
      text: 'ESTADO',
      sort: true,
      formatter: colorEstado,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
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

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    history.push('/matrizOportunidad/Mostrar/' + row.id);
  }

  const editRow = (row) => {
    history.push('/matrizOportunidad/Editar/' + row.id);
  }

  const actionFormatterEvaluar = (cell, row) => {
    return <ActionFormatterEvaluar cell={cell} row={row} autorizarFunction={autorizaOportunidad} descartarFunction={descartaOportunidad} />
  }

  // Autoriza Registro
  const autorizaOportunidad = async (row) => {
    const data = {
      estadoRegistro: 'Autorizado'
    }
    // Genera posible codigo al Autorizar Evento
   await getGeneraCodigo(row.id)
      .then((response) => {
        if(row.estadoRegistro !== 'Descartado' && row.estadoRegistro !== 'Autorizado'){
           swalWithBootstrapButtons.fire({
            title: '',
            text: 'Al autorizar el registro se asignará el siguiente código: ' + response.data + ' ¿Está seguro de generarlo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true,
            position: 'top',
          }).then((result) => {
            if (result.isConfirmed) {
                putEvaluaOportunidad(row.id, data)
                .then(res => {
                  swalWithBootstrapButtons.fire({
                    title: '',
                    text: 'Operación realizada exitósamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    position: 'top',
                  }).then(okay => {
                    if (okay) {
                      callApi(pagination.page, pagination.size);
                    }
                  })
                }).catch((error) => {
                  console.log('Error al obtener datos: ', error);
                });
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: '',
                text: 'Operación cancelada',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                position: 'top'
              })
            }
          })
        }else{
          if(row.estadoRegistro === 'Descartado'){
            swalWithBootstrapButtons.fire({
              title: '',
              text: 'Un registro Descartado no se puede Autorizar',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              position: 'top'
            })
          }
          if(row.estadoRegistro === 'Autorizado'){
            swalWithBootstrapButtons.fire({
              title: '',
              text: 'El registro ya está Autorizado',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              position: 'top'
            })
          }
        }
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }
  // Descarta Registro
  const descartaOportunidad = async (row) => {
    const data = {
      estadoRegistro: 'Descartado'
    }
    if(row.estadoRegistro !== 'Autorizado' && row.estadoRegistro !== 'Descartado'){
      swalWithBootstrapButtons.fire({
        title: '',
        text:'¿Está seguro de modificar el estado de registro a Descartado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
        position: 'top'
      }).then((result) => {
        if (result.isConfirmed) {
          putEvaluaOportunidad(row.id, data)
            .then(res => {
              swalWithBootstrapButtons.fire({
                title: '',
                text: 'Operación realizada exitósamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                position: 'top',
              }).then(okay => {
                if (okay) {
                  callApi(pagination.page, pagination.size);
                }
              })
            }).catch((error) => {
              console.log('Error al obtener datos: ', error);
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: '',
            text: 'Operación cancelada',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            position: 'top'
          })
        }
      })
    } else{
      if(row.estadoRegistro === 'Autorizado'){
        swalWithBootstrapButtons.fire({
          title: '',
          text: 'Un registro Autorizado no se puede Descartar',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          position: 'top'
        })
      }
      if(row.estadoRegistro === 'Descartado'){
        swalWithBootstrapButtons.fire({
          title: '',
          text: 'El registro ya está Descartado',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          position: 'top'
        })
      }
    }
  }

  /* LISTA TABLA LISTA */
  const [listaOportunidades, setListaOportunidades] = useState([])

  const callApi = (page, size) => {
    setSpin(true)
    getOportunidadPaging(page, size)
      .then(res => {
        //console.log('El response de tabla: ', res.data)
        const paging = res.data.paging;
        const toPaging = { ...paging }

        setListaOportunidades(res.data.data);
        setpagination(toPaging);

        setSpin(false)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApi(pagination.page, pagination.size);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // search by columns
  const handleOnFilter = (event) => {
    const param = {
      ...params
    };
    const fieldName = event.name;
    const valueToSearch = _.lowerCase(event.value);;

    //add exception
    if (fieldName === 'fechaEvaluacion' && !_.isEmpty(event.value)) {
      param['fechaEvaluacion'] = event.value;
    } else {
      param[fieldName] = valueToSearch;
    }

    console.log('params:: ', param)
    console.log('param[fechaEvaluacion]:: ', param['fechaEvaluacion'])

    //deleteok

    if (param['fechaEvaluacion'] === '' || _.isEmpty(param['fechaEvaluacion'])) {
      delete param['fechaEvaluacion'];
    }

    if (param['procesoId.clave'] === '' || _.isEmpty(param['procesoId.clave'])) {
      delete param['procesoId.clave'];
    }
    if (param['procesoId.nombre'] === '' || _.isEmpty(param['procesoId.nombre'])) {
      delete param['procesoId.nombre'];
    }
    if (param['unidadId.nombre'] === '' || _.isEmpty(param['unidadId.nombre'])) {
      delete param['unidadId.nombre'];
    }
    if (param['duenoCargoId.nombre'] === '' || _.isEmpty(param['duenoCargoId.nombre'])) {
      delete param['duenoCargoId.nombre'];
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

    console.log('TO SEARCH:: ', search);

    const endpoint = 'v1/matrizOportunidad/';

    await getListPagingWithSearch(page, size, endpoint, search)
      .then((response) => {
        const paging = response.data.paging;
        const toPaging = { ...paging }
        setListaOportunidades(response.data.data);
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
                <CardTitle className='float-left h4 pt-2'>Matriz de Oportunidades</CardTitle>
                <Button color='primary' onClick={(e) => {redirect(e)}} className='float-right mt-1' style={{ width: '130px' }}>
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
                  data={listaOportunidades}
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

export default MatrizOportunidadListar
