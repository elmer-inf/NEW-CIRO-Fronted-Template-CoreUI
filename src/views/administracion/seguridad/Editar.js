import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import Formulario from './component/Formulario'
import { putTablaDescripcionSeguridad, getTablaDescripcionSeguridadId } from './controller/AdminSeguridadController'

const AdministracionSeguridadEditar = ( { match } ) => {

  const history = useHistory()
  const formValueInitial = {
    nombre: '',
    tablaId: null
  }

  const [formValueToEdit, setformValueToEdit] = useState(formValueInitial)
  const [spin, setSpin] = useState(false)

  const handleOnSubmit = (dataToRequest) => {
    console.log('data que se edita: ', dataToRequest)
    const idTabDesc = match.params.id;
    putTablaDescripcionSeguridad(idTabDesc, dataToRequest)
    .then(res => {
      console.log('response : ', res);
      history.push("/administracion/seguridad/listar")
    }).catch((error) => {
        console.log('Error al obtener datos: ', error);
    });
  }

  const matched = (dataResponse) =>{
      var nivel1 = {value: dataResponse.tablaId.id, label: dataResponse.tablaId.nombreTabla }
    const valores = {
      nombre: dataResponse.nombre,
      tablaId: nivel1,
    }
    console.log('MATCHED: ', valores)
      setformValueToEdit(valores)
  }

  const getById = async () => {
    setSpin(true)
    const idParametro = match.params.id;
    await getTablaDescripcionSeguridadId(idParametro)
      .then((response) => {
          const res = response.data;
          matched(res)
        setSpin(false)
      }).catch((error) => {
        console.log("Error: ", error);
    });
  }

  useEffect(() => {
    getById();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div id=''>
      <Fragment>
        <Card>
          <CardHeader>
            <CardTitle className='float-left h4 pt-2'>Editar Parámetro de Seguridad</CardTitle>
          </CardHeader>
          <CardBody className='mt-4'>
            {
              spin === true
              ? <div></div>
              : <Formulario
                  initialValuess={formValueToEdit}
                  handleOnSubmit={handleOnSubmit}
                />
            }
          </CardBody>
        </Card>
      </Fragment>
    </div>
  )
}
export default AdministracionSeguridadEditar
