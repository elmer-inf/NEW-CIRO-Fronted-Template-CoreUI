import React from 'react'

const UpdateEventoRiesgo = () => {

  const getById = async (idEventoRiesgo) => {
    setSpin(true)

    await getEventoRiesgoId(idEventoRiesgo)
      .then((response) => {
        const res = response.data;
        console.log('For update Evento Riesgo: ',  res);
        //macthed(res)
        setSpin(false)

      }).catch((error) => {
        console.log("Error: ", error);
      });
  }

  //Life Cycle
  useEffect(() => {
   // const idEventoRiesgo = ;

    getById(match.params.id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



    return (
        <div>
            
        </div>
    )
}

export default UpdateEventoRiesgo
