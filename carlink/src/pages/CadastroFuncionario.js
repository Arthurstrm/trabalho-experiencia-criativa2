import React from 'react';

function CadastroFuncionario() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
        
          <h1>Cadastro Funcionario</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder='Nome completo'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Gênero</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder='Gênero'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Data nascimento</label>
              <input
                type="date"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">CPF</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder='000.000.000-00'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="E-mail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Telefone</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Telefone"
              />
            </div>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>  
  );
}

export default CadastroFuncionario;