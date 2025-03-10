import Signup from '@/components/Signup';
import React from 'react'
import { ToastContainer } from "react-toastify";

export const Signuppage = () => {
  return (
    <div>
        <Signup/>
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
      />
    
    </div>
  )
}

export default Signuppage
