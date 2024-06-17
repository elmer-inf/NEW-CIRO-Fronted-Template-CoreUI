import { React, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Badge, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { getEventoRiesgoId } from '../eventoRiesgo/controller/EventoController';
import { buildOptionSelect } from 'src/functions/Function';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import CCSpinner from 'src/reusable/spinner/CCSpinner';
import { CInputReact } from 'src/reusable/CInputReact';
import CSelectReactTwo from 'src/reusable/CSelectReactTwo';
import { CSelectReact } from 'src/reusable/CSelectReact';
import { Messages } from 'src/reusable/variables/Messages';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { Delete, Save, XSquare } from 'react-feather';

var _ = require('lodash');

const UpdateEventoRecurrente = ({ match }) => {

  registerPlugin(FilePondPluginFileValidateType);
  const history = useHistory();
  const [spin, setSpin] = useState(true);

  const obtainFiles = (f) => {
    //setGetFiles(f)
  }

  const formValueInitial = {
    codigo: '',
    estadoRegistro: '',
    estadoEvento: '',
    fechaFin: null,
    areaID: null,
    unidadId: null,
    cargoId: [],
    descripcion: '',
    descripcionCompleta: '',
    factorRiesgoId: null,
    procesoId: null,
    procedimientoId: null,
    tasaCambioId: null,
    monedaId: null,
    montoPerdida: '',
    gastoAsociado: '',
    montoRecuperado: '',
    montoRecuperadoSeguro: '',

    comiteSanciones: '',
    comiteActa: '',
    comiteDeterminacion: '',
    files: []
  }

  const [formValueInitialToEdit, setformValueInitial] = useState(formValueInitial);


  const formik = useFormik({
    initialValues: formValueInitial,
    validationSchema: Yup.object().shape({

      comiteSanciones: Yup.string().required(Messages.required),
      comiteActa: Yup.string().required(Messages.required),
      comiteDeterminacion: Yup.string().required(Messages.required),
      files: Yup.array().of(Yup.mixed())
        .test(
          "fileSize",
          "No se permite cargar mas de 1 archivo.",
          files => !files || files.length <= 1
        )
        .nullable()
    }
    ),

    onSubmit: values => {

      console.log('datos que se enviaran de Evento recurrente:', values)
      //setObject(data);
      //obtainFiles(values.files)
    }
  })

  const macthedValues = (args) => {
    const data = {
      codigo: args.codigo,
      estadoRegistro: args.estadoRegistro,
      estadoEvento: args.estadoEvento,
      tipoEvento: args.tipoEvento,

      fechaDesc: args.fechaDesc,
      fechaFin: args.fechaFin,
      areaID: buildOptionSelect(args.areaID, 'id', 'nombre', true, 'areaID'),
      unidadId: buildOptionSelect(args.unidadId, 'id', 'nombre', true, 'unidadId'),
      cargoId: args.cargoId.map(item => buildOptionSelect(item, 'id', 'nombre', true, 'cargoId')),
      descripcion: args.descripcion,
      descripcionCompleta: args.descripcionCompleta,
      factorRiesgoId: buildOptionSelect(args.factorRiesgoId, 'id', 'nombre', true, 'factorRiesgoId'),
      procesoId: buildOptionSelect(args.procesoId, 'id', 'nombre', true, 'procesoId'),
      procedimientoId: buildOptionSelect(args.procedimientoId, 'id', 'descripcion', true, 'procedimientoId'),
      tasaCambioId: args.tasaCambioId,
      monedaId: buildOptionSelect(args.monedaId, 'id', 'clave', true, 'monedaId'),
      montoPerdida: args.montoPerdida,
      gastoAsociado: args.gastoAsociado,
      montoRecuperado: args.montoRecuperado,
      coberturaSeguro: args.coberturaSeguro,
      montoRecuperadoSeguro: args.montoRecuperadoSeguro
    };
    setformValueInitial(data);
  }

  // Evento de riesgo ID
  const getById = async (idEventoRiesgo) => {
    setSpin(true);
    await getEventoRiesgoId(idEventoRiesgo)
      .then((response) => {
        macthedValues(response.data);
        setSpin(false);
      }).catch((error) => {
        console.error("Error: ", error);
      });
  }

  useEffect(() => {
    getById(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const [requestData, setRequestData] = useState(dataResult);


  console.log('formValueInitialToEdit: ', formValueInitialToEdit);


  const notificationToast = (type, mensaje) => {
    switch (type) {
      case 'error':
        toast.error(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;
      case 'success':
        toast.success(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
        break;

      default:
        toast(mensaje, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
    }
    setTimeout(() => {
      history.push('/eventoRiesgo/Listar');
      setSpin(false);
    }, 5000);
  }

  /* const handleOnSubmmit = (values) => {
    setSpin(true);
    const dataRequest = setObject(values);
    var request = {
      ...dataRequest,
      tipoEvento: formik.values.tipoEvento
    }

    if (formik.values.tipoEvento === 'A') {
      request = {
        ...dataRequest,
        tipoEvento: formik.values.tipoEvento
      }
    } else {
      request = {
        ...dataRequest,
        ...formValueInitialImportes,
        tipoEvento: formik.values.tipoEvento
      }

    }

    const idEvento = match.params.id;
    putEventoRiesgoId(idEvento, _.omit(request, ['files', 'riesgoRelacionado']))
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Evento de Riesgo modificado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al modificar Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  } */

  // Calcula "Monto de perdida" en bs en "Valor contable - monto perdida"
  const calculaCambio = () => {
    var result = 0;
    if (formValueInitialToEdit.monedaId !== null && (formValueInitialToEdit.monedaId.clave === 'BOB' || formValueInitialToEdit.monedaId.clave === 'Bs')) {
      result = formValueInitialToEdit.montoPerdida;
    } else {
      if (formValueInitialToEdit.monedaId !== null && (formValueInitialToEdit.monedaId.clave === 'USD' || formValueInitialToEdit.monedaId.clave === '$')) {
        result = formValueInitialToEdit.montoPerdida * formValueInitialToEdit.tasaCambioId;
      } else {
        result = 0;
      }
    }
    return result;
  }

  // Calcula Monto total recuperado
  const totalRecuperado = () => {
    return formValueInitialToEdit.montoRecuperado + formValueInitialToEdit.gastoAsociado + formValueInitialToEdit.montoRecuperadoSeguro;
  }

  const redirect = (e) => {
    history.push('/eventoRecurrente/listar');
  }


  return (
    <div>
      <CCSpinner show={spin} />
      {
        (spin === false)
          ?
          <Card>
            <CardHeader>
              <CardTitle className='float-left h4 pt-2'>
                <span className='pr-3'>Editar Evento de Riesgo</span>
                {(formValueInitial.estadoRegistro === 'Autorizado') ?
                  <span className='pr-3 text-primary font-weight-bold'>{formValueInitial.codigo}</span>
                  : null}
                {(formValueInitial.estadoRegistro === 'Autorizado') ?
                  <Badge className="px-4 badge-success-light">{formValueInitial.estadoRegistro}</Badge>
                  : null}
                {(formValueInitial.estadoRegistro === 'Descartado') ?
                  <Badge className="px-4 badge-danger">{formValueInitial.estadoRegistro}</Badge>
                  : null}
                {(formValueInitial.estadoRegistro === 'Pendiente') ?
                  <Badge className="px-4 badge-warning-light">{formValueInitial.estadoRegistro}</Badge>
                  : null}
                {(formValueInitial.estadoRegistro === 'Observado') ?
                  <Badge className="px-4 badge-danger-light">{formValueInitial.estadoRegistro}</Badge>
                  : null}
              </CardTitle>
            </CardHeader>
            <CardBody>

              <Row>
                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Fecha descubrimiento
                  </Label>
                  <CInputReact
                    type={"date"}
                    id={'fechaDesc'}
                    value={formValueInitialToEdit.fechaDesc}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Fecha Fin
                  </Label>
                  <CInputReact
                    type={"date"}
                    id={'fechaFin'}
                    value={formValueInitialToEdit.fechaFin}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Área
                  </Label>
                  <CSelectReactTwo
                    value={formValueInitialToEdit.areaID}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Unidad
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.unidadId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='12' lg='6' className='mb-0'>
                  <Label className='form-label'>
                    Cargos Involucrados ASFI
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.cargoId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
                  <Label className='form-label'>Descripción</Label>
                  <CInputReact
                    type={"textarea"}
                    value={formValueInitialToEdit.descripcion}
                    rows={2}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} sm='12' className='mb-0'>
                  <Label className='form-label'>
                    Descripción completa
                  </Label>
                  <CInputReact
                    type={"textarea"}
                    value={formValueInitialToEdit.descripcionCompleta}
                    rows={3}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Factor de riesgo operativo
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.factorRiesgoId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Proceso
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.procesoId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>
                    Procedimiento
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.procedimientoId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>Proceso crítico</Label>
                  <CInputReact
                    type={"text"}
                    value={formValueInitialToEdit.procesoId.campoA}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>Monto total de pérdida</Label>
                  <CInputReact
                    type={"text"}
                    value={formValueInitialToEdit.tipoEvento === 'A' ? _.round(calculaCambio() - totalRecuperado(), 2) : 'NA'}
                    disabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>Comité de sanciones <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CInputReact
                    type={"text"}
                    id={'comiteSanciones'}
                    placeholder={'Descripción'}
                    value={formik.values.comiteSanciones}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.comiteSanciones}
                    errors={formik.errors.comiteSanciones}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                  <Label className='form-label'>Acta de comité <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CInputReact
                    type={"text"}
                    id={'comiteActa'}
                    placeholder={'Descripción'}
                    value={formik.values.comiteActa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.comiteActa}
                    errors={formik.errors.comiteActa}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='12' className='mb-0'>
                  <Label className='form-label'>Determinación de comité <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CInputReact
                    type={"textarea"}
                    id={'comiteDeterminacion'}
                    placeholder={'Descripción'}
                    value={formik.values.comiteDeterminacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    touched={formik.touched.comiteDeterminacion}
                    errors={formik.errors.comiteDeterminacion}
                    rows={2}
                  />
                </FormGroup>

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
                    <Save size={17} className='mr-2' />
                    Guardar
                  </Button>
                </Col>
              </Row>

            </CardBody>
          </Card>
          : null
      }

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
export default UpdateEventoRecurrente