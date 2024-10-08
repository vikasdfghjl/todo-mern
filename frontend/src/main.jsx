import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.REACT_APP_BASE_BE_URL2;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);