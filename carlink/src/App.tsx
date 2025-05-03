import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SobreNos from './pages/SobreNos';
import CadastroCarros from './pages/CadastroCarros';
import CadastroFuncionario from './pages/CadastroFuncionario';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './custom.scss';
import Index from './pages/Index';
import Comprar from './pages/Comprar';
import Politicas from './pages/Politicas';
import Rodape from './components/Rodape';
import CadastroUsuario from './pages/CadastroUsuario';
import Admin from './pages/Gerenciamento';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
    <Router>
      <Navbar />
      <main className='flex-grow-1 py-3'> {/* Adiciona padding vertical */}
        <div className='container'>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cadastro-carros" element={<CadastroCarros />} />
        <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </div>
      </main>
      <Rodape/>
    </Router>
    </div>
  );
}

export default App;
