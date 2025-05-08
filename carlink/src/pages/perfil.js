import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUsuario(storedUser);
  }, [navigate]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/usuarios/${usuario.id_usuario}`, usuario);
      alert('Dados atualizados com sucesso!');
      localStorage.setItem('usuario', JSON.stringify({
        ...usuario,
        dataNascimento: usuario.dataNascimento || '',
      }));
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar os dados.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
      try {
        await axios.delete(`http://localhost:8800/usuarios/${usuario.id_usuario}`);
        alert('Conta excluída com sucesso!');
        localStorage.removeItem('usuario');
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir a conta.');
      }
    }
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className="container mt-5">
      <h1>Meu Perfil</h1>

      <div className="mb-3">
        <label>Nome:</label>
        <input type="text" name="nome" value={usuario.nome} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Email:</label>
        <input type="email" name="email" value={usuario.email} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Senha:</label>
        <input type="password" name="senha" value={usuario.senha || ''} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Telefone:</label>
        <input type="text" name="telefone" value={usuario.telefone} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="dataNascimento"
          value={(usuario.dataNascimento || '').split('T')[0]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Gênero:</label>
        <select name="genero" value={usuario.genero} onChange={handleChange} className="form-control">
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <button className="btn btn-success me-2" onClick={handleUpdate}>Salvar Alterações</button>
      <button className="btn btn-danger" onClick={handleDelete}>Excluir Conta</button>
    </div>
  );
}

export default Perfil;
