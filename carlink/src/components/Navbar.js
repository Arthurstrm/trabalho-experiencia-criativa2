import React from 'react';
import logo from '../img/logoCarlink-fundoClaro.svg';
import '../Navbar.css'; // Importe o arquivo CSS

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top py-3">
      <div className="container d-flex align-items-center">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="Logo"
            height="40"
          />
        </a>
        <ul className="nav nav-tabs mx-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;