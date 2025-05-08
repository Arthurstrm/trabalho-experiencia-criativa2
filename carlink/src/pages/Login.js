import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const botaoCor = '#1a1a1a';

function Login() {
  const [form, setForm] = useState({
    email: "carlink@carlink.com",
    senha: "Senha@123"
  });
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const showAlert = (icon, title, text) => {
    return Swal.fire({
      icon,
      title,
      text,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validarFormulario()) {
      await showAlert('error', 'Erro', 'Preencha os campos corretamente.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/auth/login', {
        email: form.email,
        senha: form.senha
      });

      // Armazenar token e dados do usuário
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify({
        id: response.data.user.id,
        nome: response.data.user.nome,
        email: response.data.user.email
      }));

      await showAlert('success', 'Sucesso!', 'Login realizado com sucesso!');
      
      
      
        window.location.href = '/';
      

    } catch (error) {
      let errorMessage = "Erro ao conectar com o servidor";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Email ou senha incorretos!";
        } else if (error.response.status === 404) {
          errorMessage = "Rota não encontrada";
        }
      }

      await showAlert('error', 'Erro', errorMessage);
    } finally {
      setLoading(false);
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
        placeholder={`${campo}`}
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
          <button 
            type="submit" 
            className="btn btn-primary px-4 py-2" 
            style={{ backgroundColor: botaoCor, borderColor: botaoCor }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Carregando...
              </>
            ) : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;