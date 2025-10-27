


import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import NotFoundPage from "@/pages/404/NotFoundPage";
import HomePage from "@/pages/HomePage";
import Workflow from "@/pages/zapier/workflow";
import Workflow2 from "@/pages/zapier/workflow2";
import TestingPage from '@/pages/zapier/TestingPage'
import TestingPage2 from '@/pages/zapier/TestingPage2'
import TestingPage3 from "@/pages/zapier/TestingPage3";
import DemoPage from "@/pages/auth/DemoPage";
import DemoPage2 from "@/pages/auth/DemoPage2";
import WorkflowPage from "@/pages/workflow/WorkflowPage";


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
      path: '/workflow',
      element: <Workflow />
    
   },
   {
      path: '/demo-theme',
      element: <DemoPage />
    
   },
   {
      path: '/demo-theme2',
      element: <DemoPage2 />
    
   },
   
    {
      path: '/workflow2',
      element: <Workflow2 />
    
   },
   
    {
      path: '/testing',
      element: <TestingPage />
    
   },
    {
      path: '/testing2',
      element: <TestingPage2 />
    
   },
    {
      path: '/testing3',
      element: <TestingPage3 />
    
   },

   {
      path: '/w',
      element: <WorkflowPage />
    
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
