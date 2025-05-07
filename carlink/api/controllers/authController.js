import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Chave from 'Key.env';

export const login = async (req, res) => {
  const { email, senha } = req.body;
  console.log("Dados recebidos:", { email, senha });

  try {
    // 1. Busca usuário no banco
    const [rows] = await db.promise().query(
      'SELECT * FROM usuario WHERE email = ?', 
      [email]
    );
    console.log("Usuário encontrado:", rows);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = rows[0];

    // 2. Verifica senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    console.log("Senha válida?", senhaValida); 


    // 4. Remove a senha do objeto de retorno
    const { senha: _, ...userData } = usuario;

    res.status(200).json({
      message: 'Login bem-sucedido',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

export const cadastrarUsuario = async (req, res) => {
    const { nome, dataNascimento, cpf, email, telefone, senha } = req.body;
    let imagemBuffer = null;
    console.log('Arquivo recebido:', req.file); // Para debug
  
    try {
      // Verifica tamanho da imagem (se existir)
      if (req.file) {
        if (req.file.size > 16 * 1024 * 1024) { // 16MB em bytes
          return res.status(400).json({ error: 'A imagem deve ter no máximo 16MB' });
        }
        imagemBuffer = req.file.buffer; // Buffer da imagem
      }
  
      // Verifica se usuário já existe
      const [userExists] = await db.promise().query(
        'SELECT * FROM usuario WHERE email = ? OR cpf = ?', 
        [email, cpf]
      );
  
      if (userExists.length > 0) {
        return res.status(400).json({ 
          error: 'Usuário já cadastrado com este email ou CPF' 
        });
      }
  
      // Gera hash da senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
  
      // Insere no banco (incluindo BLOB)
      const [result] = await db.promise().query(
        `INSERT INTO usuario 
        (nome, dataNascimento, cpf, email, telefone, senha, imagemPerfil) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, dataNascimento, cpf, email, telefone, senhaHash, imagemBuffer]
      );
  
      // Gera token JWT
      const token = jwt.sign(
        { id: result.insertId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ 
        message: 'Usuário cadastrado com sucesso!',
        token 
      });
  
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  };