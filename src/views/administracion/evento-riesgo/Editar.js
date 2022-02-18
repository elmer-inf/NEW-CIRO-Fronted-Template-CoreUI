import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionEventoId, getTablaDescripcionEventoId, getTablaListaEvento, getTablaDescripcionEventoN1 } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'
import { ToastContainer, toast } from 'react-toastify'

const AdministracionEventoEditar = ({ match }) => {

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
  //Lista las tablas Lista
  const [tablaListaOptions, setTablaListaOptions] = useState([])
  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const [dataApi2, setDataApi2] = useState([]);
  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  const [dataApi3, setDataApi3] = useState([]);

  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: dataApi2,
    tabla_n3: dataApi3,
  }

  //useState
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
      history.push('/administracion/evento-riesgo/Listar');
      setSpin(false);
    }, 5000);
  }

  // functions
  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    putTablaDescripcionEventoId(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          console.log('Envio el request: ', res);
          notificationToast('success', 'Parámetro de Evento de Riesgo modificado exitósamente');
        } else {
          console.log('Hubo un  error ', res);
          notificationToast('error', 'Algo salió mal, intente nuevamente');
        }
      }).catch((error) => {
        console.log('Error al modificar Parámetro de Evento de Riesgo: ', error);
        notificationToast('error', 'Algo salió mal, intente nuevamente');
      });
  }

  const macthed = (dataResponse) => {
    console.log('dataresponse: ', dataResponse);
    const r = dataResponse.tablaLista;

    var nivel1 = { value: dataResponse.tablaLista.id, label: dataResponse.tablaLista.nombre_tabla, nivel2: dataResponse.tablaLista.nivel2, nivel3: dataResponse.tablaLista.nivel3 }
    var nivel2 = {}
    var nivel3 = {}
    var descripcionAux = (nivel1.label === 'Responsable') ? { value: dataResponse.descripcion, label: dataResponse.descripcion } : dataResponse.descripcion;
    var campoCAux = (nivel1.label === 'Responsable') ? { value: dataResponse.campoC, label: dataResponse.campoC } : dataResponse.campoC;

    if (dataResponse.nivel2_id !== null) {
      nivel2 = { value: dataResponse.nivel2_id.id, label: dataResponse.nivel2_id.nombre }
    }
    if (dataResponse.nivel3_id !== null) {
      nivel3 = { value: dataResponse.nivel3_id.id, label: dataResponse.nivel3_id.nombre }
    }

    const valores = {
      nombre: dataResponse.nombre,
      clave: dataResponse.clave,
      //descripcion: dataResponse.descripcion,
      campoA: dataResponse.campoA,
      campoB: dataResponse.campoB,
      //campoC: dataResponse.campoC,
      campoD: dataResponse.campoD,
      codigoAsfi: dataResponse.codigoAsfi,
      tablaLista: nivel1,
      nivel2_id: (dataResponse.nivel2_id !== null) ? nivel2 : null,
      nivel3_id: (dataResponse.nivel3_id !== null) ? nivel3 : null,

      descripcion: descripcionAux,
      campoC: campoCAux
    }
    //console.log('MATCHEDEDED: ', valores)
    setformValueToEdit(valores);
    //console.log('mtachhhher: ', dataResponse.tablaLista);
    if (r.nivel2 !== null && r.nivel2 !== 0) {
      const idnivel2 = r.nivel2;
      callApi2(idnivel2);
    }
    if (r.nivel3 !== null && r.nivel3 !== 0) {
      const idnivel3 = r.nivel3;
      callApi3(idnivel3);
    }
  }

  const getById = async () => {
    setSpin(true)
    const idParametro = match.params.id;
    await getTablaDescripcionEventoId(idParametro)
      .then((response) => {
        const res = response.data;
        macthed(res)
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
        setSpin(false);
      });
  }

  const getTablaLista = async () => {
    await getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true)
        //console.log('El response de tabla: ', res.data)
        //console.log('options : ', options)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idn2) => {
    //console.log('llego callapi2:: ', ' idn2: ', idn2);
    getTablaDescripcionEventoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        console.log('El response de tabla call api 2: ', res.data)
        //console.log('options : ', options)
        setDataApi2(options)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }
  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  const callApi3 = (idTablaDes) => {
    console.log('llego callApi3:: ', idTablaDes);

    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        console.log('El response de tabla 3 : ', res.data)
        //console.log('options : ', options)
        setDataApi3(options)
      }).catch((error) => {
        console.log('Error: ', error)
        //notificationToast('error', Messages.notification.notOk)
      })
  }

  //Life Cycle
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
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Evento de Riesgo</CardTitle>
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
export default AdministracionEventoEditar
