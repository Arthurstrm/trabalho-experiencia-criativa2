import mysql from 'mysql2';


export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Senha@123',
    database: 'carlink',
    port: 3306
});
