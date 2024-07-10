import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { UIContextProvider } from './context/UIContext.jsx';
import { DocumentContextProvider } from './context/DocumentContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <UIContextProvider>
      <DocumentContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </DocumentContextProvider>
    </UIContextProvider>
  </AuthContextProvider>
);
