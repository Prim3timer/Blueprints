import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
<Routes>
  <Route  path='/*' element={ <App/>}/>
</Routes>
</UserProvider>
</BrowserRouter>
  </React.StrictMode>
);
 

