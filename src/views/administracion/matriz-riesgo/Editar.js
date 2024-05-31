import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionRiesgo, getTablaDescripcionRiesgoId, getTablaListaRiesgo, getTablaDescripcionRiesgoN1 } from './controller/AdminRiesgoController'
import { ToastContainer, toast } from 'react-toastify'
import { buildSelectTwo } from 'src/functions/Function'

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
    tablaId: null,
    nivel2_id: null,
  }

  //Lista las tablas Lista
  const [tablaListaOptions, setTablaListaOptions] = useState([])
  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const [dataApi2, setDataApi2] = useState([]);

  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: dataApi2
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
    const idTabDesc = match.params.id;
    putTablaDescripcionRiesgo(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Párametro de Matriz de Riesgo modificado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al modificar Párametro de Matriz de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  const matched = (dataResponse) => {
    const r = dataResponse.tablaId;
    var nivel1 = { value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla, nivel2: dataResponse.tablaId.nivel2, }
    var nivel2 = {}
    if (dataResponse.nivel2_id !== null) {
      nivel2 = { value: dataResponse.nivel2_id.id, label: dataResponse.nivel2_id.nombre }
    }

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
      nivel2_id: (dataResponse.nivel2_id !== null) ? nivel2 : null,
    }
    setformValueToEdit(valores);
    if (r.nivel2 !== null && r.nivel2 !== 0) {
      const idnivel2 = r.nivel2;
      callApi2(idnivel2);
    }
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
        console.error("Error: ", error);
        setSpin(false);
      });
  }

  const getTablaLista = () => {
    getTablaListaRiesgo()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true);
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idn2) => {
    getTablaDescripcionRiesgoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApi2(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }


  useEffect(() => {
    getById();
    getTablaLista();
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
                  optionToSelect={optionsToFormik}
                  handleOnSubmit={handleOnSubmit}
                  isEdit={true}
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
