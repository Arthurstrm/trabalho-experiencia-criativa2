import React, { useState } from 'react';

function CadastroUsuario() {
  // ESTADOS DO COMPONENTE
  // Armazenam os valores atuais dos campos do formulário
  const [senha, setSenha] = useState(''); 
  const [repetirSenha, setRepetirSenha] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [checkboxMarcada, setCheckboxMarcada] = useState(false); 

  // ESTADO DE ERROS
  // Armazena mensagens de erro para cada campo
  const [erros, setErros] = useState({
    senha: '',          
    repetirSenha: '',   
    email: '',         
  });

  // MENSAGENS DE ERRO PREDEFINIDAS
  const MENSAGENS_ERRO = {
    SENHA_TAMANHO: 'A senha deve ter entre 8 e 16 caracteres.',
    SENHA_COMPLEXIDADE: 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.',
    SENHA_NAO_CONFERE: 'As senhas não coincidem.',
    EMAIL_INVALIDO: 'Por favor, insira um email válido.',
    TERMOS_NAO_ACEITOS: 'Você deve concordar com os termos de uso para cadastrar.'
  };

  // EXPRESSÕES REGULARES PARA VALIDAÇÃO
  const REGEX = {
    SENHA: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

  // MÉTODOS DE VALIDAÇÃO

  /**
   * Valida se a senha atende aos requisitos
   * Chamado em: handleSenhaChange e handleSubmit
   */
  const validarSenha = (senha) => {
    if (senha.length < 8 || senha.length > 16) {
      return MENSAGENS_ERRO.SENHA_TAMANHO;
    }
    if (!REGEX.SENHA.test(senha)) {
      return MENSAGENS_ERRO.SENHA_COMPLEXIDADE;
    }
    return '';
  };

  /**
   * Valida se as senhas coincidem
   * Chamado em: handleSenhaChange, handleRepetirSenhaChange e handleSubmit
   */
  const validarRepetirSenha = (senha, repetirSenha) => {
    if (senha !== repetirSenha) {
      return MENSAGENS_ERRO.SENHA_NAO_CONFERE;
    }
    return '';
  };

  /**
   * Valida o formato do email
   * Chamado em: handleEmailChange e handleSubmit
   */
  const validarEmail = (email) => {
    if (!REGEX.EMAIL.test(email)) {
      return MENSAGENS_ERRO.EMAIL_INVALIDO;
    }
    return '';
  };

  // HANDLERS (MANIPULADORES DE EVENTOS)

  /**
   * Manipula mudanças no campo de senha
   * Chamado em: onChange do input de senha
   */
  const handleSenhaChange = (event) => {
    const novaSenha = event.target.value;
    setSenha(novaSenha); // Atualiza estado da senha
    // Atualiza erros mantendo os existentes e validando a nova senha
    setErros({
      ...erros,
      senha: validarSenha(novaSenha),
      repetirSenha: validarRepetirSenha(novaSenha, repetirSenha)
    });
  };

  /**
   * Manipula mudanças no campo de repetir senha
   * Chamado em: onChange do input de repetir senha
   */
  const handleRepetirSenhaChange = (event) => {
    const novaRepetirSenha = event.target.value;
    setRepetirSenha(novaRepetirSenha); // Atualiza estado da repetição
    // Atualiza apenas o erro de repetição de senha
    setErros({
      ...erros,
      repetirSenha: validarRepetirSenha(senha, novaRepetirSenha)
    });
  };

  /**
   * Manipula mudanças no campo de email
   * Chamado em: onChange do input de email
   */
  const handleEmailChange = (event) => {
    const novoEmail = event.target.value;
    setEmail(novoEmail); // Atualiza estado do email
    // Atualiza apenas o erro do email
    setErros({...erros, email: validarEmail(novoEmail)});
  };

  /**
   * Manipula mudanças no checkbox de termos
   * Chamado em: onChange do checkbox
   */
  const handleCheckboxChange = (event) => {
    setCheckboxMarcada(event.target.checked); // Atualiza estado do checkbox
  };

  /**
   * Manipula o envio do formulário
   * Chamado em: onSubmit do formulário
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne comportamento padrão do formulário

    // Validações finais antes do envio
    const senhaError = validarSenha(senha);
    const repetirSenhaError = validarRepetirSenha(senha, repetirSenha);
    const emailError = validarEmail(email);
    
    // Se houver erros, atualiza o estado de erros
    if (senhaError || repetirSenhaError || emailError) {
      setErros({
        senha: senhaError,
        repetirSenha: repetirSenhaError,
        email: emailError
      });
      return; // Interrompe o envio
    }

    // Verifica se os termos foram aceitos
    if (!checkboxMarcada) {
      alert(MENSAGENS_ERRO.TERMOS_NAO_ACEITOS);
      return;
    }

    // Se tudo estiver válido, exibe mensagem de sucesso
    alert('Cadastro realizado com sucesso!');
  };

  /**
   * Verifica se existem erros nos campos
   * Chamado em: disabled do botão de submit
   */
  const hasErrors = () => {
    return erros.senha || erros.repetirSenha || erros.email;
  };

  // RENDERIZAÇÃO DO COMPONENTE
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro Usuário</h1>
          {/* Formulário - Chamada do handleSubmit no evento onSubmit */}
          <form onSubmit={handleSubmit}>
            
            {/* Campo de email */}
            <div className="mb-3">
              <label htmlFor="inputEmailCadastroUsuario" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${erros.email ? 'is-invalid' : ''}`} // Se houver algo em erros 'is invalid' SENÃO 'vazio' e permite o uso do botão
                id="inputEmailCadastroUsuario"
                placeholder="exemplo@email.com"
                value={email}
                onChange={handleEmailChange} // Chamada do handler
                required
              />
              {/* Exibe erro se existir */}
              {erros.email && (
                <small className="text-danger">{erros.email}</small>
              )}
            </div>

            {/* Campo de senha */}
            <div className="mb-3"> 
              <label htmlFor="inputPasswordCadastroUsuario" className="form-label">Senha</label>
              <input
                type="password"
                className={`form-control ${erros.senha ? 'is-invalid' : ''}`} // Se erros.senha existe → 'is-invalid' SENÃO → ''
                id="inputPasswordCadastroUsuario"
                placeholder="********"
                value={senha}
                onChange={handleSenhaChange} // Chamada do handler
                required
              />
              {/* Exibe erro se existir */}
              {erros.senha && (
                <small className="text-danger">{erros.senha}</small>
              )}
            </div>

            {/* Campo de repetir senha */}
            <div className="mb-3">
              <label htmlFor="inputRepetirPasswordCadastroUsuario" className="form-label">Repetir Senha</label>
              <input
                type="password"
                className={`form-control ${erros.repetirSenha ? 'is-invalid' : ''}`}
                id="inputRepetirPasswordCadastroUsuario"
                placeholder="********"
                value={repetirSenha}
                onChange={handleRepetirSenhaChange} // Chamada do handler
                required
              />
              {/* Exibe erro se existir */}
              {erros.repetirSenha && (
                <small className="text-danger">{erros.repetirSenha}</small>
              )}
            </div>

            {/* Texto de ajuda */}
            <div id="passwordHelp" className="form-text mb-3">
              A senha deve ter:
              <ul className="mb-0">
                <li>8 a 16 caracteres</li>
                <li>Pelo menos uma letra maiúscula</li>
                <li>Pelo menos um número</li>
                <li>Pelo menos um símbolo</li>
              </ul>
            </div>

            {/* Checkbox de termos */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkboxCadastroUsuario"
                checked={checkboxMarcada}
                onChange={handleCheckboxChange} // Chamada do handler
                required
              />
              <label className="form-check-label" htmlFor="checkboxCadastroUsuario">
                Concordo com os <a href="#">Termos de uso.</a>
              </label>
            </div>

            {/* Botão de submit - Desabilitado se houver erros */}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={hasErrors()} // Chamada do helper
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;