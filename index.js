/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./src/config/environment.config');
const configRoutes = require('./src/routes/router');
const Common_User = require('./src/db/model/Common_User');
const Juridical_Agent = require('./src/db/model/Juridical_Agent');
const Physical_Agent = require('./src/db/model/Physical_Agent');
const Student = require('./src/db/model/Student');
const Teacher = require('./src/db/model/Teacher');
// eslint-disable-next-line no-unused-vars

environment.configEnv();
const app = express();

(async () => {
  try {
    await Common_User.sync({ alter: true })
    await Juridical_Agent.sync({ alter: true })
    await Physical_Agent.sync({ alter: true })
    await Student.sync({ alter: true })
    await Teacher.sync({ alter: true })
    console.log("Database Inicializado")
  } catch (error) {
    console.log("Erro ao inicializar o banco -> ", error);
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
