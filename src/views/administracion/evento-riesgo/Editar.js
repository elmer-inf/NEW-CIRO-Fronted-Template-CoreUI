import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { putTablaDescripcionEventoId, getTablaDescripcionEventoId, getTablaListaEvento, getTablaDescripcionEventoN1 } from './controller/AdminEventoController'
import { buildSelectTwo } from 'src/functions/Function'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionEventoEditar = ({ match }) => {

  const [spin, setSpin] = useState(false);
  const [tablaListaOptions, setTablaListaOptions] = useState([]);
  const [dataApi2, setDataApi2] = useState([]);
  const [dataApi3, setDataApi3] = useState([]);

  const formValueInitial = {
    tablaLista: '',
    nombre: '',
    clave: '',
    descripcion: '',
    campoA: '',
    campoB: '',
    campoC: '',
    campoD: '',
    codigoAsfi: '',
    nivel2_id: '',
    nivel3_id: ''
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial);
  
  const optionsToFormik = {
    tablaOp: tablaListaOptions,
    tabla_n2: dataApi2,
    tabla_n3: dataApi3,
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idTabDesc = match.params.id;
    putTablaDescripcionEventoId(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/evento-riesgo/Listar");
        } else {
          console.error('Error: ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/evento-riesgo/Listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/evento-riesgo/Listar");
      });
  }

  const macthed = (dataResponse) => {
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
      campoA: dataResponse.campoA,
      campoB: dataResponse.campoB,
      campoD: dataResponse.campoD,
      codigoAsfi: dataResponse.codigoAsfi,
      tablaLista: nivel1,
      nivel2_id: (dataResponse.nivel2_id !== null) ? nivel2 : null,
      nivel3_id: (dataResponse.nivel3_id !== null) ? nivel3 : null,

      descripcion: descripcionAux,
      campoC: campoCAux
    }
    setformValueToEdit(valores);
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
        setSpin(false);
        console.error("Error: ", error);
        toastSweetAlert('error', Messages.no_ok, 3000);
      });
  }

  const getTablaLista = async () => {
    await getTablaListaEvento()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre_tabla', true)
        setTablaListaOptions(options)
      }).catch((error) => {
        console.error('Error: ', error)
        toastSweetAlert('error', Messages.no_ok, 3000);
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idn2) => {
    getTablaDescripcionEventoN1(idn2)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        console.error('El response de tabla call api 2: ', res.data)
        setDataApi2(options)
      }).catch((error) => {
        console.error('Error: ', error)
        toastSweetAlert('error', Messages.no_ok, 3000);
      })
  }
  /* LISTA TABLA DESCRIPCION NIVEL 3 */
  const callApi3 = (idTablaDes) => {
    getTablaDescripcionEventoN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true)
        setDataApi3(options)
      }).catch((error) => {
        console.error('Error: ', error)
        toastSweetAlert('error', Messages.no_ok, 3000);
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
    </div>
  )
}
export default AdministracionEventoEditar
