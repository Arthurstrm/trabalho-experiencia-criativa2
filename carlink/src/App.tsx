// App.tsx
import React, { useState, useCallback } from 'react';
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
import Usuarios from './admin/usuarios';
import useInactivityLogout from './components/inatividade';
import Perfil from './pages/perfil';

interface Usuario {
  id_usuario: number;
  nome: string;
  genero: string;
  dataNascimento: string; 
  cpf: string;
  email: string;
  telefone: string;
  senha?: string;
  imagemPerfil?: any;
}

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem('usuario');
    const user = storedUser ? JSON.parse(storedUser) as Usuario : null;
    console.log("Usuario Logado no App:", user); 
    return user;
  });
  
  useInactivityLogout(1);

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Router>
        
        <main className='flex-grow-1 py-3'>
          <div className='container'>
          <Navbar usuario={usuarioLogado} />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cadastro-carros" element={<CadastroCarros />} />
              <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sobre-nos" element={<SobreNos />} />
              <Route path="/politicas" element={<Politicas />} />
              <Route path="/comprar" element={<Comprar />} />
              <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/perfil/:id" element={<Perfil />} />
            </Routes>
          </div>
        </main>
        <Rodape/>
      </Router>
    </div>
  );
}

export default App;