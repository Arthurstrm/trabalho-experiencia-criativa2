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
import CadastroLogin from './pages/CadastroLogin';
import Index from './pages/Index';
import Comprar from './pages/Comprar';
import Politicas from './pages/Politicas';
import Rodape from './components/Rodape';
import CadastroUsuario from './pages/CadastroUsuario';

function App() {
  return (
    <div>
    <div className='container'>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/cadastro-login"
          element={<CadastroLogin onCadastroSucesso={(idDoLogin: number) => {
            console.log('ID:', idDoLogin);
            // Sua lógica de navegação aqui
          }} />}
        />
        <Route path="/cadastro-carros" element={<CadastroCarros />} />
        <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </Router>
    </div>
    <Rodape/>
    </div>
  );
}

export default App;
