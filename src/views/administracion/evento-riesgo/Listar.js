import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from '../../../reusable/ActionFormatter';

import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaDescripcionNivel, getTablaLista } from './controller/AdminEventoController'
import { buildSelectTwo } from '../../../functions/Function'
import { Plus } from 'react-feather';

const AdministracionEventoListar = () => {

  const [labelTabla, setLabelTabla] = useState([])

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: false,
      //hidden: true
    },{
        dataField: 'clave',
        text: (labelTabla === 'Área' || labelTabla === 'Unidad' || labelTabla === 'Proceso')?
              'CODIGO' : (labelTabla === 'Entidad' || labelTabla === 'Tipo de evento')?
                          'SIGLA' : /* (labelTabla === 'Canal ASFI')?
                                      'CODIGO' : */   (labelTabla === 'Moneda')?
                                                      'ABREVIATURA' : (labelTabla === 'Póliza ATC')?
                                                                      'NRO' : (labelTabla === 'Reputacional' ||
                                                                               labelTabla === 'Legal' ||
                                                                               labelTabla === 'Cumplimiento' ||
                                                                               labelTabla === 'Estratégico' ||
                                                                               labelTabla === 'Gobierno' ||
                                                                               labelTabla === 'Fraude' ||
                                                                               labelTabla === 'Liquidez' ||
                                                                               labelTabla === 'Operativo')? 'NIVEL' : '',
        sort: true,
        //formatter: columnaVacia
        //hidden : (row) => row.clave == null ? true : false
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter,
    }, {
        dataField: 'nombre',
        text: (labelTabla === 'Reputacional' ||
               labelTabla === 'Legal' ||
               labelTabla === 'Cumplimiento' ||
               labelTabla === 'Estratégico' ||
               labelTabla === 'Gobierno' ||
               labelTabla === 'Fraude' ||
               labelTabla === 'Liquidez' ||
               labelTabla === 'Operativo')? 'DESCRIPTIVO' : 'NOMBRE',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
        dataField: 'descripcion',
        text: (labelTabla === 'Categoria de tipo de Evento' ||
                labelTabla === 'Efecto de pérdida' ||
                labelTabla === 'Impacto' ||
                labelTabla === 'Reputacional' ||
                labelTabla === 'Estratégico' ||
                labelTabla === 'Operativo')?
              'DESCRIPCION' : (labelTabla === 'Proceso')?
                              'NIVEL' : (labelTabla === 'Legal' || labelTabla === 'Liquidez')?
                                          'IMPACTO REGULATORIO' : (labelTabla === 'Cumplimiento')?
                                                                  "IMPACTO DE CUMPLIMIENTO" : (labelTabla === 'Gobierno')?
                                                                                              'NIVEL DE GOB #' : (labelTabla === 'Fraude')?
                                                                                                                  'Imp reportado ($)' : '',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
      dataField: 'campoA',
      text: (labelTabla === 'Proceso')?
            'VALORACION' : (labelTabla === 'Gobierno')?
                            'NIVEL DE GOB' : (labelTabla === 'Fraude')?
                                        'Fraude a ventas ($)' : (labelTabla === 'Liquidez')?
                                                                "LIQUIDEZ" : '',
      sort: true,
     /*  filter: customFilter(),
      filterRenderer: (onFilter, column) =>
          <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
      //headerFormatter: typeFormatter
    }, {
      dataField: 'campoB',
      text: (labelTabla === 'Gobierno')?
                            'PUNTUACION AUTOEVAL' : (labelTabla === 'Fraude')?
                                        'Imp reportado 2 ($)' : (labelTabla === 'Liquidez')?
                                                                "CAPITAL DE TRABAJO" : '',
      sort: true,
     /*  filter: customFilter(),
      filterRenderer: (onFilter, column) =>
          <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
      //headerFormatter: typeFormatter
    }, {
      dataField: 'campoC',
      text: (labelTabla === 'Fraude')? "IMPACTO - SEVERIDAD" : '',
      sort: true,
     /*  filter: customFilter(),
      filterRenderer: (onFilter, column) =>
          <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
      //headerFormatter: typeFormatter
    }, {
      dataField: 'campoD',
      text: (labelTabla === 'Fraude')? "IMPACTO - SEVERIDAD 2" : '',
      sort: true,
     /*  filter: customFilter(),
      filterRenderer: (onFilter, column) =>
          <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
      //headerFormatter: typeFormatter
    }, {
         dataField: 'tablaLista.nombre_tabla',
         text: 'TABLA',
         sort: true,
     }
     /* {
      dataField: 'tablaLista.nivel2',
      text: (tablaLista.nivel2 === 1)?
              'Agencia' : (tablaLista.nivel2 === 3)?
                          'Área' : '',
      sort: true,
     } */,{
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
    history.push('./editar/' + row.id);
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])
  const [dataApi, setDAtaApi] = useState([])
  const history = useHistory()

  const redirect = () => {
    history.push('./registrar')
  }
  /* LISTA TABLA LISTA */
  const callApi = () => {
    getTablaLista()
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
    //console.log('select:  ', result)
    const labelTable = result.label
    setLabelTabla(labelTable)
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionNivel(idTabla)
    .then(res => {
      //console.log('nivel 1: ', res.data)
      setDAtaApi(res.data)
    }).catch((error) => {
      console.log('Error: ', error)
      //notificationToast('error', Messages.notification.notOk)
    })
  }

  // Style Select
  const customStyles =  {
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
        ':hover':{
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
            <Button color='primary' onClick={redirect} className='float-right mt-1 text-white' style={{width: '130px'}}>
            <Plus size={15} className='mr-2'/><span>Registrar</span>
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
              classes= {'table-hover-animation mt-5'}
              bootstrap4={true}
              sort={ { dataField: 'id', order: 'asc' } }
              noDataIndication={'No se encontraron resultados'}
              keyField='id'
              data={dataApi}
              columns={columns}
              bordered={false}
              striped={true}
              hover={false}
              condensed={false}
              wrapperClasses="table-responsive"
              //filter={filterFactory()}
            />
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}

export default AdministracionEventoListar
