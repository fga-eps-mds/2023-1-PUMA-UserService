// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const userController = require('../controller/userController');
const db = require('../../dbconfig/dbConfig');
const userRepository = require('../repository/userRepository');

routes.post('/register', (req, res) => {
  const { body } = req;
  userController.registerUser(body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.post('/login', (req, res) => {
  const { body } = req;
  userRepository.checkUser(body)
    .then((userId) => {
      res.status(200).json({ userId });
    })
    .catch((response) => {
      res.status(400).json({ response });
    });
});

routes.get('/aluno/:matriculaId', (req, res) => {
  db.query('SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1', [req.params.matriculaId]).then((response) => {
    res.json(response.rows);
  });
});

module.exports = routes;
