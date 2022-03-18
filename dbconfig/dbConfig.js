require('dotenv').config();
const { Pool } = require('pg');
const environment = require('../src/config/environment.config');
const dbSchema = require('./dbSchema');

environment.configEnv();

let tries = 5;

const connectionString = global.DB_URL;

let settings = { connectionString };

if (process.env.ENVIRONMENT === 'test') {
  settings = {
    ...settings,
    ssl: {
      rejectUnauthorized: false,
    }
  }
}

const pool = new Pool(settings);

while (tries > 0) {
  try {
    pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'", (err, res) => {
      if (err) console.log(err);
      else if (!res.rowCount) {
        console.log('Database not found');
        console.log('Creating');

        pool.query(dbSchema.DBSCHEMA, (error) => {
          if (error) {
            console.log('Failed creating Database');
            console.log(error);
          } else {
            console.log('Database \x1b[32mOK\x1b[0m');
          }
        });
      } else if (res.rowCount !== dbSchema.DBSCHEMALEN) {
        throw new Error('\x1b[33mFaulty database in project\n\x1b[33mDelete dbdata and start project again');
      } else console.log('Database \x1b[32mOK\x1b[0m');
    });
    break;
  } catch (err) {
    console.log(err);
    tries -= 1;
  }
}
module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
