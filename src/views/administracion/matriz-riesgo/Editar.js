import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionRiesgo, getTablaDescripcionRiesgoId } from './controller/AdminRiesgoController'

const AdministracionEventoEditar = ( { match } ) => {

  const history = useHistory()
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

  const [spin, setSpin] = useState(false)

  const handleOnSubmit = (dataToRequest) => {
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    putTablaDescripcionRiesgo(idTabDesc, dataToRequest)
    .then(res => {
      console.log('response : ', res);
      history.push("/administracion/matriz-riesgo/listar")
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

  const matched = (dataResponse) =>{
      var nivel1 = {value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla }
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
    setSpin(true)
    const idParametro = match.params.id;
    await getTablaDescripcionRiesgoId(idParametro)
      .then((response) => {
          //console.log("API xxxxx: ", response);
          const res = response.data;
          matched(res)
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
    });
  }

  useEffect(() => {
    //console.log("call")
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div id=''>
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
    </div>
  )
}
export default AdministracionEventoEditar
