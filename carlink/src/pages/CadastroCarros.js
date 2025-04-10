import React, { useState } from 'react';
import fundoCadastro from '../img/pexels-sarmad-mughal-94606-305070.jpg';

function CadastroCarro() {
    const [form, setForm] = useState({
        marca: "", modelo: "", ano: "", placa: "",
        renavam: "", chassi: "", cor: "", motor: "", potencia: ""
    });
    const [erros, setErros] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "placa" && value.length > 7) return;
        if (id === "renavam" && value.length > 11) return;

        setForm({ ...form, [id]: id === "placa" ? value.toUpperCase() : value });
        setErros({ ...erros, [id]: "" });
    };

    const validarPlaca = (placa) => /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/.test(placa);
    const validarCor = (cor) => /^[A-Za-zÀ-ÿ\s]+$/.test(cor);
    const validarAno = (ano) => {
        const anoNum = parseInt(ano, 10);
        const anoAtual = new Date().getFullYear();
        return Number.isInteger(anoNum) && anoNum > 0 && anoNum <= anoAtual;
    };

    const validarFormulario = () => {
        let novosErros = {};
        Object.keys(form).forEach((campo) => {
            if (!form[campo].trim()) {
                novosErros[campo] = "Este campo é obrigatório!";
            }
        });
        if (form.ano && !validarAno(form.ano)) {
            novosErros.ano = "Ano deve ser o ano atual ou anteriores!";
        }
        if (form.renavam && !/^[0-9]{9,11}$/.test(form.renavam)) {
            novosErros.renavam = "RENAVAM deve ter entre 9 e 11 dígitos!";
        }
        if (form.placa && !validarPlaca(form.placa)) {
            novosErros.placa = "Formato inválido! Use AAA-1234 ou AAA1B23";
        }
        if (form.cor && !validarCor(form.cor)) {
            novosErros.cor = "Cor deve conter apenas letras!";
        }
        if (form.potencia && isNaN(form.potencia)) {
            novosErros.potencia = "Potência deve ser um número válido!";
        }
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert("Cadastro realizado com sucesso!");
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${fundoCadastro})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                overflow: 'auto',
                position: 'relative'
            }}
        >
            {/* Camada escura por cima do fundo */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 0
            }} />

            {/* Conteúdo do formulário */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '30px',
                    borderRadius: '10px',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                    <h1 className="text-center mb-4">Cadastro de Carro</h1>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(form).map((campo) => (
                            <div className="mb-3" key={campo}>
                                <label htmlFor={campo} className="form-label">
                                    {campo.charAt(0).toUpperCase() + campo.slice(1)}
                                </label>
                                <input
                                    type={campo === "ano" || campo === "potencia" ? "number" : "text"}
                                    className={`form-control ${erros[campo] ? 'is-invalid' : ''}`}
                                    id={campo}
                                    value={form[campo]}
                                    onChange={handleChange}
                                    placeholder={`Digite ${campo}`}
                                    maxLength={campo === "renavam" ? 11 : campo === "placa" ? 7 : undefined}
                                />
                                {erros[campo] && <div className="text-danger">{erros[campo]}</div>}
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroCarro;