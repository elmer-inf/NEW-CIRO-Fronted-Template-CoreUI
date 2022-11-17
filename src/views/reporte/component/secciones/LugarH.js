import React, { useEffect, useState } from 'react'
import { typeFormatter } from 'src/reusable/Component';
import BootstrapTable from 'react-bootstrap-table-next';
import { reportLugar } from '../../controller/ReporteCiroController';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card, CardBody, Col, Row } from 'reactstrap'
import paginationFactory from 'react-bootstrap-table2-paginator';


const LugarH = ({ fechaIniTrim, fechaFinTrim }) => {
  const [spin, setSpin] = useState(false);
  const [dataApi, setdataApi] = useState([]);
  const sendRequest = {
    fechaIniTrim: fechaIniTrim,
    fechaFinTrim: fechaFinTrim
  }
  const columns = [
    {
      dataField: 'id',
      text: 'Nro',
      hidden: false,
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
      dataField: 'lugar',
      text: 'Lugar',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'tipoEnvio',
      text: 'Tipo envio',
      headerFormatter: typeFormatter

    }
  ];

  const paging = paginationFactory({
    page: 1,
  });

  const getLugar = async (data) => {
    setSpin(true)
    await reportLugar(data)
      .then((response) => {
        setdataApi(response.data);
        setSpin(false)
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false)
      })
  }
  // Cycle life
  useEffect(() => {
    getLugar(sendRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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

export default LugarH
