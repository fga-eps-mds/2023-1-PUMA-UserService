const express = require('express');
const cors = require('cors');
const db = require('./dbconfig/dbConfig');
const configRoutes = require('./src/routes/router');

var app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/router')(app);
configRoutes(app);

app.listen(3001)
