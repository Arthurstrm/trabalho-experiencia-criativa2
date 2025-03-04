import React from 'react';
import CadastroUsuario from './pages/CadastroUsuario';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro de Usuário</h1>
          <CadastroUsuario />
        </div>
      </div>
    </div>
  );
}

export default App;