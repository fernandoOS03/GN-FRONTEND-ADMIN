import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx';


//import './index.css'
//import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  </React.StrictMode>
);