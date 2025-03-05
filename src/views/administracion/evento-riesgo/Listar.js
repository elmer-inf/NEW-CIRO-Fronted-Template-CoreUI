import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { typeFormatter } from 'src/reusable/Component';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ActionFormatter from 'src/reusable/ActionFormatter';
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaDescripcionEventoN1, getTablaListaEvento, deleteTablaDescripcionEventoId } from './controller/AdminEventoController'
import { buildSelectTwo, hasPermission } from 'src/functions/Function'
import { PlusSquare } from 'react-feather';
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from 'src/reusable/variables/Messages';
import Swal from 'sweetalert2'

const AdministracionEventoListar = () => {

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
    const path = '/administracion/evento-riesgo/Registrar';
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
      hidden: false
    }, {
      dataField: 'clave',
      text: (labelTabla === 'Área' || labelTabla === 'Unidad' || labelTabla === 'Macroproceso') ?
        'Código' : (labelTabla === 'Entidad' || labelTabla === 'Tipo de evento') ?
          'Sigla' : (labelTabla === 'Moneda') ?
            'Abreviatura' : (labelTabla === 'Póliza ATC') ?
              'Nro.' : (labelTabla === 'Reputacional' ||
                labelTabla === 'Legal' ||
                labelTabla === 'Cumplimiento' ||
                labelTabla === 'Estratégico' ||
                labelTabla === 'Gobierno' ||
                labelTabla === 'Fraude' ||
                labelTabla === 'Liquidez' ||
                labelTabla === 'LGI FT y/o DP' ||
                labelTabla === 'Operativo') ? 'Nivel' : (labelTabla === 'Proceso') ?
                'Tipo doc.' : (labelTabla === 'Seguridad de la información') ?
                  'Calificación' : '',
      sort: true,
      hidden: (labelTabla === 'Área' || labelTabla === 'Unidad' || labelTabla === 'Macroproceso' ||
        labelTabla === 'Entidad' || labelTabla === 'Tipo de evento' || labelTabla === 'Moneda' ||
        labelTabla === 'Póliza ATC' || labelTabla === 'Reputacional' || labelTabla === 'Legal' ||
        labelTabla === 'Cumplimiento' || labelTabla === 'Estratégico' || labelTabla === 'Gobierno' ||
        labelTabla === 'Fraude' || labelTabla === 'Liquidez' || labelTabla === 'Operativo' ||
        labelTabla === 'Proceso' || labelTabla === 'Seguridad de la información' ||  labelTabla === 'LGI FT y/o DP') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'nombre',
      text: (labelTabla === 'Proceso') ?
        'Código doc.' : (labelTabla === 'Reputacional' ||
          labelTabla === 'Legal' ||
          labelTabla === 'Cumplimiento' ||
          labelTabla === 'Estratégico' ||
          labelTabla === 'Gobierno' ||
          labelTabla === 'Fraude' ||
          labelTabla === 'Liquidez' ||
          labelTabla === 'Operativo' ||
          labelTabla === 'Seguridad de la información' ||
          labelTabla === 'LGI FT y/o DP') ?
          'Descriptivo' : (labelTabla === 'Recuperación activo' || labelTabla === 'Cuenta contable') ?
            'Descripción' : 'Nombre',
      sort: true,
      hidden: (labelTabla.length !== 0) ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'descripcion',
      text: (labelTabla === 'Categoria de tipo de Evento' ||
        labelTabla === 'Efecto de pérdida' ||
        labelTabla === 'Impacto' ||
        labelTabla === 'Reputacional' ||
        labelTabla === 'Estratégico' ||
        labelTabla === 'Operativo' ||
        labelTabla === 'Seguridad de la información' ||
        labelTabla === 'LGI FT y/o DP') ?
        'Descripción' : (labelTabla === 'Macroproceso') ?
          'Nivel' : (labelTabla === 'Proceso') ?
            'Nombre doc' : (labelTabla === 'Legal' || labelTabla === 'Liquidez') ?
              'Impacto regulatorio' : (labelTabla === 'Cumplimiento') ?
                "Impacto de cumplimiento" : (labelTabla === 'Gobierno') ?
                  'Nivel de gob. #' : (labelTabla === 'Fraude') ?
                    'Imp. reportado ($)' : (labelTabla === 'Responsable') ? 'Cargo' : (labelTabla === 'Cargo') ? 'Correo:' :'',
      sort: true,
      hidden: (labelTabla === 'Categoria de tipo de Evento' || labelTabla === 'Efecto de pérdida' || labelTabla === 'Impacto' ||
        labelTabla === 'Reputacional' || labelTabla === 'Estratégico' || labelTabla === 'Operativo' ||
        labelTabla === 'Seguridad de la información' || labelTabla === 'Macroproceso' || labelTabla === 'Proceso' ||
        labelTabla === 'Legal' || labelTabla === 'Liquidez' || labelTabla === 'Cumplimiento' ||
        labelTabla === 'Gobierno' || labelTabla === 'Fraude' || labelTabla === 'Responsable' ||  labelTabla === 'LGI FT y/o DP' ||  labelTabla === 'Cargo') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoA',
      text: (labelTabla === 'Macroproceso') ?
        'Valoración' : (labelTabla === 'Proceso') ?
          'Proceso' : (labelTabla === 'Gobierno') ?
            'Nivel de gob.' : (labelTabla === 'Fraude') ?
              'Fraude a ventas ($)' : (labelTabla === 'Liquidez') ?
                'Liquidez' : (labelTabla === 'Seguridad de la información') ?
                  'Plazo hasta' : (labelTabla === 'Responsable') ? 'Descripción' : '',
      sort: true,
      hidden: (labelTabla === 'Macroproceso' || labelTabla === 'Proceso' || labelTabla === 'Gobierno' ||
        labelTabla === 'Fraude' || labelTabla === 'Liquidez' || labelTabla === 'Seguridad de la información' ||
        labelTabla === 'Responsable') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoB',
      text: (labelTabla === 'Proceso') ?
        'Gerencia' : (labelTabla === 'Gobierno') ?
          'Puntuación autoeval' : (labelTabla === 'Fraude') ?
            'Imp. reportado 2 ($)' : (labelTabla === 'Liquidez') ?
              "Capital de trabajo" : (labelTabla === 'Responsable') ? 'Usuario' : '',
      sort: true,
      hidden: (labelTabla === 'Proceso' || labelTabla === 'Gobierno' ||
        labelTabla === 'Fraude' || labelTabla === 'Liquidez' || labelTabla === 'Responsable') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoC',
      text: (labelTabla === 'Fraude') ? "Impacto - Severidad" : (labelTabla === 'Responsable') ? 'Tipo' : '',
      sort: true,
      hidden: (labelTabla === 'Fraude' || labelTabla === 'Responsable') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoD',
      text: (labelTabla === 'Fraude') ? "Impacto - Severidad 2" : '',
      sort: true,
      hidden: (labelTabla === 'Fraude') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'codigoAsfi',
      text: (labelTabla === 'Ciudad' ||
        labelTabla === 'Tipo de evento' ||
        labelTabla === 'Canal ASFI' ||
        labelTabla === 'Clase Evento - Basilea' ||
        labelTabla === 'Factor de riesgo' ||
        labelTabla === 'Proceso' ||
        labelTabla === 'Línea de negocio ASFI' ||
        labelTabla === 'Operaciones ASFI' ||
        labelTabla === 'Moneda' ||
        labelTabla === 'Recuperación activo' ||
        labelTabla === 'Cuenta contable' ||
        labelTabla === 'Macroproceso') ? "Cod. ASFI" : '',
      sort: true,
      hidden: (labelTabla === 'Ciudad' || labelTabla === 'Tipo de evento' || labelTabla === 'Canal ASFI' ||
        labelTabla === 'Clase Evento - Basilea' || labelTabla === 'Factor de riesgo' || labelTabla === 'Proceso' ||
        labelTabla === 'Línea de negocio ASFI' || labelTabla === 'Operaciones ASFI' || labelTabla === 'Moneda' ||
        labelTabla === 'Recuperación activo' || labelTabla === 'Cuenta contable' || labelTabla === 'Macroproceso') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'tablaLista.nombre_tabla',
      text: 'TABLA',
      sort: true,
      hidden: true
    }, {
      text: (labelTabla.length !== 0) ? labelTabla==='Macroproceso'? '' : 'Acciones' : '',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => labelTabla==='Macroproceso'? null : actionFormatter(cell, row)
    }
  ]

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} deleteFunction={deleteRow} editFunction={editRow} />
  }

  // Eliminar Parametro
  const deleteRow = (row) => {
    swalWithBootstrapButtons.fire({
      title: '',
      text: '¿Está seguro de eliminar el Parámetro de Evento de Riesgo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      position: 'top'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTablaDescripcionEventoId(row.id)
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
            console.error('Error al eliminar Parámetro de Evento de Riesgo: ', error);
          });
      }
    })
  }

  // Editar Parametro
  const editRow = (row) => {
    // history.push('/administracion/evento-riesgo/Editar/' + row.id);
    const path = '/administracion/evento-riesgo/Editar/:id';
    if (hasPermission(path, valuePathFromContext)) {
      history.push('/administracion/evento-riesgo/Editar/' + row.id);
    } else {
      notificationToast();
    }
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])
  const [dataApi, setDAtaApi] = useState([])
  const history = useHistory()

  /* LISTA TABLA LISTA */
  const callApi = () => {
    getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', false)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* LISTA TABLA DESCRIPCION despendiento de seleccion tabla lista*/
  const handleSelectOnChange = (result) => {
    const labelTable = result.label;
    setLabelTabla(labelTable);
    const valueTable = result.value;
    setValueTabla(valueTable);
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionEventoN1(idTabla)
      .then(res => {
        setDAtaApi(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
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
                <CardTitle className='float-left h4 pt-2'>Parámetros de Eventos de Riesgo</CardTitle>
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
                  //isClearable={true}
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

export default AdministracionEventoListar
