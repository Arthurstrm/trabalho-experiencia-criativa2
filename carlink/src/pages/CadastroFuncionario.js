import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function CadastroFuncionario() {
  const [form, setForm] = useState({
    nome: "",
    genero: "nao_selecionado",
    dataNascimento: "",
    cpf: "",
    email: "",
    telefone: ""
  });

  const [erros, setErros] = useState({});

  const botaoCor = '#1a1a1a';

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
      confirmButtonText: 'Fechar',
      customClass: {
        confirmButton: 'custom-button'
      }
    });
  };

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
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf[i - 1]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf[i - 1]) * (12 - i);
    }

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
    if (valor.length === 10) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else if (valor.length === 11) {
      valor = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
    setForm({ ...form, telefone: valor });
  };

  const handleNomeChange = (e) => {
    let valor = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setForm({ ...form, nome: valor });
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    let novosErros = {};

    if (!form.nome.trim() || form.nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";
    }
    if (!form.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
      novosErros.cpf = "CPF inválido! Use o formato 000.000.000-00.";
    }
    if (!form.telefone.match(/^\(\d{2}\)\d{4,5}-\d{4}$/)) {
      novosErros.telefone = "Telefone inválido! Use o formato (00)00000-0000.";
    }
    if (!form.email.trim()) {
      novosErros.email = "Por favor, preencha o e-mail corretamente.";
    }
    if (form.genero === "nao_selecionado") {
      novosErros.genero = "Por favor, selecione um gênero.";
    }
    if (!form.dataNascimento) {
      novosErros.dataNascimento = "Por favor, preencha a data de nascimento.";
    } else {
      const dataNascimento = new Date(form.dataNascimento);
      const hoje = new Date();
      if (dataNascimento > hoje) {
        novosErros.dataNascimento = "A data de nascimento é inválida.";
      }
    }
    if (!validarCPF(form.cpf)) {
      novosErros.cpf = "CPF inválido!";
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      sucessoAlerta("Funcionário cadastrado com sucesso!");
    } else {
      erroAlerta("Por favor, corrija os erros no formulário.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1>Cadastro Funcionário</h1>
          <form onSubmit={validarFormulario}>
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
              {erros.nome && <div className="text-danger">{erros.nome}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Gênero</label>
              <select id="genero" className={`form-control ${erros.genero ? 'is-invalid' : ''}`} value={form.genero} onChange={handleChange}>
                <option value="nao_selecionado">Não selecionado</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_informado">Prefiro não informar</option>
              </select>
              {erros.genero && <div className="text-danger">{erros.genero}</div>}
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
              {erros.dataNascimento && <div className="text-danger">{erros.dataNascimento}</div>}
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
              {erros.cpf && <div className="text-danger">{erros.cpf}</div>}
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
              {erros.email && <div className="text-danger">{erros.email}</div>}
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
              {erros.telefone && <div className="text-danger">{erros.telefone}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroFuncionario;
