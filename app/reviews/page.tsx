import Login from '@/components/Login';
import Reviews from '@/components/Reviews';
import React from 'react'
import { ToastContainer } from "react-toastify";

export const Loginpage = () => {
  return (
    <div>
        <Reviews />
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

export default Loginpage
