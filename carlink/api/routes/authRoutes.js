import express from 'express';
import { 
  cadastrarUsuario, 
  getUsuarioById,
  login, 
  updateUsuario,
  deleteUsuario  
} from '../controllers/authController.js';
import upload from '../middleware/uploads.js';

const router = express.Router();


router.post('/cadastrarUsuario', upload.single('imagemPerfil'), cadastrarUsuario);
router.post('/login', login);

router.get('/usuario/:id', getUsuarioById); // Buscar usuário
router.put('/usuario/:id', upload.single('imagemPerfil'), updateUsuario); // Atualizar
router.delete('/usuario/:id', deleteUsuario); // Deletar

export default router;