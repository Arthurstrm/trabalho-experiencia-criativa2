import React, { useState, useEffect } from 'react';
import { Plus, User, Users, Car } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import {useTable} from 'react-table';
import axios from 'axios';
import { useMemo } from 'react';


// Componente para adicionar funcionários
const AdicionarFuncionario = ({ onAdd }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para adicionar funcionário (API call, etc.)
        const novoFuncionario = { nome, email, cargo };
        onAdd(novoFuncionario); // Chama a função onAdd para adicionar à lista
        setNome('');
        setEmail('');
        setCargo('');

        Swal.fire({
            title: 'Sucesso!',
            text: 'Funcionário adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title mb-4">
                    <User className="mr-2" size={20} /> Adicionar Funcionário
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite o email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="cargo">Cargo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cargo"
                            placeholder="Digite o cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <Plus className="mr-2" size={16} /> Adicionar Funcionário
                    </button>
                </form>
            </div>
        </div>
    );
};

// Componente para adicionar usuários
const AdicionarUsuario = ({ onAdd }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para adicionar usuário (API call, etc.)
        const novoUsuario = { nome, email, senha, dataNascimento, telefone, endereco, role };
        onAdd(novoUsuario);
        setNome('');
        setEmail('');
        setSenha('');
        setDataNascimento('');
        setTelefone('');
        setEndereco('');
        setRole('');

        Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title mb-4">
                    <Users className="mr-2" size={20} /> Adicionar Usuário
                </h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group mb-3">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Digite o email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Digite a senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataNascimento"
                            placeholder="Digite a data de nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefone"
                            placeholder="Digite o telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            id="endereco"
                            placeholder="Digite o endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="role">Role</label>
                        <select
                            className="form-select"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Selecione o Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <Plus className="mr-2" size={16} /> Adicionar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
};

// Componente para adicionar carros
const AdicionarCarro = ({ onAdd }) => {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [ano, setAno] = useState('');
    const [placa, setPlaca] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para adicionar carro (API call, etc.)
        const novoCarro = { modelo, marca, ano, placa };
        onAdd(novoCarro);
        setModelo('');
        setMarca('');
        setAno('');
        setPlaca('');

        Swal.fire({
            title: 'Sucesso!',
            text: 'Carro adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title mb-4">
                    <Car className="mr-2" size={20} /> Adicionar Carro
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="modelo">Modelo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="modelo"
                            placeholder="Digite o modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="marca">Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            id="marca"
                            placeholder="Digite a marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="ano">Ano</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ano"
                            placeholder="Digite o ano"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="placa">Placa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="placa"
                            placeholder="Digite a placa"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <Plus className="mr-2" size={16} /> Adicionar Carro
                    </button>
                </form>
            </div>
        </div>
    );
};

// Componente principal da página de administração
const Admin = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [carros, setCarros] = useState([]);
    const [showFuncionarioForm, setShowFuncionarioForm] = useState(false);
    const [showUsuarioForm, setShowUsuarioForm] = useState(false);
    const [showCarroForm, setShowCarroForm] = useState(false);

    // Adiciona um novo funcionário à lista
    const handleAddFuncionario = (novoFuncionario) => {
        setFuncionarios([...funcionarios, novoFuncionario]);
        setShowFuncionarioForm(false); // Esconde o formulário após adicionar
    };

    // Adiciona um novo usuário à lista
    const handleAddUsuario = (novoUsuario) => {
        setUsuarios([...usuarios, novoUsuario]);
        setShowUsuarioForm(false);
    };

    // Adiciona um novo carro à lista
    const handleAddCarro = (novoCarro) => {
        setCarros([...carros, novoCarro]);
        setShowCarroForm(false);
    };

    const columns=React.useMemo(()=> [
        { Header: 'Nome', accessor: 'nome' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Data de Nascimento', accessor: 'dataNascimento' },
        { Header: 'Telefone', accessor: 'telefone' },
        { Header: 'Endereço', accessor: 'endereco' },
        { Header: 'Role', accessor: 'role' }
    ],[]);


    return (
        <div className="container mt-5">
            <h1 className="mb-4">Painel de Administração</h1>
            <ul className="nav nav-tabs mb-3" id="admin-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="funcionarios-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#funcionarios"
                        type="button"
                        role="tab"
                        aria-controls="funcionarios"
                        aria-selected="true"
                    >
                        Funcionários
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="usuarios-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#usuarios"
                        type="button"
                        role="tab"
                        aria-controls="usuarios"
                        aria-selected="false"
                    >
                        Usuários
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="carros-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#carros"
                        type="button"
                        role="tab"
                        aria-controls="carros"
                        aria-selected="false"
                    >
                        Carros
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="admin-tabs-content">
                <div
                    className="tab-pane fade show active"
                    id="funcionarios"
                    role="tabpanel"
                    aria-labelledby="funcionarios-tab"
                >
                    <div className="mb-4">
                        <button className="btn btn-primary" onClick={() => setShowFuncionarioForm(!showFuncionarioForm)}>
                            <Plus className="mr-2" size={16} /> Adicionar Funcionário
                        </button>
                        {showFuncionarioForm && <AdicionarFuncionario onAdd={handleAddFuncionario} />}
                    </div>
                    {/* Lista de Funcionários */}
                    {funcionarios.length > 0 && (
                        <div>
                            <h3>Lista de Funcionários:</h3>
                            <ul>
                                {funcionarios.map((func, index) => (
                                    <li key={index}>
                                        Nome: {func.nome}, Email: {func.email}, Cargo: {func.cargo}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    className="tab-pane fade"
                    id="usuarios"
                    role="tabpanel"
                    aria-labelledby="usuarios-tab"
                >
                    <div className="mb-4">
                        <button className="btn btn-primary" onClick={() => setShowUsuarioForm(!showUsuarioForm)}>
                            <Plus className="mr-2" size={16} /> Adicionar Usuário
                        </button>
                        {showUsuarioForm && <AdicionarUsuario onAdd={handleAddUsuario} />}
                    </div>
                    {/* Lista de Usuários */}
                    
                </div>
                <div
                    className="tab-pane fade"
                    id="carros"
                    role="tabpanel"
                    aria-labelledby="carros-tab"
                >
                    <div className="mb-4">
                        <button className="btn btn-primary" onClick={() => setShowCarroForm(!showCarroForm)}>
                            <Plus className="mr-2" size={16} /> Adicionar Carro
                        </button>
                        {showCarroForm && <AdicionarCarro onAdd={handleAddCarro} />}
                    </div>
                    {/* Lista de Carros */}
                    {carros.length > 0 && (
                        <div>
                            <h3>Lista de Carros:</h3>
                            <ul>
                                {carros.map((carro, index) => (
                                    <li key={index}>
                                        Modelo: {carro.modelo}, Marca: {carro.marca}, Ano: {carro.ano}, Placa: {carro.placa}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;

