import React, { useEffect, useState } from 'react';
import { typeFormatter } from 'src/reusable/Component';
import BootstrapTable from 'react-bootstrap-table-next';
import { reportRiesgoOperativo } from '../../controller/ReporteCiroController';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Card, CardBody, Col, Row } from 'reactstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';

const RiesgooperativoA = ({ fechaIniTrim, fechaFinTrim }) => {

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
      headerFormatter: typeFormatter
    },
    {
      dataField: 'codigoEnvio',
      text: 'Codigo envio',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'fechaCorte',
      text: 'Fecha corte',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'codigoEvento',
      text: 'Codigo evento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'tipoEntidad',
      text: 'Tipo entidad',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'descripcionResumida',
      text: 'Descripción resumida',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'factorRiesgo',
      text: 'Factor Riesgo',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'cargoInvolucrado',
      text: 'Cargo Involucrado',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'areaInvolucrada',
      text: 'Area involucrada',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'categoria',
      text: 'Categoria',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'perdidaRiesgoOperativoContable',
      text: 'Perdidiad de resgo operativo (valor contable)',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'perdidaRiesgoOperativoMercado',
      text: 'Perdidiad de resgo operativo (valor mercado)',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'gastoAsociadoPerdida',
      text: 'Gasto asociado',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'montoTotalRecuperado',
      text: 'Monto total recuperado',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'montoRecuperadoCoberturaSeguro',
      text: 'Monto recuperado cobertura de seguro',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'recuperacionActivo',
      text: 'Recuperacion activo',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'relacionRiesgoCredito',
      text: 'Relación riesgo credito',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'eventoCritico',
      text: 'Evento critico',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'detalleEventoCritico',
      text: 'Detalle eveto Critico',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'fechaDescubrimiento',
      text: 'Fecha descubrimiento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'horaDescubrimiento',
      text: 'Hora descubrimeento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'fechaInicio',
      text: 'fechja inicio',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'horaInicio',
      text: 'Hora inicio',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'fechaFinalizacion',
      text: 'Fecha finalización',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'horaFinalizacion',
      text: 'Hora finalizacion',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'elaborador',
      text: 'Elaborador',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'revisor',
      text: 'Revisor',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'aprobador',
      text: 'Aprobador',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'estadoEvento',
      text: 'Estado evento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'detalleEstadoEvento',
      text: 'Detalle estado evento',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'codigoEventoRelacionado',
      text: 'Código evento relacionado',
      headerFormatter: typeFormatter
    },
    {
      dataField: 'tipoEnvio',
      text: 'Tipo envio',
      headerFormatter: typeFormatter
    },
  ];

  const paging = paginationFactory({
    page: 1,
  });

  const getRiesgoOperativo = async (data) => {
    setSpin(true)
    await reportRiesgoOperativo(data)
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
    getRiesgoOperativo(sendRequest);
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

export default RiesgooperativoA
