import React, { Fragment, useState } from 'react';
import { Button, Col, Label, Row, FormGroup, Form } from 'reactstrap'
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { Messages } from 'src/reusable/variables/Messages';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact';
import { BarChart2, Delete } from 'react-feather';
import { getReporteGerencial } from '../controller/ReporteRiesgoController';
import { CBadge, CProgress } from '@coreui/react';

const ReporteGerencial = () => {
  const today = new Date();
  const [spin, setSpin] = useState(false);
  const [dataApetitoRiesgo, setApetitoRiesgo] = useState(null);
  const [dataMeses, setMeses] = useState([]);
  const [busquedaIniciada, setBusquedaIniciada] = useState(false);

  const formValueInitial = {
    fechaDesde: '',
    fechaHasta: ''
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        fechaDesde: Yup.date().nullable().required(Messages.required),
        fechaHasta: Yup.date().min(Yup.ref('fechaDesde'), Messages.dateValidation1).max(today, Messages.dateValidation3).nullable().required(Messages.required),
      }
    ),
    onSubmit: values => {
      reporteGerencial(getFirstDayOfMonth(values.fechaDesde), getLastDayOfMonth(values.fechaHasta));
    }
  });

  const getFirstDayOfMonth = (date) => {
    const [year, month] = date.split('-');
    return `${year}-${month}-01`;
  }

  const getLastDayOfMonth = (date) => {
    const [year, month] = date.split('-');
    const lastDay = new Date(year, month, 0).getDate(); // El mes en JavaScript es 0-indexado, por lo que pasar el mes directamente nos da el último día del mes anterior
    return `${year}-${month}-${lastDay}`;
  }

  const reporteGerencial = (fechaDesde, fechaHasta) => {
    setSpin(true);
    getReporteGerencial(fechaDesde, fechaHasta)
      .then(res => {
        setApetitoRiesgo(res.data.apetitoRiesgo);
        setMeses(res.data.datoMeses);
        setBusquedaIniciada(true);
      }).catch((error) => {
        console.error('Error: ', error);
      }).finally(() => {
        setSpin(false);
      });
  };

  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Row className='justify-content-center'>
            <FormGroup tag={Col} md='4' xl='3' className='mb-0'>
              <Label className='form-label'>
                Fecha Desde <span className='text-primary h5'><b>*</b></span>
              </Label>
              <CInputReact
                type={"month"}
                id={'fechaDesde'}
                placeholder={'Fecha desde'}
                value={formik.values.fechaDesde}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.fechaDesde}
                errors={formik.errors.fechaDesde}
              />
            </FormGroup>
            <FormGroup tag={Col} md='4' xl='3' className='mb-0'>
              <Label className='form-label'>
                Fecha Hasta <span className='text-primary h5'><b>*</b></span>
              </Label>
              <CInputReact
                type={"month"}
                id={'fechaHasta'}
                placeholder={'Fecha hasta'}
                value={formik.values.fechaHasta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.fechaHasta}
                errors={formik.errors.fechaHasta}
              />
            </FormGroup>
          </Row>

          <Row className='justify-content-center pt-4 pb-5'>
            <Col xs={6} md={4} xl={2}>
              <Button
                block
                color="dark"
                outline
                onClick={() => { formik.handleReset(); setMeses([]); setApetitoRiesgo([]); setBusquedaIniciada(false); }}
                disabled={!formik.dirty}
              >
                <Delete size={17} className='mr-2' />
                Limpiar
              </Button>
            </Col>
            <Col xs={6} md={4} xl={2}>
              <Button
                block
                className='text-white'
                color="primary"
                type="submit"
              >
                <BarChart2 size={17} className='mr-2' />Generar
              </Button>
            </Col>
          </Row>
        </Form>

        {dataMeses.length > 0 &&
          <Fragment>
            <Row className="justify-content-center pb-4">
              <Col xs="4" md="3" xl="2">
                <div className='text-right'>
                  <CBadge className="px-2 py-1 badge-info">Apetito de Riesgo</CBadge>
                </div>
              </Col>
              <Col xs="3" md="6" xl="4">
                <div className="progress-group">
                  <div className="progress-group-bars mr-3 pt-1">
                    <CProgress
                      className="progress-md"
                      color={'info'}
                      value={100}
                    />
                  </div>
                </div>
              </Col>
              <Col xs="5" md="3" xl="2">
                {dataApetitoRiesgo}$ = <CBadge className="px-2 py-1 badge-info h6">100%</CBadge>
              </Col>
            </Row>

            {dataMeses.map((mes, index) => (
              <Row key={index} className="justify-content-center">
                <Col xs="3" md="3" xl="2">
                  <div className='text-right'>
                    <CBadge className="px-2 py-1 badge-grey-light">{mes.mes} {mes.anio}</CBadge>
                  </div>
                </Col>
                <Col xs="4" md="6" xl="4">
                  <div className="progress-group">
                    <div className="progress-group-bars mr-3 pt-1">
                      <CProgress
                        className="progress-md"
                        color={mes.porcentajeTotalPerdida <= 32 ? 'success' : mes.porcentajeTotalPerdida <= 66 ? 'warning' : 'danger'}
                        value={mes.porcentajeTotalPerdida}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs="5" md="3" xl="2">
                  <span className='text-data'>{mes.totalPerdida}$ =  </span><CBadge className="px-2 py-1 badge-grey-light h6 ml-1">{mes.porcentajeTotalPerdida}%</CBadge>
                </Col>
              </Row>
            ))}
          </Fragment>
        }

        {busquedaIniciada && dataMeses.length === 0 ?
          <div className='text-data text-center pb-4'>No existen registros de Eventos de Riesgo en el intervalo seleccionado.</div>
          : null
        }
      </Fragment>
    </div>
  )
}

export default ReporteGerencial;
