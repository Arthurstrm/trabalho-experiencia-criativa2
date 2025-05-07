import express from 'express';
import { cadastrarUsuario, login } from '../controllers/authController.js';
import upload from '../middleware/uploads.js'; 

const router = express.Router();

router.post('/cadastrarUsuario', upload.single('imagemPerfil'), cadastrarUsuario); // Rota de cadastro
router.post('/login', login);      // Rota de login

export default router;