const express = require('express');
const bodyParser = require('body-parser');
const router = require('../../src/routes/router');

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
router(app);

module.exports = app;
