import Swal from 'sweetalert2';
import './css/custom.css';

export function alertSuccess(successMessage, navigate, navigationComponent){
    Swal.fire({
        icon: 'success',
        title: `${successMessage}`,
        customClass: {
          popup: 'custom-toast-popup',
          icon: 'custom-toast-icon',
          title: 'custom-toast-title',
          confirmButton: 'custom-confirm-button',
        },

      }).then(() => {
        if(navigationComponent != 0){
          navigate(`${navigationComponent}`);
        }
        else{
          window.location.reload();
        }
      });
}
export function alertFinalSuccess(successMessage) {
  Swal.fire({
    icon: 'success',
    title: `${successMessage}`,
    customClass: {
      popup: 'custom-toast-popup',
      icon: 'custom-toast-icon',
      title: 'custom-toast-title',
      confirmButton: 'custom-confirm-button',
    },
  });
}


export function alertWarning(errorMessage){
    Swal.fire({
        icon: 'warning',
        title: `${errorMessage}`,
        customClass: {
          popup: 'custom-toast-popup-2',
          icon: 'custom-toast-icon',
          title: 'custom-toast-title',
          confirmButton: 'custom-confirm-button',
        },
      });
}

export function alertWarningBig(errorMessage){
  Swal.fire({
      icon: 'warning',
      title: `${errorMessage}`,
      customClass: {
        popup: 'custom-toast-popup-3',
        icon: 'custom-toast-icon',
        title: 'custom-toast-title',
        confirmButton: 'custom-confirm-button',
      },
    });
}

export function alertSuccessLogin(successMessage, navigate, navigationComponent) {
  Swal.fire({
    icon: 'success',
    title: `${successMessage}`,
    customClass: {
      popup: 'custom-toast-popup',
      icon: 'custom-toast-icon',
      title: 'custom-toast-title',
      confirmButton: 'custom-confirm-button',
    },
    showConfirmButton: false, // Hide the confirm button
    timer: 1500, // Optional: Duration of the toast in milliseconds
    timerProgressBar: true, // Optional: Show progress bar
    didClose: () => {
      // Automatically navigate or reload when the toast closes
      if (navigationComponent !== 0) {
        navigate(navigationComponent); // Ensure navigate is called correctly
      } else {
        window.location.reload();
      }
    }
  });
}


