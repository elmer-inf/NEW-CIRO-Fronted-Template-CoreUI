// Calcula Riesgo Inherente mediante Probabilidad e Impacto
export const calculaRiesgo = (prob, imp) =>{
    var riesgo = 0;
    if(prob === 1 && (imp === 1 || imp === 2))
      riesgo = 1
    if(prob === 2 && imp === 1)
      riesgo = 1

    if(prob === 1 && imp === 3)
      riesgo = 2
    if(prob === 2 && imp === 2)
      riesgo = 2
    if(prob === 3 && (imp === 1 || imp === 2))
      riesgo = 2
    if(prob === 4 && imp === 1)
      riesgo = 2

    if(prob === 1 && (imp === 4 || imp === 5))
      riesgo = 3
    if(prob === 2 && (imp === 3 || imp === 4))
      riesgo = 3
    if(prob === 3 && imp === 3)
      riesgo = 3
    if(prob === 4 && (imp === 2 || imp === 3))
      riesgo = 3
    if(prob === 5 && (imp === 1 || imp === 2))
      riesgo = 3

    if(prob === 2 && imp === 5)
      riesgo = 4
    if(prob === 3 && (imp === 4 || imp === 5))
      riesgo = 4
    if(prob === 4 && imp === 4)
      riesgo = 4
    if(prob === 5 && imp === 3)
      riesgo = 4

    if(prob === 4 && imp === 5)
      riesgo = 5
    if(prob === 5 && (imp === 4 || imp === 5))
      riesgo = 5

    return riesgo;
  }

  // Cuenta nro de estados de Planes de accion (En progreso, No iniciado y Concluido)
  export const countEstadoPlanes = ( array, data) => {
    var result = array.filter(o => o.estado === data).length;
    return result;
  }

  // Calcula Porcentaje de Avance de los planes de accion
  export const resultAvance = (array) => {
    var result =  Math.round((countEstadoPlanes(array, 'Concluido')/array.length)*100);
    return result;
  }