const express = require('express');
const routes = express.Router();
const userRepository = require('../repository/userRepositoty');
const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');

routes.post('/aluno', (req, res) =>{
    const body = req.body;
    userRepository.addUser(body.type, body.name, body.matricula, body.email, body.surname, body.password)
    .then(response => res.status(200).json({ response: response }))
    .catch(response =>res.status(400).json({ response: response }));
})

routes.get('/aluno/:matriculaId', (req, res) =>{

    var response = db.query("SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1", [req.params.matriculaId]).then(response =>{
        res.json(response.rows)
    })
})

module.exports = routes;