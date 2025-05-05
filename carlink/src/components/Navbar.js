import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoCarlink-Escura.svg';

function Navbar() {
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

        {/* botões de login/cadastro */}
        <div className="d-flex align-items-center">
          <Link className="btn btn-outline-primary me-2" to="/cadastro-usuario">
            Cadastrar
          </Link>
          <Link className="btn btn-primary" to="/login">
            Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;