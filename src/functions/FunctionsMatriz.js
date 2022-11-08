var _ = require('lodash');

// Calcula Riesgo Inherente mediante Probabilidad e Impacto
export const calculaRiesgo = (prob, imp) => {
  var riesgo = 0;
  if (prob === 1 && (imp === 1 || imp === 2))
    riesgo = 1
  if (prob === 2 && imp === 1)
    riesgo = 1

  if (prob === 1 && imp === 3)
    riesgo = 2
  if (prob === 2 && imp === 2)
    riesgo = 2
  if (prob === 3 && (imp === 1 || imp === 2))
    riesgo = 2
  if (prob === 4 && imp === 1)
    riesgo = 2

  if (prob === 1 && (imp === 4 || imp === 5))
    riesgo = 3
  if (prob === 2 && (imp === 3 || imp === 4))
    riesgo = 3
  if (prob === 3 && imp === 3)
    riesgo = 3
  if (prob === 4 && (imp === 2 || imp === 3))
    riesgo = 3
  if (prob === 5 && (imp === 1 || imp === 2))
    riesgo = 3

  if (prob === 2 && imp === 5)
    riesgo = 4
  if (prob === 3 && (imp === 4 || imp === 5))
    riesgo = 4
  if (prob === 4 && imp === 4)
    riesgo = 4
  if (prob === 5 && imp === 3)
    riesgo = 4

  if (prob === 4 && imp === 5)
    riesgo = 5
  if (prob === 5 && (imp === 4 || imp === 5))
    riesgo = 5

  return riesgo;
}

// Cuenta nro de estados de Planes de accion (En progreso, No iniciado y Concluido)
export const countEstadoPlanes = (array, data) => {
  var result = array.filter(o => o.estado === data).length;
  return result;
}

// Calcula Porcentaje de Avance de los planes de accion
export const resultAvance = (array) => {
  var result = 0;
  if (array.length !== 0)
    result = Math.round((countEstadoPlanes(array, 'Concluido') / array.length) * 100);
  return result;
}

// Reduce el  RIESGO RESIDUAL en  "Probabilidad" o "Impacto" dependiendo de la "Ponderacion del Control"
export const reduceProbabilidadImpacto = (data, ponderacion) => {
  var valorPorcentaje = (data * ponderacion) / 100;
  var reduccion = data - valorPorcentaje;
  if (Math.round(reduccion) === 0)
    return 1;
  else
    return Math.round(reduccion);
}

// Encuentra valor literal de Probablidad e impacto
export const buscaValorLiteral = (arrayData, prob_Imp) => {
  var valorLiteral = null;
  try {
    if (Array.isArray(arrayData) && prob_Imp !== null && prob_Imp !== undefined) {
      valorLiteral = (_.find(arrayData, ['campoA', prob_Imp + '']) !== undefined) ? _.find(arrayData, ['campoA', prob_Imp + '']).nombre : null
    }
  } catch (error) {
    console.error('Error al obtener valor literal de Probabilidad/Impacto: ', error);
  }
  return valorLiteral;
}

// Encuentra valor literal de Riesgo
export const buscaValorLiteralRiesgoI = (arrayData, riesgo) => {
  var riesgoVal = 'Sin registro';
  try {
    if (Array.isArray(arrayData) && riesgo !== null && riesgo !== undefined && riesgo !== 0) {
      riesgoVal = (_.find(arrayData, ['campoA', riesgo + '']) !== undefined) ? _.find(arrayData, ['campoA', riesgo + '']).campoB : null;
    }
  } catch (error) {
    console.error('Error al obtener valor literal del Riesgo: ', error);
  }
  return riesgoVal;
}

// Obtiene ID de IMPACTO para el intervalo a cual pertenece "Monto Riesgo de Pérdida (Anual)""
export const intervaloImpacto = (arrayData, perdida) => {
  var montoPerdida = null;
  try {
    if (Array.isArray(arrayData) && perdida !== null && perdida !== undefined) {
      for (let value in arrayData) {
        if (perdida >= arrayData[value].campoE && perdida <= arrayData[value].campoF) {
          montoPerdida = arrayData[value].id;
        }
        if (perdida > _.maxBy(arrayData, 'campoF').campoF) {
          montoPerdida = _.maxBy(arrayData, 'campoF').id;
        }
      }
    }
  } catch (error) {
    console.error('Error al obtener Valoracion del Riesgo en el Intervalo: ', error);
  }
  return montoPerdida;
}

// Obtiene la Valoracion del Riesgo en el intervalo de IMPACTO
export const obtieneValorRiesgoIntervalo = (arrayData, perdida) => {
  var valorRiesgo = null;
  var idIntervalo = intervaloImpacto(arrayData, perdida);
  valorRiesgo = (_.find(arrayData, ['id', idIntervalo]) !== undefined) ? _.find(arrayData, ['id', idIntervalo]).campoA : null;
  return valorRiesgo !== null ? valorRiesgo : 0;
}

// Obtiene el Riesgo en el intervalo de IMPACTO
export const obtieneRiesgoIntervalo = (arrayData, perdida) => {
  var riesgo = null;
  var idIntervalo = intervaloImpacto(arrayData, perdida);
  riesgo = (_.find(arrayData, ['id', idIntervalo]) !== undefined) ? _.find(arrayData, ['id', idIntervalo]).nombre : null;
  return riesgo !== null ? riesgo : 'No definido';
}


