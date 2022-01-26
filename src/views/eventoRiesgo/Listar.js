import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Row } from 'reactstrap'
import { CBadge } from '@coreui/react'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from 'src/reusable/ActionFormatterEvento';
import ActionFormatterEvaluar from 'src/reusable/ActionFormatterEvaluar';
import { useHistory } from 'react-router-dom'
import { putEvaluaEvento, getEventosPaging, getGeneraCodigo } from './controller/EventoController'
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
import Swal from 'sweetalert2'

var _ = require('lodash');

const EventoRiesgoListar = () => {

  // Configuracion sweetalert2
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary text-white px-4',
      cancelButton: 'btn btn-outline-primary px-4 mr-4',
    },
    buttonsStyling: false
  })

  //useContext
  const valuePathFromContext = React.useContext(PathContext);

  const history = useHistory();
  const [pagination, setpagination] = useState(pagingInit);
  const [params, setParams] = useState({});
  const [spin, setSpin] = useState(false);

  const redirect = (e) => {
    history.push('/eventoRiesgo/Registrar');
   /*  e.preventDefault();
    const path = '/eventoRiesgo/Registrar';
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
    }, /* {
      dataField: 'areaID.clave',
      text: 'AREA',
      style: { whiteSpace: 'nowrap' },
      sort: true,
      filter: customFilter(),
      filterRenderer: (onFilter, column) =>
        <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />,
      headerFormatter: typeFormatter,
    }, */ {
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
      dataField: 'xxx1',
      text: 'ACCIONES',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row),
    }, {
      dataField: 'xxx2',
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
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    history.push('/eventoRiesgo/mostrar/' + row.id);
  }

  const editRow = (row) => {
    history.push('/eventoRiesgo/Editar/' + row.id);
  }

  const actionFormatterEvaluar = (cell, row) => {
    return <ActionFormatterEvaluar cell={cell} row={row} autorizarFunction={autorizaEvento} descartarFunction={descartaEvento} />
  }

  // Autoriza Registro
  const autorizaEvento = async (row) => {
    const data = {
      estadoRegistro: 'Autorizado'
    }
    // Genera posible codigo al Autorizar Evento
    await getGeneraCodigo(row.id)
      .then((response) => {
        if(response.data === 'ERROR EN CODIGO'){
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: '',
            text: 'ERROR AL GENERAR CODIGO',
            showConfirmButton: false,
            timer: 3000
          })
        } else{
          if(row.estadoRegistro !== 'Descartado' && row.estadoRegistro !== 'Autorizado'){
            swalWithBootstrapButtons.fire({
             title: '',
             text: 'Al autorizar el registro se asignará el siguiente código para ASFI: ' + response.data + ' ¿Está seguro de generarlo?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonText: 'Si',
             cancelButtonText: 'No',
             reverseButtons: true,
             position: 'top',
           }).then((result) => {
             if (result.isConfirmed) {
                 putEvaluaEvento(row.id, data)
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
        }
      }).catch((error) => {
        console.log("Error: ", error);
      });
  }
  // Descarta Registro
  const descartaEvento = async (row) => {
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
          putEvaluaEvento(row.id, data)
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
    <div className='table-hover-animation'>
      <CCSpinner show={spin} />

      <Fragment>
        <Row>
          <Col sm='12'>
            <Card>
              <CardHeader>
                <CardTitle className='float-left h4 pt-2'>Eventos de Riesgo</CardTitle>
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
