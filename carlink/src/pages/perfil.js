import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const botaoCor = '#1a1a1a';

function Perfil() {
  const navigate = useNavigate();
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [repetirNovaSenha, setRepetirNovaSenha] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para os erros de validação
  const [erros, setErros] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    novaSenha: '',
    repetirNovaSenha: '',
    imagemPerfil: ''
  });

  // Mensagens de erro predefinidas
  const MENSAGENS_ERRO = {
    SENHA_TAMANHO: 'A senha deve ter entre 8 e 16 caracteres.',
    SENHA_COMPLEXIDADE: 'A senha deve conter pelo menos uma letra maiúscula, um número e um símbolo.',
    SENHA_NAO_CONFERE: 'As senhas não coincidem.',
    EMAIL_INVALIDO: 'Por favor, insira um email válido.',
    NOME_CURTO: 'O nome deve ter pelo menos 3 caracteres.',
    CPF_INVALIDO_FORMATO: 'CPF inválido! Use o formato 000.000.000-00.',
    CPF_INVALIDO: 'CPF inválido!',
    TELEFONE_INVALIDO: 'Telefone inválido! Use o formato (00)0000-0000 ou (00)00000-0000.',
    DATA_NASCIMENTO_INVALIDA: 'A data de nascimento deve ser anterior à data atual.',
    IMAGEM_PERFIL_INVALIDA: 'Formato de imagem inválido!'
  };

  // Expressões regulares para validação
  const REGEX = {
    SENHA: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CPF_FORMAT: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    TELEFONE_FORMAT: /^\(\d{2}\)\d{4,5}-\d{4}$/,
    IMAGEM_PERFIL: /\.(jpe?g|png|gif)$/i
  };

  // Carregar dados do usuário
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8800/auth/perfil', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const usuario = response.data;
        setNome(usuario.nome || '');
        setDataNascimento(usuario.dataNascimento ? usuario.dataNascimento.split('T')[0] : '');
        setCpf(usuario.cpf ? formatarCPF(usuario.cpf) : '');
        setEmail(usuario.email || '');
        setTelefone(usuario.telefone ? formatarTelefone(usuario.telefone) : '');
        
        if (usuario.imagemPerfil) {
          setImagemPreview(`http://localhost:8800/${usuario.imagemPerfil}`);
        }

        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        erroAlerta('Erro ao carregar perfil. Por favor, tente novamente.');
        navigate('/login');
      }
    };

    carregarPerfil();
  }, [navigate]);

  // Métodos de formatação
  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length === 10) {
      return `(${telefone.slice(0, 2)})${telefone.slice(2, 6)}-${telefone.slice(6)}`;
    } else if (telefone.length === 11) {
      return `(${telefone.slice(0, 2)})${telefone.slice(2, 7)}-${telefone.slice(7)}`;
    }
    return telefone;
  };

  // Métodos de validação
  const validarNome = (nome) => {
    if (!nome.trim() || nome.trim().length < 3) {
      return MENSAGENS_ERRO.NOME_CURTO;
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

  const validarEmail = (email) => {
    if (!REGEX.EMAIL.test(email)) {
      return MENSAGENS_ERRO.EMAIL_INVALIDO;
    }
    return '';
  };

  const validarSenha = (senha) => {
    if (senha && (senha.length < 8 || senha.length > 16)) {
      return MENSAGENS_ERRO.SENHA_TAMANHO;
    }
    if (senha && !REGEX.SENHA.test(senha)) {
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
  };

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) {
      valor = valor.slice(0, 11);
    }
    setTelefone(valor);
  };

  const formatarTelefoneInput = () => {
    let valor = telefone;
    if (valor.length === 10) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else if (valor.length === 11) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
    setTelefone(valor);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErros({ ...erros, email: validarEmail(e.target.value) });
  };

  const handleNovaSenhaChange = (e) => {
    const valor = e.target.value;
    setNovaSenha(valor);
    setErros({
      ...erros,
      novaSenha: validarSenha(valor),
      repetirNovaSenha: validarRepetirSenha(valor, repetirNovaSenha)
    });
  };

  const handleRepetirNovaSenhaChange = (e) => {
    const valor = e.target.value;
    setRepetirNovaSenha(valor);
    setErros({
      ...erros,
      repetirNovaSenha: validarRepetirSenha(novaSenha, valor)
    });
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!REGEX.IMAGEM_PERFIL.test(file.name)) {
        setErros({ ...erros, imagemPerfil: MENSAGENS_ERRO.IMAGEM_PERFIL_INVALIDA });
        return;
      }

      if (file.size > 16 * 1024 * 1024) {
        setErros({ ...erros, imagemPerfil: 'A imagem deve ter no máximo 16MB' });
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

  // Atualizar perfil
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomeError = validarNome(nome);
    const dataNascimentoError = validarDataNascimento(dataNascimento);
    const emailError = validarEmail(email);
    const novaSenhaError = validarSenha(novaSenha);
    const repetirNovaSenhaError = validarRepetirSenha(novaSenha, repetirNovaSenha);

    setErros({
      nome: nomeError,
      dataNascimento: dataNascimentoError,
      email: emailError,
      novaSenha: novaSenhaError,
      repetirNovaSenha: repetirNovaSenhaError
    });

    if (nomeError || dataNascimentoError || emailError || novaSenhaError || repetirNovaSenhaError) {
      erroAlerta('Por favor, corrija os erros no formulário.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('dataNascimento', dataNascimento);
      formData.append('email', email);
      formData.append('telefone', telefone.replace(/\D/g, ''));
      
      if (novaSenha) {
        formData.append('novaSenha', novaSenha);
      }
      
      if (imagemPerfil) {
        formData.append('imagemPerfil', imagemPerfil);
      }

      const response = await axios.put('http://localhost:8800/auth/atualizarPerfil', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      sucessoAlerta('Perfil atualizado com sucesso!');
      
      // Atualizar a imagem de preview se foi alterada
      if (imagemPerfil) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagemPreview(reader.result);
        };
        reader.readAsDataURL(imagemPerfil);
      }

      // Limpar campos de senha se foram alterados
      if (novaSenha) {
        setNovaSenha('');
        setRepetirNovaSenha('');
      }

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      let errorMessage = 'Erro ao atualizar perfil';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      erroAlerta(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Meu Perfil</h1>
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
                className="form-control"
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength="14"
                readOnly
              />
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
                className="form-control"
                id="telefone"
                placeholder="(00)00000-0000"
                value={telefone}
                onChange={handleTelefoneChange}
                onBlur={formatarTelefoneInput}
                maxLength="15"
              />
            </div>
          </div>

          {/* Coluna 2: Imagem e Senha */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Imagem de Perfil</label>
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
                    Alterar Imagem
                  </label>
                  {erros.imagemPerfil && (
                    <div className="text-danger mt-2">{erros.imagemPerfil}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-10">
              <div className="mb-3">
                <label htmlFor="senhaAtual" className="form-label">Senha Atual</label>
                <input
                  type="password"
                  className="form-control"
                  id="senhaAtual"
                  placeholder="********"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                <input
                  type="password"
                  className={`form-control ${erros.novaSenha ? 'is-invalid' : ''}`}
                  id="novaSenha"
                  placeholder="********"
                  value={novaSenha}
                  onChange={handleNovaSenhaChange}
                />
                {erros.novaSenha && (
                  <small className="text-danger">{erros.novaSenha}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="repetirNovaSenha" className="form-label">Repetir Nova Senha</label>
                <input
                  type="password"
                  className={`form-control ${erros.repetirNovaSenha ? 'is-invalid' : ''}`}
                  id="repetirNovaSenha"
                  placeholder="********"
                  value={repetirNovaSenha}
                  onChange={handleRepetirNovaSenhaChange}
                />
                {erros.repetirNovaSenha && (
                  <small className="text-danger">{erros.repetirNovaSenha}</small>
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
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary me-3"
            style={{ backgroundColor: botaoCor, borderColor: botaoCor }}
          >
            Salvar Alterações
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Perfil;