import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { typeFormatter } from 'src/reusable/Component';
import ActionFormatter from 'src/reusable/ActionFormatter';
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaDescripcionOportunidadN1, getTablaListaOportunidad, deleteTablaDescripcionOportunidadId } from './controller/AdminOportunidadController'
import { buildSelectTwo, hasPermission } from 'src/functions/Function'
import { PlusSquare } from 'react-feather';
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from 'src/reusable/variables/Messages';
import Swal from 'sweetalert2'
import paginationFactory from 'react-bootstrap-table2-paginator';

const AdministracionMatrizOportunidadListar = () => {

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

  const redirect = (e) => {
    e.preventDefault();
    const path = '/administracion/matriz-oportunidad/Registrar';
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


  const [labelTabla, setLabelTabla] = useState([]);
  const [valueTabla, setValueTabla] = useState([]);

  const pagination = paginationFactory({
    page: 2,
  });

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: false,
      hidden: true
    }, {
      dataField: 'campoA',
      text: (labelTabla === 'Matriz FODA - Listado') ?
        'Código' : (labelTabla === 'Grupos de interés') ?
          'Int./Ext.' : (labelTabla === 'Impacto de oportunidad') ?
            'Nivel' : (labelTabla === 'Tratamiento - oportunidad') ?
              "Calificación" : (labelTabla === 'Fortaleza - oportunidad') ?
                "Ponderación" : '',
      sort: true,
      hidden: (labelTabla === 'Matriz FODA - Listado' || labelTabla === 'Grupos de interés' ||
        labelTabla === 'Impacto de oportunidad' || labelTabla === 'Tratamiento - oportunidad' ||
        labelTabla === 'Fortaleza - oportunidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'nombre',
      text: (labelTabla === 'Matriz FODA') ?
        'Nombre' : (labelTabla === 'Matriz FODA - Listado' ||
          labelTabla === 'Fortaleza - oportunidad') ?
          'Descripción' : (labelTabla === 'Grupos de interés') ?
            'Parte interesada' : (labelTabla === 'Impacto de oportunidad') ?
              'Descriptivo' : (labelTabla === 'Tratamiento - oportunidad') ?
                "Nivel" : '',
      sort: true,
      hidden: (labelTabla === 'Matriz FODA' || labelTabla === 'Matriz FODA - Listado' ||
        labelTabla === 'Fortaleza - oportunidad' || labelTabla === 'Grupos de interés' ||
        labelTabla === 'Impacto de oportunidad' || labelTabla === 'Tratamiento - oportunidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoB',
      text: (labelTabla === 'Impacto de oportunidad') ?
        'Descriptivo 2' : (labelTabla === 'Tratamiento - oportunidad') ?
          "Descriptivo" : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de oportunidad' || labelTabla === 'Tratamiento - oportunidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoC',
      text: (labelTabla === 'Impacto de oportunidad') ?
        'Impacto-Oportunidad' : (labelTabla === 'Tratamiento - oportunidad') ?
          "Descripción" : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de oportunidad' || labelTabla === 'Tratamiento - oportunidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoD',
      text: (labelTabla === 'Impacto de oportunidad') ?
        '% Impacto Oportunidad' : (labelTabla === 'Tratamiento - oportunidad') ?
          "Tratamiento" : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de oportunidad' || labelTabla === 'Tratamiento - oportunidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      text: (labelTabla.length !== 0) ? 'Acciones' : '',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row)
    }
  ]

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} deleteFunction={deleteRow} editFunction={editRow} />
  }

  // Eliminar Parametro
  const deleteRow = (row) => {
    swalWithBootstrapButtons.fire({
      title: '',
      text: '¿Está seguro de eliminar el Parámetro de Matriz de Oportunidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      position: 'top'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTablaDescripcionOportunidadId(row.id)
          .then(res => {
            swalWithBootstrapButtons.fire({
              title: '',
              text: 'Operación realizada exitósamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              position: 'top',
            }).then(okay => {
              if (okay) {
                getTablaDescripcion(valueTabla);
              }
            })
          }).catch((error) => {
            console.error('Error al eliminar Parámetro de Matriz de Oportunidad: ', error);
          });
      }
    })
  }

  // Editar Parametro
  const editRow = (row) => {
    //history.push('/administracion/matriz-oportunidad/Editar/' + row.id);
    const path = '/administracion/matriz-oportunidad/Editar/:id';
    if (hasPermission(path, valuePathFromContext)) {
      history.push('/administracion/matriz-oportunidad/Editar/' + row.id);
    } else {
      notificationToast();
    }
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])
  const [dataApi, setDAtaApi] = useState([])
  const history = useHistory()

  /* LISTA TABLA LISTA */
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', false)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
    callApi()
  }, [])


  /* LISTA TABLA DESCRIPCION despendiento de seleccion tabla lista*/
  const handleSelectOnChange = (result) => {
    const labelTable = result.label
    setLabelTabla(labelTable)
    const valueTable = result.value;
    setValueTabla(valueTable);
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionOportunidadN1(idTabla)
      .then(res => {
        setDAtaApi(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  // Style Select
  const customStyles = {
    menu: provided => ({ ...provided, zIndex: "9999 !important" }),
    control: (styles,) => ({
      ...styles,
      boxShadow: 'none',
    }),
    option: (styles, { isDisabled, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? '#e79140' : 'white',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          backgroundColor: '#e79140',
          color: 'white'
        },
        ':hover': {
          backgroundColor: isSelected ? '#e79140' : '#fbf3eb',
          color: isSelected ? 'white' : '#e79140'
        }
      }
    }
  }

  return (
    <div className='custom-react-bootstrap-table table-hover-animation'>
      <Fragment>
        <Card>
          <CardHeader>
            <Row>
              <Col xs={12} md={{ size: 6, offset: 0 }}>
                <CardTitle className='float-left h4 pt-2'>Parámetros de Matriz de Oportunidades</CardTitle>
              </Col>
              <Col xs={4} md={{ size: 2, offset: 4 }}>
                <Button block onClick={(e) => { redirect(e) }} color="primary" className='text-white'>
                  <PlusSquare size={15} className='mr-2' /> Registrar
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className='justify-content-center pt-4'>
              <Label sm='3' lg='2'>
                Seleccione parámetro
              </Label>
              <Col sm='9' lg='4'>
                <Select
                  onChange={(e) => handleSelectOnChange(e)}
                  placeholder={'Buscar'}
                  className='react-select'
                  classNamePrefix='select'
                  options={tablaListaOptions}
                  isLoading={false}
                  styles={customStyles}
                  theme={theme => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary: '#e79140'
                    }
                  })}
                />
              </Col>
            </Row>

            <BootstrapTable
              classes={'mt-5'}
              bootstrap4={true}
              sort={{ dataField: 'id', order: 'asc' }}
              noDataIndication={'No se encontraron resultados'}
              keyField='id'
              data={dataApi}
              columns={columns}
              bordered={false}
              striped={true}
              hover={false}
              condensed={false}
              wrapperClasses="table-responsive"
              pagination={pagination}
              filter={filterFactory()}
            />
          </CardBody>
        </Card>
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

export default AdministracionMatrizOportunidadListar
