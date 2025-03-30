import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
 
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from './Router/Router';
import AuthProvider from './Provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
  </AuthProvider>
  
)
