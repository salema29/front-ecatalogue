import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ShoppingListStore } from './store-shopping-list.js'

const root = ReactDOM.createRoot(document.getElementById('ecatalogue'));
root.render(
  <React.StrictMode>
    <ShoppingListStore>
      <App />
    </ShoppingListStore>
  </React.StrictMode>
);

