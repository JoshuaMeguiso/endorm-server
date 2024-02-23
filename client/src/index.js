import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TenantsContextProvider } from './context/TenantsContext';
import { AuthContextProvider } from './context/AuthContext';
import { TransactionsContextProvider } from './context/TransactionsContext';
import { HistoryContextProvider } from './context/HistoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TenantsContextProvider>
        <TransactionsContextProvider>
          <HistoryContextProvider>
            <App />
          </HistoryContextProvider>
        </TransactionsContextProvider>
      </TenantsContextProvider>
    </AuthContextProvider>  
  </React.StrictMode>
);
