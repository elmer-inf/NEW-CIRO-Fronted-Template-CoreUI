import { React, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Badge, Button, Form } from 'reactstrap';
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
import { getArchivosByEventoRecurrente, putEventoRecurrenteId } from './controller/EventoRecurrenteController';
import BootstrapTable from 'react-bootstrap-table-next';
import { base64toPDF, formatSizeUnits, getFileIcon } from 'src/functions/FunctionEvento';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';

var _ = require('lodash');

const UpdateEventoRecurrente = ({ match }) => {

  registerPlugin(FilePondPluginFileValidateType);
  const history = useHistory();
  const [spin, setSpin] = useState(true);
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

  const optionsComite = [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' },
    { value: 'NA', label: 'NA' }
  ]

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

    comiteSanciones: null,
    comiteActa: null,
    comiteDeterminacion: null,
    files: null
  }

  const [formValueInitialToEdit, setformValueInitial] = useState(formValueInitial);
  
  const formik = useFormik({
    initialValues: formValueInitialToEdit,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({

      comiteSanciones: Yup.mixed().required(Messages.required),
      comiteActa: Yup.mixed().required(Messages.required),
      comiteDeterminacion: Yup.string().required(Messages.required),
      files: Yup.array().of(Yup.mixed())
        .test(
          "fileSize",
          "No se permite cargar mas de 2 archivo.",
          files => !files || files.length <= 2
        )
        .nullable()
    }
    ),
    onSubmit: values => {
      const data = {
        comiteSanciones: (values.comiteSanciones !== null) ? values.comiteSanciones.value : null,
        comiteActa: (values.comiteActa !== null) ? values.comiteActa.value : null,
        comiteDeterminacion: values.comiteDeterminacion
      };
      handleOnSubmmit(data, values.files);
    }
  })

  const getArchivos = (idEvento) => {
    getArchivosByEventoRecurrente(idEvento)
      .then(res => {
        setDataArchivo(res.data);
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    const getById = async (idEventoRiesgo) => {
      setSpin(true);
      try {
        const response = await getEventoRiesgoId(idEventoRiesgo);
        const args = response.data;
        const initialValues = {
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
          montoRecuperadoSeguro: args.montoRecuperadoSeguro,

          comiteSanciones: args.comiteSanciones!==null? { value: args.comiteSanciones, label: args.comiteSanciones } : null,
          comiteActa: args.comiteActa !==null? { value: args.comiteActa, label: args.comiteActa }:null,
          comiteDeterminacion: args.comiteDeterminacion!==null? args.comiteDeterminacion : '',
          files: null,
        };
        setformValueInitial(initialValues);
      } catch (error) {
        console.error("Error fetching event data: ", error);
      } finally {
        setSpin(false);
      }
    };

    getById(match.params.id);
    getArchivos(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);



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
      history.push('/eventoRecurrente/listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmmit = (data, files) => {
    setSpin(true);
    const idEvento = match.params.id;

    var formData = new FormData();
    formData.append('eventoRiesgoPutDTOrecurrente', JSON.stringify(data));

    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    } else {
      formData.append("file", new Blob([]));
    }

    putEventoRecurrenteId(idEvento, formData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Evento recurrente modificado exitósamente');
        } else {
          console.error('Hubo un error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al modificar Evento recurrente: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      }).finally(() => {
        setSpin(false);
      });
  }


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
                {(formValueInitialToEdit.estadoRegistro === 'Autorizado') ?
                  <span className='pr-3 text-primary font-weight-bold'>{formValueInitialToEdit.codigo}</span>
                  : null}
                {(formValueInitialToEdit.estadoRegistro === 'Autorizado') ?
                  <Badge className="px-4 badge-success-light">{formValueInitialToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialToEdit.estadoRegistro === 'Descartado') ?
                  <Badge className="px-4 badge-danger">{formValueInitialToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialToEdit.estadoRegistro === 'Pendiente') ?
                  <Badge className="px-4 badge-warning-light">{formValueInitialToEdit.estadoRegistro}</Badge>
                  : null}
                {(formValueInitialToEdit.estadoRegistro === 'Observado') ?
                  <Badge className="px-4 badge-danger-light">{formValueInitialToEdit.estadoRegistro}</Badge>
                  : null}
              </CardTitle>
              <span className='float-right'>
                {(formValueInitialToEdit.estadoEvento === 'Solución') ?
                  <Badge className='mt-2 py-2 px-3 h6 font-weight-bold badge-success'>{formValueInitialToEdit.estadoEvento}</Badge>
                  : null}

                {(formValueInitialToEdit.estadoEvento === 'Seguimiento') ?
                  <Badge className="mt-2 py-2 px-3 h6 font-weight-bold badge-warning">{formValueInitialToEdit.estadoEvento}</Badge>
                  : null}
              </span>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit} autoComplete="off">
                <Row>
                  <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                    <Label className='form-label'>Tipo de Evento</Label>
                    <CInputReact
                      type={"text"}
                      value={formValueInitialToEdit.tipoEvento}
                      disabled={true}
                    />
                  </FormGroup>
                </Row>

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
                    <CSelectReact
                      type={"select"}
                      id={'comiteSanciones'}
                      placeholder={'Seleccionar'}
                      value={formik.values.comiteSanciones}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      error={formik.errors.comiteSanciones}
                      touched={formik.touched.comiteSanciones}
                      options={optionsComite}
                    />
                  </FormGroup>
                  <FormGroup tag={Col} md='6' lg='3' className='mb-0'>
                    <Label className='form-label'>Acta de comité <span className='text-primary h5'><b>*</b></span>
                    </Label>
                    <CSelectReact
                      type={"select"}
                      id={'comiteActa'}
                      placeholder={'Seleccionar'}
                      value={formik.values.comiteActa}
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      error={formik.errors.comiteActa}
                      touched={formik.touched.comiteActa}
                      options={optionsComite}
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
                </Row>

                {!dataArchivos || dataArchivos.length === 0 ?
                  <Row>
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
                  :
                  <Row>
                    <Col sm={12} md={{ size: 6, order: 0, offset: 3 }} className='pt-2'>
                      <div className='text-label pb-4'>Archivo adjunto: </div>
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
                    </Col>
                  </Row>
                }


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

              </Form>
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