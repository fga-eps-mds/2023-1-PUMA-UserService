/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const db = require('./dbconfig/dbConfig');
const configRoutes = require('./src/routes/router');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/router')(app);

configRoutes(app);

app.listen(3001);
