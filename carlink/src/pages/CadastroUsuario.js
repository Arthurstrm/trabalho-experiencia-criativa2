import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

const botaoCor = '#1a1a1a';

function CadastroUsuario() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [checkboxMarcada, setCheckboxMarcada] = useState(false);
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);

  // Estado para os erros de validação
  const [erros, setErros] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
    repetirSenha: '',
    termos: '',
    imagemPerfil: ''
  });

  // Mensagens de erro predefinidas
  const MENSAGENS_ERRO = {
    SENHA_TAMANHO: 'A senha deve ter entre 8 e 16 caracteres.',
    SENHA_COMPLEXIDADE: 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.',
    SENHA_NAO_CONFERE: 'As senhas não coincidem.',
    EMAIL_INVALIDO: 'Por favor, insira um email válido.',
    TERMOS_NAO_ACEITOS: 'Você deve concordar com os termos de uso para cadastrar.',
    NOME_CURTO: 'O nome deve ter pelo menos 3 caracteres.',
    CPF_INVALIDO_FORMATO: 'CPF inválido! Use o formato 000.000.000-00.',
    CPF_INVALIDO: 'CPF inválido!',
    TELEFONE_INVALIDO: 'Telefone inválido! Use o formato (00)0000-0000 ou (00)00000-0000.',
    DATA_NASCIMENTO_INVALIDA: 'A data de nascimento deve ser anterior à data atual.',
    IMAGEM_PERFIL_INVALIDA: 'Formato de imagem inválido!',
    GENERO_INVALIDO: 'Por favor, selecione seu gênero.'
  };

  // Expressões regulares para validação
  const REGEX = {
    SENHA: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CPF_FORMAT: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    TELEFONE_FORMAT: /^\(\d{2}\)\d{4,5}-\d{4}$/,
    IMAGEM_PERFIL: /\.(jpe?g|png|gif)$/i
  };

  // Métodos de validação
  const validarNome = (nome) => {
    if (!nome.trim() || nome.trim().length < 3) {
      return MENSAGENS_ERRO.NOME_CURTO;
    }
    return '';
  };

  const validarGenero = (genero) => {
    if (!genero) {
        return MENSAGENS_ERRO.GENERO_INVALIDO;
    }
    return '';
};

  const validarDataNascimento = (dataNascimento) => {
    if (!dataNascimento) {
      return MENSAGENS_ERRO.DATA_NASCIMENTO_INVALIDA;
    }
    const dataNasc = new Date(dataNascimento);
    const hoje = new Date();
    if (dataNasc > hoje) {
      return MENSAGENS_ERRO.DATA_NASCIMENTO_INVALIDA;
    }
    return '';
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return MENSAGENS_ERRO.CPF_INVALIDO;
    }
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf[9])) return MENSAGENS_ERRO.CPF_INVALIDO;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf[10])) return MENSAGENS_ERRO.CPF_INVALIDO;
    return '';
  };

  const validarTelefone = (telefone) => {
    const telefoneNumerico = telefone.replace(/\D/g, '');
    if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
      return MENSAGENS_ERRO.TELEFONE_INVALIDO;
    }
    return '';
  };

  const validarSenha = (senha) => {
    if (senha.length < 8 || senha.length > 16) {
      return MENSAGENS_ERRO.SENHA_TAMANHO;
    }
    if (!REGEX.SENHA.test(senha)) {
      return MENSAGENS_ERRO.SENHA_COMPLEXIDADE;
    }
    return '';
  };

  const validarRepetirSenha = (senha, repetirSenha) => {
    if (senha !== repetirSenha) {
      return MENSAGENS_ERRO.SENHA_NAO_CONFERE;
    }
    return '';
  };

  const validarEmail = (email) => {
    if (!REGEX.EMAIL.test(email)) {
      return MENSAGENS_ERRO.EMAIL_INVALIDO;
    }
    return '';
  };

  const erroAlerta = (mensagem) => {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: mensagem,
      confirmButtonColor: botaoCor,
      confirmButtonText: 'Fechar',
      customClass: {
        confirmButton: 'custom-button'
      }
    });
  };

  const sucessoAlerta = (mensagem) => {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: mensagem,
      confirmButtonColor: botaoCor,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-button'
      }
    });
  };

  // Handlers de mudança
  const handleNomeChange = (e) => {
    setNome(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''));
    setErros({ ...erros, nome: validarNome(e.target.value) });
  };

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
    setErros({ ...erros, genero: validarGenero(e.target.value) });
};

  const handleDataNascimentoChange = (e) => {
    setDataNascimento(e.target.value);
    setErros({ ...erros, dataNascimento: validarDataNascimento(e.target.value) });
  };

  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    setCpf(valor);
    setErros({ ...erros, cpf: validarCPF(valor) });
  };

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }
    setTelefone(valor);
    setErros({ ...erros, telefone: validarTelefone(valor) });
  };

  const formatarTelefone = () => {
    let valor = telefone;
    if (valor.length === 10) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else if (valor.length === 11) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
    setTelefone(valor);
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErros({ ...erros, email: validarEmail(event.target.value) });
  };

  const handleSenhaChange = (event) => {
    const novaSenha = event.target.value;
    setSenha(novaSenha);
    setErros({
      ...erros,
      senha: validarSenha(novaSenha),
      repetirSenha: validarRepetirSenha(novaSenha, repetirSenha)
    });
  };

  const handleRepetirSenhaChange = (event) => {
    const novaRepetirSenha = event.target.value;
    setRepetirSenha(novaRepetirSenha);
    setErros({
      ...erros,
      repetirSenha: validarRepetirSenha(senha, novaRepetirSenha)
    });
  };

  const handleCheckboxChange = (event) => {
    setCheckboxMarcada(event.target.checked);
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!REGEX.IMAGEM_PERFIL.test(file.name)) {
        setErros({ ...erros, imagemPerfil: MENSAGENS_ERRO.IMAGEM_PERFIL_INVALIDA });
        return;
      }

      setImagemPerfil(file);
      setErros({ ...erros, imagemPerfil: '' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validação do formulário e envio
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nomeError = validarNome(nome);
    const generoError = validarGenero(genero);
    const dataNascimentoError = validarDataNascimento(dataNascimento);
    const cpfError = validarCPF(cpf);
    const emailError = validarEmail(email);
    const telefoneError = validarTelefone(telefone);
    const senhaError = validarSenha(senha);
    const repetirSenhaError = validarRepetirSenha(senha, repetirSenha);
    let termosError = '';

    if (!checkboxMarcada) {
      termosError = MENSAGENS_ERRO.TERMOS_NAO_ACEITOS;
    }
    if (imagemPerfil && imagemPerfil.size > 16 * 1024 * 1024) {
      setErros({...erros, imagemPerfil: 'A imagem deve ter no máximo 16MB'});
      erroAlerta('A imagem deve ter no máximo 16MB');
      return;
    }
    setErros({
      nome: nomeError,
      genero: generoError,
      dataNascimento: dataNascimentoError,
      cpf: cpfError,
      email: emailError,
      telefone: telefoneError,
      senha: senhaError,
      repetirSenha: repetirSenhaError,
      termos: termosError
    });

    if (nomeError || generoError || dataNascimentoError || cpfError || emailError || telefoneError || senhaError || repetirSenhaError || termosError) {
      erroAlerta('Por favor, corrija os erros no formulário.');
      return;
    }

    sucessoAlerta('Cadastro realizado com sucesso!');

    console.log('Dados do formulário:', {
      nome,
      genero,
      dataNascimento,
      cpf,
      email,
      telefone,
      senha,
      checkboxMarcada,
      imagemPerfil
    });
    
    try {
      // Cria FormData para enviar a imagem
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('genero', genero);
      formData.append('dataNascimento', dataNascimento);
      formData.append('cpf', cpf.replace(/\D/g, ''));
      formData.append('email', email);
      formData.append('telefone', telefone.replace(/\D/g, ''));
      formData.append('senha', senha);
      if (imagemPerfil) {
        formData.append('imagemPerfil', imagemPerfil);
      }
  
      const response = await axios.post('http://localhost:8800/auth/cadastrarUsuario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      sucessoAlerta(response.data.message);
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
  
    } catch (error) {
      let errorMessage = 'Erro ao cadastrar usuário';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      erroAlerta(errorMessage);
    }
  };


  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Coluna 1: Informações do Usuário */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
                id="nome"
                placeholder="Nome completo"
                value={nome}
                onChange={handleNomeChange}
              />
              {erros.nome && <div className="text-danger">{erros.nome}</div>}
            </div>

            <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Gênero</label>
                    <select
                        className={`form-select ${erros.genero ? 'is-invalid' : ''}`}
                        id="genero"
                        value={genero}
                        onChange={handleGeneroChange}
                    >
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="nao-binario">Não binário/gênero não conforme</option>
                        <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                    </select>
                    {erros.genero && <div className="text-danger">{erros.genero}</div>}
                </div>

            <div className="mb-3">
              <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
              <input
                type="date"
                className={`form-control ${erros.dataNascimento ? 'is-invalid' : ''}`}
                id="dataNascimento"
                value={dataNascimento}
                onChange={handleDataNascimentoChange}
                max={new Date().toISOString().split("T")[0]}
              />
              {erros.dataNascimento && <div className="text-danger">{erros.dataNascimento}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input
                type="text"
                className={`form-control ${erros.cpf ? 'is-invalid' : ''}`}
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength="14"
              />
              {erros.cpf && <div className="text-danger">{erros.cpf}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
              />
              {erros.email && <div className="text-danger">{erros.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input
                type="text"
                className={`form-control ${erros.telefone ? 'is-invalid' : ''}`}
                id="telefone"
                placeholder="(00)00000-0000"
                value={telefone}
                onChange={handleTelefoneChange}
                onBlur={formatarTelefone}
                maxLength="15"
              />
              {erros.telefone && <div className="text-danger">{erros.telefone}</div>}
            </div>
          </div>

          {/* Coluna 2: Senha e Repetir Senha */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Imagem</label>
              <div className="d-flex align-items-center">
                <div className="rounded-circle overflow-hidden me-3" style={{ width: '80px', height: '80px', backgroundColor: '#f8f9fa' }}>
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="Preview" className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                      <i className="bi bi-person fs-4 text-secondary"></i>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="imagemPerfil"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleImagemChange}
                    className="d-none"
                  />
                  <label
                    htmlFor="imagemPerfil"
                    className="btn btn-primary"
                    style={{ cursor: 'pointer', backgroundColor: botaoCor, borderColor: botaoCor }}
                  >
                    Escolher Imagem
                  </label>
                  {erros.imagemPerfil && (
                    <div className="text-danger mt-2">{erros.imagemPerfil}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-10">
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                  type="password"
                  className={`form-control ${erros.senha ? 'is-invalid' : ''}`}
                  id="senha"
                  placeholder="********"
                  value={senha}
                  onChange={handleSenhaChange} />
                {erros.senha && (
                  <small className="text-danger">{erros.senha}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="repetirSenha" className="form-label">Repetir Senha</label>
                <input
                  type="password"
                  className={`form-control ${erros.repetirSenha ? 'is-invalid' : ''}`}
                  id="repetirSenha"
                  placeholder="********"
                  value={repetirSenha}
                  onChange={handleRepetirSenhaChange}
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
                  id="termos"
                  checked={checkboxMarcada}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="termos">
                  Concordo com os <a href="/politicas">Termos de uso.</a>
                </label>
                {erros.termos && <div className="text-danger">{erros.termos}</div>}
              </div>
            </div>
          </div>
        </div>


        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: botaoCor, borderColor: botaoCor }}
          >
            Cadastrar Usuário
          </button>
        </div>
      </form>
    </div>
  );
} 


export default CadastroUsuario;