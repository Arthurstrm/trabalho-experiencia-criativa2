import React, { useState } from 'react';

function CadastroCarro() {
    const [form, setForm] = useState({
        marca: "",
        modelo: "",
        ano: "",
        placa: "",
        renavam: "",
        chassi: "",
        cor: "",
        motor: "",
        potencia: ""
    });

<<<<<<< HEAD
    const [erros, setErros] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });

        // Remove erro ao digitar novamente
        setErros({ ...erros, [id]: "" });
    };

    const validarPlaca = (placa) => /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/.test(placa);
    const validarCor = (cor) => /^[A-Za-zÀ-ÿ\s]+$/.test(cor);
=======
    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    const validarPlaca = (placa) => {
        const regexPlaca = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/;
        return regexPlaca.test(placa);
    };

    const validarCor = (cor) => {
        return /^[A-Za-zÀ-ÿ\s]+$/.test(cor);
    };

>>>>>>> 798b8a1997a2e33683d7073b8226fe0a53efcf3b
    const validarAno = (ano) => {
        const anoNum = parseInt(ano, 10);
        const anoAtual = new Date().getFullYear();
        return !isNaN(anoNum) && anoNum >= 1970 && anoNum <= anoAtual;
    };

    const validarFormulario = () => {
<<<<<<< HEAD
        let novosErros = {};

        Object.keys(form).forEach((campo) => {
            if (!form[campo].trim()) {
                novosErros[campo] = "Este campo é obrigatório!";
            }
        });

        if (form.ano && !validarAno(form.ano)) {
            novosErros.ano = "Ano deve estar entre 1970 e o ano atual!";
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
=======
        if (!form.marca || !form.modelo || !form.ano || !form.placa || !form.renavam || !form.chassi || !form.cor || !form.motor || !form.potencia) {
            alert("Todos os campos devem ser preenchidos!");
            return false;
        }
        if (!validarAno(form.ano)) {
            alert("Ano deve estar entre 1970 e o ano atual!");
            return false;
        }
        if (!/^[0-9]{9,11}$/.test(form.renavam)) {
            alert("RENAVAM deve conter apenas números e ter entre 9 e 11 dígitos!");
            return false;
        }
        if (!validarPlaca(form.placa)) {
            alert("Placa inválida! Use o formato AAA-1234 ou AAA1B23");
            return false;
        }
        if (!validarCor(form.cor)) {
            alert("Cor deve conter apenas letras!");
            return false;
        }
        if (isNaN(form.potencia)) {
            alert("Potência deve ser um número válido!");
            return false;
        }
        return true;
>>>>>>> 798b8a1997a2e33683d7073b8226fe0a53efcf3b
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            alert("Cadastro realizado com sucesso!");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
<<<<<<< HEAD
                    <h1>Cadastro de Carro</h1>
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
                                />
                                {erros[campo] && <div className="text-danger">{erros[campo]}</div>}
                            </div>
                        ))}
=======
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <input type="text" className="form-control" id="marca" placeholder="Ex: Toyota" value={form.marca} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="modelo" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modelo" placeholder="Ex: Corolla" value={form.modelo} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ano" className="form-label">Ano</label>
                            <input type="number" className="form-control" id="ano" placeholder="Ex: 2022" value={form.ano} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="placa" className="form-label">Placa</label>
                            <input type="text" className="form-control" id="placa" placeholder="Ex: ABC-1234 ou ABC1B23" value={form.placa} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="renavam" className="form-label">RENAVAM</label>
                            <input type="text" className="form-control" id="renavam" placeholder="Ex: 123456789" value={form.renavam} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="chassi" className="form-label">Chassi</label>
                            <input type="text" className="form-control" id="chassi" placeholder="Ex: 9BWZZZ377VT004251" value={form.chassi} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cor" className="form-label">Cor</label>
                            <input type="text" className="form-control" id="cor" placeholder="Ex: Preto" value={form.cor} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="motor" className="form-label">Motor</label>
                            <select className="form-control" id="motor" value={form.motor} onChange={handleChange}>
                                <option value="">Selecione</option>
                                <option value="1.0">1.0</option>
                                <option value="1.4">1.4</option>
                                <option value="1.6">1.6</option>
                                <option value="1.8">1.8</option>
                                <option value="2.0">2.0</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="potencia" className="form-label">Potência (CV)</label>
                            <input type="number" className="form-control" id="potencia" placeholder="Ex: 120" value={form.potencia} onChange={handleChange} />
                        </div>
>>>>>>> 798b8a1997a2e33683d7073b8226fe0a53efcf3b

                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroCarro;
