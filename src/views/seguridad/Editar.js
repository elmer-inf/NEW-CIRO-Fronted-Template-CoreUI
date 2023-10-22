import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putSeguridadId, getSeguridadId } from './controller/SeguridadController'
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

const SeguridadEditar = ({ match }) => {

  const history = useHistory();

  const formValueInitial = {
    fechaRegistro: '',
    ipUrl: '',
    activoInformacion: '',
    red: '',
    descripcionRiesgo: '',
    recomendacion: '',
    fechaSolucion: '',
    fechaLimite: '',
    planTrabajo: '',
    informeEmitido: '',
    ciSeguimiento: '',
    comentario: '',

    tipoActivoId: null,
    estadoId: null,
    nivelRiesgoId: null,
    areaId: null
  }

  //useState
  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      history.push('/seguridad/Listar');
      setSpin(false);
    }, 5000);
  }

  // functions
  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idSeguridad = match.params.id;
    putSeguridadId(idSeguridad, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Riesgo en Seguridad modificado exitósamente');
        } else {
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        notificationToast('error', 'Algo salió mal, intente nuevamente')
      });
  }

  const matched = (dataResponse) => {
    var tipoActivoIdAux = dataResponse.tipoActivoId!==null? { value: dataResponse.tipoActivoId.id, label: dataResponse.tipoActivoId.nombre } : null;
    var estadoIdAux = dataResponse.estadoId!==null? { value: dataResponse.estadoId.id, label: dataResponse.estadoId.nombre } : null;
    var nivelRiesgoIdAux = dataResponse.nivelRiesgoId!==null? { value: dataResponse.nivelRiesgoId.id, label: dataResponse.nivelRiesgoId.campoA + ' - ' + dataResponse.nivelRiesgoId.campoB } : null;
    var areaIdAux = dataResponse.areaId!==null? { value: dataResponse.areaId.id, label: dataResponse.areaId.clave + ' - ' + dataResponse.areaId.nombre } : null;
    var redAux = dataResponse.red!==null? { value: dataResponse.red, label: dataResponse.red } : null;

    const valores = {
      fechaRegistro: dataResponse.fechaRegistro,
      ipUrl: dataResponse.ipUrl,
      activoInformacion: dataResponse.activoInformacion,
      descripcionRiesgo: dataResponse.descripcionRiesgo,
      recomendacion: dataResponse.recomendacion,
      fechaSolucion: dataResponse.fechaSolucion,
      fechaLimite: dataResponse.fechaLimite,
      planTrabajo: dataResponse.planTrabajo,
      informeEmitido: dataResponse.informeEmitido,
      ciSeguimiento: dataResponse.ciSeguimiento,
      comentario: dataResponse.comentario,

      tipoActivoId: tipoActivoIdAux,
      estadoId: estadoIdAux,
      nivelRiesgoId: nivelRiesgoIdAux,
      areaId: areaIdAux,
      red: redAux
    }
    setformValueToEdit(valores)
  }


  const getById = async () => {
    setSpin(true)
    const idSeguridad = match.params.id;
    await getSeguridadId(idSeguridad)
      .then((response) => {
        const res = response.data;
        console.log("" + JSON.stringify(res, null, 2));
        matched(res);
        setSpin(false);
      }).catch((error) => {
        notificationToast('error', 'Algo salió mal, intente nuevamente')
        setSpin(false);
      });
  }


  return (
    <div>
      <CCSpinner show={spin} />

      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Editar Riesgo en Seguridad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
                ? <div></div>
                : <Formulario
                  initialValuess={formValueToEdit}
                  handleOnSubmit={handleOnSubmit}
                  isEdit={true}
                />
            }
          </CardBody>
        </Card>
      </Fragment>

      <ToastContainer
        position="top-center"
        autoClose={8000}
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
export default SeguridadEditar
