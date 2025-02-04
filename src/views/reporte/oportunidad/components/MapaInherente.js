import React, { useEffect, useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { useTable } from 'react-table';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { getInherente, getInherenteConOportunidades } from '../controller/ReporteOportunidadController';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CModal, CModalBody, CModalHeader } from '@coreui/react';

const MapaInherente = ({ optionsProceso }) => {
  const [spin, setSpin] = useState(false);
  const [dataMapaInherente, setMapaInherente] = useState([]);
  const [dataMapaResumen, setMapaResumen] = useState([]);
  const [filtroProcesoId, setFiltroProcesoId] = useState('');

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

  const formValueInitial = {
    procesoId: ''
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object({
      procesoId: Yup.mixed().nullable()
    }),
    onSubmit: values => {
    }
  });

  const getMapaInherente = (filtroProcesoId) => {
    setSpin(true);
    getInherente(filtroProcesoId)
      .then(res => {
        setMapaInherente(res.data.listMapaInherenteDTO);
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

  const columnsMapaResumen = React.useMemo(() => [
    { Header: '', accessor: 'val1' },
    { Header: '', accessor: 'val2' },
    { Header: '', accessor: 'val3' },
    { Header: '', accessor: 'val4' }
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
    '#e6f1ff': [[4, 2], [4, 3], [3, 2], [1, 6]],                                                 // Celeste Claro
    '#cadffb': [[1, 2], [2, 2], [2, 3], [3, 3], [4, 4], [2, 6]],                                 // Celeste 
    '#a0c5f7': [[0, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [4, 6], [3, 6]], // Azul claro
    '#6a9cde': [[0, 4], [1, 5], [2, 5], [2, 6], [3, 6], [4, 6]],                                 // Azul 
    '#5783bc': [[0, 5], [0, 6], [1, 6], [5, 6]],                                                 // Azul oscuro 
    '#406e9b': [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 0], [7, 0], [6, 1], [7, 7]] // Azul base
  };

  const boldWhiteText = [[5, 0], [6, 1], [7, 0], [7, 7]];

  const textColorMapping = {
    '#cadff5': [[0, 1], [5, 6]],
    '#cadff4': [[1, 1], [5, 5]],
    '#cadff3': [[2, 1], [5, 4]],
    '#cadff2': [[3, 1], [5, 3]],
    '#cadff1': [[4, 1], [5, 2]]
  };



  // Extrae los riesgos para el Mapa Inherente
  const getMapaInherenteConOportunidades = (procesoId) => {
    setSpin(true);
    getInherenteConOportunidades(procesoId)
      .then(res => {
        setRiesgoIProb5Imp1(res.data.listMapaInherenteConOportunidadesDTO[0].col1);
        setRiesgoIProb5Imp2(res.data.listMapaInherenteConOportunidadesDTO[0].col2);
        setRiesgoIProb5Imp3(res.data.listMapaInherenteConOportunidadesDTO[0].col3);
        setRiesgoIProb5Imp4(res.data.listMapaInherenteConOportunidadesDTO[0].col4);
        setRiesgoIProb5Imp5(res.data.listMapaInherenteConOportunidadesDTO[0].col5);

        setRiesgoIProb4Imp1(res.data.listMapaInherenteConOportunidadesDTO[1].col1);
        setRiesgoIProb4Imp2(res.data.listMapaInherenteConOportunidadesDTO[1].col2);
        setRiesgoIProb4Imp3(res.data.listMapaInherenteConOportunidadesDTO[1].col3);
        setRiesgoIProb4Imp4(res.data.listMapaInherenteConOportunidadesDTO[1].col4);
        setRiesgoIProb4Imp5(res.data.listMapaInherenteConOportunidadesDTO[1].col5);

        setRiesgoIProb3Imp1(res.data.listMapaInherenteConOportunidadesDTO[2].col1);
        setRiesgoIProb3Imp2(res.data.listMapaInherenteConOportunidadesDTO[2].col2);
        setRiesgoIProb3Imp3(res.data.listMapaInherenteConOportunidadesDTO[2].col3);
        setRiesgoIProb3Imp4(res.data.listMapaInherenteConOportunidadesDTO[2].col4);
        setRiesgoIProb3Imp5(res.data.listMapaInherenteConOportunidadesDTO[2].col5);

        setRiesgoIProb2Imp1(res.data.listMapaInherenteConOportunidadesDTO[3].col1);
        setRiesgoIProb2Imp2(res.data.listMapaInherenteConOportunidadesDTO[3].col2);
        setRiesgoIProb2Imp3(res.data.listMapaInherenteConOportunidadesDTO[3].col3);
        setRiesgoIProb2Imp4(res.data.listMapaInherenteConOportunidadesDTO[3].col4);
        setRiesgoIProb2Imp5(res.data.listMapaInherenteConOportunidadesDTO[3].col5);

        setRiesgoIProb1Imp1(res.data.listMapaInherenteConOportunidadesDTO[4].col1);
        setRiesgoIProb1Imp2(res.data.listMapaInherenteConOportunidadesDTO[4].col2);
        setRiesgoIProb1Imp3(res.data.listMapaInherenteConOportunidadesDTO[4].col3);
        setRiesgoIProb1Imp4(res.data.listMapaInherenteConOportunidadesDTO[4].col4);
        setRiesgoIProb1Imp5(res.data.listMapaInherenteConOportunidadesDTO[4].col5);
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
    getMapaInherente(filtroProcesoId);
    getMapaInherenteConOportunidades(filtroProcesoId);
  }, [filtroProcesoId]);

  useEffect(() => {
    if (formik.values.procesoId && formik.values.procesoId.value) {
      setFiltroProcesoId(formik.values.procesoId.value);
    } else {
      setFiltroProcesoId('');
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.procesoId]);

  return (
    <div>
      <CCSpinner show={spin} />
      <Row className='justify-content-center pt-2'>
        <Col xs='12' md='4' xl='2'>
          <Label className='form-label'>Macroproceso:</Label>
        </Col>
        <Col xs='12' md='7' xl='6'>
          <CSelectReact
            type={"select"}
            id={'procesoId'}
            placeholder={'Seleccionar'}
            value={formik.values.procesoId}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
            error={formik.errors.procesoId}
            touched={formik.touched.procesoId}
            options={optionsProceso}
          />
        </Col>
      </Row>
      <Row className='py-4'>
        <Col xs='12' xl='6'>
          <Label className='text-label pt-4'>OPORTUNIDAD INHERENTE</Label>
          <table {...getTablePropsInherente()} style={{ width: '100%', border: '1px solid #878888' }}>
            <thead>
              <tr>
                <th colSpan={7} style={{ textAlign: 'center', background: '#bdd7ee' }}>
                  <small>Mapa de Oportunidad</small>
                </th>
                <th style={{ textAlign: 'center', background: '#406e9b', color: '#ffffff' }}>
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

                      // Oportunidad probabilidad 5
                      if (row.index === 0 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp1, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      } else if (row.index === 0 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp2, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 0 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp3, "Riesgo medio alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 0 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp4, "Riesgo alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 0 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb5Imp5, "Riesgo alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      // Oportunidad probabilidad 4
                      if (row.index === 1 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp1, "Riesgo medio bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      } else if (row.index === 1 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp2, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 1 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp3, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 1 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp4, "Riesgo medio alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 1 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb4Imp5, "Riesgo alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      // Oportunidad probabilidad 3
                      if (row.index === 2 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp1, "Riesgo medio bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      } else if (row.index === 2 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp2, "Riesgo medio bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 2 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp3, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 2 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp4, "Riesgo medio alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 2 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb3Imp5, "Riesgo medio alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      // Oportunidad probabilidad 2
                      if (row.index === 3 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp1, "Riesgo bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      } else if (row.index === 3 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp2, "Riesgo medio bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 3 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp3, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 3 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp4, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 3 && cellIndex === 6) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb2Imp5, "Riesgo medio alto")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      // Oportunidad probabilidad 1
                      if (row.index === 4 && cellIndex === 2) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp1, "Riesgo bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      } else if (row.index === 4 && cellIndex === 3) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp2, "Riesgo bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 4 && cellIndex === 4) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp3, "Riesgo medio bajo")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 4 && cellIndex === 5) {
                        return (
                          <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid grey', textAlign: 'center', ...style }}>
                            <Button className="button-none" variant="link" onClick={() => handleModalOpen(riesgoIProb1Imp4, "Riesgo medio")}>
                              <small>{cell.render('Cell')}</small>
                            </Button>
                          </td>
                        )
                      }
                      else if (row.index === 4 && cellIndex === 6) {
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

        <Col xs='12' xl='6' className='pt-5'>
          <table {...getTablePropsResumen()} style={{ width: '100%' }}>
            <thead>
              <tr>
                <th colSpan={3} style={{ background: '#ffffff' }}>
                </th>
                <th style={{ textAlign: 'center', background: '#ffffff', border: '1px solid #878888' }}>
                  <small>Oportunidad Inherente</small>
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
                  rowStyle = { background: '#5783bc' };
                } else if (rowIndex === 2) {
                  rowStyle = { background: '#6a9cde' };
                } else if (rowIndex === 3) {
                  rowStyle = { background: '#a0c5f7' };
                } else if (rowIndex === 4) {
                  rowStyle = { background: '#cadffb' };
                } else if (rowIndex === 5) {
                  rowStyle = { background: '#e6f1ff' };
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
    </div>
  )
}

export default MapaInherente