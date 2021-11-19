import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { editTablaDescripcion, getTablaDescripcionId } from './controller/AdminEventoController'

const AdministracionEventoEditar = ( { match } ) => {

  const history = useHistory()
  const formValueInitial = {
      tablaLista: null,
      nombre: '',
      clave: '',
      descripcion: '',
      nivel2_id: null,
      nivel3_id: null
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)

  const [spin, setSpin] = useState(false)

  const handleOnSubmit = (dataToRequest) => {
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    editTablaDescripcion(idTabDesc,dataToRequest)
    .then(res => {
      console.log('response : ', res);
      history.push("/administracion/evento-riesgo/listar")
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }



  const macthed = (dataResponse) =>{
      var nivel1 = {value: dataResponse.tablaLista.id, label: dataResponse.tablaLista.nombre_tabla, nivel2: dataResponse.tablaLista.nivel2, nivel3: dataResponse.tablaLista.nivel3 }
      var nivel2 = {}
      var nivel3 = {}

      if(dataResponse.nivel2_id !== null){
        nivel2 = {value: dataResponse.nivel2_id.id, label: dataResponse.nivel2_id.nombre}
      }
      if(dataResponse.nivel3_id !== null){
        nivel3 = {value: dataResponse.nivel3_id.id, label: dataResponse.nivel3_id.nombre}
      }

    const valores = {
      nombre: dataResponse.nombre,
      clave: dataResponse.clave,
      descripcion: dataResponse.descripcion,
      tablaLista: nivel1,
      nivel2_id: (dataResponse.nivel2_id !== null) ? nivel2 : null,
      nivel3_id: (dataResponse.nivel3_id !== null) ? nivel3 : null
    }
    console.log('MATCHEDEDED: ', valores)

      setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true)

    const idParametro = match.params.id;
    await getTablaDescripcionId(idParametro)
      .then((response) => {
          console.log("API xxxxx: ", response);
          const res = response.data;
          macthed(res)
        setSpin(false)

      }).catch((error) => {
        console.log("Error: ", error);
    });
  }

  useEffect(() => {
    console.log("call")
    getById();
  }, []);


  return (
    <div id=''>
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
export default AdministracionEventoEditar
