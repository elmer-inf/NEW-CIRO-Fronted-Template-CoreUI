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
    } else if (bytes == 1) {
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