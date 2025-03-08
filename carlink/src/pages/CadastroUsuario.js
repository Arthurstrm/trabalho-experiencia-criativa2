import React, { useState } from 'react';

function CadastroUsuario() {
  const [senhaValida, setSenhaValida] = useState(true);
  const [mensagemErro, setMensagemErro] = useState('');
  const [checkboxMarcada, setCheckboxMarcada] = useState(false);

  const validarSenha = (event) => {
    const senha = event.target.value;

    // Expressão regular para validar a senha
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;

    if (senha.length < 8 || senha.length > 16) {
      setSenhaValida(false);
      setMensagemErro('A senha deve ter entre 8 e 16 caracteres.');
    } else if (!regex.test(senha)) {
      setSenhaValida(false);
      setMensagemErro('A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.');
    } else {
      setSenhaValida(true);
      setMensagemErro('');
    }
  };

  const handleCheckboxChange = (event) => {
    setCheckboxMarcada(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio do formulário

    if (!senhaValida) {
      alert('Por favor, corrija os erros na senha antes de cadastrar.');
      return;
    }

    if (!checkboxMarcada) {
      alert('Você deve concordar com os termos de uso para cadastrar.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro Usuário</h1>
          <form onSubmit={handleSubmit}>
            {/* Cadastro Email Usuario */}
            <div className="mb-3">
              <label htmlFor="inputEmailCadastroUsuario" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmailCadastroUsuario"
                placeholder="exemplo@email.com"
                required
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
                minLength={8}
                maxLength={16}
                onChange={validarSenha}
                required
              />
              <div id="passwordHelp" className="form-text">
                A senha deve ter:
                <ul>
                  <li>8 a 16 caracteres</li>
                  <li>Pelo menos uma letra maiúscula</li>
                  <li>Pelo menos um número</li>
                  <li>Pelo menos um símbolo</li>
                </ul>
              </div>
              {!senhaValida && (
                <small className="text-danger">{mensagemErro}</small>
              )}
            </div>

            {/* Checkbox */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={handleCheckboxChange}
                required
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