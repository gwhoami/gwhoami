import React from "react";
import { Slide, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ToastComponent = ({ message, icon }) => (
  <div className="flex flex-row items-center">
    <div className="shadow-2xl px-2 py-1">
      <FontAwesomeIcon icon={icon} size="2x" />
    </div>
    {message}
  </div>
);

 export const ToastPosition =  {
   TOP_CENTER: 'top-center',
   TOP_RIGHT: 'top-right',
   BOTTOM_RIGHT: 'bottom-right',
   BOTTOM_CENTER: 'bottom-center'
 }

const ToastMessage = ({ type, message, timeout, position }) => {
  let toastCallback = null;
  if (type === "error")
    toastCallback = () =>
      toast.error(
        <ToastComponent message={message} icon={faExclamationTriangle} />,
        {
          position: position || "top-right",
          autoClose: timeout || 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        }
      );
  else if (type === "success")
    toastCallback = () =>
      toast.success(
        <ToastComponent message={message} icon={faCheckCircle} />,
        {
          position: position || "top-right",
          autoClose: timeout || 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        }
      );
  else
    toastCallback = () =>
      toast.warning(
        <ToastComponent message={message} icon={faExclamationTriangle} />,
        {
          position: position || "top-right",
          autoClose: timeout || 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        }
      );
  return toastCallback();
};

export default ToastMessage;