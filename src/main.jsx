import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import store from './authComponents/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
 </BrowserRouter>
 </Provider>
)
