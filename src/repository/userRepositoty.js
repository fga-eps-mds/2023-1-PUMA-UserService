const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');

function addUser(tipo, nome, matricula, email, sobrenome, senha) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO ALUNO(nome,matricula,email,sobrenome,senha) VALUES ($1,$2,$3,$4,$5) RETURNING *"
            , [nome, matricula, email, sobrenome, senha])
        .then((response) => {
            resolve(response.rows);
        })
        .catch((response) => {
            reject(response);
        });
    });
}

module.exports = { addUser };