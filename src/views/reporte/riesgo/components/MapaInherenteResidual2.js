import React, { useEffect, useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { getInherenteResidual2, getInherente2ConRiesgos, getResidual2ConRiesgos } from '../controller/ReporteRiesgoController';
import { useTable } from 'react-table';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { CModal, CModalBody, CModalHeader } from '@coreui/react';

const MapaInherenteResidual2 = ({ procesoId }) => {

  const [spin, setSpin] = useState(false);
  const [dataMapaInherente, setMapaInherente] = useState([]);
  const [dataMapaResidual, setMapaResidual] = useState([]);
  const [dataMapaResumen, setMapaResumen] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalRiesgosLista, setModalRiesgosLista] = useState(null);
  const [modalRiesgosNivel, setModalRiesgosNivel] = useState(null);

  // Obtiene los riesgos para el Mapa Inherente
  const [riesgoIProb5Imp1, setRiesgoIProb5Imp1] = useState([]);
  const [riesgoIProb5Imp2, setRiesgoIProb5Imp2] = useState([]);
  const [riesgoIProb5Imp3, setRiesgoIProb5Imp3] = useState([]);
  const [riesgoIProb5Imp4, setRiesgoIProb5Imp4] = useState([]);
  const [riesgoIProb5Imp5, setRiesgoIProb5Imp5] = useState([]);

  const [riesgoIProb4Imp1, setRiesgoIProb4Imp1] = useState([]);
  const [riesgoIProb4Imp2, setRiesgoIProb4Imp2] = useState([]);
  const [riesgoIProb4Imp3, setRiesgoIProb4Imp3] = useState([]);
  const [riesgoIProb4Imp4, setRiesgoIProb4Imp4] = useState([]);
  const [riesgoIProb4Imp5, setRiesgoIProb4Imp5] = useState([]);

  const [riesgoIProb3Imp1, setRiesgoIProb3Imp1] = useState([]);
  const [riesgoIProb3Imp2, setRiesgoIProb3Imp2] = useState([]);
  const [riesgoIProb3Imp3, setRiesgoIProb3Imp3] = useState([]);
  const [riesgoIProb3Imp4, setRiesgoIProb3Imp4] = useState([]);
  const [riesgoIProb3Imp5, setRiesgoIProb3Imp5] = useState([]);

  const [riesgoIProb2Imp1, setRiesgoIProb2Imp1] = useState([]);
  const [riesgoIProb2Imp2, setRiesgoIProb2Imp2] = useState([]);
  const [riesgoIProb2Imp3, setRiesgoIProb2Imp3] = useState([]);
  const [riesgoIProb2Imp4, setRiesgoIProb2Imp4] = useState([]);
  const [riesgoIProb2Imp5, setRiesgoIProb2Imp5] = useState([]);

  const [riesgoIProb1Imp1, setRiesgoIProb1Imp1] = useState([]);
  const [riesgoIProb1Imp2, setRiesgoIProb1Imp2] = useState([]);
  const [riesgoIProb1Imp3, setRiesgoIProb1Imp3] = useState([]);
  const [riesgoIProb1Imp4, setRiesgoIProb1Imp4] = useState([]);
  const [riesgoIProb1Imp5, setRiesgoIProb1Imp5] = useState([]);

  // Obtiene los riesgos para el Mapa Residual
  const [riesgoRProb5Imp1, setRiesgoRProb5Imp1] = useState([]);
  const [riesgoRProb5Imp2, setRiesgoRProb5Imp2] = useState([]);
  const [riesgoRProb5Imp3, setRiesgoRProb5Imp3] = useState([]);
  const [riesgoRProb5Imp4, setRiesgoRProb5Imp4] = useState([]);
  const [riesgoRProb5Imp5, setRiesgoRProb5Imp5] = useState([]);
  
  const [riesgoRProb4Imp1, setRiesgoRProb4Imp1] = useState([]);
  const [riesgoRProb4Imp2, setRiesgoRProb4Imp2] = useState([]);
  const [riesgoRProb4Imp3, setRiesgoRProb4Imp3] = useState([]);
  const [riesgoRProb4Imp4, setRiesgoRProb4Imp4] = useState([]);
  const [riesgoRProb4Imp5, setRiesgoRProb4Imp5] = useState([]);
  
  const [riesgoRProb3Imp1, setRiesgoRProb3Imp1] = useState([]);
  const [riesgoRProb3Imp2, setRiesgoRProb3Imp2] = useState([]);
  const [riesgoRProb3Imp3, setRiesgoRProb3Imp3] = useState([]);
  const [riesgoRProb3Imp4, setRiesgoRProb3Imp4] = useState([]);
  const [riesgoRProb3Imp5, setRiesgoRProb3Imp5] = useState([]);
  
  const [riesgoRProb2Imp1, setRiesgoRProb2Imp1] = useState([]);
  const [riesgoRProb2Imp2, setRiesgoRProb2Imp2] = useState([]);
  const [riesgoRProb2Imp3, setRiesgoRProb2Imp3] = useState([]);
  const [riesgoRProb2Imp4, setRiesgoRProb2Imp4] = useState([]);
  const [riesgoRProb2Imp5, setRiesgoRProb2Imp5] = useState([]);
  
  const [riesgoRProb1Imp1, setRiesgoRProb1Imp1] = useState([]);
  const [riesgoRProb1Imp2, setRiesgoRProb1Imp2] = useState([]);
  const [riesgoRProb1Imp3, setRiesgoRProb1Imp3] = useState([]);
  const [riesgoRProb1Imp4, setRiesgoRProb1Imp4] = useState([]);
  const [riesgoRProb1Imp5, setRiesgoRProb1Imp5] = useState([]);

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

  // Mapa inherente
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

  // Mapa Residual
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

  //Mapa resumen
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
    '#b8d6a4': [[4, 2], [4, 3], [3, 2], [1, 6]],                                                                                // Verde Claro
    '#ffff81': [[1, 2], [2, 2], [2, 3], [3, 3], [4, 4], [2, 6]],                                                                // Amarillo
    '#ffdf80': [[0, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [4, 6], [3, 6]],                                // Amarillo oscuro
    '#f9c6c2': [[0, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 6]],                                                                // Rojo claro
    '#ff7f7e': [[0, 5], [0, 6], [1, 6], [5, 6]],                                                                                // Rojo
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


  // Extrae los riesgos para el Mapa Inherente
  const getMapaInherente2ConRiesgos = (procesoId) => {
    setSpin(true);
    getInherente2ConRiesgos(procesoId)
      .then(res => {
        setRiesgoIProb5Imp1(res.data.listMapaInherente2ConRiesgosDTO[0].col1);
        setRiesgoIProb5Imp2(res.data.listMapaInherente2ConRiesgosDTO[0].col2);
        setRiesgoIProb5Imp3(res.data.listMapaInherente2ConRiesgosDTO[0].col3);
        setRiesgoIProb5Imp4(res.data.listMapaInherente2ConRiesgosDTO[0].col4);
        setRiesgoIProb5Imp5(res.data.listMapaInherente2ConRiesgosDTO[0].col5);

        setRiesgoIProb4Imp1(res.data.listMapaInherente2ConRiesgosDTO[1].col1);
        setRiesgoIProb4Imp2(res.data.listMapaInherente2ConRiesgosDTO[1].col2);
        setRiesgoIProb4Imp3(res.data.listMapaInherente2ConRiesgosDTO[1].col3);
        setRiesgoIProb4Imp4(res.data.listMapaInherente2ConRiesgosDTO[1].col4);
        setRiesgoIProb4Imp5(res.data.listMapaInherente2ConRiesgosDTO[1].col5);

        setRiesgoIProb3Imp1(res.data.listMapaInherente2ConRiesgosDTO[2].col1);
        setRiesgoIProb3Imp2(res.data.listMapaInherente2ConRiesgosDTO[2].col2);
        setRiesgoIProb3Imp3(res.data.listMapaInherente2ConRiesgosDTO[2].col3);
        setRiesgoIProb3Imp4(res.data.listMapaInherente2ConRiesgosDTO[2].col4);
        setRiesgoIProb3Imp5(res.data.listMapaInherente2ConRiesgosDTO[2].col5);

        setRiesgoIProb2Imp1(res.data.listMapaInherente2ConRiesgosDTO[3].col1);
        setRiesgoIProb2Imp2(res.data.listMapaInherente2ConRiesgosDTO[3].col2);
        setRiesgoIProb2Imp3(res.data.listMapaInherente2ConRiesgosDTO[3].col3);
        setRiesgoIProb2Imp4(res.data.listMapaInherente2ConRiesgosDTO[3].col4);
        setRiesgoIProb2Imp5(res.data.listMapaInherente2ConRiesgosDTO[3].col5);

        setRiesgoIProb1Imp1(res.data.listMapaInherente2ConRiesgosDTO[4].col1);
        setRiesgoIProb1Imp2(res.data.listMapaInherente2ConRiesgosDTO[4].col2);
        setRiesgoIProb1Imp3(res.data.listMapaInherente2ConRiesgosDTO[4].col3);
        setRiesgoIProb1Imp4(res.data.listMapaInherente2ConRiesgosDTO[4].col4);
        setRiesgoIProb1Imp5(res.data.listMapaInherente2ConRiesgosDTO[4].col5);
      })
      .catch((error) => {
        console.error('Error: ', error);
      })
      .finally(() => {
        setSpin(false);
      });
  };

  // Extrae los riesgos para el Mapa Residual
  const getMapaResidual2ConRiesgos = (procesoId) => {
    setSpin(true);
    getResidual2ConRiesgos(procesoId)
      .then(res => {
        setRiesgoRProb5Imp1(res.data.listMapaResidual2ConRiesgosDTO[0].col1);
        setRiesgoRProb5Imp2(res.data.listMapaResidual2ConRiesgosDTO[0].col2);
        setRiesgoRProb5Imp3(res.data.listMapaResidual2ConRiesgosDTO[0].col3);
        setRiesgoRProb5Imp4(res.data.listMapaResidual2ConRiesgosDTO[0].col4);
        setRiesgoRProb5Imp5(res.data.listMapaResidual2ConRiesgosDTO[0].col5);

        setRiesgoRProb4Imp1(res.data.listMapaResidual2ConRiesgosDTO[1].col1);
        setRiesgoRProb4Imp2(res.data.listMapaResidual2ConRiesgosDTO[1].col2);
        setRiesgoRProb4Imp3(res.data.listMapaResidual2ConRiesgosDTO[1].col3);
        setRiesgoRProb4Imp4(res.data.listMapaResidual2ConRiesgosDTO[1].col4);
        setRiesgoRProb4Imp5(res.data.listMapaResidual2ConRiesgosDTO[1].col5);

        setRiesgoRProb3Imp1(res.data.listMapaResidual2ConRiesgosDTO[2].col1);
        setRiesgoRProb3Imp2(res.data.listMapaResidual2ConRiesgosDTO[2].col2);
        setRiesgoRProb3Imp3(res.data.listMapaResidual2ConRiesgosDTO[2].col3);
        setRiesgoRProb3Imp4(res.data.listMapaResidual2ConRiesgosDTO[2].col4);
        setRiesgoRProb3Imp5(res.data.listMapaResidual2ConRiesgosDTO[2].col5);

        setRiesgoRProb2Imp1(res.data.listMapaResidual2ConRiesgosDTO[3].col1);
        setRiesgoRProb2Imp2(res.data.listMapaResidual2ConRiesgosDTO[3].col2);
        setRiesgoRProb2Imp3(res.data.listMapaResidual2ConRiesgosDTO[3].col3);
        setRiesgoRProb2Imp4(res.data.listMapaResidual2ConRiesgosDTO[3].col4);
        setRiesgoRProb2Imp5(res.data.listMapaResidual2ConRiesgosDTO[3].col5);

        setRiesgoRProb1Imp1(res.data.listMapaResidual2ConRiesgosDTO[4].col1);
        setRiesgoRProb1Imp2(res.data.listMapaResidual2ConRiesgosDTO[4].col2);
        setRiesgoRProb1Imp3(res.data.listMapaResidual2ConRiesgosDTO[4].col3);
        setRiesgoRProb1Imp4(res.data.listMapaResidual2ConRiesgosDTO[4].col4);
        setRiesgoRProb1Imp5(res.data.listMapaResidual2ConRiesgosDTO[4].col5);
      })
      .catch((error) => {
        console.error('Error: ', error);
      })
      .finally(() => {
        setSpin(false);
      });
  };

  const showRiesgoProbImp = (data) => {
    const formattedItems = data.map(item => {
      const [id, code] = item.split(", ");
      return `${id} | ${code}`;
    });
    return (
      <ul class="list-group">
        {formattedItems.map((item, index) => (
          <li class="list-group-item p-0" key={index}>{item}</li>
        ))}
      </ul>
    );
  };


  const handleModalOpen = (riesgo, nivel) => {
    setShowModal(true); 
    setModalRiesgosLista(riesgo);
    setModalRiesgosNivel(nivel);
  };


  useEffect(() => {
    getMapaInherenteResidual2(procesoId);
    getMapaInherente2ConRiesgos(procesoId);
    getMapaResidual2ConRiesgos(procesoId);
  }, [procesoId]);


  return (
    <div>
      <CCSpinner show={spin} />
      <Row>

        <CModal 
          show={showModal} 
          onClose={() => setShowModal(!showModal)}
          color="primary" 
        >
          <CModalHeader closeButton>{modalRiesgosNivel}</CModalHeader>
          <CModalBody className={'text-center'}>
            {modalRiesgosLista && modalRiesgosLista.length > 0 ? (
              showRiesgoProbImp(modalRiesgosLista)
            ) : (
              <p>No existen riesgos.</p>
            )}
          </CModalBody>
        </CModal>

        <Col xs={12} xl={6}>
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

                      // Riesgos probabilidad 5
                      if (row.index === 0 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp1, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 0 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp2, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp3, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp4, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp5, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 4
                      if (row.index === 1 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp1, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 1 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp2, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp4, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp5, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 3
                      if (row.index === 2 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp1, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 2 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp2, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp4, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 2
                      if (row.index === 3 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp1, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 3 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp2, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp4, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 1
                      if (row.index === 4 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp1, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 4 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp2, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp3, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp4, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <small>{cell.render('Cell')}</small>
                          </td>
                        );
                      }

                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>

        <Col xs={12} xl={6}>
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

                      // Riesgos probabilidad 5
                      if (row.index === 0 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb5Imp1, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 0 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb5Imp2, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb5Imp3, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb5Imp4, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 0 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb5Imp5, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 4
                      if (row.index === 1 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb4Imp1, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 1 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb4Imp2, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb4Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb4Imp4, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 1 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb4Imp5, "Riesgo alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 3
                      if (row.index === 2 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb3Imp1, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 2 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb3Imp2, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb3Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb3Imp4, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 2 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb3Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 2
                      if (row.index === 3 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb2Imp1, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 3 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb2Imp2, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb2Imp3, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb2Imp4, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 3 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb2Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      // Riesgos probabilidad 1
                      if (row.index === 4 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb1Imp1, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      } else if(row.index === 4 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb1Imp2, "Riesgo bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb1Imp3, "Riesgo medio bajo")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb1Imp4, "Riesgo medio")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else if(row.index === 4 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoRProb1Imp5, "Riesgo medio alto")}>
                            <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>    
                        )
                      }
                      else {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <small>{cell.render('Cell')}</small>
                          </td>
                        );
                      }

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
