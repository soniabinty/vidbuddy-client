import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
 
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from './Router/Router';
import AuthProvider from './Provider/AuthProvider';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
<StrictMode>
<RouterProvider router={router} />
</StrictMode>,

 </QueryClientProvider>,
  </AuthProvider>
  
)
