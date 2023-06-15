const express = require('express');

const routes = express.Router();
const userController = require('../controller/userController');
const User_Properties = require('../db/model/User_Properties');
const User = require('../db/model/User');
const emailService = require('../services/emailService');

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
  User_Properties.findAll({ where: { userId: req.params.matriculaId } }).then((response) => {
    const result = response.map((model) => { return { userid: model.userId, regnumber: model.regNumber, softskills: model.softSkills } })
    res.json(result);
  });
});

routes.get('/user/teacher/pending', (req, res) => {
  User_Properties.findAll({ where: { statusTeacher: 'PENDENTE' } })
    .then(async (pendingTeachers) => {
      const response = [];

      for(const teacher of pendingTeachers){
        const user = await User.findOne({
          where:{
            userId: teacher.userId
          }
        });

        response.push(user);
      }
      res.status(200).json({teachers: response});
    });
});

routes.patch('/user/teacher/pending/:userId', (req, res) => {
  const { userId } = req.params;
  const { accept } = req.body;

  User_Properties.update({ statusTeacher: accept ? 'ACEITO' : 'RECUSADO' }, { where: { userId } }).then(async (response) => {
    if (response[0] === 0) {
      res.status(404).json({ message: 'Professor não encontrado' });
    } else {

      const user = await User.findOne({
        where: {userId}
      });

      if(accept){
        await emailService.sendEmailTeacherAccepted(process.env.GMAIL_ACCOUNT, user.email, user.fullName);
      }else{
        await emailService.sendEmailTeacherRefused(process.env.GMAIL_ACCOUNT, user.email, user.fullName);
      }
      res.status(200).json({ message: 'Status atualizado' });
    }
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

routes.get('/all-users', async(req, res) => {
  userController.getAllUsers().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  })
});

module.exports = routes;