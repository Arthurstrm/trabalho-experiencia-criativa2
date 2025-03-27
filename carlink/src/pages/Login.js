import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({
    email: '',
    senha: '',
  });

  const MENSAGENS_ERRO = {
    EMAIL_INVALIDO: 'Por favor, insira um email válido.',
    SENHA_INVALIDA: 'Senha incorreta. Tente novamente.',
  };

  const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const validarEmail = (email) => {
    if (!REGEX.EMAIL.test(email)) {
      return MENSAGENS_ERRO.EMAIL_INVALIDO;
    }
    return '';
  };

  const validarSenha = (senha) => {
    if (senha.length < 6) {
      return MENSAGENS_ERRO.SENHA_INVALIDA;
    }
    return '';
  };

  const handleEmailChange = (event) => {
    const novoEmail = event.target.value;
    setEmail(novoEmail);
    setErros({ ...erros, email: validarEmail(novoEmail) });
  };

  const handleSenhaChange = (event) => {
    const novaSenha = event.target.value;
    setSenha(novaSenha);
    setErros({ ...erros, senha: validarSenha(novaSenha) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailError = validarEmail(email);
    const senhaError = validarSenha(senha);

    if (emailError || senhaError) {
      setErros({
        email: emailError,
        senha: senhaError,
      });
      return;
    }

    alert('Login realizado com sucesso!');
  };

  const hasErrors = () => {
    return erros.email || erros.senha;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmailLogin" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                id="inputEmailLogin"
                placeholder="exemplo@email.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {erros.email && <small className="text-danger">{erros.email}</small>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputPasswordLogin" className="form-label">Senha</label>
              <input
                type="password"
                className={`form-control ${erros.senha ? 'is-invalid' : ''}`}
                id="inputPasswordLogin"
                placeholder="********"
                value={senha}
                onChange={handleSenhaChange}
                required
              />
              {erros.senha && <small className="text-danger">{erros.senha}</small>}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={hasErrors()}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
