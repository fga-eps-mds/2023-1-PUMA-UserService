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
  userController.checkUserAndGetUserData(body).then((response) => {
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

routes.put('/password/:email', (req, res) => {
  const { body, params } = req;
  userController.updatePassword({ ...body, ...params }).then(({ email }) => {
    res.status(200).json({ email });
  }).catch((response) => {
    res.status(400).json({ response });
  })
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
