import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card, CardBody, Col, Row } from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { reporteEvento } from '../controller/ReporteEventoController';

const ViewReportEvento = ({ fechaDesde, fechaHasta, estadoEvento, loadDataEvento }) => {

  const [spin, setSpin] = useState(false);
  const [dataApi, setdataApi] = useState([]);

  const columns = [
    {
      dataField: 'codigo',
      text: 'Código',
      style: { whiteSpace: 'nowrap' }
    },
    {
      dataField: 'descripcion',
      text: 'Descripción'
    },
    {
      dataField: 'estadoEvento',
      text: 'Estado evento'
    },
    {
      dataField: 'fechaDesc',
      text: 'Fecha desc.',
      style: { whiteSpace: 'nowrap' }
    },
    {
      dataField: 'fechaFin',
      text: 'Fecha fin',
      style: { whiteSpace: 'nowrap' }
    },
  ];

  const paginationTotalRenderer = (from, to, size) => (
    <span className="pl-2 react-bootstrap-table-pagination-total">
      {from} a {to} de <b>{size} resultados</b>
    </span>
  );

  const paging = paginationFactory({
    page: 1,
    paginationTotalRenderer,
    showTotal: true
  });

  const getReporteEvento = async (data) => {
    setSpin(true);
    await reporteEvento(data)
      .then((response) => {
        setdataApi(response.data);
        setSpin(false)
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false)
      })
  }

  // Genera KEY unico para Tabla, ya que no se tiene un identificador unico
  dataApi.forEach((item, index) => {
    item.uniqueKey = `${item.codigo || ''}-${item.descripcion || ''}-${index}`;
  });

  useEffect(() => {
    if (loadDataEvento) {
      const sendRequest = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        estadoEvento: estadoEvento
      };
      getReporteEvento(sendRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDataEvento]);


  return (
    <div>
      <CCSpinner show={spin} />
      <Card>
        <CardBody>
          <Row className="d-flex justify-content-center">
            <Col sm="12" md={{ size: 12, offset: 0 }}>
              <BootstrapTable
                classes={'table-hover-animation'}
                bootstrap4={true}
                noDataIndication={'No se encontraron resultados'}
                keyField='uniqueKey'
                data={dataApi}
                columns={columns}
                bordered={false}
                striped={true}
                hover={false}
                condensed={true}
                wrapperClasses="table-responsive"
                pagination={paging}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

    </div>
  )
}

export default ViewReportEvento
