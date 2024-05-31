import { Fragment, useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { getTablaListaRiesgo, postTablaDescripcionRiesgo } from './controller/AdminRiesgoController'
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'
import { buildSelectTwo } from 'src/functions/Function'

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
    tablaId: null,
    nivel2_id: null,
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: []
  }

  const getTablaLista =  ()=> {
     getTablaListaRiesgo()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true);
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
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
          notificationToast('success', 'Párametro de Matriz de Riesgo registrado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al registrar Párametro de Matriz de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      })
  }

  useEffect(() => {
    getTablaLista();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              optionToSelect={optionsToFormik}
              handleOnSubmit={handleOnSubmit}
              isEdit={false}
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
