/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment');
const configRoutes = require('./routes/router');
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

require('./routes/router')(app);

configRoutes(app);

app.listen(3001);
