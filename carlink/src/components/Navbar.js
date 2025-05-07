import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoCarlink-Escura.svg';


function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Verifica se o usuário está logado ao carregar o componente
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLogado) {
      setUsuario(usuarioLogado);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    // Redireciona para a página inicial
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height="80" className="d-inline-block align-text-top" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/comprar">Comprar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vender">Vender</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre-nos">Sobre Nós</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/politicas">Políticas</Link>
            </li>
          </ul>
        </div>

        {/* Área do usuário */}
        <div className="d-flex align-items-center">
          {usuario ? (
            <div className="dropdown">
              <button 
                className="btn btn-outline-primary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Olá, {usuario.nome.split(' ')[0]} {/* Mostra apenas o primeiro nome */}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link className="dropdown-item" to="/perfil">
                    Meu Perfil
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/configuracoes">
                    Configurações
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/cadastro-usuario">
                Cadastrar
              </Link>
              <Link className="btn btn-primary" to="/login">
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;