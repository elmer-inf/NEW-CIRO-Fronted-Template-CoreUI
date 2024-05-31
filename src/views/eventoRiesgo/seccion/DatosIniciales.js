import { React, Fragment, useState, useEffect } from 'react'
import { ChevronRight, Delete, XSquare } from 'react-feather'
import { Label, FormGroup, Row, Col, Form, Button } from 'reactstrap'
import { useFormik } from "formik"
import * as Yup from "yup"
import { CInputReact } from 'src/reusable/CInputReact'
import { CSelectReact } from 'src/reusable/CSelectReact'
import CInputCheckbox from 'src/reusable/CInputCheckbox'
import { getTablaDescripcionEventoN1, getTablaDescripcionEventoN2 } from 'src/views/administracion/evento-riesgo/controller/AdminEventoController';
import { buildSelectTwo } from 'src/functions/Function'
import { base64toPDF, formatSizeUnits, formatTime, getFileIcon } from 'src/functions/FunctionEvento'
import { useHistory } from 'react-router-dom'
import AuthService from 'src/views/authentication/AuthService'
import { CSelectReactTwo } from 'src/reusable/CSelectReactTwo'
import { Messages } from 'src/reusable/variables/Messages'
import { getArchivosByEvento } from '../controller/EventoController'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import BootstrapTable from 'react-bootstrap-table-next'
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

var _ = require('lodash');

