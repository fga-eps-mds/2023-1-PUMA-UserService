/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const db = require('../../dbconfig/dbConfig');

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
        const response = await db.query('SELECT * FROM COMMON_USER WHERE email = $1', [loginUser.email]);
        const user = response.rows[0];
        if (await bcrypt.compare(loginUser.password, user.passwordhash)) {
          resolve(user.userid);
        } else {
          reject(null);
        }
      } catch (e) {
        reject(e);
      }
    }),

  getUserData: async (userId) => {
    try {
      let type = null;

      const userData = await db.query('SELECT * FROM COMMON_USER WHERE userId = $1', [userId]);

      const professorResult = await db.query('SELECT * FROM PROFESSOR WHERE userId = $1', [userId]);
      if (professorResult.rows[0]) {
        type = 'Professor';
      }

      const studentResult = await db.query('SELECT * FROM STUDENT WHERE userId = $1', [userId]);
      if (studentResult.rows[0]) {
        type = 'Aluno';
      }

      const physicalAgentResult = await db.query('SELECT * FROM PHYSICAL_AGENT WHERE userId = $1', [userId]);
      if (physicalAgentResult.rows[0]) {
        type = 'Agente Externo';
      }

      const juridicalAgentResult = await db.query('SELECT * FROM JURIDICAL_AGENT WHERE userId = $1', [userId]);
      if (juridicalAgentResult.rows[0]) {
        type = 'Agente Externo';
      }

      return {
        userId: userData.rows[0].userid,
        fullName: userData.rows[0].fullname,
        email: userData.rows[0].email,
        isAdmin: userData.rows[0].isadmin,
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
