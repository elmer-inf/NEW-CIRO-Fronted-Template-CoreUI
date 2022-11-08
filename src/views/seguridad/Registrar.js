import { Fragment, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Formulario from './component/Formulario';
import { postSeguridad } from './controller/SeguridadController';
import { ToastContainer, toast } from 'react-toastify';
import CCSpinner from 'src/reusable/spinner/CCSpinner';

const SeguridadRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

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

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postSeguridad(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Riesgo en Seguridad registrado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al obtener datos: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      })
  }

  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Riesgo en Seguridad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            <Formulario
              initialValuess={formValueInitial}
              handleOnSubmit={handleOnSubmit}
            />
          </CardBody>
        </Card>
      </Fragment>

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
export default SeguridadRegistrar
