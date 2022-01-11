import React, { Fragment } from 'react'
import { Card, CardHeader, CardBody, CardTitle, Button, Col, Label, Row, FormGroup, Form } from 'reactstrap'
import { Delete, FileText, Printer, Save } from 'react-feather';
import { useFormik } from "formik"
import * as Yup from "yup"
import { CSelectReact } from 'src/reusable/CSelectReact';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react';

const ReporteEventos = () => {

  const formValueInitial = {
    anio: '',
    trimestre: null,
  }

  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape(
      {
        anio: Yup.mixed().nullable(),
        trimestre: Yup.mixed().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
        ...values
      }
      //console.log('datos que se enviaran:', data)
      handleOnSubmit(data)
    }
  })

  const handleOnSubmit = (dataToRequest) => {

  }

  // Año Reporte
  const dataAnio = ()=>{
    var dataAnio = [];
    for(var i = 1988 ; i <= (new Date().getFullYear()) ; i++){
      dataAnio.push({"value": i, "label": i})
    }
    return dataAnio;
  }

  // Trimestre Reporte
  const optionsTrimestre = [
    { value: '01-01|03-31', label: 'Enero - Marzo' },
    { value: '04-01|06-30', label: 'Abril - Junio' },
    { value: '07-01|09-30', label: 'Julio - Septiembre' },
    { value: '10-01|12-31', label: 'Octubre - Diciembre' }
  ]

  return (
    <div className='table-hover-animation'>
      <Fragment>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>Reporte de Eventos de Riesgo</CardTitle>
              <Button color='primary' className='float-right mt-1 text-white'>
                <Printer size={15} className='mr-2' /><span>Generar 9 reportes</span>
              </Button>
            </CardHeader>
            <CardBody>
              <Row className='justify-content-center pt-4'>
                <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                  <Label className='form-label text-label'>
                    Año
                  </Label>
                    <CSelectReact
                      type={"select"}
                      id={'anio'}
                      placeholder={'Seleccionar'}
                      value={formik.values.anio}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      error={formik.errors.anio}
                      touched={formik.touched.anio}
                      options={dataAnio()}
                    />
                </FormGroup>

                <FormGroup tag={Col} xs='12' md='6' lg='4' xl='3' className='mb-0'>
                  <Label className='form-label text-label'>
                    Trimestre
                  </Label>
                    <CSelectReact
                      type={"select"}
                      id={'trimestre'}
                      placeholder={'Seleccionar'}
                      value={formik.values.trimestre}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      error={formik.errors.trimestre}
                      touched={formik.touched.trimestre}
                      options={optionsTrimestre}
                    />
                </FormGroup>
              </Row>

              <Row>
                <Col xs="12" className="mb-4 mt-2">
                  <CTabs>
                    <CNav variant="tabs" className='justify-content-center font-weight-bold h6'>
                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 1</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 2</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 3</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 4</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 5</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 6</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 7</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 8</span>
                        </CNavLink>
                      </CNavItem>

                      <CNavItem>
                        <CNavLink>
                          <FileText size={17} /><span className='pl-1 pr-2 h6 font-weight-bold'>Reporte 9</span>
                        </CNavLink>
                      </CNavItem>

                    </CNav>
                    <CTabContent>
                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                      <CTabPane>
                        <Row className='pt-3'>
                          <Col xs='12'>
                            Reporte
                          </Col>
                        </Row>
                      </CTabPane>

                    </CTabContent>
                  </CTabs>
                </Col>
              </Row>

              <div className='d-flex justify-content-around pt-4'>
                <Button
                  style={{ width: '130px' }}
                  color="dark"
                  outline
                  onClick={() => { formik.handleReset() }}
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                  <Delete size={17} className='mr-2' />
                  Limpiar
                </Button>
                <Button
                  style={{ width: '130px' }}
                  className='text-white'
                  color="primary"
                  type="submit"
                  //disabled={formik.isSubmitting}
                >
                  <Save size={17} className='mr-2'/>
                  Generar
                </Button>
              </div>
            </CardBody>
          </Card>
        </Form>
      </Fragment>

    </div>
  )
}

export default ReporteEventos
