import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/admin/usuarios');
        setUsers(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Função para deletar usuário
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`http://localhost:8800/admin/usuarios/${id}`);
        setUsers(users.filter(user => user.id_usuario !== id));
      } catch (err) {
        console.error("Erro ao deletar usuário:", err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Usuários</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Data Nasc.</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Senha</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_usuario}>
                  <td>{user.id_usuario}</td>
                  <td>{user.nome}</td>
                  <td>{user.genero}</td>
                  <td>{new Date(user.dataNascimento).toLocaleDateString('pt-BR')}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.telefone}</td>
                  <td>{user.senha}</td>
                  <td>
                    {user.imagemPerfil ? (
                      <img 
                        src={user.imagemPerfil} 
                        alt="Perfil" 
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    ) : (
                      'Sem imagem'
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {/* Lógica para editar */}}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id_usuario)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;