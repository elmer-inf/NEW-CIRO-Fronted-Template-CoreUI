import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionOportunidadId, getTablaDescripcionOportunidadId } from './controller/AdminOportunidadController'

const AdministracionMatrizOEditar = ( { match } ) => {

  const history = useHistory()
  const formValueInitial = {
      campoA: '',
      nombre: '',
      campoB: '',
      campoC: '',
      campoD: '',
      tablaId: null,
      nivel2Id: null,
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)

  const [spin, setSpin] = useState(false)

  const handleOnSubmit = (dataToRequest) => {
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    putTablaDescripcionOportunidadId(idTabDesc,dataToRequest)
    .then(res => {
      //console.log('response : ', res);
      history.push("/administracion/matriz-oportunidad/listar")
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

  const macthed = (dataResponse) =>{
      var nivel1 = {value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla, nivel2: dataResponse.tablaId.nivel2}
      var nivel2 = {}

      if(dataResponse.nivel2Id !== null){
        nivel2 = {value: dataResponse.nivel2Id.id, label: dataResponse.nivel2Id.nombre}
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
    console.log('MATCHEDEDED: ', valores)
    setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true)
    const idParametro = match.params.id;
    await getTablaDescripcionOportunidadId(idParametro)
      .then((response) => {
          //console.log("API xxxxx: ", response);
          const res = response.data;
        macthed(res)
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
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Matriz de oportunidad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
              ? <div></div>
              : <Formulario
              initialValuess={formValueToEdit}
              optionToSelect={{}}
              handleOnSubmit={handleOnSubmit}
            />
            }
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionMatrizOEditar
