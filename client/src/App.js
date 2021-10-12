import React from 'react';
import { Header } from './components/ui/header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './routers/MainRouter';
import { DataProvider } from './context/DataProvider';
import { Carrito } from './components/ui/carrito/Carrito';
import { Auth } from './components/ui/auth/Auth';
import 'boxicons';
import { Cookies } from './components/shared/Cookies';

function App() {
 
  return (
    <DataProvider>
      <div className="App">
        <Router>
            <Header />
            <Carrito />
            <Auth/>
            <Cookies/>
            <MainRouter />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
