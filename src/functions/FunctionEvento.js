var _ = require('lodash');

// Transforma bytes a kb, mg, gb
export const formatSizeUnits = (bytes) => {
  var result = 0;
  if (bytes >= 1073741824) {
    result = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    result = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    result = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    result = bytes + " bytes";
  } else if (bytes === 1) {
    result = bytes + " byte";
  } else {
    result = "0 bytes";
  }
  return result;
}

// Transforma bytes a kb, mg, gb
export const formatDate = (date) => {
  var result = '';
  var dateString = date.toString().split('T')[0];
  var anio = dateString.split('-')[0];
  var mes = dateString.split('-')[1];
  var dia = dateString.split('-')[2];
  result = dia + '-' + mes + '-' + anio;
  return result;
}

// Convierte Bs - Dolares
export const covierteMoneda = (moneda, monto, tc) => {
  var mountCoverted = 0;
  try {
    if (moneda !== null && moneda !== '') {
      if (moneda === 'BOB' || moneda === 'Bs') {
        mountCoverted = monto;
      } else {
        if (moneda === 'USD' || moneda === '$') {
          mountCoverted = monto * tc;
        }
      }
    }
  } catch (error) {
    console.error('Error en coversion ', error);
  }
  return mountCoverted;
}

// Formatea input time con segundos
export const formatTime = (hora) => {
  var time = null;
  try {
    if (_.size(hora) === 5) {
      time = hora + ':00';
    } else if (_.size(hora) === 8) {
      time = hora;
    }
  } catch (error) {
    console.error('Error en Funcion formatTime: ', error);
  }
  return time;
}

