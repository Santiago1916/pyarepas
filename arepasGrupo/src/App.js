import './App.css';
import NavigationBar  from './pages/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login  from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from '../src/layouts/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import {Details} from './pages/Details'
import Home from './pages/Home'
import Carrito from './pages/carrito'
import {Orders} from './pages/order'

/*
https://react-bootstrap.github.io/layout/breakpoints/ breakpoints bootstrap
https://reactjs.org/docs/fragments.html fragment -> <>
https://www.freecodecamp.org/espanol/news/la-hoja-de-trucos-de-react-router-todo-lo-que-necesitas-saber/
https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
*/

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs">
      <div className="App ">
        <>
          <Layout>
            <Router>
            <NavigationBar />
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Details" element={<Details />} />
                <Route path="/Carrito" element={<Carrito />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </Layout>
        </>
      </div>
    </ThemeProvider>
  );
}

function NotFound() {
  return <>Lo sentimos, la página que esta buscando no existe.</>;
}

export default App;