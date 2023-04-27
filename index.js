/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./src/config/environment.config');
const configRoutes = require('./src/routes/router');
// eslint-disable-next-line no-unused-vars
const db = require('./dbconfig/dbConfig');

environment.configEnv();
const app = express();

(async () => {
  const database = require('./db');
  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();

app.disable('x-powered-by');
const corsOptions = {
  // origin: `${global.URL_API}`,
  origin: '*',
};
console.log('Api URL:', global.URL_API);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/router')(app);

console.log('Before config routes');
configRoutes(app);
console.log('After config routes');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

module.exports = app;
