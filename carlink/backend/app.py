from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

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

@app.route('/api/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    print("Recebida requisição POST para /api/cadastrar_usuario")
    data = request.get_json()
    print(f"Dados recebidos: {data}")
    nome = data.get('nome')
    data_nascimento = data.get('dataNascimento')
    cpf = data.get('cpf')
    email = data.get('email')
    telefone = data.get('telefone')

    print(f"Nome: {nome}, Email: {email}")

    if not nome or not email:
        print("Erro: Nome ou email ausentes")
        return jsonify({'error': 'Nome e email são obrigatórios.'}), 400

    mydb = conectar_db()
    if mydb is None:
        print("Erro: Falha ao conectar ao banco de dados")
        return jsonify({'error': 'Não foi possível conectar ao banco de dados'}), 500

    mycursor = mydb.cursor()
    try:
        sql = "INSERT INTO usuario (nome, dataNascimento, cpf, email, telefone) VALUES (%s, %s, %s, %s, %s)"
        val = (nome, data_nascimento, cpf, email, telefone)
        print(f"SQL: {sql}, Valores: {val}")
        mycursor.execute(sql, val)
        mydb.commit()
        print("Usuário cadastrado com sucesso!")
        return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201
    except mysql.connector.Error as err:
        print(f"Erro ao executar a consulta: {err}")
        mydb.rollback()
        return jsonify({'error': f'Erro ao cadastrar usuário: {err}'}), 500
    finally:
        mycursor.close()
        mydb.close()


@app.route('/api/cadastro_funcionario', methods=['POST'])
def cadastrar_funcionario():
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