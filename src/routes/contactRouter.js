const express = require('express');

const routes = express.Router();
const contactController = require('../controller/contactController');

routes.post('/contact/create', (req, res) => {
    const { body } = req;
    contactController.createContact(body).then((response) => {
      res.status(200).json({ response });
    }).catch((error) => {
      res.status(400).json({ error });
    });
  });

  module.exports = routes;
