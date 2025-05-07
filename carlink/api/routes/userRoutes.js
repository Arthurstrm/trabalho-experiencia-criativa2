import express from 'express';
import { 
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getImagemPerfil
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.get('/imagem/:id', getImagemPerfil);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
 


export default router;