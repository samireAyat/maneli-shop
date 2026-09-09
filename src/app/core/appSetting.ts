import Swal from 'sweetalert2';

export class AppSetting {
    public swalStructure = Swal.mixin({

        confirmButtonText: "تایید",
        cancelButtonText: "انصراف",

        buttonsStyling: false,

        focusConfirm: false,

        customClass: {

            popup: "custom-swal-popup",

            title: "custom-swal-title",

            htmlContainer: "custom-swal-text",

            confirmButton: "btn primary swal-confirm",

            cancelButton: "btn secondary swal-cancel",

            icon: "custom-swal-icon"

        },

        showClass: {
            popup: `
      animate__animated
      animate__fadeInDown
    `
        },

        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutUp
    `
        }

    });
    public swalToastStructure = Swal.mixin({

        toast: true,

        timer: 3000,

        position: 'bottom-right',

        showConfirmButton: false,

        timerProgressBar: true,

        width: 380,

        padding: '16px',

        background: 'var(--primary)',

        color: '#fff',

        customClass: {
            popup: 'custom-toast-popup',
            title: 'custom-toast-title',
            htmlContainer: 'custom-toast-text'
        },

        showClass: {
            popup: 'animate__animated animate__fadeInRight'
        },

        hideClass: {
            popup: 'animate__animated animate__fadeOutRight'
        }

    });
}