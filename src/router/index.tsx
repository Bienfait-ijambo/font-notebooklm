


import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/404/NotFoundPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([


   {
      path: '/',
      element: <HomePage />
      // children:[
      //    {
      //        path:'login',
      //         Component:lazy(() => import("@/pages/auth/LoginPage")),
      //    },
      //    {
      //        path:'callback',
      //         Component:lazy(() => import("@/pages/auth/AuthCallbackPage")),
      //    }
      // ]
   },
   {
      path: '/auth',
      Component: lazy(() => import("@/layouts/AuthLayout")),
      children: [
         {
            path: 'login',
            Component: lazy(() => import("@/pages/auth/LoginPage")),
         },
         {
            path: 'callback',
            Component: lazy(() => import("@/pages/auth/AuthCallbackPage")),
         }
      ]
   },
   {
      path: '/chats/:id',
      Component: lazy(() => import("@/layouts/ChatLayout")),
      children: [
         {
            index: true,
            Component: lazy(() => import("@/pages/chat/ChatPage")),
         }
      ]
   },
   {
      path: '/notes',
      Component: lazy(() => import("@/layouts/NoteLayout")),
      children: [
         {
            index: true,
            Component: lazy(() => import("@/pages/note/NotePage")),
         }
      ]
   },
   {
      path: "*",
      element: <NotFoundPage />,
   },
]);
