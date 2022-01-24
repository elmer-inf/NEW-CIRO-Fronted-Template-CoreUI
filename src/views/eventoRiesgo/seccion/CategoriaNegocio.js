import { React, Fragment, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Delete } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import { getTablaDescripcionEventoN1, getTablaDescripcionEventoN2, getTablaDescripcionEventoN3 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectThree, buildSelectTwo } from 'src/functions/Function'
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo'
import { getRiesgos } from 'src/views/matrizRiesgo/controller/RiesgoController'

var _ = require('lodash');

const CategoriaNegocio = ({ nextSection, beforeSection, setObject, initValues, isEdit, tipoEvento, fechaDesc, optionsCritico, optionsAsfi }) => {

  // Obtiene Trimestre a partir de la fechaDesc
  const generaTrimestre = ()=>{
    if(fechaDesc !== undefined){
      var mes = parseInt(fechaDesc.substring(5, 7));
      var anio = parseInt(fechaDesc.substring(0, 4));
      var trimestre = '';
      if (mes >= 1 && mes <= 3)
        trimestre = 'T1 / ' + anio;
      if (mes >= 4 && mes <= 6)
        trimestre = 'T2 / ' + anio;
      if (mes >= 7 && mes <= 9)
        trimestre = 'T3 / ' + anio;
      if (mes >= 10 && mes <= 12)
        trimestre = 'T4 / ' + anio;
      return trimestre;
    }
  }

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape(
      {
        codigoInicial: Yup.string().max(500, 'El campo no debe exceder los 500 caracteres').nullable(),
        subcategorizacionId: Yup.mixed().nullable(),
        trimestre: Yup.string().nullable(),
        tipoEventoPerdidaId: Yup.mixed().required('Campo obligatorio'),
        subEventoId: Yup.mixed().nullable(),
        claseEventoId:  Yup.mixed().nullable(),
        otros : Yup.string().nullable().when('claseEventoId',{
          is:(val) =>  (val !== null && val.label === 'Otros'),
          then: Yup.string().max(300, 'El campo no debe exceder los 300 caracteres').nullable().required("Campo obligatorio"),
        }),
        detalleEventoCritico: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').required('Campo obligatorio').nullable(),
        factorRiesgoId: Yup.mixed().required('Campo obligatorio'),
        procesoId: Yup.mixed().required('Campo obligatorio'),
        procedimientoId: Yup.mixed().nullable(),
        eventoCritico: Yup.mixed().required('Campo obligatorio'),

        lineaNegocio: Yup.mixed().required('Campo obligatorio'),
        lineaAsfiId: Yup.mixed().required('Campo obligatorio'),
        operacionId: Yup.mixed().required('Campo obligatorio'),
        efectoPerdidaId: Yup.mixed().nullable(),
        opeProSerId: Yup.mixed().nullable(),
        tipoServicioId: Yup.mixed().nullable(),
        descServicioId: Yup.mixed().nullable(),
        detalleEstado: Yup.string().max(1000, 'El campo no debe exceder los 1000 caracteres').nullable(),

        listMatrizRiesgo:Yup.mixed().nullable(),

        /* codigoInicial: Yup.string().nullable(),
        subcategorizacionId: Yup.mixed().nullable(),
        trimestre: Yup.string().nullable(),
        tipoEventoPerdidaId: Yup.mixed().nullable(),
        subEventoId: Yup.mixed().nullable(),
        claseEventoId: Yup.mixed().nullable(),
        otros : Yup.string().nullable().when('claseEventoId',{
          is:(val) =>  (val !== null && val.label === 'Otros'),
          then: Yup.string().max(300, 'El campo no debe exceder los 300 caracteres').nullable().required("Campo obligatorio"),
        }),
        detalleEventoCritico: Yup.string().nullable(),
        factorRiesgoId: Yup.mixed().nullable(),
        procesoId: Yup.mixed().nullable(),
        procedimientoId: Yup.mixed().nullable(),
        eventoCritico: Yup.mixed().nullable(),

        lineaNegocio: Yup.mixed().nullable(),
        lineaAsfiId: Yup.mixed().nullable(),
        operacionId: Yup.mixed().nullable(),
        efectoPerdidaId: Yup.mixed().nullable(),
        opeProSerId: Yup.mixed().nullable(),
        tipoServicioId: Yup.mixed().nullable(),
        descServicioId: Yup.mixed().nullable(),
        detalleEstado: Yup.string().nullable(),

        listMatrizRiesgo: Yup.mixed().nullable(), */
      }
    ),

    onSubmit: values => {

      var arrayIdMatrizRiesgo = [];
      _.forEach(values.listMatrizRiesgo, function (value, key) {
        arrayIdMatrizRiesgo.push(_.get(value, 'id', null))
      });

      const data = {
        ...values,
        subcategorizacionId: (values.subcategorizacionId !== null) ? values.subcategorizacionId.value : 0,
        tipoEventoPerdidaId: (values.tipoEventoPerdidaId !== null) ? values.tipoEventoPerdidaId.value : 0,
        subEventoId: (values.subEventoId !== null) ? values.subEventoId.value : 0,
        claseEventoId: (values.claseEventoId !== null) ? values.claseEventoId.value : 0,
        factorRiesgoId: (values.factorRiesgoId !== null) ? values.factorRiesgoId.value : 0,
        procesoId: (values.procesoId !== null) ? values.procesoId.value : 0,
        procedimientoId: (values.procedimientoId !== null) ? values.procedimientoId.value : 0,

        lineaAsfiId: (values.lineaAsfiId !== null) ? values.lineaAsfiId.value : 0,
        operacionId: (values.operacionId !== null) ? values.operacionId.value : 0,
        efectoPerdidaId: (values.efectoPerdidaId !== null) ? values.efectoPerdidaId.value : 0,
        opeProSerId: (values.opeProSerId !== null) ? values.opeProSerId.value : 0,
        tipoServicioId: (values.tipoServicioId !== null) ? values.tipoServicioId.value : 0,
        descServicioId: (values.descServicioId !== null) ? values.descServicioId.value : 0,

        eventoCritico: (values.eventoCritico !== null) ? values.eventoCritico.value : null,
        lineaNegocio: (values.lineaNegocio !== null) ? values.lineaNegocio.value : null,

        trimestre: generaTrimestre(),

        listMatrizRiesgo: arrayIdMatrizRiesgo
      }
      console.log('datos que se enviaran SECCION 3:', data)
      setObject(data);

      if (tipoEvento === 'A')
        nextSection(3);
      else
        nextSection(4);
    }
  });


  /*   P  A  R  A  M  E  T  R  O  S   */
  // Subcategorizaciontipo
  const [dataApiSubcat, setDataApiSubcat] = useState([])
  const callApiSubcat = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiSubcat(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo de evento de pérdida
  const [dataApiTipoEvento, setDataApiTipo] = useState([])
  const callApiTipoEvento = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiTipo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Sub evento - Basilea (Nivel 2), depende de tipo de evento
  const [dataApiSubevento, setDataApiSubevento] = useState([])
  const callApiSubevento = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiSubevento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Clase evento - Basilea (Nivel 3), depende de Subevento
  const [dataApiClaseEvento, setDataApiClaseEvento] = useState([])
  const callApiClaseEvento = (idTablaDes, idNivel2, idNivel3) => {
    getTablaDescripcionEventoN3(idTablaDes, idNivel2, idNivel3)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiClaseEvento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Factor de riesgo operativo
  const [dataApiFactorRiesgo, setDataApiFactorRiesgo] = useState([])
  const callApiFactorRiesgo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiFactorRiesgo(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Proceso
  const [dataApiProceso, setDataApiProceso] = useState([])
  const callApiProceso = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiProceso(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Procedimiento (Nivel 2), depende de proceso
  const [dataApiProcedimiento, setDataApiProcedimiento] = useState([])
  const callApiProcedimiento = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'descripcion', true)
        setDataApiProcedimiento(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Linea de negocio ASFI
  const [dataApiLineaAsfi, setDataApiLineaAsfi] = useState([])
  const callApiLineaAsfi = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiLineaAsfi(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Operaciones ASFI
  const [dataApiOperacion, setDataApiOperacion] = useState([])
  const callApiOperacion = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiOperacion(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Efecto de perdida
  const [dataApiEfectoPerdida, setDataApiEfectoPerdida] = useState([])
  const callApiEfectoPerdida = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEfectoPerdida(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Operación, producto o servicio afectado
  const [dataApiOpeProSer, setDataApiOpeProSer] = useState([])
  const callApiOpeProSer = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiOpeProSer(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Tipo de servicio (Nivel 1)
  const [dataApiTipoServicio, setDataApiTipoServicio] = useState([])
  const callApiTipoServicio = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiTipoServicio(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  // Descripción de servicio (Nivel 2), depende de Tipo de servicio
  const [dataApiServicioDesc, setDataApiServicioDesc] = useState([])
  const callApiServicioDesc = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiServicioDesc(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  useEffect(() => {
    callApiSubcat(10);
    callApiTipoEvento(11);
    callApiFactorRiesgo(26);
    callApiProceso(15);
    callApiLineaAsfi(17);
    callApiOperacion(18);
    callApiEfectoPerdida(19);
    callApiOpeProSer(20);
    callApiTipoServicio(21);
    callLListMatrizRiesgos();
  }, [])

  // Para el despliegue del select llenado al EDITAR
  useEffect(() => {
    if (isEdit && initValues.tipoEventoPerdidaId !== null) {
      callApiSubevento(12, initValues.tipoEventoPerdidaId.id);
    }
    if (isEdit && initValues.subEventoId !== null && initValues.tipoEventoPerdidaId !== null) {
      console.log('use effect subEventoId TO clase evento: ', initValues.subEventoId);
      callApiClaseEvento(13, initValues.subEventoId.id, initValues.tipoEventoPerdidaId.id);
    }
    if (isEdit && initValues.procesoId !== null) {
      callApiProcedimiento(16, initValues.procesoId.id);
    }

    if (isEdit && initValues.tipoServicioId !== null) {
      callApiServicioDesc(22, initValues.tipoServicioId.id);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // FORMIK RESET VALUE REUTILIZABLE
  const resetFormikValue = (field, valueToReset) => {
    formik.setFieldValue(field, valueToReset, false);
  }

  /*  Values of TIPO DE EVENTO DE PERDIDA N1*/
  const clearDependenceOfTipoEventoP = () => {
    resetFormikValue('subEventoId', null);
    resetFormikValue('claseEventoId', null);
    setDataApiSubevento([]);
    setDataApiClaseEvento([]);
  }
  const getValueTipoEventoP = (value) => {
    if (value !== null) {
      callApiSubevento(12, value.id);
    }
  }
  const clearInputTipoEventoP = (id) => {
    formik.setFieldValue(id, null, false); // limpia el select N1
    resetFormikValue('subEventoId', null); // limpiar el valor del select N2
    resetFormikValue('claseEventoId', null); // limpiar el valor del select N3
  }
  /* FIN  Values of TIPO DE EVENTO DE PERDIDA N1*/

  /*  Values of SUB EVENTO N2 */
  const clearDependenceOfSubEvento = () => {
    resetFormikValue('claseEventoId', null);
    setDataApiClaseEvento([]);
  }
  const getValueSubEvento = (value) => {
    if (value !== null && formik.values.tipoEventoPerdidaId !== null) {
      callApiClaseEvento(13, value.id, formik.values.tipoEventoPerdidaId.id);
    }
  }
  const clearInputSubEvento = (id) => {
    formik.setFieldValue(id, null, false); // limpia el select N1
    resetFormikValue('claseEventoId', null) // limpiar el valor del select N2
  }
  /* FIN  Values of SUB EVENTO N2 */

  /*  Values of PROCESO N1 */
  const clearDependenceOfProceso = () => {
    resetFormikValue('procedimientoId', null);
    setDataApiProcedimiento([]);
  }
  const getValueProceso = (value) => {
    if (value !== null) {
      callApiProcedimiento(16, value.id);
    }
  }
  const clearInputProceso = (id) => {
    formik.setFieldValue(id, null, false);
    resetFormikValue('procedimientoId', null);
  }
  /* FIN  Values of PROCESO N1 */

    /*  Values of TIPO DE SERVICIO N1 */
    const clearDependenceOfTipoServicio = () => {
      resetFormikValue('descServicioId', null);
      setDataApiServicioDesc([]);
    }
    const getValueTipoServicio = (value) => {
      if (value !== null) {
        callApiServicioDesc(22, value.id);
      }
    }
    const clearInputTipoServicio = (id) => {
      formik.setFieldValue(id, null, false);
      resetFormikValue('descServicioId', null);
    }
    /* FIN  Values of TIPO DE SERVICIO N1 */




  // Resetea "otros" dependiendo del check
  const resetOtros = () => { formik.setFieldValue('otros', '', false); }
  useEffect(() => {
    if (formik.values.claseEventoId !== null) {
      resetOtros();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.claseEventoId])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */


  // Riesgos realcionados:
  const [listRiesgoRel, setListRiesgoRel] = useState([]);

  const callLListMatrizRiesgos = () => {
    //console.log('llegoo: ');
    getRiesgos()
      .then(res => {
        const options = buildSelectThree(res.data, 'id', 'codigo', 'definicion', true)
        //console.log('resssponseeee riesgo realcionado:: ', options);
        setListRiesgoRel(options)
      }).catch((error) => {
        console.log('Error: ', error)
      })
  }

  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className='divider divider-left divider-dark pt-2'>
          <div className='divider-text'><span className='text-label'>Categoria</span></div>
        </div>
        <Row>
          <FormGroup tag={Col} md='6' lg='6'>
            <Label className='form-label'>
              Código inicial
            </Label>
            <CInputReact
              type={"textarea"}
              id={'codigoInicial'}
              placeholder={'Código inicial'}
              value={formik.values.codigoInicial}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.codigoInicial}
              errors={formik.errors.codigoInicial}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Sub categorización
            </Label>
            <CSelectReact
              type={"select"}
              id={'subcategorizacionId'}
              placeholder={'Seleccionar'}
              value={formik.values.subcategorizacionId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.subcategorizacionId}
              touched={formik.touched.subcategorizacionId}
              options={dataApiSubcat}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Trimestre
            </Label>
            <CInputReact
              type={"text"}
              id={'trimestre'}
              //placeholder={'Trimestre'}
              value={generaTrimestre()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.trimestre}
              errors={formik.errors.trimestre}
              disabled={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tipo de evento de pérdida - Basilea <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReactTwo
              id={'tipoEventoPerdidaId'}
              placeholder={'Seleccionar'}
              value={formik.values.tipoEventoPerdidaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.tipoEventoPerdidaId}
              touched={formik.touched.tipoEventoPerdidaId}
              options={dataApiTipoEvento}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfTipoEventoP}
              getAddValue={true}
              getSelectValue={getValueTipoEventoP}
              inputIsClearable={clearInputTipoEventoP}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Sub evento - Basilea
            </Label>
            <CSelectReactTwo
              id={'subEventoId'}
              placeholder={'Seleccionar'}
              value={formik.values.subEventoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.subEventoId}
              touched={formik.touched.subEventoId}
              options={dataApiSubevento}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfSubEvento}
              getAddValue={true}
              getSelectValue={getValueSubEvento}
              inputIsClearable={clearInputSubEvento}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Clase evento - Basilea - ASFI
            </Label>
            <CSelectReact
              type={"select"}
              id={'claseEventoId'}
              placeholder={'Seleccionar'}
              value={formik.values.claseEventoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.claseEventoId}
              touched={formik.touched.claseEventoId}
              options={dataApiClaseEvento}
            />
          </FormGroup>

          { formik.values.claseEventoId !== null && formik.values.claseEventoId.label === "Otros"?
            <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
              <Label className='form-label'>
                Otros (Clase evento - Basilea - ASFI)
              </Label>
              <CInputReact
                type={"textarea"}
                id={'otros'}
                placeholder={'Otros'}
                value={formik.values.otros}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.otros}
                errors={formik.errors.otros}
                rows={1}
              />
            </FormGroup>
          : null}

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>
              Detalle evento crítico <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'detalleEventoCritico'}
              placeholder={'Detalle evento crítico'}
              value={formik.values.detalleEventoCritico}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.detalleEventoCritico}
              errors={formik.errors.detalleEventoCritico}
              rows={1}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Factor de riesgo operativo <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'factorRiesgoId'}
              placeholder={'Seleccionar'}
              value={formik.values.factorRiesgoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.factorRiesgoId}
              touched={formik.touched.factorRiesgoId}
              options={dataApiFactorRiesgo}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Macroproceso <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReactTwo
              id={'procesoId'}
              placeholder={'Seleccionar'}
              value={formik.values.procesoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.procesoId}
              touched={formik.touched.procesoId}
              options={dataApiProceso}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfProceso}
              getAddValue={true}
              getSelectValue={getValueProceso}
              inputIsClearable={clearInputProceso}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Procedimiento
            </Label>
            <CSelectReact
              type={"select"}
              id={'procedimientoId'}
              placeholder={'Seleccionar'}
              value={formik.values.procedimientoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.procedimientoId}
              touched={formik.touched.procedimientoId}
              options={dataApiProcedimiento}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Evento crítico ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'eventoCritico'}
              placeholder={'Seleccionar'}
              value={formik.values.eventoCritico}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.eventoCritico}
              touched={formik.touched.eventoCritico}
              options={optionsCritico}
            />
          </FormGroup>
          <FormGroup tag={Col} md='12' className='mb-0'>
            <Label className='form-label'>
              Riesgo(s) relacionado(s) {/* <span className='text-primary h5'><b>*</b></span> */}
            </Label>
            <CSelectReact
              type={"select"}
              id={'listMatrizRiesgo'}
              placeholder={'Seleccionar'}
              value={formik.values.listMatrizRiesgo}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.listMatrizRiesgo}
              touched={formik.touched.listMatrizRiesgo}
              options={listRiesgoRel}
              isMulti={true}
            />
          </FormGroup>
        </Row>
        <div className='divider divider-left divider-dark pt-2'>
          <div className='divider-text'><span className='text-label'>Línea de negocio</span></div>
        </div>
        <Row>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Línea de negocio <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'lineaNegocio'}
              placeholder={'Seleccionar'}
              value={formik.values.lineaNegocio}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.lineaNegocio}
              touched={formik.touched.lineaNegocio}
              options={optionsAsfi}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Línea de negocio ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'lineaAsfiId'}
              placeholder={'Seleccionar'}
              value={formik.values.lineaAsfiId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.lineaAsfiId}
              touched={formik.touched.lineaAsfiId}
              options={dataApiLineaAsfi}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Efectos de pérdida
            </Label>
            <CSelectReact
              type={"select"}
              id={'efectoPerdidaId'}
              placeholder={'Seleccionar'}
              value={formik.values.efectoPerdidaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.efectoPerdidaId}
              touched={formik.touched.efectoPerdidaId}
              options={dataApiEfectoPerdida}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Operación, producto o servicio afectado
            </Label>
            <CSelectReact
              type={"select"}
              id={'opeProSerId'}
              placeholder={'Seleccionar'}
              value={formik.values.opeProSerId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.opeProSerId}
              touched={formik.touched.opeProSerId}
              options={dataApiOpeProSer}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Tipo de servicio
            </Label>
            <CSelectReactTwo
              id={'tipoServicioId'}
              placeholder={'Seleccionar'}
              value={formik.values.tipoServicioId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.tipoServicioId}
              touched={formik.touched.tipoServicioId}
              options={dataApiTipoServicio}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfTipoServicio}
              getAddValue={true}
              getSelectValue={getValueTipoServicio}
              inputIsClearable={clearInputTipoServicio}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Descripción de servicio
            </Label>
            <CSelectReact
              type={"select"}
              id={'descServicioId'}
              placeholder={'Seleccionar'}
              value={formik.values.descServicioId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.descServicioId}
              touched={formik.touched.descServicioId}
              options={dataApiServicioDesc}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Operaciones ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'operacionId'}
              placeholder={'Seleccionar'}
              value={formik.values.operacionId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.operacionId}
              touched={formik.touched.operacionId}
              options={dataApiOperacion}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Detalle estado del evento
            </Label>
            <CInputReact
              type={"textarea"}
              id={'detalleEstado'}
              placeholder={'Detalle estado del evento'}
              value={formik.values.detalleEstado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.detalleEstado}
              errors={formik.errors.detalleEstado}
              rows={3}
            />
          </FormGroup>
        </Row>

        <div className='d-flex justify-content-between pt-4'>
          <Button
            style={{ width: '130px' }}
            className='text-white'
            color="primary"
            onClick={() => beforeSection(3)}
          >
            <ChevronLeft size={17} className='mr-1' />
            Atrás
          </Button>
          <Button
            style={{ width: '130px' }}
            color="dark"
            outline
            onClick={() => { formik.handleReset()/* ; this.reset() */ }}
            disabled={(!formik.dirty || formik.isSubmitting)}
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
            Siguiente
            <ChevronRight size={17} className='ml-1' />
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default CategoriaNegocio
