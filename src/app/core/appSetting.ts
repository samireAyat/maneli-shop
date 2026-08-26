import Swal from 'sweetalert2';

export class AppSetting {
    public swalStructure = Swal.mixin({
        confirmButtonText: "تایید",
        buttonsStyling: false,
        focusConfirm: false,
        customClass: {
            confirmButton: "btn btn-outline-primary",
        },
    })
    public swalToastStructure = Swal.mixin({
        toast: true,
        timer: 3000,
        position: 'bottom-right',
        showConfirmButton: false,
        width: 400,
        padding: '0.25rem',
        background: '#ffccd1',
    });
}