import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { getTablaListaEvento, postTablaDescripcionEvento } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

const AdministracionEventoRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

  const formValueInitial = {
    tablaLista: null,
    nombre: '',
    clave: '',
    descripcion: '',
    campoA: '',
    campoB: '',
    campoC: '',
    campoD: '',
    codigoAsfi: '',
    nivel2_id: null,
    nivel3_id: null
  }

  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: [],
    tabla_n3: [],
  }
  const getTablaLista = async () => {
    await getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true)
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
      history.push('/administracion/evento-riesgo/Listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionEvento(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Parámetro de Evento de Riesgo registrado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al registrar Parámetro de Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      })
  }
  useEffect(() => {
    getTablaLista();
  }, [])

  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Evento de Riesgo</CardTitle>
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
export default AdministracionEventoRegistrar
