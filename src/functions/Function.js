/**
 * This function build a form for component CSelectReact
 * @param  {Object Json} result
 * @param  {String} fieldName
 */

import 'react-toastify/dist/ReactToastify.css';
var _ = require('lodash');


export const buildSelect = (result, fieldName) => {
  const select = [];
  try {
    if (Array.isArray(result)) {
      result.forEach((item) => {
        const c = { value: item.id, label: item[fieldName] }
        select.push(c);
      });
    }
  } catch (error) {
    console.error('Error: ', error)
  }
  return select;
};

/**
 * @param  {array} data
 * @param  {string} fieldValue
 * @param  {string} fieldLabel
 * @param  {boolen} mantainAllData if it is true = {[fieldValue]:'', [fieldLabel]:'', ...data} | if it is false = {[fieldValue]:'', [fieldLabel]:''}
 *
 */
export const buildSelectThree = (data, fieldValue, fieldLabel, fieldLabel2, mantainAllData) => {

  const select = [];
  try {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (mantainAllData === true) {
          const c = _.omit({ ...item, value: item[fieldValue], label: item[fieldLabel] + ' - ' + item[fieldLabel2] }, ['deleted', 'update'])
          select.push(c);
        } else if (mantainAllData === false) {
          const c = { value: item[fieldValue], label: item[fieldLabel] + ' - ' + item[fieldLabel2] }
          select.push(c);
        }
      });
    }
  } catch (error) {
    console.error('Error: ', error)
  }
  return select;
}

export const buildOptionSelect = (data, fieldValue, fieldLabel, mantainAllData, nameData) => {
  // null/undefined safe
  if (data == null) return null;

  // si por algún motivo no es objeto (p.ej. 0 o string), también evitar romper
  if (typeof data !== 'object') return null;

  const value = data[fieldValue];
  const label = data[fieldLabel];

  // si no hay value/label, retornar null
  if (value == null || label == null) return null;

  return mantainAllData
    ? { value, label, ...data }
    : { value, label };
};


export const buildOptionSelectThree = (
  data,
  fieldValue,
  fieldLabel,
  fieldLabel2,
  mantainAllData,
  nameData
) => {
  // null/undefined safe
  if (data == null) return null;
  if (typeof data !== "object") return null;

  const value = data[fieldValue];
  const l1 = data[fieldLabel];
  const l2 = data[fieldLabel2];

  // si no hay value, no tiene sentido armar option
  if (value == null) return null;

  // label tolerante: evita "null - null" o "undefined - undefined"
  const labelParts = [l1, l2].filter(v => v != null && String(v).trim() !== "");
  const label = labelParts.join(" - ");

  // si no hay label usable, puedes devolver null o fallback
  if (!label) return null; // o: const label = String(value);

  return mantainAllData
    ? { value, label, ...data }
    : { value, label };
};

export const buildSelectTwo = (data, fieldValue, fieldLabel, mantainAllData) => {

  const select = [];
  try {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (mantainAllData === true) {
          const c = _.omit({ ...item, value: item[fieldValue], label: item[fieldLabel] }, ['deleted', 'update'])
          select.push(c);
        } else if (mantainAllData === false) {
          const c = { value: item[fieldValue], label: item[fieldLabel] }
          select.push(c);
        }
      });
    }
  } catch (error) {
    console.error('Error: ', error)
  }
  return select;
}

export const copyValueItem = (data) => {
  var textField = document.createElement('textarea')
  textField.innerText = data
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

export const getParams = (obj) => {
  var esc = encodeURIComponent;
  var queryParams = Object.keys(obj).map(
    k => esc(k) + '=' + esc(obj[k])
  ).join('&');
  return queryParams;
}

export const calculateLayout = (countInput) => {
  /* permite dar posicion a los input habilitados
  de acuerdo a la cantidad de inputs habilitados*/
  let lay = {}
  if (countInput === 1) {
    lay['size'] = 6;
    lay['offset'] = 3;
  }
  else if (countInput === 2) {
    lay['size'] = 6;
    lay['offset'] = 0;
  } else {
    lay['size'] = 4;
    lay['offset'] = 0;
  }
  return lay;
}

export const deleteRowOfTable = (rowToDelete, data, field) => {
  var newList = [];
  try {
    if (Array.isArray(data)) {
      console.log('================= ini ================== ')
      console.log('data ANTES: ', data)
      //const newList = [];
      newList = _.filter(data, function (o) {
        console.log('* O: ', o, ' rowToDelete: ', rowToDelete)
        return o[field] !== rowToDelete[field];
      });
      console.log('newList DESPUES: ', newList)
      console.log('================== fin ================= ')
    }
  } catch (error) {
    console.log('Error eliminano un registro: ', error)
  }
  return newList
}
export const hasPermission = (path, pathRoutes) => {
  const permission = _.find(pathRoutes, function (o) {
    return o.path === path;
  });
  if (!_.isEmpty(permission)) {
    //console.log('Tiene permiso')
    return true;
  }
  //console.log('NO Tiene permiso')
  return false;
}


export const exportFile = (dataRespose, nameFileWithExtention) => {
  try {
    // Conversión manual a bytes ANSI
    const bytes = [];
    for (let i = 0; i < dataRespose.length; i++) {
      const code = dataRespose.charCodeAt(i);
      // Si el carácter está dentro del rango ISO-8859-1 (0–255)
      bytes.push(code <= 255 ? code : 63); // 63 = '?'
    }
    // Crear un Uint8Array con esos bytes
    const ansiBytes = new Uint8Array(bytes);
    // Crear Blob con datos reales en ISO-8859-1
    const blob = new Blob([ansiBytes], { type: 'text/plain' });
    // Descargar archivo
    const FileSaver = require('file-saver');
    FileSaver.saveAs(blob, nameFileWithExtention);

  } catch (error) {
    console.error('Error al exportar archivo ANSI:', error);
  }
};


/* export const exportFile = (dataRespose, nameFileWithExtention) => {
  try {
    console.log('genera en ansi');
    // Codifica en UTF-8
    const utf8Encoder = new TextEncoder();
    const utf8Bytes = utf8Encoder.encode(dataRespose);
    // Crea un blob ANSI (reinterpretación byte a byte)
    const blob = new Blob([utf8Bytes], { type: 'text/plain;charset=ISO-8859-1' });
    const FileSaver = require('file-saver');
    FileSaver.saveAs(blob, nameFileWithExtention);
  } catch (error) {
    console.error('Error al exportar archivo ANSI:', error);
  }
  //PARA UTF-8
  //const blob = new Blob([dataRespose], { type: 'text/plain;charset=utf-8' });
  //const FileSaver = require('file-saver');
  //FileSaver.saveAs(blob, nameFileWithExtention);
} */