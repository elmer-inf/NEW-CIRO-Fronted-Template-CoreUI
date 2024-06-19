import React, { useEffect, useState } from 'react';
import { Col, Label, Row } from 'reactstrap';
import { getInherenteResidual1 } from '../controller/ReporteRiesgoController';
import { Chart as ChartJS, registerables } from 'chart.js';
import BootstrapTable from 'react-bootstrap-table-next';
import { Scatter } from 'react-chartjs-2';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
ChartJS.register(...registerables);

const MapaInherenteResidual1 = ({ }) => {

  const [spin, setSpin] = useState(false);
  const [dataValoracionExp, setValoracionExp] = useState([]);
  const [dataPerfilRiesgo, setPerfilRiesgo] = useState([]);

  const columnsValoracion = [
    {
      dataField: 'nro',
      text: 'N°',
      headerStyle: { fontSize: '11px', backgroundColor: '#009999', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'codigo',
      text: 'Código',
      headerStyle: { fontSize: '11px', backgroundColor: '#009999', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'macroproceso',
      text: 'MACROPROCESO',
      headerStyle: { fontSize: '11px', backgroundColor: '#009999', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'prob',
      text: 'Prob',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'probabilidad',
      text: 'Valoración de probabilidad',
      headerFormatter: () => { return (<div>Valoración de <br />probabilidad</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'factorProbabilidad',
      text: 'Factor de probabilidad',
      headerFormatter: () => { return (<div>Factor de <br />probabilidad</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'probabilidadDesc',
      text: 'Probabilidad',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: probabilidadFormatter(cell), fontSize: '11px',
        };
      }
    }, {
      dataField: 'impactoPor',
      text: 'Impacto por cada vez que ocurre el evento (USD)',
      headerFormatter: () => { return (<div>Impacto por cada <br />vez que ocurre <br />el evento (USD)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'impacto',
      text: 'Impacto',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'impactoDesc',
      text: 'Valoración de impacto',
      headerFormatter: () => { return (<div>Valoración <br />de impacto</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: impactoFormatter(cell), fontSize: '11px',
        };
      }
    }, {
      dataField: 'montoRiesgo',
      text: 'Monto Riesgo de pérdida (Anual)',
      headerFormatter: () => { return (<div>Monto Riesgo <br />de pérdida <br />(Anual)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'valoracionRiesgo',
      text: 'Valoración Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Valoración <br />Riesgo (Matriz <br />de Riesgo)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'riesgo',
      text: 'Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Riesgo <br />(Matriz <br />de Riesgo)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: impactoFormatter(cell), fontSize: '11px',
        };
      }
    }
  ]

  const columnsPerfil = [
    {
      dataField: 'prob',
      text: 'Prob',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'probabilidad',
      text: 'Valoración de probabilidad',
      headerFormatter: () => { return (<div>Valoración de <br />probabilidad</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'factorProbabilidad',
      text: 'Factor de probabilidad',
      headerFormatter: () => { return (<div>Factor de <br />probabilidad</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'probabilidadDesc',
      text: 'Probabilidad',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: probabilidadFormatter(cell), fontSize: '11px',
        };
      }
    }, {
      dataField: 'impactoPor',
      text: 'Impacto por cada vez que ocurre el evento (USD)',
      headerFormatter: () => { return (<div>Impacto por cada <br />vez que ocurre <br />el evento (USD)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'impacto',
      text: 'Impacto',
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'valoracionImpacto',
      text: 'Valoración de impacto',
      headerFormatter: () => { return (<div>Valoración <br />de impacto</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#bdd7ee', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: impactoFormatter(cell), fontSize: '11px',
        };
      }
    }, {
      dataField: 'montoRiesgo',
      text: 'Monto Riesgo de pérdida (Anual)',
      headerFormatter: () => { return (<div>Monto Riesgo <br />de pérdida <br />(Anual)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'valoracionRiesgo',
      text: 'Valoración Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Valoración <br />Riesgo (Matriz <br />de Riesgo)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: { fontSize: '11px' }
    }, {
      dataField: 'riesgo',
      text: 'Riesgo (Matriz de Riesgo)',
      headerFormatter: () => { return (<div>Riesgo <br />(Matriz <br />de Riesgo)</div>) },
      headerStyle: { fontSize: '11px', backgroundColor: '#f4b084', textAlign: 'center' },
      style: (cell) => {
        return {
          backgroundColor: impactoFormatter(cell), fontSize: '11px',
        };
      }
    }
  ]

  function probabilidadFormatter(cell) {
    const normalizedCell = cell.trim().toLowerCase();
    switch (normalizedCell) {
      case 'baja': return '#c9c9c9';
      case 'media baja': return '#FFFF66';
      case 'media': return '#ffd685';
      case 'media alta': return '#FAC8C1';
      case 'alta': return '#FF7F7E';
      default: return 'transparent';
    }
  }

  function impactoFormatter(cell) {
    const normalizedCell = cell.trim().toLowerCase();
    switch (normalizedCell) {
      case 'bajo': return '#c9c9c9';
      case 'medio bajo': return '#FFFF66';
      case 'medio': return '#ffd685';
      case 'medio alto': return '#FAC8C1';
      case 'alto': return '#FF7F7E';
      default: return 'transparent';
    }
  }

  const getMapaInherenteResidual1 = () => {
    setSpin(true); 
    getInherenteResidual1()
      .then(res => {
        console.log('res.data: ', res.data);
        setValoracionExp(res.data.listValoracionExposicionDTO);
        setPerfilRiesgo([res.data.perfilRiesgoDTO]);
      }).catch((error) => {
        console.error('Error: ', error);
      }).finally(() => {
        setSpin(false);
      });
  };

  // Mapa por macroproceso
  const scatterOptions = {
    maintainAspectRatio: true, // Asegúrate de que esto está activado
    aspectRatio: 1,
    scales: {
      x: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'IMPACTO'
        }
      },
      y: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'PROBABILIDAD'
        }
      }
    },
    plugins: {
      legend: {
        display: false // Oculta la leyenda generada por ChartJS
      },
      background: true // Activar el plugin de fondo
    }
  };

  const backgroundPlugin = {
    id: 'background', // Es importante darle un ID único
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const { left, right, top, bottom } = chart.chartArea;
      const colorZones = [
        // Alto
        { color: '#ff7f7e', range: { x: [4, 5], y: [4, 5] } },
        { color: '#ff7f7e', range: { x: [4, 5], y: [3, 4] } },
        { color: '#ff7f7e', range: { x: [3, 4], y: [4, 5] } },
        // Medio Alto
        { color: '#f9c6c2', range: { x: [2, 3], y: [4, 5] } },
        { color: '#f9c6c2', range: { x: [3, 4], y: [3, 4] } },
        { color: '#f9c6c2', range: { x: [3, 4], y: [2, 3] } },
        { color: '#f9c6c2', range: { x: [4, 5], y: [2, 3] } },
        { color: '#f9c6c2', range: { x: [4, 5], y: [1, 2] } },
        // Medio
        { color: '#ffdf80', range: { x: [0, 1], y: [4, 5] } },
        { color: '#ffdf80', range: { x: [1, 2], y: [4, 5] } },
        { color: '#ffdf80', range: { x: [1, 2], y: [3, 4] } },
        { color: '#ffdf80', range: { x: [2, 3], y: [3, 4] } },
        { color: '#ffdf80', range: { x: [2, 3], y: [2, 3] } },
        { color: '#ffdf80', range: { x: [2, 3], y: [1, 2] } },
        { color: '#ffdf80', range: { x: [3, 4], y: [1, 2] } },
        { color: '#ffdf80', range: { x: [3, 4], y: [0, 1] } },
        { color: '#ffdf80', range: { x: [4, 5], y: [0, 1] } },
        // Medio Bajo
        { color: '#ffff81', range: { x: [0, 1], y: [3, 4] } },
        { color: '#ffff81', range: { x: [0, 1], y: [2, 3] } },
        { color: '#ffff81', range: { x: [1, 2], y: [2, 3] } },
        { color: '#ffff81', range: { x: [1, 2], y: [1, 2] } },
        { color: '#ffff81', range: { x: [2, 3], y: [0, 1] } },
        // Bajo
        { color: '#b8d6a4', range: { x: [0, 1], y: [1, 2] } },
        { color: '#b8d6a4', range: { x: [0, 1], y: [0, 1] } },
        { color: '#b8d6a4', range: { x: [1, 2], y: [0, 1] } },
      ];
      colorZones.forEach(zone => {
        ctx.fillStyle = zone.color;
        const xRange = zone.range.x.map(val => left + (val / 5) * (right - left));
        const yRange = zone.range.y.map(val => bottom - (val / 5) * (bottom - top));
        ctx.fillRect(xRange[0], yRange[1], xRange[1] - xRange[0], yRange[0] - yRange[1]);
      });
    }
  };

  ChartJS.register(backgroundPlugin);

  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#C9CBCF', '#665191', '#FAA75B', '#6BCC8A', '#E84545', '#2B4570',
    '#F9F871', '#648DE5', '#9055A2', '#DAB6C4', '#7AC142', '#D64161',
    '#FFC0CB', '#FFD700', '#00FFFF', '#0000FF', '#8A2BE2'
  ];

  const datasets = dataValoracionExp.map((item, index) => ({
    label: item.macroproceso,
    data: [{ x: item.impacto, y: item.probabilidad }],
    backgroundColor: colors[index % colors.length],
    pointRadius: 5
  }));

  // Componente para mostrar la leyenda
  const Legend = ({ datasets }) => {
    return (
      <div>
        {datasets.map((dataset, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
            <div style={{ width: '15px', height: '8px', backgroundColor: dataset.backgroundColor, marginRight: '10px' }}></div>
            <small>{dataset.label}</small>
          </div>
        ))}
      </div>
    );
  };

  // Mapa general
  const perfilRiesgoDataset = {
    label: 'PERFIL DE RIESGO',
    data: dataPerfilRiesgo.map(item => ({
      x: item.impacto,
      y: item.probabilidad
    })),
    backgroundColor: 'orange', // Color naranja para el punto
    pointRadius: 5
  };

  const scatterOptionsSingle = {
    maintainAspectRatio: true,
    aspectRatio: 1,
    scales: {
      x: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'IMPACTO'
        }
      },
      y: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'PROBABILIDAD'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  
  useEffect(() => {
    getMapaInherenteResidual1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <CCSpinner show={spin} />
      <Label className='text-label'>VALORACIÓN EXPOSICIÓN AL RIESGO [USD]</Label>
      <BootstrapTable
        classes="unique-table"
        bootstrap4={true}
        sort={{ dataField: 'nro', order: 'asc' }}
        noDataIndication={'No se encontraron resultados'}
        keyField='nro'
        data={dataValoracionExp}
        columns={columnsValoracion}
        bordered={false}
        striped={false}
        hover={false}
        condensed={false}
        wrapperClasses="table-responsive"
      />

      <Label className='text-label pt-3'>PERFIL DE RIESGO ATC</Label>
      <BootstrapTable
        classes="unique-table"
        bootstrap4={true}
        sort={{ dataField: 'prob', order: 'asc' }}
        noDataIndication={'No se encontraron resultados'}
        keyField='impactoPor'
        data={dataPerfilRiesgo}
        columns={columnsPerfil}
        bordered={false}
        striped={false}
        hover={false}
        condensed={false}
        wrapperClasses="table-responsive"
      />

      <Row className='pt-3'>
        <Col xs={12} md={3}>
          <Label className='text-label'>MAPA DE RIESGOS ATC</Label>
          <Scatter data={{ datasets }} options={scatterOptions} />
        </Col>
        <Col xs={12} md={3} className='align-self-center'>
          <Legend datasets={datasets} />
        </Col>

        <Col xs={12} md={3}>
          <Label className='text-label'>MAPA DE RIESGOS ATC</Label>
          <Scatter data={{ datasets: [perfilRiesgoDataset] }} options={scatterOptionsSingle} />
        </Col>
        <Col xs={12} md={3} className='align-self-center'>
          <Legend datasets={[perfilRiesgoDataset]} />
        </Col>
      </Row>
    </div>
  )
}

export default MapaInherenteResidual1
