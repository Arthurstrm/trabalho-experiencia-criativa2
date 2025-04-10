import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CadastroCarros from './pages/CadastroCarros';
import CadastroFuncionario from './pages/CadastroFuncionario';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.scss';
import CadastroLogin from './pages/CadastroLogin';
import Index from './pages/Index';

function App() {
  return (
    <div className='container'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Index />} />
        <Route path="/cadastro-login" element={<CadastroLogin />} />
        <Route path="/cadastro-carros" element={<CadastroCarros />} />
        <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
