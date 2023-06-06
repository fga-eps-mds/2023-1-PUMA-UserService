/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment.config');
const configRoutes = require('./routes/router');
const Common_User = require('./db/model/Common_User');
const Juridical_Agent = require('./db/model/Juridical_Agent');
const Physical_Agent = require('./db/model/Physical_Agent');
const Student = require('./db/model/Student');
const Teacher = require('./db/model/Teacher');
const User_Type = require('./db/model/User_Type');
const Contact = require('./db/model/Contact');
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
    await User_Type.sync({ alter: true })
    await Contact.sync({ alter: true })

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
// console.log('Api URL:', global.URL_API);
app.use(cors(corsOptions));

app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true, limit: '4mb' }));

require('./routes/router')(app);

console.log('Before config routes');
configRoutes(app);
console.log('After config routes');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

module.exports = app;
