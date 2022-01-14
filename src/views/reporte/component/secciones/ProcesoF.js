import React,{useEffect,useState} from 'react'
import { typeFormatter } from 'src/reusable/Component';
import BootstrapTable from 'react-bootstrap-table-next';
import { reportProceso } from '../../controller/ReporteCiroController';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card,  CardBody,  Col,  Row } from 'reactstrap'


const ProcesoF = () => {
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
            dataField: 'proceso',
            text: 'Proceso',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'procesoCritico',
            text: 'Proceso Critico',
            
            /*  filter: customFilter(),
             filterRenderer: (onFilter, column) =>
                 <CFilterText placeholder={'Buscar'} onFilter={handleOnFilter} column={column} handleChildClick={handleChildClick} />, */
            headerFormatter: typeFormatter

        },
        {
            dataField: 'detalleProcesoCritico',
            text: 'Detalle porceso critico',
            
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

    const getProceso = async (e) => {
        setSpin(true)
        await reportProceso()
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
    getProceso();
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

export default ProcesoF
