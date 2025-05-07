import { db } from '../db.js';

export const getUsuarios = (_, res) => {
    const q = "SELECT * FROM usuario";
    
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        
        // Formata a data para PT-BR
        const usuarios = data.map(user => ({
            ...user,
            dataNascimento: new Date(user.dataNascimento).toLocaleDateString('pt-BR')
        }));
        
        return res.status(200).json(usuarios);
    });
};

// Adicione outras operações CRUD aqui
export const createUsuario = async (req, res) => { 
    const { nome, genero, dataNascimento, cpf, email, telefone, senha, imagem } = req.body;
    
    const q = "INSERT INTO usuario (nome, genero, dataNascimento, cpf, email, telefone, senha, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(q, [nome, genero, dataNascimento, cpf, email, telefone, senha, imagem], (err) => {
        if (err) return res.status(500).json(err);
        
        return res.status(201).json("Usuário criado com sucesso!");
    });
 };
export const updateUsuario = async (req, res) => { 
    const { id } = req.params;
    const { nome, genero, dataNascimento, cpf, email, telefone, senha, imagem } = req.body;
    
    const q = "UPDATE usuario SET nome = ?, genero = ?, dataNascimento = ?, cpf = ?, email = ?, telefone = ?, senha = ?, imagem = ? WHERE id_usuario = ?";
    
    db.query(q, [nome, genero, dataNascimento, cpf, email, telefone, senha, imagem, id], (err) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json("Usuário atualizado com sucesso!");
    });
 };
export const deleteUsuario = async (req, res) => { 
    const { id } = req.params;
    
    const q = "DELETE FROM usuario WHERE id_usuario = ?";
    
    db.query(q, [id], (err) => {
        if (err) return res.status(500).json(err);
        
        return res.status(200).json("Usuário excluído com sucesso!");
    });
 };

 export const getImagemPerfil = async (req, res) => {
    try {
      const [rows] = await db.query(
        'SELECT imagemPerfil FROM usuario WHERE id_usuario = ?',
        [req.params.id]
      );
  
      if (!rows[0]?.imagemPerfil) {
        return res.status(404).send('Imagem não encontrada');
      }
  
      res.set('Content-Type', 'image/jpeg');
      res.send(rows[0].imagemPerfil);
      
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
      res.status(500).send('Erro interno do servidor');
    }
  };