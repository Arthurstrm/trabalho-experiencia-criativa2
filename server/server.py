from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Permite chamadas do front-end React

# Configuração do MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",          # Substitua pelo seu usuário
    password="sua_senha", # Substitua pela senha do MySQL
    database="nome_do_banco"
)

# Rota para buscar dados
@app.route('/api/produtos', methods=['GET'])
def get_produtos():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM produtos")
    resultados = cursor.fetchall()
    cursor.close()
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(port=3001, debug=True)