import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DetailView from '../routes/DetailView'; 
import NotFound from '../routes/NotFound'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<App />} />
        <Route path="/recipe/:id" element={<DetailView />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
