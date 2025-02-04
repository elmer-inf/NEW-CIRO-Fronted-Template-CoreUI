import React, { useEffect, useState } from 'react';
import { typeFormatter } from 'src/reusable/Component';
import BootstrapTable from 'react-bootstrap-table-next';
import { reportCanal } from '../controller/ReporteCiroController';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card, CardBody, Col, Row } from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';

const CanalE = ({ fechaIniTrim, fechaFinTrim, loadDataCiro }) => {

  const [spin, setSpin] = useState(false);
  const [dataApi, setdataApi] = useState([]);

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

  const columns = [
    {
      dataField: 'id',
      text: 'Id',
      hidden: true,
      fechaFinTrim: fechaFinTrim
    },
    {
      dataField: 'codigoEnvio',
      text: 'Código envio',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'fechaCorte',
      text: 'Fecha corte',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'codigoEvento',
      text: 'Código evento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'canal',
      text: 'Canal',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'tipoEnvio',
      text: 'Tipo envio',
      headerFormatter: typeFormatter
    },
  ];

  const getCanal = async (data) => {
    setSpin(true)
    await reportCanal(data)
      .then((response) => {
        setdataApi(response.data);
        setSpin(false)
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false)
      })
  }

  useEffect(() => {
    if (loadDataCiro) {
      const sendRequest = {
        fechaIniTrim: fechaIniTrim,
        fechaFinTrim: fechaFinTrim
      }
      getCanal(sendRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDataCiro]);

  return (
    <div className='custom-react-bootstrap-table table-hover-animation'>
      <CCSpinner show={spin} />
      <Card>
        <CardBody>
          <Row className="d-flex justify-content-center">
            <Col sm="12" md={{ size: 12, offset: 0 }}>
              <BootstrapTable
                classes={''}
                bootstrap4={true}
                noDataIndication={'No se encontraron resultados'}
                keyField='id'
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

export default CanalE
