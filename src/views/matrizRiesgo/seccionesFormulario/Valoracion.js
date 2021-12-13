import { React, Fragment, useEffect, useState} from 'react'
import { ChevronLeft, Save, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { getTablaDescripcionMatrizR } from '../controller/MatrizRiesgoController'
import { buildSelectTwo } from 'src/functions/Function'

var _ = require('lodash');

const Valoracion = ({ beforeSection, initValues, dataAux , dataAux2, isEdit, handleOnSubmmit }) => {

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        criterioImpacto: Yup.string().nullable(),
        criterioprobabilidad: Yup.string().nullable(),
        impactoUSD: Yup.number().nullable(),
        montoRiesgo: Yup.number().nullable(),

        // Solo para mostrar
        probTiempo: Yup.string().nullable(),
        probVecesAnio: Yup.number().nullable(),
      }
    ),

    onSubmit: values => {
      const data = {
       ...values,
     }
     console.log('datos que se enviaran SECCION 7:', data)
     handleOnSubmmit(data)
   }
  })

  /*  P  A  R  A  M  E  T  R  O  S  (Aux)*/
  // Probabilidad
  const [dataApiProbabilidad, setDataApiProbabilidad] = useState([])
  const callApiProbabilidad = (idTablaDes) => {
    getTablaDescripcionMatrizR(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'campoD', true)
        setDataApiProbabilidad(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiProbabilidad(2);
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  (Aux)*/

  // Obtiene valor "Veces al anio" y "Probabilidad temporalidad" de la probabilidad"
  const probVecesAnioAux = (_.find(dataApiProbabilidad, ['campoA', dataAux2.probabilidadAux+ '']) !== undefined) ? _.find(dataApiProbabilidad, ['campoA', dataAux2.probabilidadAux+ '']).campoE : null
  const probTiempoAux = (_.find(dataApiProbabilidad, ['campoA', dataAux2.probabilidadAux+ '']) !== undefined) ? _.find(dataApiProbabilidad, ['campoA', dataAux2.probabilidadAux+ '']).campoD : null

  useEffect(() => {
    formik.setFieldValue('probTiempo', probTiempoAux , false)
    formik.setFieldValue('probVecesAnio', probVecesAnioAux , false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAux2]);

  // Calculo de Monto Riesgo de Pérdida (formula entre "veces al año" e "impactoUSD")
  useEffect(() => {
    formik.setFieldValue('montoRiesgo', formik.values.probVecesAnio * formik.values.impactoUSD , false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.impactoUSD]);

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Tipo de Pérdida
            </Label>
            <CInputReact
              type={"textarea"}
              id={'efectPerdidaAux'}
              value={dataAux.efectPerdidaAux}
              disabled={true}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Efecto - Impacto ASFI
            </Label>
            <CInputReact
              type={"textarea"}
              id={'efectPerdidaAux'}
              value={dataAux.perdidaAsfiAux}
              disabled={true}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Criterio para la valoración de Impacto
            </Label>
            <CInputReact
              type={"textarea"}
              id={'criterioImpacto'}
              value={formik.values.criterioImpacto}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.criterioImpacto}
              errors={formik.errors.criterioImpacto}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Criterio de cálculo Probabilidad
            </Label>
            <CInputReact
              type={"textarea"}
              id={'criterioprobabilidad'}
              value={formik.values.criterioprobabilidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.criterioprobabilidad}
              errors={formik.errors.criterioprobabilidad}
              rows={2}
            />
          </FormGroup>

          {/* Probabilidad */}
          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Numero dias (veces) en relación a un año Probabilidad
            </Label>
            <CInputReact
              type={"text"}
              id={'probTiempo'}
              value={formik.values.probTiempo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probTiempo}
              errors={formik.errors.probTiempo}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Probabilidad
            </Label>
            <CInputReact
              type={"text"}
              id={'probabilidaNivelAux'}
              value={dataAux2.probabilidadAux}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Valoración - Probabilidad
            </Label>
            <CInputReact
              type={"text"}
              id={'probabilidaDescAux'}
              value={dataAux2.probabilidadValAux}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' className='mb-0'>
            <Label className='form-label'>
              Veces al año - Probabilidad
            </Label>
            <CInputReact
              type={"number"}
              id={'probVecesAnio'}
              value={formik.values.probVecesAnio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.probVecesAnio}
              errors={formik.errors.probVecesAnio}
              disabled={true}
            />
          </FormGroup>

          {/* Impacto */}
          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Impacto por cada vez que ocurre el evento (USD)
            </Label>
            <CInputReact
              type={"number"}
              id={'impactoUSD'}
              value={formik.values.impactoUSD}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.impactoUSD}
              errors={formik.errors.impactoUSD}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoNivelAux'}
              value={dataAux2.impactoAux}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Valoración - Impacto
            </Label>
            <CInputReact
              type={"text"}
              id={'impactoDescAux'}
              value={dataAux2.impactoValAux}
              disabled={true}
            />
          </FormGroup>
          {/* FIN Impacto */}

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Monto Riesgo de Pérdida (Anual)
            </Label>
            <CInputReact
              type={"number"}
              id={'montoRiesgo'}
              value={formik.values.montoRiesgo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.montoRiesgo}
              errors={formik.errors.montoRiesgo}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Valoración Riesgo (Matriz de Riesgo)
            </Label>
            <CInputReact
              type={"number"}
              id={'riesgoInherenteAux'}
              value={dataAux2.riesgoAux}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' xl='4' className='mb-0'>
            <Label className='form-label'>
              Riesgo (Matriz de Riesgo)
            </Label>
            <CInputReact
              type={"text"}
              id={'valorRiesgoInherenteAux'}
              value={dataAux2.riesgoValAux}
              disabled={true}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            onClick={ () => beforeSection(7) }
          >
            <ChevronLeft size={17} className='mr-1'/>
            Atrás
          </Button>
          <Button
            style={{width: '130px'}}
            color="dark"
            outline
            onClick={() => { formik.handleReset() }}
            disabled={(!formik.dirty || formik.isSubmitting)}
          >
            <Delete size={17} className='mr-2'/>
            Limpiar
          </Button>
          <Button
            style={{width: '130px'}}
            className='text-white'
            color="primary"
            type="submit"
            /* disabled={formik.isSubmitting} */
            //onClick={() => onSubmmit()}
          >
            <Save size={17} className='mr-2'/>
            GUARDAR
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Valoracion
