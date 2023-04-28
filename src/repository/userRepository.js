/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const db = require('../../dbconfig/dbConfig');
const Common_User = require('../db/model/Common_User');
const Juridical_Agent = require('../db/model/Juridical_Agent');
const Physical_Agent = require('../db/model/Physical_Agent');
const Student = require('../db/model/Student');
const Teacher = require('../db/model/Teacher');

module.exports = {
  addUser: (newUser, hash) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO COMMON_USER(fullName,email,passwordHash,isAdmin,phoneNumber) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
      [newUser.name, newUser.email, hash, false, newUser.phoneNumber],
    )
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response.severity);
      });
  }),

  addProfessor: (userId, newUser) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO PROFESSOR(userid,regNumber) VALUES ($1,$2) RETURNING *;',
      [userId, newUser.matricula],
    )
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addStudent: (userId, newUser) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO STUDENT(userid,regNumber,softSkills) VALUES ($1,$2,$3) RETURNING *;',
      [userId, newUser.matricula, ' '],
    )
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addJuridicalAgent: (userId, newUser) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO JURIDICAL_AGENT(userid,cnpj,companyName,socialReason) VALUES ($1,$2,$3,$4) RETURNING *;',
      [userId, newUser.cnpj, newUser.companyName, newUser.socialReason],
    )
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  addPhysicalAgent: (userId, newUser) => new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO PHYSICAL_AGENT(userid,cpf) VALUES ($1,$2) RETURNING *;',
      [userId, newUser.cpf],
    )
      .then((response) => {
        resolve(response.rows[0].userid);
      })
      .catch((response) => {
        reject(response);
      });
  }),

  checkUser: (loginUser) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        const user = await Common_User.findOne({where: { email: loginUser.email }});
        if (await bcrypt.compare(loginUser.password, user.passwordHash)) {
          resolve(user.userId);
        } else {
          reject(null);
        }
      } catch (e) {
        console.log(e)
        reject(e);
      }
    }),

  getUserData: async (userId) => {
    try {
      let type = null;

      const userData = await Common_User.findOne({where: { userId: userId }});

      const professorResult = await Teacher.findOne({where: { userId: userId }});
      if (professorResult) {
        type = 'Professor';
      }

      const studentResult = await Student.findOne({where: { userId: userId }});
      if (studentResult) {
        type = 'Aluno';
      }

      const physicalAgentResult = await Physical_Agent.findOne({where: { userId: userId }});
      if (physicalAgentResult) {
        type = 'Agente Externo';
      }

      const juridicalAgentResult = await Juridical_Agent.findOne({where: { userId: userId }});
      if (juridicalAgentResult) {
        type = 'Agente Externo';
      }

      return {
        userId: userData.userId,
        fullName: userData.fullName,
        email: userData.email,
        isAdmin: userData.isAdmin,
        type,
      };
    } catch (e) {
      throw (e);
    }
    throw (new Error('User not found'));
  },

  updateUserPassword: async (email, hash) => {
    try {
      return new Promise((resolve, reject) => {
        db.query(
          'UPDATE COMMON_USER SET passwordHash = $1 WHERE email = $2 RETURNING *;',
          [hash, email],
        )
          .then((response) => {
            console.log(response);
            resolve(response.rows[0]);
          })
          .catch((response) => {
            reject(response);
          });
      });
    } catch (e) {
      reject(e);
    }
  },

  checkUserByEmail: (email) => new Promise((resolve, reject) => {
    try {
      db.query('SELECT * FROM COMMON_USER WHERE email = $1', [email])
        .then((response) => resolve(response))
        .catch((e) => reject(e));
    } catch (e) {
      reject(e);
    }
  }),
};
