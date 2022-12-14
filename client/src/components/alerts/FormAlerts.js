import Swal from "sweetalert2";

function FormAlert(title, confirmButtonText, denyButtonText) {
  return Swal.fire({
    title: title,
    showDenyButton: true,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
  });
}

export default FormAlert;
