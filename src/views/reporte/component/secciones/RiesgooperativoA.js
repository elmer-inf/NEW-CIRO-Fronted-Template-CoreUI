import React,{useEffect,useState} from 'react'
import { typeFormatter } from 'src/reusable/Component';
import BootstrapTable from 'react-bootstrap-table-next';
import { reportRiesgoOperativo } from '../../controller/ReporteCiroController';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card,  CardBody,  Col,  Row } from 'reactstrap'


const RiesgooperativoA = () => {
    const [spin, setSpin] = useState(false);
    const [dataApi, setdataApi] = useState([]);

    const columns = [
        {
            dataField: 'id',
            text: 'Id',
            hidden: true
        },
        {
            dataField: 'codigoEnvio',
            text: 'Codigo envio',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'fechaCorte',
            text: 'Fecha corte',
            
            /*  formatter: (cell, row) => showformatter(cell, row),
             filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterSelect placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter
        },
        {
            dataField: 'codigoEvento',
            text: 'Codigo evento',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'tipoEntidad',
            text: 'Tipo entidad',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'descripcionResumida',
            text: 'Descripción resumida',
            
            /*  formatter: (cell, row) => showformatter(cell, row),
             filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterSelect placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter
        },
        {
            dataField: 'factorRiesgo',
            text: 'Factor Riesgo',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'cargoInvolucrado',
            text: 'Cargo Involucrado',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'areaInvolucrada',
            text: 'Area involucrada',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'categoria',
            text: 'Categoria',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'perdidaRiesgoOperativoContable',
            text: 'Perdidiad de resgo operativo (valor contable)',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },

        {
            dataField: 'perdidaRiesgoOperativoMercado',
            text: 'Perdidiad de resgo operativo (valor mercado)',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'gastoAsociadoPerdida',
            text: 'Gasto asociado',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'montoTotalRecuperado',
            text: 'Monto total recuperado',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'montoRecuperadoCoberturaSeguro',
            text: 'Monto recuperado cobertura de seguro',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'recuperacionActivo',
            text: 'Recuperacion activo',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'relacionRiesgoCredito',
            text: 'Relación riesgo credito',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'eventoCritico',
            text: 'Evento critico',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'detalleEventoCritico',
            text: 'Detalle eveto Critico',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'fechaDescubrimiento',
            text: 'Fecha descubrimiento',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'horaDescubrimiento',
            text: 'Hora descubrimeento',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'fechaInicio',
            text: 'fechja inicio',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'horaInicio',
            text: 'Hora inicio',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'fechaFinalizacion',
            text: 'Fecha finalización',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'horaFinalizacion',
            text: 'Hora finalizacion',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'elaborador',
            text: 'Elaborador',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'revisor',
            text: 'Revisor',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'aprobador',
            text: 'Aprobador',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'estadoEvento',
            text: 'Estado evento',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'detalleEstadoEvento',
            text: 'Detalle estado evento',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'codigoEventoRelacionado',
            text: 'Código evento relacionado',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'tipoEnvio',
            text: 'Tipo envio',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },

        /* {
            dataField: 'x1',
            text: 'Acción',
            formatter: (cell, row) => actionFormatter(cell, row)
        } */
    ];

    const getRiesgoOperativo = async (e) => {
        setSpin(true)
        await reportRiesgoOperativo()
            .then((response) => {
                console.log('ressssponseee: ', response);
                setdataApi(response.data);
                setSpin(false)
            }).catch((error) => {
                console.log("Error: ", error);
                setSpin(false)
            })
    }
   // Cycle life
   useEffect(() => {
    getRiesgoOperativo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


    return (
        <div>
            <CCSpinner show={spin} />
            <Card>
                <CardBody>
                    {/*   <CMainTitle title="Rol" /> */}
                    <Row className="d-flex justify-content-center">
                        <Col sm="12" md={{ size: 12, offset: 0 }}>
                            <BootstrapTable
                                noDataIndication={'No se encontraron resultados'}
                                keyField='id'
                                data={dataApi}
                                columns={columns}
                                bordered={false}
                                striped={true}
                                condensed={true}
                                wrapperClasses="table-responsive"
                              /// filter={filterFactory()}

                            />

                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </div>
    )
}

export default RiesgooperativoA
