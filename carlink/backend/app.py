from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)

# Configurações do banco de dados
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'carlink'
}

def conectar_db():
    try:
        mydb = mysql.connector.connect(**DB_CONFIG)
        return mydb
    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao MySQL: {err}")
        return None

@app.route('/api/listar_usuarios', methods=['GET'])
def listar_usuarios():
    mydb = conectar_db()
    if mydb is None:
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500
    mycursor = mydb.cursor(dictionary=True)
    try:
        mycursor.execute("SELECT id, nome, email FROM usuarios")
        usuarios = mycursor.fetchall()
        return jsonify(usuarios)
    except mysql.connector.Error as err:
        return jsonify({'error': f'Erro ao executar a consulta: {err}'}), 500
    finally:
        mycursor.close()
        mydb.close()

@app.route('/api/cadastrar_login', methods=['POST'])
def cadastrar_login():
    print("Recebida requisição POST para /api/cadastrar_login")
    data = request.get_json()
    print(f"Dados recebidos para cadastro de login: {data}")
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        print("Erro: Email ou senha ausentes")
        return jsonify({'error': 'Email e senha são obrigatórios.'}), 400

    mydb = conectar_db()
    if mydb is None:
        print("Erro: Falha ao conectar ao banco de dados")
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    mycursor = mydb.cursor()
    try:
        # Verificar se o e-mail já existe
        mycursor.execute("SELECT id_login FROM login WHERE email = %s", (email,))
        existing_user = mycursor.fetchone()
        if existing_user:
            print(f"Erro: Email '{email}' já cadastrado.")
            return jsonify({'error': 'Este email já está cadastrado.'}), 409 # Código 409 para conflito

        # Hash da senha antes de salvar
        senha_hash = generate_password_hash(senha)

        sql = "INSERT INTO login (email, senha_hash) VALUES (%s, %s)"
        val = (email, senha_hash)
        print(f"SQL para cadastrar login: {sql}, Valores: {val}")
        mycursor.execute(sql, val)
        mydb.commit()
        login_id = mycursor.lastrowid # Obter o ID do login inserido
        print(f"Login cadastrado com sucesso! ID do Login: {login_id}")
        return jsonify({'message': 'Login cadastrado com sucesso!', 'login_id': login_id}), 201
    except mysql.connector.Error as err:
        print(f"Erro ao executar a consulta de cadastro de login: {err}")
        mydb.rollback()
        return jsonify({'error': f'Erro ao cadastrar login: {err}'}), 500
    finally:
        mycursor.close()
        mydb.close()

@app.route('/api/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    print("Recebida requisição POST para /api/cadastrar_usuario (informações adicionais)")
    data = request.get_json()
    print(f"Dados recebidos para informações adicionais do usuário: {data}")
    login_id = data.get('login_id')
    nome = data.get('nome')
    data_nascimento = data.get('dataNascimento')
    cpf = data.get('cpf')
    telefone = data.get('telefone')

    if not login_id:
        print("Erro: login_id ausente")
        return jsonify({'error': 'O ID do login é obrigatório para cadastrar as informações do usuário.'}), 400

    mydb = conectar_db()
    if mydb is None:
        print("Erro: Falha ao conectar ao banco de dados")
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    mycursor = mydb.cursor()
    try:
        # Verificar se o login_id existe na tabela Login
        mycursor.execute("SELECT id_login FROM login WHERE id_login = %s", (login_id,))
        login_existente = mycursor.fetchone()
        if not login_existente:
            print(f"Erro: login_id '{login_id}' não encontrado.")
            return jsonify({'error': 'ID de login inválido.'}), 400

        sql = "INSERT INTO usuario (login_id, nome, dataNascimento, cpf, telefone) VALUES (%s, %s, %s, %s, %s)"
        val = (login_id, nome, data_nascimento, cpf, telefone)
        print(f"SQL para cadastrar usuário: {sql}, Valores: {val}")
        mycursor.execute(sql, val)
        mydb.commit()
        print("Informações do usuário cadastradas com sucesso!")
        return jsonify({'message': 'Informações do usuário cadastradas com sucesso!'}), 201
    except mysql.connector.Error as err:
        print(f"Erro ao executar a consulta de cadastro de usuário: {err}")
        mydb.rollback()
        return jsonify({'error': f'Erro ao cadastrar informações do usuário: {err}'}), 500
    finally:
        mycursor.close()
        mydb.close()


@app.route('/api/cadastro_funcionario', methods=['POST', 'OPTIONS'])
def cadastrar_funcionario():
    if request.method == 'OPTIONS':
        print("REQUISIÇÃO OPTIONS PARA /api/cadastro_funcionario RECEBIDA!")
        return '', 204
    elif request.method == 'POST':
        print("------------------------------------")
        print("A FUNÇÃO CADASTRAR_FUNCIONARIO FOI CHAMADA!")
        print("------------------------------------")
        print("Recebida requisição POST para /api/cadastrar_funcionario")
        data = request.get_json()
        print(f"Dados recebidos para funcionário: {data}")
        nome = data.get('nome')
        genero = data.get('genero')
        data_nascimento = data.get('dataNascimento')
        cpf = data.get('cpf')
        email = data.get('email')
        telefone = data.get('telefone')

        print(f"Nome: {nome}, Email: {email}")

        if not nome or not email:
            print("Erro: Nome ou email do funcionário ausentes")
            return jsonify({'error': 'Nome e email do funcionário são obrigatórios.'}), 400

        mydb = conectar_db()
        if mydb is None:
            print("Erro: Falha ao conectar ao banco de dados")
            return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

        mycursor = mydb.cursor()
        try:
            sql = "INSERT INTO funcionario (nome, genero, dataNascimento, cpf, email, telefone) VALUES (%s, %s, %s, %s, %s, %s)"
            val = (nome, genero, data_nascimento, cpf, email, telefone)
            print(f"SQL para funcionário: {sql}, Valores: {val}")
            mycursor.execute(sql, val)
            mydb.commit()
            print("Funcionário cadastrado com sucesso!")
            return jsonify({'message': 'Funcionário cadastrado com sucesso!'}), 201
        except mysql.connector.Error as err:
            print(f"Erro ao executar a consulta de funcionário: {err}")
            mydb.rollback()
            return jsonify({'error': f'Erro ao cadastrar funcionário: {err}'}), 500
        finally:
            mycursor.close()
            mydb.close()

if __name__ == '__main__':
    app.run(debug=True)