const DatosIniciales = ({ nextSection, setObject, initValues, obtainFiles, optionsEstado, isEdit, existingFiles, idEvento }) => {

  registerPlugin(FilePondPluginFileValidateType);
  const Auth = new AuthService();
  const profile = Auth.getProfile();
  const user = profile.usuario;

  const [dataArchivos, setDataArchivo] = useState([]);


  const columns = [{
    dataField: 'nombreArchivo',
    text: 'Nombre',
    sort: true
  }, {
    dataField: 'size',
    text: 'Tamaño',
    formatter: (cell,) => formatSizeUnits(cell),
    style: {
      whiteSpace: 'nowrap'
    }
  }, {
    dataField: 'archivoBase64',
    text: 'Archivo',
    formatter: (cell, row) => (
      <CButton onClick={() => base64toPDF(row.archivoBase64, row.nombreArchivo, row.tipo)}>
        <CIcon
          className="mb-2"
          src={getFileIcon(row.tipo)}
          height={30}
        />
      </CButton>
    )
  }];

  const getArchivos = (idEvento) => {
    getArchivosByEvento(idEvento)
      .then(res => {
        setDataArchivo(res.data)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    if (isEdit) {
      getArchivos(idEvento);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const today = new Date();
  //const tenYearsFromNow = new Date();
  //tenYearsFromNow.setFullYear(today.getFullYear() + 10);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object().shape({
      fechaIni: Yup.date().min(new Date('01-01-1900'), Messages.dateValidation4).max(today, Messages.dateValidation3).required(Messages.required),
      horaIni: Yup.mixed().required(Messages.required),
      fechaDesc: Yup.date().min(Yup.ref('fechaIni'), Messages.dateValidation2).max(today, Messages.dateValidation3).required(Messages.required),
      horaDesc: Yup.mixed().required(Messages.required),
      fechaFin: Yup.date().typeError(Messages.required).min(Yup.ref('fechaIni'), Messages.dateValidation1).max(today, Messages.dateValidation3).nullable(),
      horaFin: Yup.mixed().nullable(),
      agenciaId: Yup.mixed().nullable(),
      ciudadId: Yup.mixed().nullable(),
      areaID: Yup.mixed().required(Messages.required),
      unidadId: Yup.mixed().nullable(),
      entidadAfectada: Yup.string().nullable(),
      comercioAfectado: Yup.string().nullable(),
      entidadId: Yup.mixed().nullable(),
      cargoId: Yup.mixed().required(Messages.required),
      estadoReportado: Yup.mixed().nullable(),
      fuenteInfId: Yup.mixed().nullable(),
      canalAsfiId: Yup.mixed().required(Messages.required),
      descripcion: Yup.string().required(Messages.required),
      descripcionCompleta: Yup.string().nullable(),
      //files: Yup.mixed().nullable()
      files: Yup.array().of(Yup.mixed())
        .test(
          "fileSize",
          "No se permite cargar mas de 4 archivos.",
          files => !files || files.length <= 4
        )
        .nullable()

      /* fechaIni: Yup.date().max(new Date('12-31-3000'), Messages.yearOutOfRange).nullable(),
      horaIni: Yup.string().nullable(),
      fechaDesc: Yup.date().max(new Date('12-31-3000'), Messages.yearOutOfRange).nullable(),
      horaDesc: Yup.string().nullable(),
      fechaFin: Yup.date().max(new Date('12-31-3000'), Messages.yearOutOfRange).nullable(),
      horaFin: Yup.string().nullable(),
      agenciaId: Yup.mixed().nullable(),
      ciudadId: Yup.mixed().nullable(),
      areaID: Yup.mixed().nullable(),
      unidadId: Yup.mixed().nullable(),
      entidadAfectada: Yup.string().nullable(),
      comercioAfectado: Yup.string().nullable(),
      entidadId: Yup.mixed().nullable(),
      cargoId: Yup.mixed().nullable(),
      estadoReportado: Yup.mixed().nullable(),
      fuenteInfId: Yup.mixed().nullable(),
      canalAsfiId: Yup.mixed().nullable(),
      descripcion: Yup.string().nullable(),
      descripcionCompleta: Yup.string().nullable(),
      files: Yup.mixed().nullable(), */
    }
    ),

    onSubmit: values => {

      var arrayIdEventoCargos = [];
      _.forEach(values.cargoId, function (value) {
        arrayIdEventoCargos.push(value.value);
      });

      const data = {
        ...values,
        estadoRegistro: 'Pendiente',
        fechaDescAux: values.fechaDesc.substring(0, 4),
        responsableElaborador: user.nombre + ' ' + user.primerApellido,
        estadoEvento: ((values.horaFin === null || values.horaFin === '') || (values.fechaFin === null || values.fechaFin === '')) ? 'Seguimiento' : 'Solución',

        horaIni: (values.horaIni !== null) ? formatTime(values.horaIni) : null,
        horaDesc: (values.horaDesc !== null) ? formatTime(values.horaDesc) : null,
        horaFin: (values.horaFin !== null) ? formatTime(values.horaFin) : null,

        agenciaId: (values.agenciaId !== null) ? values.agenciaId.value : 0,
        ciudadId: (values.ciudadId !== null) ? values.ciudadId.value : 0,
        areaID: (values.areaID !== null) ? values.areaID.value : 0,
        unidadId: (values.unidadId !== null) ? values.unidadId.value : 0,
        entidadId: (values.entidadId !== null) ? values.entidadId.value : 0,
        cargoId: arrayIdEventoCargos,
        fuenteInfId: (values.fuenteInfId !== null) ? values.fuenteInfId.value : 0,
        canalAsfiId: (values.canalAsfiId !== null) ? values.canalAsfiId.value : 0,

        estadoReportado: (values.estadoReportado !== null) ? values.estadoReportado.value : null
      }
      console.log('datos que se enviaran SECCION 1:', data)
      setObject(data);
      obtainFiles(values.files)
      nextSection(1);
    }
  })


  // Rellena Datos para Editar
  useEffect(() => {
    if (isEdit) {
      formik.setValues({ ...initValues })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValues])

  /*   P  A  R  A  M  E  T  R  O  S   */
  /* Agencia */
  const [dataApiAgencia, setDataApiAgencia] = useState([])
  const callApiAgencia = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiAgencia(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  /* Ciudad (Nivel 2), depende de agencia */
  const [dataApiCiudad, setDataApiCiudad] = useState([])
  const callApiCiudad = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiCiudad(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Area
  const [dataApiArea, setDataApiArea] = useState([])
  const callApiArea = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiArea(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Unidad (Nivel 2), depende de area
  const [dataApiUnidad, setDataApiUnidad] = useState([])
  const callApiUnidad = (idTablaDes, idNivel2) => {
    getTablaDescripcionEventoN2(idTablaDes, idNivel2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApiUnidad(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Entidades
  const [dataApiEntidad, setDataApiEntidad] = useState([])
  const callApiEntidad = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiEntidad(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Cargos
  const [dataApiCargo, setDataApiCargo] = useState([])
  const callApiCargo = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiCargo(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }


  // Fuente de informacion
  const [dataApiFuente, setDataApiFuente] = useState([])
  const callApiFuente = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiFuente(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  // Canal Asfi
  const [dataApiCanal, setDataApiCanal] = useState([])
  const callApiCanal = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', false)
        setDataApiCanal(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    callApiAgencia(1);
    callApiArea(3);
    callApiEntidad(5);
    callApiCargo(7);
    callApiFuente(8);
    callApiCanal(9);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /*  F  I  N     P  A  R  A  M  E  T  R  O  S  */

  // Para el despliegue del select llenado al EDITAR
  useEffect(() => {
    if (isEdit && initValues.agenciaId !== null) {
      callApiCiudad(2, initValues.agenciaId.id);
    }
    if (isEdit && initValues.areaID !== null) {
      callApiUnidad(4, initValues.areaID.id);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // Resetea "Entidad" dependiendo del check Entidad afectada
  const resetEntidad = () => { formik.setFieldValue('entidadId', null, false); }
  useEffect(() => {
    if (formik.values.entidadAfectada !== true) {
      resetEntidad();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.entidadAfectada])

  // FORMIK RESET VALUE REUTILIZABLE
  const resetFormikValue = (field, valueToReset) => {
    formik.setFieldValue(field, valueToReset, false);
  }

  /*  Values of AGENCIA */
  const clearDependenceOfAgencia = () => {
    resetFormikValue('ciudadId', null)
    setDataApiCiudad([]);
  }

  const getValueAgencia = (value) => {
    if (value !== null) {
      callApiCiudad(2, value.id);
    }
  }
  const clearInputAgencia = (id) => {
    formik.setFieldValue(id, null, false); // limpia el select principal
    resetFormikValue('ciudadId', null) // limpia el valor de select hijo
  }
  /* FIN  Values of AGENCIA */

  /*  Values of AREA */
  const clearDependenceOfArea = () => {
    resetFormikValue('unidadId', null)
    setDataApiUnidad([]);
  }

  const getValueArea = (value) => {
    if (value !== null) {
      callApiUnidad(4, value.id);
    }
  }
  const clearInputArea = (id) => {
    formik.setFieldValue(id, null, false);
  }
  /* FIN  Values of AREA */

  const history = useHistory();
  const redirect = (e) => {
    history.push('/eventoRiesgo/Listar');
  }


  return (
    <Fragment>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Row className='pt-4'>
          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha Inicio <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaIni'}
              placeholder={'Fecha inicio'}
              value={formik.values.fechaIni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaIni}
              errors={formik.errors.fechaIni}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Hora inicio <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"time"}
              id={'horaIni'}
              placeholder={'Hora inicio'}
              value={formik.values.horaIni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.horaIni}
              errors={formik.errors.horaIni}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha descubrimiento <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaDesc'}
              placeholder={'Fecha descubrimiento'}
              value={formik.values.fechaDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaDesc}
              errors={formik.errors.fechaDesc}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Hora descubrimiento <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"time"}
              id={'horaDesc'}
              placeholder={'Hora descubrimiento'}
              value={formik.values.horaDesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.horaDesc}
              errors={formik.errors.horaDesc}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fecha Fin
            </Label>
            <CInputReact
              type={"date"}
              id={'fechaFin'}
              placeholder={'Fecha Fin'}
              value={formik.values.fechaFin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.fechaFin}
              errors={formik.errors.fechaFin}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Hora Fin
            </Label>
            <CInputReact
              type={"time"}
              id={'horaFin'}
              placeholder={'Hora Fin'}
              value={formik.values.horaFin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.horaFin}
              errors={formik.errors.horaFin}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Agencia
            </Label>
            <CSelectReactTwo
              //label={""}
              id={'agenciaId'}
              placeholder={'Seleccionar'}
              value={formik.values.agenciaId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.agenciaId}
              touched={formik.touched.agenciaId}
              options={dataApiAgencia}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfAgencia}
              getAddValue={true}
              getSelectValue={getValueAgencia}
              inputIsClearable={clearInputAgencia}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Ciudad
            </Label>
            <CSelectReact
              type={"select"}
              id={'ciudadId'}
              placeholder={'Seleccionar'}
              value={formik.values.ciudadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.ciudadId}
              touched={formik.touched.ciudadId}
              options={dataApiCiudad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Área <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReactTwo
              //label={""}
              id={'areaID'}
              placeholder={'Seleccionar'}
              value={formik.values.areaID}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              errors={formik.errors.areaID}
              touched={formik.touched.areaID}
              options={dataApiArea}
              obligatorio={false}
              isClearable={true}
              isSearchable={true}
              isDisabled={false}
              dependence={true}
              cleareableDependences={clearDependenceOfArea}
              getAddValue={true}
              getSelectValue={getValueArea}
              inputIsClearable={clearInputArea}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Unidad
            </Label>
            <CSelectReact
              type={"select"}
              id={'unidadId'}
              placeholder={'Seleccionar'}
              value={formik.values.unidadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.unidadId}
              touched={formik.touched.unidadId}
              options={dataApiUnidad}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <CInputCheckbox
              type={"checkbox"}
              id={'comercioAfectado'}
              value={formik.values.comercioAfectado}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Comercio afectado'
            //checked={}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <CInputCheckbox
              type={"checkbox"}
              id={'entidadAfectada'}
              value={formik.values.entidadAfectada}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Entidad afectada'
            //checked={}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Entidad
            </Label>
            <CSelectReact
              type={"select"}
              id={'entidadId'}
              placeholder={'Seleccionar'}
              value={formik.values.entidadId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.entidadId}
              touched={formik.touched.entidadId}
              options={dataApiEntidad}
              isDisabled={(formik.values.entidadAfectada === true) ? false : true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
            <Label className='form-label'>
              Cargos Involucrados ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'cargoId'}
              placeholder={'Seleccionar'}
              value={formik.values.cargoId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.cargoId}
              touched={formik.touched.cargoId}
              options={dataApiCargo}
              isMulti={true}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Estado
            </Label>
            <CSelectReact
              type={"select"}
              id={'estadoReportado'}
              placeholder={'Seleccionar'}
              value={formik.values.estadoReportado}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.estadoReportado}
              touched={formik.touched.estadoReportado}
              options={optionsEstado}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Fuente de información
            </Label>
            <CSelectReact
              type={"select"}
              id={'fuenteInfId'}
              placeholder={'Seleccionar'}
              value={formik.values.fuenteInfId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.fuenteInfId}
              touched={formik.touched.fuenteInfId}
              options={dataApiFuente}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
            <Label className='form-label'>
              Canales ASFI <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CSelectReact
              type={"select"}
              id={'canalAsfiId'}
              placeholder={'Seleccionar'}
              value={formik.values.canalAsfiId}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.canalAsfiId}
              touched={formik.touched.canalAsfiId}
              options={dataApiCanal}
            />
          </FormGroup>

          <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
            <Label className='form-label'>Descripción <span className='text-primary h5'><b>*</b></span>
            </Label>
            <CInputReact
              type={"textarea"}
              id={'descripcion'}
              placeholder={'Descripción'}
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcion}
              errors={formik.errors.descripcion}
              rows={2}
            />
          </FormGroup>

          <FormGroup tag={Col} sm='12' className='mb-0'>
            <Label className='form-label'>
              Descripción completa
            </Label>
            <CInputReact
              type={"textarea"}
              id={'descripcionCompleta'}
              placeholder={'Descripción completa'}
              value={formik.values.descripcionCompleta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.descripcionCompleta}
              errors={formik.errors.descripcionCompleta}
              rows={3}
            />
          </FormGroup>

          {isEdit ?
            <FormGroup tag={Col} sm={12} md={{ size: 6, order: 0, offset: 3 }} className='mb-0'>
              <div className='text-label pb-4'>Archivo(s) adjunto(s): </div>
              <BootstrapTable
                bootstrap4={true}
                keyField="id"
                data={dataArchivos}
                columns={columns}
                noDataIndication={() => 'Sin Archivos'}
                bordered={false}
                striped={true}
                hover={false}
                condensed={true}
                wrapperClasses="table-responsive"
              />
            </FormGroup>
            : null
          }

          {!isEdit ?
            <FormGroup tag={Col} sm={12} md={{ size: 6, order: 0, offset: 3 }} className=''>
              <Label className='form-label'>Adjuntar archivos:</Label>
              <FilePond
                files={formik.values.files}
                allowMultiple={true}
                onupdatefiles={fileItems => {
                  const newFiles = fileItems.map(item => item.file);
                  formik.setFieldValue('files', newFiles);
                }}
                name="files"
                labelIdle='Arrastra y suelta los archivos aquí o <span class="filepond--label-action">haz clic para seleccionar</span>'
                acceptedFileTypes={[
                  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
                  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word
                  'application/pdf', // PDF
                  'application/zip', // ZIP
                  'application/vnd.ms-outlook' // MSG
                ]}
              />
              {formik.errors.files && formik.touched.files ? (
                <div className='text-danger text-center'>{formik.errors.files}</div>
              ) : null}
            </FormGroup>
            
            
            : null
          }
        </Row>

        <Row className='pt-4'>
          <Col xs={4} md={{ size: 2, order: 0, offset: 3 }}>
            <Button
              color="primary"
              outline
              block
              onClick={(e) => { redirect(e) }}
            >
              <XSquare size={17} className='mr-2' />Cancelar
            </Button>
          </Col>
          <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
            <Button
              color="dark"
              block
              onClick={() => { formik.handleReset(); }}
              disabled={!formik.dirty || formik.isSubmitting}
            >
              <Delete size={17} className='mr-2' /> Limpiar
            </Button>
          </Col>
          <Col xs={4} md={{ size: 2, order: 0, offset: 0 }}>
            <Button
              className='text-white'
              block
              color="primary"
              type="submit"
            >
              Siguiente
              <ChevronRight size={17} className='ml-1' />
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default DatosIniciales