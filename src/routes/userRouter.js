const express = require('express');

const routes = express.Router();
const userController = require('../controller/userController');
const Student = require('../db/model/Student');

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
  Student.findAll({ where: { userId: req.params.matriculaId } }).then((response) => {
    const result = response.map((model) => ({ userid: model.userId, regnumber: model.regNumber, softskills: model.softSkills }));
    res.json(result);
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
  });
});

routes.put('/user/:id', (req, res) => {
  const { body, params } = req;
  console.log(body);
  console.log(params);
  userController.updateTeacherIdealizer(params.id, body.isIdealizer).then(() => {
    res.status(200).json({ status: 'success' });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.post('/recover', async (req, res) => {
  const { body } = req;

  userController.recoverPassword(body).then((response) => {
    if (response.status === 404) {
      res.status(404).json({ response });
    } else {
      res.status(200).json({ response });
    }
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

module.exports = routes;
