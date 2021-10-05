// eslint-disable-next-line import/no-unresolved
const express = require('express');

const routes = express.Router();
const userRepository = require('../repository/userRepositoty');
const db = require('../../dbconfig/dbConfig');

routes.post('/aluno', (req, res) => {
  const { body } = req;
  userRepository.addUser(body.type, body.name,
    body.matricula, body.email, body.surname, body.password)
    .then((response) => res.status(200).json({ response }))
    .catch((response) => res.status(400).json({ response }));
});

routes.get('/aluno/:matriculaId', (req, res) => {
  db.query('SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1', [req.params.matriculaId]).then((response) => {
    res.json(response.rows);
  });
});

module.exports = routes;
