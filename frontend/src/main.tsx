import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; // ✅ Removed `.ts` from import

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ContextProvider from './context/ContextProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* <ContextProvider> */}
      <ToastContainer />
      <RouterProvider router={router} /> 
      {/* </ContextProvider> */}
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
