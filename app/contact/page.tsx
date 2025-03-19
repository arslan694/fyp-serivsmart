import ContactUs from '@/components/contactus';
import React from 'react'
import { ToastContainer } from "react-toastify";

export const Loginpage = () => {
  return (
    <div>
        <ContactUs />
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
