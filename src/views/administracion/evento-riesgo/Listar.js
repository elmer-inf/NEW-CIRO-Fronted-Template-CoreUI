import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row} from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import ActionFormatter from '../../../reusable/ActionFormatter';

import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { getTablaDescripcionNivel, getTablaLista } from './controller/AdminEventoController'
import { buildSelectTwo } from '../../../functions/Function'

const AdministracionEventoListar = () => {

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: false,
      //hidden: true
    },{
        dataField: 'clave',
        text: 'CLAVE',
        sort: true,
        //formatter: columnaVacia
        //hidden : (row) => row.clave == null ? true : false
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter,
    }, {
        dataField: 'nombre',
        text: 'NOMBRE',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
        dataField: 'descripcion',
        text: 'DESCRIPCION',
        sort: true,
       /*  filter: customFilter(),
        filterRenderer: (onFilter, column) =>
            <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
        //headerFormatter: typeFormatter
    }, {
         dataField: 'tablaLista.nombre_tabla',
         text: 'TABLA',
         sort: true,
        /*  filter: textFilter({
             className: 'test-classname',
             placeholder: 'Buscar',
         }),
         align: 'right', */
         //headerFormatter: typeFormatter
     },{
        dataField: 'acciones',
        text: 'ACCIONES',
        headerAlign: 'center',
        style: { textAlign: 'center' },
        formatter: (cell, row) => actionFormatter(cell, row)
    }
  ]

  /* function columnaVacia(column) {
    if (column.clave !== null){
      return column;
    }
    else
      return {
        hidden: column.hidden
      }
  } */

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
        console.log('El response de tabla: ', res.data)
        console.log('options : ', options)
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
    getTablaDescripcion(result.value);
  }

  const getTablaDescripcion = (idTabla) => {
    getTablaDescripcionNivel(idTabla)
    .then(res => {
      console.log('nivel 1: ', res.data)
      setDAtaApi(res.data)
    }).catch((error) => {
      console.log('Error: ', error)
      //notificationToast('error', Messages.notification.notOk)
    })
  } 


  return (
    <div id='' className='table-hover-animation'>
      <Fragment>
        {/* <BreadCrumbs breadCrumbTitle='Eventos de Riesgo' breadCrumbParent='Administración' breadCrumbActive='Eventos de Riesgo' /> */}
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Listado de Parámetros de Eventos de Riesgo</CardTitle>
            <Button color='primary' onClick={redirect} className='float-right mt-1' style={{width: '130px'}}>
              <span className='text-white'>Registrar</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Row className='justify-content-center pt-4'>
              <Label sm='3' lg='2' className='font-weight-bold'>
                Seleccione Tabla
              </Label>
              <Col sm='9' lg='4'>
                {/* <Select options={tablaListaOptions}/> */}
                <Select
                  onChange={(e) => handleSelectOnChange(e)}
                  placeholder={'Buscar . . .'}
                  className='react-select'
                  classNamePrefix='select'
                  //defaultValue={tablaListaOptions[0]}
                  options={tablaListaOptions}
                  isLoading={true}
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
