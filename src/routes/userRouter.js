const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');

routes.post('/register', (req, res) =>{
    const body = req.body;
    userController.registerUser(body.name, body.email, body.password, body.type, body.matricula)
    .then(response => res.status(200).json({ response: response }))
    .catch(response =>res.status(400).json({ response: response }));
})

routes.post('/login', (req, res) =>{
    const body = req.body;
    userRepository.logUserIn(body.email, body.password)
    .then(response => res.status(200).json({ response: response }))
    .catch(response =>res.status(400).json({ response: response }));
})

routes.get('/aluno/:matriculaId', (req, res) =>{

    db.query("SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1", [req.params.matriculaId]).then(response =>{
        res.json(response.rows)
    })
})

module.exports = routes;
