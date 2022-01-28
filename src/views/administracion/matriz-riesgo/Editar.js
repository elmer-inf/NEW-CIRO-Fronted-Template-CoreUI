import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionRiesgo, getTablaDescripcionRiesgoId } from './controller/AdminRiesgoController'
import { ToastContainer, toast } from 'react-toastify'

const AdministracionMatrizRiesgoEditar = ({ match }) => {

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

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)

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
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    putTablaDescripcionRiesgo(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res);
          notificationToast('success', 'Párametro de Matriz de Riesgo modificado exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al modificar Párametro de Matriz de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  const matched = (dataResponse) => {
    var nivel1 = { value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla }
    const valores = {
      campoA: dataResponse.campoA,
      nombre: dataResponse.nombre,
      campoB: dataResponse.campoB,
      campoC: dataResponse.campoC,
      campoD: dataResponse.campoD,
      campoE: dataResponse.campoE,
      campoF: dataResponse.campoF,
      campoG: dataResponse.campoG,

      tablaId: nivel1,
    }
    console.log('MATCHED: ', valores)
    setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true);
    const idParametro = match.params.id;
    await getTablaDescripcionRiesgoId(idParametro)
      .then((response) => {
        const res = response.data;
        matched(res);
        setSpin(false);
      }).catch((error) => {
        console.log("Error: ", error);
        setSpin(false);
      });
  }

  useEffect(() => {
    //console.log("call")
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Matriz de Riesgo</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
                ? <div></div>
                : <Formulario
                  initialValuess={formValueToEdit}
                  //optionToSelect={{}}
                  handleOnSubmit={handleOnSubmit}
                />
            }
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
export default AdministracionMatrizRiesgoEditar
