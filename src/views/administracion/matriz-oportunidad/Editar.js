import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Formulario from './component/Formulario'
import { putTablaDescripcionOportunidadId, getTablaDescripcionOportunidadId, getTablaDescripcionOportunidadN1, getTablaListaOportunidad } from './controller/AdminOportunidadController'
import { buildSelectTwo } from 'src/functions/Function'
import { toastSweetAlert, toastSweetAlertRedirect } from 'src/reusable/SweetAlert2'
import { Messages } from 'src/reusable/variables/Messages'

const AdministracionMatrizOEditar = ({ match }) => {

  const [tablaListaOptions, setTablaListaOptions] = useState([]);
  const [listLevel2, setListlevel2] = useState([]);
  const [spin, setSpin] = useState(false);
  
  const formValueInitial = {
    campoA: '',
    nombre: '',
    campoB: '',
    campoC: '',
    campoD: '',
    tablaId: '',
    nivel2Id: '',
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial);

  const optionsSelect = {
    opTabla: tablaListaOptions,
    opLebel2List: listLevel2
  }

  const handleOnSubmit = (dataToRequest) => {
    setSpin(true);
    const idTabDesc = match.params.id;
    putTablaDescripcionOportunidadId(idTabDesc, dataToRequest)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          toastSweetAlertRedirect('success', Messages.ok, 3000, "#/administracion/matriz-oportunidad/Listar");
        } else {
          console.error('Error: ', res);
          toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-oportunidad/Listar");
        }
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlertRedirect('error', Messages.no_ok, 3000, "#/administracion/matriz-oportunidad/Listar");
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
        setSpin(false);
        console.error("Error: ", error);
        toastSweetAlert('error', Messages.no_ok, 3000);
      });
  }

  /* LISTA LAS TABLAS LISTA*/
  const callApi = () => {
    getTablaListaOportunidad()
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombreTabla', true);
        setTablaListaOptions(options);
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlert('error', Messages.no_ok, 3000);
      })
  }

  /* LISTA TABLA DESCRIPCION NIVEL 2 */
  const callApi2 = (idTablaDes) => {
    getTablaDescripcionOportunidadN1(idTablaDes)
      .then(res => {
        const options = buildSelectTwo(res.data, 'id', 'nombre', true);
        setListlevel2(options);
      }).catch((error) => {
        console.error('Error: ', error);
        toastSweetAlert('error', Messages.no_ok, 3000);
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
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Matriz de Oportunidad</CardTitle>
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
    </div>
  )
}
export default AdministracionMatrizOEditar
