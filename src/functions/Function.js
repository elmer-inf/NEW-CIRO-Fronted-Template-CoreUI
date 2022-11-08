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
    console.log('Error: ', error)
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
  //console.log('dataselect:: ', data)
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
    console.log('Error: ', error)
  }
  //console.log(mantainAllData, ' NEW OBJECT SELECT:: ', select)
  return select;
}

export const buildOptionSelect = (data, fieldValue, fieldLabel, mantainAllData, nameData) => {
  var optionSelect = null;
  try {
    if (mantainAllData === true) {
      optionSelect = { value: data[fieldValue], label: data[fieldLabel], ...data }
    } else {
      optionSelect = { value: data[fieldValue], label: data[fieldLabel] }
    }

  } catch (error) {
    console.log('Error in ' + nameData + ' - buildOptionSelect : ', error)

  }
  return optionSelect;
}

export const buildOptionSelectThree = (data, fieldValue, fieldLabel, fieldLabel2, mantainAllData, nameData) => {
  var optionSelect = null;
  try {
    if (mantainAllData === true) {
      optionSelect = { value: data[fieldValue], label: data[fieldLabel] + ' - ' + data[fieldLabel2], ...data }
    } else {
      optionSelect = { value: data[fieldValue], label: data[fieldLabel] + ' - ' + data[fieldLabel2] }
    }

  } catch (error) {
    console.log('Error in ' + nameData + ' - buildOptionSelect : ', error)

  }
  return optionSelect;
}

export const buildSelectTwo = (data, fieldValue, fieldLabel, mantainAllData) => {
  //console.log('dataselect:: ', data)
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
    console.log('Error: ', error)
  }
  //console.log(mantainAllData, ' NEW OBJECT SELECT:: ', select)
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
  //const data = data;
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
  //console.log("Nuevo:::::: ", newList)
}
export const hasPermission = (path, pathRoutes) => {
  const permission = _.find(pathRoutes, function (o) {
    return o.path === path;
  });
  if (!_.isEmpty(permission)) {
    console.log('Tiene permiso')

    return true;
  }
  console.log('NO Tiene permiso')
  return false;
}

export const exportFile = (dataRespose, nameFileWithExtention) => {
  const blob = new Blob([dataRespose], { type: 'text/plain;charset=utf-8' });
  const FileSaver = require('file-saver');
  //var date = new Date().toLocaleDateString();
  FileSaver.saveAs(blob, nameFileWithExtention);
}