import { React, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Badge } from 'reactstrap';
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

var _ = require('lodash');

const UpdateEventoRecurrente = ({ match }) => {
  console.log('match: ', match);
  const history = useHistory();
  const [spin, setSpin] = useState(true);
  const [dataApiTipoEvento, setDataApiTipoEvento] = useState([]);
  const [dataAuxListRiesgos, setDataAuxListRiesgos] = useState([]);

  const obtainFiles = (f) => {
    //setGetFiles(f)
  }

  const formValueInitialTipoEvento = {
    tipoEvento: null,
  }

  const formik = useFormik({
    initialValues: formValueInitialTipoEvento,
    validationSchema: Yup.object().shape({
      tipoEvento: Yup.mixed().required('Campo obligatorio'),
    })
  })


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
  }

  const [formValueInitialToEdit, setformValueInitial] = useState(formValueInitial);
console.log('formValueInitialToEdit: ', formValueInitialToEdit);
  const macthedValues = (args) => {
    const data = {
      codigo: args.codigo,
      estadoRegistro: args.estadoRegistro,
      estadoEvento: args.estadoEvento,
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
                    Área <span className='text-primary h5'><b>*</b></span>
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
                    Cargos Involucrados ASFI <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CSelectReact
                    type={"select"}
                    value={formValueInitialToEdit.cargoId}
                    isDisabled={true}
                  />
                </FormGroup>

                <FormGroup tag={Col} md='6' lg='6' className='mb-0'>
                  <Label className='form-label'>Descripción <span className='text-primary h5'><b>*</b></span>
                  </Label>
                  <CInputReact
                    type={"textarea"}
                    value={formik.values.descripcion}
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
                    value={formik.values.descripcionCompleta}
                    rows={3}
                    disabled={true}
                  />
                </FormGroup>
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