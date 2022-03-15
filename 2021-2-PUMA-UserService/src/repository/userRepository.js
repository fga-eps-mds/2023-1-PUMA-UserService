/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const db = require('../../dbconfig/dbConfig');

module.exports = {
  addUser: (newUser, hash) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO COMMON_USER(fullName,email,passwordHash,isAdmin) VALUES ($1,$2,$3,$4) RETURNING *;',
        [newUser.name, newUser.email, hash, false],
      )
        .then((response) => {
          resolve(response.rows[0].userid);
        })
        .catch((response) => {
          reject(response.severity);
        });
    });
  },

  addProfessor: (userId, newUser) => {
    return new Promise((resolve, reject) => {
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
    });
  },

  addStudent: (userId, newUser) => {
    return new Promise((resolve, reject) => {
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
    });
  },

  addJuridicalAgent: (userId, newUser) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO JURIDICAL_AGENT(userid,cnpj,cep,companyName,socialReason) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
        [userId, newUser.cnpj, newUser.cep, newUser.companyName, newUser.socialReason],
      )
        .then((response) => {
          resolve(response.rows[0].userid);
        })
        .catch((response) => {
          reject(response);
        });
    });
  },

  addPhysicalAgent: (userId, newUser) => {
    return new Promise((resolve, reject) => {
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
    });
  },

  checkUser: (loginUser) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.query('SELECT * FROM COMMON_USER WHERE email = $1', [loginUser.email]);
        const user = response.rows[0];
        if (await bcrypt.compare(loginUser.password, user.passwordhash)) {
          resolve(user.userid);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(null);
        }
      } catch (e) {
        reject(e);
      }
    });
  },

  getUserType: async (userId) => {
    try{
      const professorResult = await db.query('SELECT * FROM PROFESSOR WHERE userId = $1', [userId]);
      if(professorResult.rows[0]) {
        return 'Professor';
      }
      const studentResult = await db.query('SELECT * FROM STUDENT WHERE userId = $1', [userId]);
      if(studentResult.rows[0]) {
        return 'Aluno';
      }
      const physicalAgentResult = await db.query('SELECT * FROM PHYSICAL_AGENT WHERE userId = $1', [userId]);
      if(physicalAgentResult.rows[0]) {
        return 'Agente Externo';
      }
      const juridicalAgentResult = await db.query('SELECT * FROM JURIDICAL_AGENT WHERE userId = $1', [userId]);
      if(juridicalAgentResult.rows[0]) {
        return 'Agente Externo';
      }
    } catch(e) {
      throw(e);
    }
    throw(new Error('User not found'));
  }
}
