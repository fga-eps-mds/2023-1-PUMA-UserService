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

routes.get('/contact', (_, res) => {
  contactController.getContacts().then((response) => {
    res.status(200).json(response);
  }).catch((response) => {
    res.status(400).json(response);
  });
});

routes.put('/contact/update/:contactId', (req, res) => {
  const { body } = req;
  contactController.updateContact(req.params.contactId, body).then((response) => {
    res.status(200).json( response );
  }).catch((error) => {
    res.status(400).json(error);
  });
});

routes.delete('/contact/delete/:contactId', (req, res) => {
  contactController.deleteContact(req.params.contactId).then((response) => {
    res.status(200).json(response);
  }).catch((error) => {
    res.status(400).json( error );
  });
});

module.exports = routes;
