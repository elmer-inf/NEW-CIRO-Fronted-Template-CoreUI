import React, { useEffect, useState } from 'react';
import { Col, Label, Row } from 'reactstrap';
import { getInherenteResidual2 } from '../controller/ReporteRiesgoController';
import { useTable } from 'react-table';
import CCSpinner from 'src/reusable/spinner/CCSpinner';

const MapaInherenteResidual2 = ({ procesoId }) => {
console.log('procesoId dentro: ', procesoId);
  const [spin, setSpin] = useState(false);
  const [dataMapaInherente, setMapaInherente] = useState([]);
  const [dataMapaResidual, setMapaResidual] = useState([]);
  const [dataMapaResumen, setMapaResumen] = useState([]);

  const getMapaInherenteResidual2 = (procesoId) => {
    setSpin(true);
    getInherenteResidual2(procesoId)
      .then(res => {
        setMapaInherente(res.data.listMapaInherente2DTO);
        setMapaResidual(res.data.listMapaResidual2DTO);
        setMapaResumen(res.data.listMapaResumenDTO);
      })
      .catch((error) => {
        console.error('Error: ', error);
      })
      .finally(() => {
        setSpin(false);
      });
  };

  const columnsMapaInherente = React.useMemo(() => [
    { Header: '', accessor: 'val1' },
    { Header: '', accessor: 'val2' },
    { Header: '', accessor: 'val3' },
    { Header: '', accessor: 'val4' },
    { Header: '', accessor: 'val5' },
    { Header: '', accessor: 'val6' },
    { Header: '', accessor: 'val7' },
    { Header: '', accessor: 'val8' }
  ], []);

  const {
    getTableProps: getTablePropsInherente, getTableBodyProps: getTableBodyPropsInherente, rows: rowsInherente, prepareRow: prepareRowInherente
  } = useTable({
    columns: columnsMapaInherente, data: dataMapaInherente
  });

  const columnsMapaResidual = React.useMemo(() => [
    { Header: '', accessor: 'val1' },
    { Header: '', accessor: 'val2' },
    { Header: '', accessor: 'val3' },
    { Header: '', accessor: 'val4' },
    { Header: '', accessor: 'val5' },
    { Header: '', accessor: 'val6' },
    { Header: '', accessor: 'val7' },
    { Header: '', accessor: 'val8' }
  ], []);

  const {
    getTableProps: getTablePropsResidual, getTableBodyProps: getTableBodyPropsResidual, rows: rowsResidual, prepareRow: prepareRowResidual
  } = useTable({
    columns: columnsMapaResidual, data: dataMapaResidual
  });

  const columnsMapaResumen = React.useMemo(() => [
    { Header: '', accessor: 'val1' },
    { Header: '', accessor: 'val2' },
    { Header: '', accessor: 'val3' },
    { Header: '', accessor: 'val4' },
    { Header: '', accessor: 'val5' }
  ], []);

  const {
    getTableProps: getTablePropsResumen,
    getTableBodyProps: getTableBodyPropsResumen,
    rows: rowsResumen,
    prepareRow: prepareRowResumen
  } = useTable({
    columns: columnsMapaResumen,
    data: dataMapaResumen
  });


  const colorMapping = {
    '#b8d6a4': [[4, 2], [4, 3], [3, 2], [1, 6]],                                                 // Verde Claro
    '#ffff81': [[1, 2], [2, 2], [2, 3], [3, 3], [4, 4], [2, 6]],                                 // Amarillo
    '#ffdf80': [[0, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [4, 6], [3, 6]], // Amarillo oscuro
    '#f9c6c2': [[0, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 6]],                                 // Rojo claro
    '#ff7f7e': [[0, 5], [0, 6], [1, 6], [5, 6]],                                                 // Rojo
    '#2f75b5': [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 0], [7, 0], [6, 1], [7, 7]] // Azul
  };

  const boldWhiteText = [[5, 0], [6, 1], [7, 0], [7, 7]];

  const textColorMapping = {
    '#ff7f7e': [[0, 1], [5, 6]],
    '#f9c6c2': [[1, 1], [5, 5]],
    '#ffdf80': [[2, 1], [5, 4]],
    '#ffff81': [[3, 1], [5, 3]],
    '#b8d6a4': [[4, 1], [5, 2]]
  };

  useEffect(() => {
    getMapaInherenteResidual2(procesoId);
  }, [procesoId]);
  
  return (
    <div>
      <CCSpinner show={spin} />
      <Row>
        <Col xs={12} md={6}>
          <Label className='text-label pt-4'>RIESGO INHERENTE - RIESGO OPERATIVO</Label>
          <table {...getTablePropsInherente()} style={{ width: '100%', border: '1px solid #878888' }}>
            <thead>
              <tr>
                <th colSpan={7} style={{ textAlign: 'center', background: '#bdd7ee' }}>
                  <small>Mapa de Riesgo y Exposición al Riesgo Operativo</small>
                </th>
                <th style={{ textAlign: 'center', background: '#2f75b5', color: '#ffffff' }}>
                  <small><div>TOTAL</div> <div>PROBABILIDAD</div></small>
                </th>
              </tr>
            </thead>
            <tbody {...getTableBodyPropsInherente()}>
              {rowsInherente.map((row, rowIndex) => {
                prepareRowInherente(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => {
                      let style = {};

                      Object.keys(colorMapping).forEach(color => {
                        colorMapping[color].forEach(([ri, ci]) => {
                          if (row.index === ri && cellIndex === ci) {
                            style.backgroundColor = color;
                            if (boldWhiteText.some(([bri, bci]) => bri === ri && bci === ci)) {
                              style.color = '#ffffff';
                              style.fontWeight = 'bold';
                            }
                          }
                        });
                      });

                      Object.keys(textColorMapping).forEach(color => {
                        textColorMapping[color].forEach(([ri, ci]) => {
                          if (row.index === ri && cellIndex === ci) {
                            style.color = color;
                          }
                        });
                      });

                      return (
                        <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                          <small>{cell.render('Cell')}</small>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>

        <Col xs={12} md={6}>
          <Label className='text-label pt-4'>RIESGO RESIDUAL - RIESGO OPERATIVO</Label>
          <table {...getTablePropsResidual()} style={{ width: '100%', border: '1px solid #878888' }}>
            <thead>
              <tr>
                <th colSpan={7} style={{ textAlign: 'center', background: '#bdd7ee' }}>
                  <small>Mapa Residual de Riesgo</small>
                </th>
                <th style={{ textAlign: 'center', background: '#2f75b5', color: '#ffffff' }}>
                  <small><div>TOTAL</div> <div>PROBABILIDAD</div></small>
                </th>
              </tr>
            </thead>
            <tbody {...getTableBodyPropsResidual()}>
              {rowsResidual.map((row, rowIndex) => {
                prepareRowResidual(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => {
                      let style = {};

                      Object.keys(colorMapping).forEach(color => {
                        colorMapping[color].forEach(([ri, ci]) => {
                          if (row.index === ri && cellIndex === ci) {
                            style.backgroundColor = color;
                            if (boldWhiteText.some(([bri, bci]) => bri === ri && bci === ci)) {
                              style.color = '#ffffff';
                              style.fontWeight = 'bold';
                            }
                          }
                        });
                      });

                      Object.keys(textColorMapping).forEach(color => {
                        textColorMapping[color].forEach(([ri, ci]) => {
                          if (row.index === ri && cellIndex === ci) {
                            style.color = color;
                          }
                        });
                      });

                      return (
                        <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                          <small>{cell.render('Cell')}</small>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>

      <Row className='justify-content-center pt-5'>
        <Col xs='12' md='6'>
          <table {...getTablePropsResumen()} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th colSpan={3} style={{ background: '#ffffff' }}>
                </th>
                <th style={{ textAlign: 'center', background: '#ffffff', border: '1px solid #878888' }}>
                  <small>Riesgo Inherente</small>
                </th>
                <th style={{ textAlign: 'center', background: '#ffffff', border: '1px solid #878888' }}>
                  <small>Riesgo Residual</small>
                </th>
              </tr>
            </thead>
            <tbody {...getTableBodyPropsResumen()}>
              {rowsResumen.map((row, rowIndex) => {
                prepareRowResumen(row);

                let rowStyle = {};
                if (rowIndex === 0 || rowIndex === 6) {
                  rowStyle = { background: '#bdd7ee', fontWeight: 'bold' };
                } else if (rowIndex === 1) {
                  rowStyle = { background: '#ff7f7e' };
                } else if (rowIndex === 2) {
                  rowStyle = { background: '#f9c6c2' };
                } else if (rowIndex === 3) {
                  rowStyle = { background: '#ffdf80' };
                } else if (rowIndex === 4) {
                  rowStyle = { background: '#ffff81' };
                } else if (rowIndex === 5) {
                  rowStyle = { background: '#b8d6a4' };
                }

                return (
                  <tr {...row.getRowProps()} style={rowStyle}>
                    {row.cells.map((cell, cellIndex) => {
                      let cellStyle = { padding: '10px', border: '1px solid grey', textAlign: 'center' };
                      if (rowIndex > 0 && rowIndex < 6 && cellIndex < 3) {
                        cellStyle.fontWeight = 'bold';
                      }
                      return (
                        <td {...cell.getCellProps()} style={cellStyle}>
                          <small>{cell.render('Cell')}</small>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}

export default MapaInherenteResidual2
