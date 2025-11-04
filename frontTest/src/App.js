import logo from './logo.svg';
import './App.css';
import Cookies from 'universal-cookie'
import axios from 'axios'
import TheSource from './TheSource';
import AnotherSource from './AnotherSource';
import {DataProvider} from './context/DataContext';

import { useState } from 'react';
axios.defaults.withCredentials = true
const cookies = new Cookies()
function App() {
 
 
  const createCookie = async () => {
    const response = await axios.get('http://localhost:5500')
    console.log({feedBack: response.data})
    // cookies.set('Name', 'Dike Ekwelie', {sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 5 * 1000)}) 
  }
  const deleteCookie = async () => {
    const response = await axios.get('http://localhost:5500/delete')
    console.log({feedBack: response.data})
  }
  return (
    <div className="App">
      <DataProvider>
      {/* <h1>HTTP ONLY COOKIE</h1>
      <div>
      <button className='button green' onClick={createCookie}>Create</button>
      <button className='button yellow'>Renew</button>
      <button className='button red' onClick={deleteCookie}>Delete</button>
    </div> */}
    <TheSource
    
    />
    <AnotherSource
    />
    </DataProvider>
    </div>
  );
}

export default App;
