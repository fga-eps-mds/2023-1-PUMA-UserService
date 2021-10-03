const db = require('../../dbconfig/dbConfig');
const dbConfig = require('../../dbconfig/dbConfig');
const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

function addUser(newUser, hash) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO COMMON_USER(fullName,email,passwordHash,isAdmin) VALUES ($1,$2,$3,$4) RETURNING *;`
      , [newUser.name, newUser.email, hash, false])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  });
}

function addProfessor(userId, newUser) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO PROFESSOR(userid,regNumber) VALUES ($1,$2) RETURNING *;`
      , [userId, newUser.matricula])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  });
}

function addStudent(userId, newUser) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO STUDENT(userid,regNumber,softSkills) VALUES ($1,$2,$3) RETURNING *;`
      , [userId, newUser.matricula, ' '])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  });
}

function addJuridicalAgent(userId, newUser) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO JURIDICAL_AGENT(userid,cnpj,cep,companyName,socialReason) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
      , [userId, newUser.cnpj, newUser.cep, newUser.companyName, newUser.socialReason])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  });
}

function addPhysicalAgent(userId, newUser) {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO PHYSICAL_AGENT(userid,cpf) VALUES ($1,$2) RETURNING *;`
      , [userId, newUser.cpf])
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
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

module.exports = { addUser, addProfessor, logUserIn, addStudent, addJuridicalAgent, addPhysicalAgent };
