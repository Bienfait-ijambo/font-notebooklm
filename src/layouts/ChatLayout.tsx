 import React from "react";
import { Link, Outlet } from "react-router";

export default function ChatLayout() {
  return (
    <div>
         <main className="flex-1 p-3 bg-gradient-to-br from-blue-50 to-indigo-100">
            <Outlet/>


            </main>
        
    </div>
  );
}