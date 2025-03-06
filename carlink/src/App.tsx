import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroCarros from './pages/CadastroCarros';
import CadastroFuncionario from './pages/CadastroFuncionario';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro-carros" element={<CadastroCarros />} />
        <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;