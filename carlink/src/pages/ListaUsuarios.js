import React, { useState, useEffect } from 'react';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/listar_usuarios') // Endereço da sua API
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando usuários...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os usuários: {error.message}</p>;
  }

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            Nome: {usuario.nome}, Email: {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;