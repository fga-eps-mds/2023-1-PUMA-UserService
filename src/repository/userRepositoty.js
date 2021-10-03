const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

function addUser(name, email, hash) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO COMMON_USER(fullName,email,passwordHash,isAdmin) VALUES ($1,$2,$3,$4) RETURNING *;`
      , [name, email, hash, false])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        console.log(response);
        reject(response);
      });
  });
}

function logUserIn(email, senha) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM USER WHERE email = $1", [email]).then((response) => {
      console.log("fonkto");
      console.log(response);
      resolve(response.rows);
    }).catch((response) => {
      console.log(response);
      reject(response);
    });
  });
}

module.exports = { addUser, logUserIn };
