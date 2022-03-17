const express = require('express');

const routes = express.Router();
const userController = require('../controller/userController');
const db = require('../../dbconfig/dbConfig');

routes.post('/register', (req, res) => {
  const { body } = req;
  userController.registerUser(body).then((response) => {
    res.status(200).json({ response });
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

routes.post('/login', (req, res) => {
  const { body } = req;
  userController.checkUserAndGetType(body).then((response) => {
    res.status(200).json({ ...response });
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

routes.get('/aluno/:matriculaId', (req, res) => {
  db.query('SELECT a.nome,a.matricula,a.sobrenome,a.email FROM ALUNO as a WHERE matricula=$1', [req.params.matriculaId]).then((response) => {
    res.json(response.rows);
  });
});

routes.get('/', (req, res) => {
  res.status(200).json({
    Project: 'Puma',
    Service: 'User-Service',
  });
});

module.exports = routes;
