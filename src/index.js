/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment');
// eslint-disable-next-line no-unused-vars
const db = require('../dbconfig/dbConfig');

environment.configEnv();
const app = express();
app.disable('x-powered-by');
const corsOptions = {
  origin: `${global.URL_API}`,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.json({
    Project: 'Puma',
    Service: 'User-Service',
  });
});

app.listen(3001);
