import multer from 'multer';
import path from 'path'; // Adicione esta linha

const storage = multer.memoryStorage(); // Armazena na memória como Buffer

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 16 * 1024 * 1024 // 16MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Apenas imagens (JPEG, JPG, PNG, GIF) são permitidas!'));
    }
});

export default upload;