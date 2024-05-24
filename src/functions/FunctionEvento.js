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


export function base64toPDF(data, filename, mimeType) {
  var bufferArray = base64ToArrayBuffer(data);
  var blobStore = new Blob([bufferArray], { type: mimeType });

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blobStore, filename);
    return;
  }

  var url = window.URL.createObjectURL(blobStore);
  var link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}

export function base64ToArrayBuffer(data) {
  var bString = window.atob(data);
  var bLength = bString.length;
  var bytes = new Uint8Array(bLength);
  for (var i = 0; i < bLength; i++) {
    var ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
};

export const getFileIcon = (mimeType) => {
  switch (mimeType) {
    case 'application/pdf':
      return '/icon/pdf.png';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return '/icon/excel.png';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return '/icon/word.png';
    case 'application/vnd.ms-outlook':
      return '/icon/outlook.png';
    case 'application/zip':
    case 'application/x-zip-compressed':
      return '/icon/zip.png';
    default:
      return '/icon/default.png';
  }
};

// Para seleccionar elemtos de una lista a otra
export const FilterText = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <input
        autoFocus={props.autoFocus}
        id={props.name}
        type='text'
        style={{ width: '100%' }}
        placeholder={props.placeholder}
        className="filter text-filter form-control form-control-sm"
        name={props.name}
        autoComplete="off"
        onChange={props.onFilter}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
};