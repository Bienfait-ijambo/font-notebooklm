import React from "react";
import { Link, Outlet } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


export default function ChatLayout() {
  return (
    <div className="bg-gradient-to-br p-3 from-blue-50 to-indigo-100">
      {/* <main className="flex-1 h-full p-3 bg-gradient-to-br from-blue-50 to-indigo-100"> */}
        <Outlet />
        <ToastContainer />
    {/* //   </main> */}

    </div>
  );
}