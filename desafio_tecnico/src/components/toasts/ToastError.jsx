import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastError = ({ message }) => {
  return toast.error(message, {
    toastId: "toastError",
    autoClose: 3000,
    position: "top-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ToastError;