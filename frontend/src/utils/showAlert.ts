// utils/alert.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showSuccess = (title: string, text?: string) =>
  MySwal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#d32f2f",
  });

export const showError = (title: string, text?: string) =>
  MySwal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#d32f2f",
  });

export const showInfo = (title: string, text?: string) =>
  MySwal.fire({
    icon: "info",
    title,
    text,
    confirmButtonColor: "#d32f2f",
  });

export const showLoading = (title = "Cargando...") =>
  MySwal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

export const closeAlert = () => Swal.close();
