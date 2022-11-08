import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionOportunidadId, getTablaDescripcionOportunidadId, getTablaDescripcionOportunidadN1, getTablaListaOportunidad } from './controller/AdminOportunidadController'
import { buildSelectTwo } from 'src/functions/Function'
import { ToastContainer, toast } from 'react-toastify'

const AdministracionMatrizOEditar = ({ match }) => {

  const [tablaListaOptions, setTablaListaOptions] = useState([]);
  const [listLevel2, setListlevel2] = useState([]);

  const history = useHistory();
  const [spin, setSpin] = useState(false);

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
    opLebel2List: listLevel2
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
      history.push('/administracion/matriz-oportunidad/Listar');
      setSpin(false);
    }, 5000);
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idTabDesc = match.params.id;
    putTablaDescripcionOportunidadId(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          notificationToast('success', 'Parámetro de Matriz de Oportunidad modificado exitósamente');
        } else {
          console.error('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.error('Error al modificar Parámetro de Matriz de Oportunidad: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  const macthed = (dataResponse) => {
    var nivel1 = { value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla, nivel2: dataResponse.tablaId.nivel2 }
    var nivel2 = {}

    if (dataResponse.nivel2Id !== null) {
      nivel2 = { value: dataResponse.nivel2Id.id, label: dataResponse.nivel2Id.nombre }
    }

    const valores = {
      campoA: dataResponse.campoA,
      nombre: dataResponse.nombre,
      campoB: dataResponse.campoB,
      campoC: dataResponse.campoC,
      campoD: dataResponse.campoD,
      tablaId: nivel1,
      nivel2Id: (dataResponse.nivel2Id !== null) ? nivel2 : null,
    }
    setformValueToEdit(valores)

    if (dataResponse.tablaId.nivel2 !== null && dataResponse.tablaId.nivel2 !== 0) {
      const idnivel2 = dataResponse.tablaId.nivel2;
      callApi2(idnivel2);
    }
  }

  const getById = async () => {
    setSpin(true);
    const idParametro = match.params.id;
    await getTablaDescripcionOportunidadId(idParametro)
      .then((response) => {
        const res = response.data;
        macthed(res);
        setSpin(false);
      }).catch((error) => {
        console.error("Error: ", error);
        setSpin(false);
      });
  }
  /* LISTA LAS TABLAS LISTA*/
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true);
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idTablaDes) => {
    getTablaDescripcionOportunidadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true);
        setListlevel2(options)
      }).catch((error) => {
        console.error('Error: ', error)
      })
  }

  useEffect(() => {
    getById();
    callApi();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Matriz de oportunidad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
                ? <div></div>
                : <Formulario
                  initialValuess={formValueToEdit}
                  optionsList={optionsSelect}
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
export default AdministracionMatrizOEditar
