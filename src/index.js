import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ShoppingListStore } from './store-shopping-list.js'
import { ClientStore } from './store-client.js';

const root = ReactDOM.createRoot(document.getElementById('ecatalogue'));
root.render(
  <React.StrictMode>
    <ShoppingListStore>
      <ClientStore>
        <App />
      </ClientStore>
    </ShoppingListStore>
  </React.StrictMode>
);

