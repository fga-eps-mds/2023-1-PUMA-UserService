const express = require('express');

const routes = express.Router();
const userController = require('../controller/userController');
const db = require('../../dbconfig/dbConfig');

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
  userController.checkUserAndGetType(body).then(({ userId, userType }) => {
    res.status(200).json({ userId, userType });
  }).catch((response) => {
    res.status(400).json({ response });
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

routes.post('/recover', async (req, res) => {
  const { body } = req;

  userController.recoverPassword(body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

module.exports = routes;
