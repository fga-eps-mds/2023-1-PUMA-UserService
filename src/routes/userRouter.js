const express = require('express');
const routes = express.Router();
const userController = require('../controller/userController');
const db = require('../../dbconfig/dbConfig');
const userRepository = require('../repository/userRepositoty');

routes.post('/register', (req, res) => {
    const body = req.body;
    userController.registerUser(body).then(response => {
        console.log('res 200');
        res.status(200).json({ response: response });
    }).catch(response => {
        console.log('res 400');
        res.status(400).json({ response: response });
    });
})

routes.post('/login', (req, res) => {
    const body = req.body;
    userRepository.checkUser(body)
        .then(userId => {
            res.status(200).json({ userId })
        })
        .catch(response => {
            res.status(400).json({ response: response })
        });
})

routes.get('/aluno/:matriculaId', (req, res) => {

    db.query("SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1", [req.params.matriculaId]).then(response => {
        res.json(response.rows)
    })
})

module.exports = routes;
