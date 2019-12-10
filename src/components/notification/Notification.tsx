import React from "react";
import { ToastContainer } from "react-toastify";

function Notification() {
  return <ToastContainer hideProgressBar={false} autoClose={3000} />;
}

export default Notification;
