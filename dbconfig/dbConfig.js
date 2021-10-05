/* eslint-disable import/no-unresolved */
require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const { Pool, Client } = require('pg');

const connectionString = process.env.DB_URL;

const dbSchema = require('./dbSchema');

let tries = 5;

const pool = new Pool({
  connectionString,
});

while (tries > 0) {
  try {
    pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'", (err, res) => {
      if (err) console.log(err);
      else if (!res.rowCount) {
        console.log('Database not found');
        console.log('Creating');

        // eslint-disable-next-line no-unused-vars
        pool.query(dbSchema.DBSCHEMA, (error, resp) => {
          if (error) {
            console.log('Failed creating Database');
            console.log(err);
          } else {
            console.log('Database \x1b[32mOK\x1b[0m');
          }
        });
      // eslint-disable-next-line no-throw-literal
      } else if (res.rowCount !== 13) throw '\x1b[33mFaulty database in project\n\x1b[33mDelete dbdata and start project again';

      else console.log('Database \x1b[32mOK\x1b[0m');
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
