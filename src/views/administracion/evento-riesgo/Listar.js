import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
/* import paginationFactory from 'react-bootstrap-table2-paginator'; */
import { typeFormatter } from 'src/reusable/Component';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ActionFormatter from 'src/reusable/ActionFormatter';
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaDescripcionEventoN1, getTablaListaEvento } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'
import { Plus } from 'react-feather';

const AdministracionEventoListar = () => {

  const [labelTabla, setLabelTabla] = useState([])

  /* const pagination = paginationFactory({
    page: 2,
  }); */

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: false,
      hidden: true
    }, {
      dataField: 'clave',
      text: (labelTabla === 'Área' || labelTabla === 'Unidad' || labelTabla === 'Macroproceso') ?
        'CODIGO' : (labelTabla === 'Entidad' || labelTabla === 'Tipo de evento') ?
          'SIGLA' : (labelTabla === 'Moneda') ?
            'ABREVIATURA' : (labelTabla === 'Póliza ATC') ?
              'NRO' : (labelTabla === 'Reputacional' ||
                      labelTabla === 'Legal' ||
                      labelTabla === 'Cumplimiento' ||
                      labelTabla === 'Estratégico' ||
                      labelTabla === 'Gobierno' ||
                      labelTabla === 'Fraude' ||
                      labelTabla === 'Liquidez' ||
                      labelTabla === 'Operativo') ? 'NIVEL' : (labelTabla === 'Proceso') ?
                      'TIPO DOC' : (labelTabla === 'Seguridad de la información') ?
                                  'CALIFICACION' : '',
      sort: true,
      hidden: (labelTabla === 'Área' || labelTabla === 'Unidad' || labelTabla === 'Macroproceso' ||
                labelTabla === 'Entidad' || labelTabla === 'Tipo de evento' || labelTabla === 'Moneda' ||
                labelTabla === 'Póliza ATC' || labelTabla === 'Reputacional' || labelTabla === 'Legal' ||
                labelTabla === 'Cumplimiento' || labelTabla === 'Estratégico' || labelTabla === 'Gobierno' ||
                labelTabla === 'Fraude' || labelTabla === 'Liquidez' || labelTabla === 'Operativo' ||
                labelTabla === 'Proceso' ||labelTabla === 'Seguridad de la información') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'nombre',
      text: (labelTabla === 'Proceso') ?
        'CODIGO DOC' : (labelTabla === 'Reputacional' ||
          labelTabla === 'Legal' ||
          labelTabla === 'Cumplimiento' ||
          labelTabla === 'Estratégico' ||
          labelTabla === 'Gobierno' ||
          labelTabla === 'Fraude' ||
          labelTabla === 'Liquidez' ||
          labelTabla === 'Operativo' ||
          labelTabla === 'Seguridad de la información') ?
            'DESCRIPTIVO' : (labelTabla === 'Recuperación activo') ?
                  'DESCRIPCION' : 'NOMBRE',
      sort: true,
      hidden: (labelTabla !== '' || labelTabla !== undefined) ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
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
        labelTabla === 'Seguridad de la información') ?
        'DESCRIPCION' : (labelTabla === 'Macroproceso') ?
          'NIVEL' : (labelTabla === 'Proceso') ?
            'NOMBRE DOC' : (labelTabla === 'Legal' || labelTabla === 'Liquidez') ?
              'IMPACTO REGULATORIO' : (labelTabla === 'Cumplimiento') ?
                "IMPACTO DE CUMPLIMIENTO" : (labelTabla === 'Gobierno') ?
                  'NIVEL DE GOB #' : (labelTabla === 'Fraude') ?
                    'Imp reportado ($)' : '',
      sort: true,
      hidden: (labelTabla === 'Categoria de tipo de Evento' || labelTabla === 'Efecto de pérdida' || labelTabla === 'Impacto' ||
                labelTabla === 'Reputacional' || labelTabla === 'Estratégico' || labelTabla === 'Operativo' ||
                labelTabla === 'Seguridad de la información' || labelTabla === 'Macroproceso' || labelTabla === 'Proceso' ||
                labelTabla === 'Legal' || labelTabla === 'Liquidez' || labelTabla === 'Cumplimiento' ||
                labelTabla === 'Gobierno' || labelTabla === 'Fraude') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoA',
      text: (labelTabla === 'Macroproceso') ?
        'VALORACION' : (labelTabla === 'Proceso') ?
          'PROCESO' : (labelTabla === 'Gobierno') ?
            'NIVEL DE GOB' : (labelTabla === 'Fraude') ?
              'Fraude a ventas ($)' : (labelTabla === 'Liquidez') ?
                'LIQUIDEZ' : (labelTabla === 'Seguridad de la información')?
                  'PLAZO HASTA' : '',
      sort: true,
      hidden: (labelTabla === 'Macroproceso' || labelTabla === 'Proceso' || labelTabla === 'Gobierno' ||
                labelTabla === 'Fraude' || labelTabla === 'Liquidez' || labelTabla === 'Seguridad de la información')? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoB',
      text: (labelTabla === 'Proceso') ?
        'GERENCIA' : (labelTabla === 'Gobierno') ?
          'PUNTUACION AUTOEVAL' : (labelTabla === 'Fraude') ?
            'Imp reportado 2 ($)' : (labelTabla === 'Liquidez') ?
              "CAPITAL DE TRABAJO" : '',
      sort: true,
      hidden : (labelTabla === 'Proceso' || labelTabla === 'Gobierno' ||
                labelTabla === 'Fraude' || labelTabla === 'Liquidez') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoC',
      text: (labelTabla === 'Fraude') ? "IMPACTO - SEVERIDAD" : '',
      sort: true,
      hidden: (labelTabla === 'Fraude') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'campoD',
      text: (labelTabla === 'Fraude') ? "IMPACTO - SEVERIDAD 2" : '',
      sort: true,
      hidden: (labelTabla === 'Fraude') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
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
              labelTabla === 'Recuperación activo') ? "COD ASFI" : '',
      sort: true,
      hidden:  (labelTabla === 'Ciudad' || labelTabla === 'Tipo de evento' || labelTabla === 'Canal ASFI' ||
                labelTabla === 'Clase Evento - Basilea' || labelTabla === 'Factor de riesgo' || labelTabla === 'Proceso' ||
                labelTabla === 'Línea de negocio ASFI' || labelTabla === 'Operaciones ASFI' || labelTabla === 'Moneda' ||
                labelTabla === 'Recuperación activo') ? false : true,
      filter: textFilter({
        placeholder:'Buscar'
      }),
      headerFormatter: typeFormatter,
    }, {
      dataField: 'tablaLista.nombre_tabla',
      text: 'TABLA',
      sort: true,
      hidden:true
    }
     /* {
      dataField: 'tablaLista.nivel2',
      text: (tablaLista.nivel2 === 1)?
              'Agencia' : (tablaLista.nivel2 === 3)?
                          'Área' : '',
      sort: true,
     } */, {
      dataField: 'acciones',
      text: 'ACCIONES',
      headerAlign: 'center',
      style: { textAlign: 'center' },
      formatter: (cell, row) => actionFormatter(cell, row)
    }
  ]

  const actionFormatter = (cell, row) => {
    return <ActionFormatter cell={cell} row={row} detailFunction={detailsRow} editFunction={editRow} />
  }

  const detailsRow = (row) => {
    console.log(row)
    //loseModal();
    //return <DetailRestForm row={row} mod={true}/>
  }
  const editRow = (row) => {
    console.log(row)
    //history.push('./editar/' + row.id);
    history.push('/administracion/evento-riesgo/Editar/' + row.id);
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])
  const [dataApi, setDAtaApi] = useState([])
  const history = useHistory()

  const redirect = () => {
    history.push('./registrar')
  }
  /* LISTA TABLA LISTA */
  const callApi = () => {
    getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', false)
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
    console.log('select:  ', result)
    const labelTable = result.label
    setLabelTabla(labelTable)
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {

    getTablaDescripcionEventoN1(idTabla)
      .then(res => {
        console.log('nivel 1: ', res.data)
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
    <div id='' className='table-hover-animation'>
      <Fragment>
        {/* <BreadCrumbs breadCrumbTitle='Eventos de Riesgo' breadCrumbParent='Administración' breadCrumbActive='Eventos de Riesgo' /> */}
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Listado de Parámetros de Eventos de Riesgo</CardTitle>
            <Button color='primary' onClick={redirect} className='float-right mt-1 text-white' style={{ width: '130px' }}>
              <Plus size={15} className='mr-2' /><span>Registrar</span>
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
              /* pagination={ pagination } */
              filter={filterFactory()}
            />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default AdministracionEventoListar
