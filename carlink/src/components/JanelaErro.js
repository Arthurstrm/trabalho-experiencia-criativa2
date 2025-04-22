import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const botaoCor = '#2c3e50'; // Cor escura personalizada
const textoBotao = '#fff'; // Cor do texto no botão

export const erroAlerta = (mensagem) => {
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

export const sucessoAlerta = (mensagem) => {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: mensagem,
        confirmButtonColor: botaoCor,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'custom-button'
        }
    });
};

