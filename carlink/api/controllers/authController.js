import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const login = async (req, res) => {
  const { email, senha } = req.body;
  console.log("Dados recebidos:", { email, senha });

  try {
    // 1. Busca o usuário no banco de dados pelo email
    const [rows] = await db.promise().query(
      'SELECT * FROM usuario WHERE email = ?', 
      [email]
    );
    console.log("Usuário encontrado:", rows);

    // 2. Verifica se encontrou alguém
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = rows[0];

    // 3. Compara a senha digitada com o hash no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    console.log("Senha válida?", senhaValida); 

    // 4. Gera token JWT com o id do usuário
    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET, // Usa a chave do arquivo .env
      { expiresIn: '1h' }
    );

    // 5. Remove a senha do objeto antes de enviar a resposta
    const { senha: _, id, ...userDataWithoutId } = usuario;
    const userData = { ...userDataWithoutId, id_usuario: id };

    // 6. Retorna sucesso
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

// ---------------- CADASTRO ----------------
export const cadastrarUsuario = async (req, res) => {
  const { nome, dataNascimento, cpf, email, telefone, senha } = req.body;
  let imagemBuffer = null;

  console.log('Arquivo recebido:', req.file); // Mostra o arquivo (imagem)

  try {
    // 1. Verifica tamanho da imagem (máx 16MB)
    if (req.file) {
      if (req.file.size > 16 * 1024 * 1024) {
        return res.status(400).json({ error: 'A imagem deve ter no máximo 16MB' });
      }
      imagemBuffer = req.file.buffer; // Pega os dados da imagem
    }

    // 2. Verifica se já existe um usuário com mesmo email ou CPF
    const [userExists] = await db.promise().query(
      'SELECT * FROM usuario WHERE email = ? OR cpf = ?', 
      [email, cpf]
    );

    if (userExists.length > 0) {
      return res.status(400).json({ 
        error: 'Usuário já cadastrado com este email ou CPF' 
      });
    }

    // 3. Gera hash da senha para segurança
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // 4. Insere novo usuário no banco (incluindo a imagem)
    const [result] = await db.promise().query(
      `INSERT INTO usuario 
      (nome, dataNascimento, cpf, email, telefone, senha, imagemPerfil) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, dataNascimento, cpf, email, telefone, senhaHash, imagemBuffer]
    );

    // 5. Gera token para o novo usuário
    const token = jwt.sign(
      { id: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 6. Retorna sucesso
    res.status(201).json({ 
      message: 'Usuário cadastrado com sucesso!',
      token 
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, genero, dataNascimento, cpf, email, telefone, senha } = req.body;
  let imagemBuffer = null;

  try {
    if (req.file) {
      imagemBuffer = req.file.buffer;
    }

    // Se senha foi enviada, cria hash
    let senhaHash;
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      senhaHash = await bcrypt.hash(senha, salt);
    }

    const query = `
      UPDATE usuario 
      SET 
        nome = ?, 
        genero = ?, 
        dataNascimento = ?, 
        cpf = ?, 
        email = ?, 
        telefone = ?,
        ${senha ? 'senha = ?,' : ''}
        ${imagemBuffer ? 'imagemPerfil = ?' : ''}
      WHERE id_usuario = ?
    `;

    const params = [
      nome, genero, dataNascimento, cpf, email, telefone,
      ...(senha ? [senhaHash] : []),
      ...(imagemBuffer ? [imagemBuffer] : []),
      id
    ].filter(Boolean);

    await db.promise().query(query, params);

    // Busca o usuário atualizado para retornar
    const [updatedUser] = await db.promise().query(
      'SELECT id_usuario, nome, genero, dataNascimento, email, telefone FROM usuario WHERE id_usuario = ?',
      [id]
    );

    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

export const deleteUsuario = async (req, res) => { 
  const { id } = req.params;
  
  const q = "DELETE FROM usuario WHERE id_usuario = ?";
  
  db.query(q, [id], (err) => {
      if (err) return res.status(500).json(err);
      
      return res.status(200).json("Usuário excluído com sucesso!");
  });
};

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

export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM usuario WHERE id_usuario = ?', 
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Formata a data para exibição
    const usuario = {
      ...rows[0],
      dataNascimento: new Date(rows[0].dataNascimento).toLocaleDateString('pt-BR')
    };

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

