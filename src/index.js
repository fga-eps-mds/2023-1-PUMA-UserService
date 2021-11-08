/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment.config');
const configRoutes = require('./routes/router');
// eslint-disable-next-line no-unused-vars
const db = require('../dbconfig/dbConfig');

environment.configEnv();
const app = express();
app.disable('x-powered-by');
const corsOptions = {
  origin: `${global.URL_API}`,
};
console.log('Api URL:', global.URL_API);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/router')(app);

console.log('Before config routes');
configRoutes(app);
console.log('After config routes');
app.listen(3001);

module.exports = app
