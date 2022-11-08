import React, { useState, useEffect, Fragment } from 'react'

import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { getTablaListaOportunidad, postTablaDescripcionOportunidad } from './controller/AdminOportunidadController'
import { buildSelectTwo } from 'src/functions/Function'
import { ToastContainer, toast } from 'react-toastify'
import CCSpinner from 'src/reusable/spinner/CCSpinner'

const AdministracionMatrizOportunidadRegistrar = () => {

  const history = useHistory();
  const [spin, setSpin] = useState(false);

  const [tablaListaOptions, setTablaListaOptions] = useState([])

  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    tablaId: null,
    nivel2Id: null,
  }
  const optionsSelect = {
    opTabla: tablaListaOptions,
    opLebel2List: []
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
      history.push('/administracion/matriz-oportunidad/Listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    postTablaDescripcionOportunidad(dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Parámetro de Matriz de Oportunidad registrado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al registrar Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      })
  }


  /* LISTA LAS TABLAS LISTA*/
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    callApi();
  }, [])


  return (
    <div>
      <CCSpinner show={spin} />
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Registrar Parámetro de Matriz de oportunidad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            <Formulario
              initialValuess={formValueInitial}
              optionsList={optionsSelect}
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
export default AdministracionMatrizOportunidadRegistrar
