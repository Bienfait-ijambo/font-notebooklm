import { logoutUser } from "@/api/auth";
import UserAvatar from "@/components/base/UserAvatar";
import { getUserData } from "@/helper/getUserData";
import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router";

export default function NoteLayout() {
 

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
        {/* Left: Logo + Title */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-lg text-gray-800">
            NotebookLM
          </span>
        </Link>

        {/* Right: Avatar & Menu */}
        <UserAvatar />
      </header>

      {/* Page Content */}
      <main className="flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
}
