import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const THEME_COLOR = "colored";
const POSITION = "bottom-right";

export const sendNotification = (type: string, msg: string) => {
  if (type === "success") {
    return toast.success(`${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: false,
      className: "text-sm",
    });
  } else if (type === "warning") {
    return toast.warning(`${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: false,
      className: "text-sm",
    });
  } else {
    return toast.error(`${msg}`, {
      position: POSITION,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: THEME_COLOR,
      icon: false,
      className: "text-sm",
    });
  }
};

export const ToastContainerNotification = () => {
  return (
    <ToastContainer
      position={POSITION}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={THEME_COLOR}
    />
  );
};
