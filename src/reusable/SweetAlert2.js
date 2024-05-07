import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


export const toastSweetAlert = (type, message, time) => {
  return Toast.fire({
    icon: type,
    title: message,
    timer: time
  })
}

export const toastSweetAlertRedirect = (type, message, time, url) => {
  return Toast.fire({
    icon: type,
    title: message,
    timer: time
  }).then(function () {
    window.location.href = url;
  });
}

// Personalizacion
export const swalCustom = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary px-4 mr-4',
    cancelButton: 'btn btn-outline-primary px-4',
  },
  buttonsStyling: false
})