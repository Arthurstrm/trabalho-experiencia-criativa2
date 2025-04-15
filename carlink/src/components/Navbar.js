import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logoCarlink-Escura.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Logo" height="80" className="d-inline-block align-text-top" />
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
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="comprarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Comprar
              </a>
              <ul className="dropdown-menu" aria-labelledby="comprarDropdown">
                <li><Link className="dropdown-item" to="/carros">Carros</Link></li>
                <li><Link className="dropdown-item" to="/motos">Motos</Link></li>
                <li><Link className="dropdown-item" to="/caminhoes">Caminhões</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="venderDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vender
              </a>
              <ul className="dropdown-menu" aria-labelledby="venderDropdown">
                <li><Link className="dropdown-item" to="/vender/carros">Carros</Link></li>
                <li><Link className="dropdown-item" to="/vender/motos">Motos</Link></li>
                <li><Link className="dropdown-item" to="/vender/caminhoes">Caminhões</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="sobreDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sobre
              </a>
              <ul className="dropdown-menu" aria-labelledby="sobreDropdown">
                <li><Link className="dropdown-item" to="/sobre-nos">Nós</Link></li>
                <li><Link className="dropdown-item" to="/politicas">Políticas</Link></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Caixa de busca e botões de login/cadastro */}
        <div className="d-flex align-items-center">
          <div className="me-2" style={{ width: "250px" }}>
            <input
              type="search"
              placeholder="Buscar..."
              className="form-control w-full"
            />
          </div>
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
