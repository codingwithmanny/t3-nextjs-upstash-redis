// Imports
// ========================================================
import React from 'react'
import ReactDOM from 'react-dom/client'
import RootProvider from './providers';
import './index.css'

// Render
// ========================================================
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootProvider />
  </React.StrictMode>,
);
