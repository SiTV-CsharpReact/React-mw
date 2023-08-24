import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
    type: string;
    message:string;
}

const AlertMessage: React.FC<Props> = ({type,message}) => {
    toast.error(
        message,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            marginTop: "50px" // Thay đổi giá trị này để thay đổi khoảng cách padding top theo mong muốn của bạn.
          }
        }
      );
  return (
   <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />;
   </>
  )
}

export default AlertMessage