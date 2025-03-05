import React from 'react';

function CadastroUsuario() {
  return (
    
    <form>
<<<<<<< HEAD
<<<<<<< HEAD
      <h1>Cadastro de Usuário</h1>
=======
      {/* Cadastro Email Usuario */}
>>>>>>> 5d96436be53d43bc25954584f80b79c5218570f7
=======
      {/* Cadastro Email Usuario */}
>>>>>>> 5d96436be53d43bc25954584f80b79c5218570f7
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
        <input
          type="email"
          className="form-control"
          id="inputEmailCadastroUsuario"
          placeholder="exemplo@email.com"
        />
      </div>

      {/* Cadastro email Usuario */}
      <div className="mb-3">
        <label htmlFor="inputPasswordCadastroUsuario" className="form-label">Password</label>
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
        <label className="form-check-label" htmlFor="exampleCheck1">Concordo com os <a href="#">Termos de uso.</a></label>
      </div>
      
      {/* Botão */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default CadastroUsuario;