import { Fragment, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { postTablaDescripcionRiesgo } from './controller/AdminRiesgoController'
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

const AdministracionMatrizRiesgosRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    campoE: '',
    campoF: '',
    campoG: '',
    tablaId: null
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
      history.push('/administracion/matriz-riesgo/listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionRiesgo(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res);
          notificationToast('success', 'Párametro de Matriz de Riesgo registrado exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al registrar Párametro de Matriz de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      })
  }

  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Matriz de Riesgo</CardTitle>
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
export default AdministracionMatrizRiesgosRegistrar
