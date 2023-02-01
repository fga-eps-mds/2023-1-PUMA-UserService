const express = require('express');

const routes = express.Router();
const userTypeController = require('../controller/userTypeController');

routes.post('/userType', (req, res) => {
  userTypeController.addUserType(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

routes.get('/userType', (req, res) => {
  userTypeController.getUserType().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.get('/userType/:UserTypeid', (req, res) => {
  userTypeController.getUserType(req.params.UserTypeid).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.put('/userType/:UserTypeid', (req, res) => {
  userTypeController.updateUserType(req.params.UserTypeid, req.body).then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.delete('/userType/:UserTypeid', (req, res) => {
  userTypeController.deleteUserType(req.params.UserTypeid).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json({ error });
  });
});

module.exports = routes;
