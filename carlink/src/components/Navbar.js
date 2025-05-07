import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoCarlink-Escura.svg';
import PropTypes from 'prop-types';

function Navbar({ usuario }) {
  const handleLogout = () => {
    localStorage.removeItem('usuario');
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
                Olá, {usuario.nome?.split(' ')[0]}
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

Navbar.propTypes = {
  usuario: PropTypes.shape({
    id_usuario: PropTypes.number,
    nome: PropTypes.string,
    genero: PropTypes.string,
    dataNascimento: PropTypes.string,
    cpf: PropTypes.string.isRequired,
    email: PropTypes.string,
    telefone: PropTypes.string,
  }),
};

export default Navbar;