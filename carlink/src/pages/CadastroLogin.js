import React, { useState } from 'react';

function CadastroLogin() {
  // ESTADOS DOS CAMPOS
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [email, setEmail] = useState('');
  const [checkboxMarcada, setCheckboxMarcada] = useState(false);

  // ESTADO DE ERROS POR CAMPO
  const [erros, setErros] = useState({
    senha: '', repetirSenha: '', email: ''
  });

  // ESTADO PARA MENSAGEM DE ALERTA
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'success' ou 'danger'

  // MENSAGENS DE ERRO
  const MENSAGENS_ERRO = {
    SENHA_TAMANHO: 'A senha deve ter entre 8 e 16 caracteres.',
    SENHA_COMPLEXIDADE: 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.',
    SENHA_NAO_CONFERE: 'As senhas não coincidem.',
    EMAIL_INVALIDO: 'Por favor, insira um email válido.',
    TERMOS_NAO_ACEITOS: 'Você deve concordar com os termos de uso para cadastrar.'
  };

  // REGEX
  const REGEX = {
    SENHA: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

  // VALIDADORES
  const validarSenha = (senha) => {
    if (senha.length < 8 || senha.length > 16) return MENSAGENS_ERRO.SENHA_TAMANHO;
    if (!REGEX.SENHA.test(senha)) return MENSAGENS_ERRO.SENHA_COMPLEXIDADE;
    return '';
  };

  const validarRepetirSenha = (senha, repetirSenha) => {
    if (senha !== repetirSenha) return MENSAGENS_ERRO.SENHA_NAO_CONFERE;
    return '';
  };

  const validarEmail = (email) => {
    if (!REGEX.EMAIL.test(email)) return MENSAGENS_ERRO.EMAIL_INVALIDO;
    return '';
  };

  // HANDLERS
  const handleSenhaChange = (e) => {
    const novaSenha = e.target.value;
    setSenha(novaSenha);
    setErros({
      ...erros,
      senha: validarSenha(novaSenha),
      repetirSenha: validarRepetirSenha(novaSenha, repetirSenha)
    });
  };

  const handleRepetirSenhaChange = (e) => {
    const novaRepetirSenha = e.target.value;
    setRepetirSenha(novaRepetirSenha);
    setErros({
      ...erros,
      repetirSenha: validarRepetirSenha(senha, novaRepetirSenha)
    });
  };

  const handleEmailChange = (e) => {
    const novoEmail = e.target.value;
    setEmail(novoEmail);
    setErros({ ...erros, email: validarEmail(novoEmail) });
  };

  const handleCheckboxChange = (e) => {
    setCheckboxMarcada(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const senhaError = validarSenha(senha);
    const repetirSenhaError = validarRepetirSenha(senha, repetirSenha);
    const emailError = validarEmail(email);

    if (senhaError || repetirSenhaError || emailError) {
      setErros({ senha: senhaError, repetirSenha: repetirSenhaError, email: emailError });
      setMensagem('Por favor, corrija os erros no formulário.');
      setTipoMensagem('danger');
      return;
    }

    if (!checkboxMarcada) {
      setMensagem(MENSAGENS_ERRO.TERMOS_NAO_ACEITOS);
      setTipoMensagem('danger');
      return;
    }

    // Tudo certo
    setMensagem('Cadastro realizado com sucesso!');
    setTipoMensagem('success');

    // (opcional) limpar os campos
    setSenha('');
    setRepetirSenha('');
    setEmail('');
    setCheckboxMarcada(false);
    setErros({ senha: '', repetirSenha: '', email: '' });
  };

  const hasErrors = () => {
    return erros.senha || erros.repetirSenha || erros.email;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro de Login</h1>

          {/* ALERTA */}
          {mensagem && (
            <div className={`alert alert-${tipoMensagem} mt-3`} role="alert">
              {mensagem}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmailCadastroLogin" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                id="inputEmailCadastroLogin"
                placeholder="exemplo@email.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {erros.email && (
                <small className="text-danger">{erros.email}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="inputPasswordCadastroLogin" className="form-label">Senha</label>
              <input
                type="password"
                className={`form-control ${erros.senha ? 'is-invalid' : ''}`}
                id="inputPasswordCadastroLogin"
                placeholder="********"
                value={senha}
                onChange={handleSenhaChange}
                required
              />
              {erros.senha && (
                <small className="text-danger">{erros.senha}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="inputRepetirPasswordCadastroLogin" className="form-label">Repetir Senha</label>
              <input
                type="password"
                className={`form-control ${erros.repetirSenha ? 'is-invalid' : ''}`}
                id="inputRepetirPasswordCadastroLogin"
                placeholder="********"
                value={repetirSenha}
                onChange={handleRepetirSenhaChange}
                required
              />
              {erros.repetirSenha && (
                <small className="text-danger">{erros.repetirSenha}</small>
              )}
            </div>

            <div id="passwordHelp" className="form-text mb-3">
              A senha deve ter:
              <ul className="mb-0">
                <li>8 a 16 caracteres</li>
                <li>Pelo menos uma letra maiúscula</li>
                <li>Pelo menos um número</li>
                <li>Pelo menos um símbolo</li>
              </ul>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkboxCadastroLogin"
                checked={checkboxMarcada}
                onChange={handleCheckboxChange}
                required
              />
              <label className="form-check-label" htmlFor="checkboxCadastroLogin">
                Concordo com os <a href="/">Termos de uso.</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={hasErrors()}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroLogin;
