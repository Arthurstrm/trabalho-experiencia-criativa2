import React from 'react';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroFuncionario from './pages/CadastroFuncionario';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <CadastroFuncionario/>
        </div>
      </div>
    </div>
  );
}

export default App;