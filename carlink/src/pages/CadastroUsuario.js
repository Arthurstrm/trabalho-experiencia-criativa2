import React from 'react';

function CadastroUsuario() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          
          <h1>Cadastro Usuário</h1>
          
          <form>
            {/* Cadastro Email Usuario */}
            <div className="mb-3">
              <label htmlFor="inputEmailCadastroUsuario" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmailCadastroUsuario"
                placeholder="exemplo@email.com"
              />
            </div>

            {/* Cadastro Senha Usuario */}
            <div className="mb-3">
              <label htmlFor="inputPasswordCadastroUsuario" className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                id="inputPasswordCadastroUsuario"
                aria-describedby="passwordHelp"
                placeholder="********"
              />
              <div id="passwordHelp" className="form-text">Senha de 8 a 16 dígitos.</div>
            </div>

            {/* Checkbox */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Concordo com os <a href="#">Termos de uso.</a>
              </label>
            </div>

            {/* Botão */}
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;