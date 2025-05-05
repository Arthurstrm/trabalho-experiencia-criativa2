import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const botaoCor = '#1a1a1a'; // Cor mais escura

function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });
  const [erros, setErros] = useState({});

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

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarFormulario = () => {
    let novosErros = {};
    if (!form.email.trim()) {
      novosErros.email = "Este campo é obrigatório!";
    } else if (!validarEmail(form.email)) {
      novosErros.email = "Formato de email inválido!";
    }

    if (!form.senha.trim()) {
      novosErros.senha = "Este campo é obrigatório!";
    } else if (form.senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres!";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Aqui você faria a lógica de autenticação real
      sucessoAlerta("Login realizado com sucesso!");
      // Redirecionar o usuário ou realizar outras ações após o login
      console.log("Dados de login:", form);
    } else {
      erroAlerta("Preencha os campos corretamente.");
    }
  };

  const renderInput = (campo, tipo = "text") => (
    <div className="mb-3" key={campo}>
      <label htmlFor={campo} className="form-label">
        {campo.charAt(0).toUpperCase() + campo.slice(1)}
      </label>
      <input
        type={tipo}
        className={`form-control py-2 ${erros[campo] ? 'is-invalid' : ''}`}
        id={campo}
        value={form[campo]}
        onChange={handleChange}
        placeholder={`Digite seu ${campo}`}
      />
      {erros[campo] && <div className="text-danger">{erros[campo]}</div>}
    </div>
  );

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("email", "email")}
        {renderInput("senha", "password")}
        <div className="d-flex justify-content-start mt-3">
          <button type="submit" className="btn btn-primary px-4 py-2" style={{ backgroundColor: botaoCor, borderColor: botaoCor }}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;