import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoCarlink-Escura.svg'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Logo"  height="80" className="d-inline-block align-text-top" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro-carros">
                Cadastro de Carros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro-funcionario">
                Cadastro de Funcionário
              </Link>
            </li>
          </ul>
        </div>
        {/* Ícone de login no canto direito */}
        <div className="d-flex">
          <Link className="btn btn-outline-primary me-2" to="/cadastro-login">
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