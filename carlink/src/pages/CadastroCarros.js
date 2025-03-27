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

    const [erros, setErros] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
        setErros({ ...erros, [id]: "" });
    };

    const validarPlaca = (placa) => /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/.test(placa);
    const validarCor = (cor) => /^[A-Za-zÀ-ÿ\s]+$/.test(cor);
    const validarAno = (ano) => {
        const anoNum = parseInt(ano, 10);
        const anoAtual = new Date().getFullYear();
        return Number.isInteger(anoNum) && anoNum > 0 && anoNum <= anoAtual;
    };

    const validarFormulario = () => {
        let novosErros = {};

        if (!form.marca.trim()) novosErros.marca = "Informe a marca do veículo.";
        if (!form.modelo.trim()) novosErros.modelo = "Informe o modelo do veículo.";
        if (!form.ano.trim()) novosErros.ano = "Informe o ano de fabricação.";
        else if (!validarAno(form.ano)) novosErros.ano = "Ano inválido! Insira um ano entre 1900 e o atual.";

        if (!form.placa.trim()) novosErros.placa = "Informe a placa do veículo.";
        else if (!validarPlaca(form.placa)) novosErros.placa = "Formato inválido! Use AAA-1234 ou AAA1B23.";

        if (!form.renavam.trim()) novosErros.renavam = "Informe o RENAVAM do veículo.";
        else if (!/^[0-9]{9,11}$/.test(form.renavam)) novosErros.renavam = "RENAVAM deve ter entre 9 e 11 dígitos numéricos.";

        if (!form.chassi.trim()) novosErros.chassi = "Informe o número do chassi do veículo.";

        if (!form.cor.trim()) novosErros.cor = "Informe a cor do veículo.";
        else if (!validarCor(form.cor)) novosErros.cor = "A cor deve conter apenas letras e espaços.";

        if (!form.motor.trim()) novosErros.motor = "Informe o tipo de motor do veículo.";

        if (!form.potencia.trim()) novosErros.potencia = "Informe a potência do motor.";
        else if (isNaN(form.potencia)) novosErros.potencia = "A potência deve ser um número válido.";

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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
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
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroCarro;
