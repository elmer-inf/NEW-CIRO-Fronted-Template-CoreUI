import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { typeFormatter } from 'src/reusable/Component';
import ActionFormatter from 'src/reusable/ActionFormatter';
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaListaRiesgo, getTablaDescripcionRiesgoN1, deleteTablaDescripcionRiesgoId } from './controller/AdminRiesgoController'
import { buildSelectTwo, hasPermission } from 'src/functions/Function'
import { PathContext } from 'src/containers/TheLayout';
import { ToastContainer, toast } from 'react-toastify';
import { Messages } from 'src/reusable/variables/Messages';
import Swal from 'sweetalert2'

const AdministracionMatrizRiesgosListar = () => {

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
    //history.push('/administracion/matriz-riesgo/Registrar');
    e.preventDefault();
    const path = '/administracion/matriz-riesgo/Registrar';
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

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: false,
      hidden: true
    }, {
      dataField: 'campoA',
      text: (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo') ?
        'NIVEL' : (labelTabla === 'Normas para control') ?
          'CODIGO' : (labelTabla === 'Nivel de riesgo inherente') ?
            'CALIFICACION' : (labelTabla === 'Controles') ?
              'VALORACION' : '',
      sort: true,
      hidden: (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo' ||
        labelTabla === 'Normas para control' || labelTabla === 'Nivel de riesgo inherente' ||
        labelTabla === 'Controles') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'nombre',
      text: (labelTabla === 'Pérdida ASFI' ||
        labelTabla === 'Tipo de control' ||
        labelTabla === 'Nivel de automatización' ||
        labelTabla === 'Identificado por' ||
        labelTabla === 'Estrategia para administrar el riesgo') ?
        'NOMBRE' : (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo') ?
          'DESCRIPTIVO' : (labelTabla === 'Normas para control') ?
            'TITULO DEL DOCUMENTO' : (labelTabla === 'Controles') ?
              'DESCRIPCION' : (labelTabla === 'Nivel de riesgo inherente') ?
                'NIVEL' : '',
      sort: true,
      hidden: (labelTabla === 'Pérdida ASFI' || labelTabla === 'Tipo de control' ||
        labelTabla === 'Nivel de automatización' || labelTabla === 'Identificado por' ||
        labelTabla === 'Estrategia para administrar el riesgo' || labelTabla === 'Probabilidad' ||
        labelTabla === 'Impacto de Riesgo' || labelTabla === 'Normas para control' ||
        labelTabla === 'Controles' || labelTabla === 'Nivel de riesgo inherente') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoB',
      text: (labelTabla === 'Probabilidad') ?
        'PROB CUALITATIVA' : (labelTabla === 'Impacto de Riesgo') ?
          'IMPACTO CUALITATIVO' : (labelTabla === 'Controles') ?
            '% MITIGACION' : (labelTabla === 'Nivel de riesgo inherente') ?
              'DESCRIPTIVO' : '',
      sort: true,
      hidden: (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo' ||
        labelTabla === 'Controles' || labelTabla === 'Nivel de riesgo inherente') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoC',
      text: (labelTabla === 'Probabilidad') ?
        'TEMPORALIDAD' : (labelTabla === 'Impacto de Riesgo') ?
          'IMPACTO CUANTITATIVO' : (labelTabla === 'Nivel de riesgo inherente') ?
            'DESCRIPCION' : '',
      sort: true,
      hidden: (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo' ||
        labelTabla === 'Nivel de riesgo inherente') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoD',
      text: (labelTabla === 'Probabilidad') ?
        'PROB TEMPORALIDAD' : (labelTabla === 'Impacto de Riesgo') ?
          'IMPACTO RESUMEN' : (labelTabla === 'Nivel de riesgo inherente') ?
            'TOLERANCIA AL RIESGO ($)' : '',
      sort: true,
      hidden: (labelTabla === 'Probabilidad' || labelTabla === 'Impacto de Riesgo' ||
        labelTabla === 'Nivel de riesgo inherente') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoE',
      text: (labelTabla === 'Impacto de Riesgo') ?
        'LIMITE INF ($)' : (labelTabla === 'Probabilidad') ?
          'VECES AL AÑO' : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de Riesgo' || labelTabla === 'Probabilidad') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoF',
      text: (labelTabla === 'Impacto de Riesgo') ?
        'LIMITE SUP ($)' : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de Riesgo') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoG',
      text: (labelTabla === 'Impacto de Riesgo') ?
        '% IMPACTO' : (labelTabla === 'Probabilidad') ?
          '% OCURRENCIA' : (labelTabla === 'Nivel de riesgo inherente') ?
            'TRATAMIENTO' : '',
      sort: true,
      hidden: (labelTabla === 'Impacto de Riesgo' || labelTabla === 'Probabilidad' ||
        labelTabla === 'Nivel de riesgo inherente') ? false : true,
      filter: textFilter({
        placeholder: 'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      text: (labelTabla.length !== 0) ? 'ACCIONES' : '',
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
      text:'¿Está seguro de eliminar el Parámetro de Matriz de Riesgo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true,
      position: 'top'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTablaDescripcionRiesgoId(row.id)
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
            console.log('Error al eliminar Parámetro de Matriz de Riesgo: ', error);
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
  }

  // Editar Parametro
  const editRow = (row) => {
    //history.push('/administracion/matriz-riesgo/Editar/' + row.id);
    const path = '/administracion/matriz-riesgo/Editar/:id';
    if (hasPermission(path, valuePathFromContext)) {
      history.push('/administracion/matriz-riesgo/Editar/' + row.id);
    } else {
      notificationToast();
    }
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])
  const [dataApi, setDAtaApi] = useState([])
  const history = useHistory()

  /* LISTA TABLA LISTA */
  const callApi = () => {
    getTablaListaRiesgo()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', false)
        //console.log('El response de tabla: ', res.data)
        //console.log('options : ', options)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  useEffect(() => {
    callApi()
  }, [])

  /* LISTA TABLA DESCRIPCION despendiento de seleccion tabla lista*/
  const handleSelectOnChange = (result) => {
    //console.log('select:  ', result)
    const labelTable = result.label
    setLabelTabla(labelTable)
    const valueTable = result.value;
    setValueTabla(valueTable);
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionRiesgoN1(idTabla)
      .then(res => {
        //console.log('nivel 1: ', res.data)
        setDAtaApi(res.data)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  // Style Select
  const customStyles = {
    menu: provided => ({ ...provided, zIndex: "9999 !important" }),
    control: (styles,) => ({
      ...styles,
      boxShadow: 'none'
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
    <div className='table-hover-animation'>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Listado de Parámetros de Matriz de Riesgos</CardTitle>
            <Button color='primary' onClick={(e) => {redirect(e)}} className='float-right mt-1' style={{ width: '130px' }}>
              <span className='text-white'>Registrar</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Row className='justify-content-center pt-4'>
              <Label sm='3' lg='2' className='font-weight-bold'>
                Seleccione Tabla
              </Label>
              <Col sm='9' lg='4'>
                <Select
                  onChange={(e) => handleSelectOnChange(e)}
                  placeholder={'Buscar . . .'}
                  className='react-select'
                  classNamePrefix='select'
                  options={tablaListaOptions}
                  isLoading={true}
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
              classes={'table-hover-animation mt-5'}
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

export default AdministracionMatrizRiesgosListar
