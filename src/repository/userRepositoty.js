const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

function addUser(tipo, nome, matricula, email, sobrenome, senha) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(senha, saltRounds, (error, hash) => {
            
            if(error) {
                reject(error);
            } else {
                db.query(
                    "INSERT INTO ALUNO(nome,matricula,email,sobrenome,senha) VALUES ($1,$2,$3,$4,$5) RETURNING *"
                    , [nome, matricula, email, sobrenome, hash])
                    .then((response) => {
                        resolve(response.rows);
                    })
                    .catch((response) => {
                    reject(response);
                });
            }
        });
    });
}

module.exports = { addUser };