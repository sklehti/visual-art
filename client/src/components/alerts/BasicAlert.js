import Swal from "sweetalert2";

function BasicAlert(icon, text) {
  return Swal.fire({
    icon: icon,
    text: text,
  });
}

export default BasicAlert;
