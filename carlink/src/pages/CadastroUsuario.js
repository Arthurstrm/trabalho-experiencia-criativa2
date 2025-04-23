import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ListaUsuarios from './ListaUsuarios'; // Você pode importar ListaUsuarios aqui se precisar exibir a lista nesta página

function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    telefone: ""
  });

  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErroGeral, setMensagemErroGeral] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErros({ ...erros, [id]: "" });
  };

  const mascaraCPF = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    setForm({ ...form, cpf: valor });
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;
    return true;
  };

  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    setForm({ ...form, telefone: valor });
  };

  const formatarTelefone = () => {
    let valor = form.telefone;
    if (valor.length === 10) valor = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
    else if (valor.length === 11) valor = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
    setForm({ ...form, telefone: valor });
  };

  const handleNomeChange = (e) => {
    let valor = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setForm({ ...form, nome: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let novosErros = {};

    if (!form.nome.trim() || form.nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!form.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      novosErros.cpf = "CPF inválido! Use o formato 000.000.000-00.";
    }
    if (!form.telefone.match(/^\(\d{2}\)\d{4,5}-\d{4}$/)) {
      novosErros.telefone = "Telefone inválido! Use o formato (00)0000-0000.";
    }
    if (!form.email.trim()) {
      novosErros.email = "Por favor, preencha o e-mail corretamente.";
    }
    if (!form.dataNascimento) {
      novosErros.dataNascimento = "Por favor, preencha a data de nascimento.";
    } else {
      const dataNascimento = new Date(form.dataNascimento);
      const hoje = new Date();
      if (dataNascimento > hoje) {
        novosErros.dataNascimento = "A data de nascimento inválida.";
      }
    }
    if (!validarCPF(form.cpf)) {
      novosErros.cpf = "CPF inválido!";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/cadastrar_usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          setMensagemSucesso('Usuário cadastrado com sucesso!');
          setMensagemErroGeral('');
          setForm({ nome: '', dataNascimento: '', cpf: '', email: '', telefone: '' }); // Limpa o formulário
        } else {
          setMensagemErroGeral('Erro ao cadastrar o usuário.');
          setMensagemSucesso('');
          if (data && data.errors) {
            setErros(data.errors); // Exibe erros específicos do backend (se houver)
          } else if (data && data.message) {
            setMensagemErroGeral(data.message); // Exibe uma mensagem de erro geral do backend
          }
        }
      } catch (error) {
        setMensagemErroGeral('Erro ao conectar com o servidor.');
        setMensagemSucesso('');
        console.error('Erro ao enviar dados:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro Usuário</h1>
          {mensagemSucesso && <p className="alert alert-success">{mensagemSucesso}</p>}
          {mensagemErroGeral && <p className="alert alert-danger">{mensagemErroGeral}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
                id="nome"
                placeholder="Nome completo"
                value={form.nome}
                onChange={handleNomeChange}
              />
              {erros.nome && <div className="invalid-feedback">{erros.nome}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="dataNascimento" className="form-label">Data nascimento</label>
              <input
                type="date"
                className={`form-control ${erros.dataNascimento ? 'is-invalid' : ''}`}
                id="dataNascimento"
                value={form.dataNascimento}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
              {erros.dataNascimento && <div className="invalid-feedback">{erros.dataNascimento}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="cpf" className="form-label">CPF</label>
              <input
                type="text"
                className={`form-control ${erros.cpf ? 'is-invalid' : ''}`}
                id="cpf"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={mascaraCPF}
                maxLength="14"
              />
              {erros.cpf && <div className="invalid-feedback">{erros.cpf}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
              />
              {erros.email && <div className="invalid-feedback">{erros.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input
                type="text"
                className={`form-control ${erros.telefone ? 'is-invalid' : ''}`}
                id="telefone"
                placeholder="(00)00000-0000"
                value={form.telefone}
                onChange={handleTelefoneChange}
                onBlur={formatarTelefone}
                maxLength="15"
              />
              {erros.telefone && <div className="invalid-feedback">{erros.telefone}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
          {/* Você pode renderizar o componente ListaUsuarios aqui, se necessário */}
          {/* <ListaUsuarios /> */}
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;