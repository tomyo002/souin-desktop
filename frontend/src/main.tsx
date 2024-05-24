import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style.css';
import App from './App';
import { InstancesProvider } from './context';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StorageProvider>
          <InstancesProvider>
            <App />
          </InstancesProvider>
      </StorageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
