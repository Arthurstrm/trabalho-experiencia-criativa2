import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const botaoCor = '#1a1a1a'; // Cor mais escura

function CadastroCarro() {
    const [form, setForm] = useState({
        marca: "", modelo: "", ano: "", placa: "",
        renavam: "", chassi: "", cor: "", motor: "", potencia: "", preco: ""
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

        if (id === "placa" && value.length > 7) return;
        if (id === "renavam" && value.length > 11) return;

        let novoValor = value;

        if (id === "placa") {
            novoValor = value.toUpperCase();
        }

        if (id === "preco") {
            novoValor = formatarMoeda(value);
        }

        setForm({ ...form, [id]: novoValor });
        setErros({ ...erros, [id]: "" });
    };

    const formatarMoeda = (valor) => {
        valor = valor.replace(/\D/g, "");
        const numero = parseInt(valor, 10);
        if (isNaN(numero)) return "";
        return (numero / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
            sucessoAlerta("Carro cadastrado com sucesso!");
            // Limpar formulário se quiser:
            // setForm({ marca: "", modelo: "", ano: "", placa: "", renavam: "", chassi: "", cor: "", motor: "", potencia: "", preco: "" });
        } else {
            erroAlerta("Preencha todos os campos corretamente.");
        }
    };

    const renderInput = (campo, col = "col-md-12") => (
        <div className={`${col} mb-3`} key={campo}>
            <label htmlFor={campo} className="form-label">
                {campo === "preco" ? "Preço Pretendido" : campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
            <input
                type={campo === "ano" || campo === "potencia" ? "number" : "text"}
                className={`form-control py-2 ${erros[campo] ? 'is-invalid' : ''}`}
                id={campo}
                value={form[campo]}
                onChange={handleChange}
                placeholder={campo === "preco" ? "R$0,00" : `Digite ${campo}`}
                maxLength={
                    campo === "renavam" ? 11 :
                        campo === "placa" ? 7 : undefined
                }
            />
            {erros[campo] && <div className="text-danger">{erros[campo]}</div>}
        </div>
    );

    return (
        <div className="container mt-4" style={{ maxWidth: "700px" }}>
            <h1 className="mb-4">Cadastro de Carro</h1>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    {renderInput("marca", "col-md-6")}
                    {renderInput("modelo", "col-md-6")}
                </div>
                <div className="row g-3">
                    {renderInput("ano", "col-md-4")}
                    {renderInput("placa", "col-md-4")}
                    {renderInput("cor", "col-md-4")}
                </div>
                <div className="row g-3">
                    {renderInput("renavam", "col-md-6")}
                    {renderInput("chassi", "col-md-6")}
                </div>
                <div className="row g-3">
                    {renderInput("motor", "col-md-6")}
                    {renderInput("potencia", "col-md-6")}
                </div>
                <div className="row g-3">
                    {renderInput("preco", "col-md-6")}
                </div>

                <div className="d-flex justify-content-start mt-3">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastroCarro;
